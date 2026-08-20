import {
  AfterViewInit,
  Component,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { ConsultasService } from './consulta-api';
import { ConsultaEscaneoQR } from './consulta-escaneo-qr';
import { DecodedTextType } from 'html5-qrcode/esm/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { limpiaConjuntoDatos } from '@csi-sie/ngx-iest-base';
import { ProcesosService } from './proceso-api';
import {
  FormularioConApiComponent,
  LimiteCaracteresTextarea,
} from '@csi-sie/ngx-iest-base/core/formulario-con-api';

import {
  FormularioRegistroAlumno as Formulario,
  FormularioRegistroAlumnoErrores as FormularioErrores,
} from './models/formularios/formulario-registrar-alumno';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-escaner-qr',
  imports: [
    JsonPipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './escaner-qr.html',
  styleUrl: './escaner-qr.scss',
})
export class EscanerQr
  extends FormularioConApiComponent<Formulario, FormularioErrores>
  implements AfterViewInit, OnDestroy
{
  /**
   * Inyección de dependencias
   */
  consultasService = inject(ConsultasService);
  procesosService = inject(ProcesosService);
  matDialog = inject(MatDialog);
  /**
   * Límite de caracteres en cada área de texto.
   */
  limiteCaracteres: LimiteCaracteresTextarea[] = [];

  infoCredencial: WritableSignal<ConsultaEscaneoQR | null>;

  /**
   * Bandera para (des)habilitar el botón de procesar formulario.
   */
  deshabilitaBotonEnvioFormulario: WritableSignal<boolean>;

  ef: FormularioErrores = {
    idEmpresa: '',
    idPersonAlumno: '',
    idAlumno: '',
    telefono: '',
  };

  mvf: FormularioErrores = {
    idEmpresa: {
      required: 'Requiere el ID de la empresa(proovedor).',
    },
    idPersonAlumno: {
      required: 'Requiere el ID del alumno.',
    },
    idAlumno: {
      required: 'Requiere el ID del alumno.',
    },
    telefono: {
      required: 'Requiere el teléfono del alumno.',
      //min: 'Debe tener 10 digitos.',
    },
  };

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    public matDialogRef: MatDialogRef<EscanerQr>,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    @Inject(MAT_DIALOG_DATA)
    public data: {
      idEmpresa: number;
    },
  ) {
    const formBuilder = inject(FormBuilder);
    super(
      new FormGroup<Formulario>({
        idEmpresa: formBuilder.control<number | null>(data.idEmpresa, [Validators.required]),
        idPersonAlumno: formBuilder.control<number | null>(null, [Validators.required]),
        idAlumno: formBuilder.control<number | null>(null, [Validators.required]),
        telefono: formBuilder.control<number | null>(null, [
          Validators.required,
          Validators.pattern(/^\d{10,}$/),
        ]),
      }),
    );

    this.infoCredencial = signal(null);
    this.deshabilitaBotonEnvioFormulario = signal(false);
  }

  private scanner?: Html5Qrcode;
  private scannerActivo = false;

  qrResult = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  scanning = signal(false);

  ngAfterViewInit(): void {
    this.startScanner();
  }

  startScanner(): void {
    this.errorMessage.set(null);
    this.qrResult.set(null);
    this.infoCredencial.set(null);

    //this.scannerActivo = false;

    this.formulario.controls.telefono.reset();
    this.formulario.controls.idPersonAlumno.reset();
    this.formulario.controls.idAlumno.reset();

    this.scanner = new Html5Qrcode('qr-reader', {
      verbose: false,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    });

    const config = {
      fps: 10,
      aspectRatio: 4 / 3,
      qrbox: {
        width: 250,
        height: 250,
      },
    };

    this.scanner
      .start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          this.onQrCodeScanned(decodedText);
        },
        () => {
          // Se ejecuta cuando un frame no contiene un QR.
          // No necesitamos hacer nada aquí.
        },
      )
      .then(() => {
        this.scanning.set(true);
        this.scannerActivo = true;
      })
      .catch((error) => {
        console.error('Error al iniciar cámara:', error);

        this.scannerActivo = false;
        this.errorMessage.set('No fue posible acceder a la cámara.');
      });
  }

  private onQrCodeScanned(decodedText: string): void {
    console.log('QR detectado:', decodedText);

    this.qrResult.set(decodedText);

    this.recuperaInfoCredencial(decodedText);

    this.stopScanner();
  }

  stopScanner(): void {
    if (!this.scanner || !this.scannerActivo) {
      return;
    }

    this.scannerActivo = false;
    this.scanning.set(false);

    this.scanner
      .stop()
      .then(() => {
        this.scanning.set(false);
        this.scannerActivo = false;
      })
      .catch((error) => {
        console.error('Error al detener scanner:', error);
        this.scannerActivo = false;
      });
  }

  // ngOnInit(): void {
  //   //this.recuperaInfoCredencial();
  // }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  /**
   * Obten desde la API los detalles de la credencial del alumno.
   */
  private recuperaInfoCredencial(credencial: string): void {
    this.muestraIndicadorCarga.set(true);

    const lecturaQR$ = this.consultasService
      .lecturaQR({
        credencial: credencial,
        idEmpresa: this.data.idEmpresa,
      })
      .subscribe({
        next: (detalles) => {
          this.infoCredencial.set(detalles);
          this.muestraIndicadorCarga.set(false);
          this.formulario.controls.idPersonAlumno.setValue(this.infoCredencial()!.idIest);
          this.formulario.controls.idAlumno.setValue(this.infoCredencial()!.idAlumno);
        },
        error: (errores) => {
          console.log(errores);
          if (!this.errorConexion()) {
            this.muestraMensajeErrorConexion();
            this.errorConexion.set(true);
          }
        },
      });
    this.suscripciones.update((suscripciones) => [...suscripciones, ...new Array(lecturaQR$)]);
  }

  //Proceso de registrar un alumno al servicio social.
  async registraAlumno(): Promise<void> {
    const matSnackBarConfirmacion = this.matSnackBar.open(`Cargando diálogo...`, '', {
      duration: 600000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
    const { DialogoConfirmacionPersonalizadoComponent } =
      await import('../shared/components/dialogo-confirmacion-personalizado/dialogo-confirmacion-personalizado.component').finally(
        () => {
          matSnackBarConfirmacion.dismiss();
        },
      );

    const matSnackBarMensaje = this.matSnackBar.open(`Cargando diálogo...`, '', {
      duration: 600000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
    const { DialogoMensajePersonalizadoComponent } =
      await import('../shared/components/dialogo-mensaje-personalizado/dialogo-mensaje-personalizado.component').finally(
        () => {
          matSnackBarMensaje.dismiss();
        },
      );

    const confirmacion = this.matDialog.open(DialogoConfirmacionPersonalizadoComponent, {
      data: {
        titulo: 'Atención',
        mensaje: `¿Desea registrar a este alumno?. Una vez registrado ya no se podrá hacer cambios.`,
      },
      minWidth: '300px',
    });

    confirmacion.afterClosed().subscribe({
      next: (respuesta) => {
        this.deshabilitaBotonEnvioFormulario.set(false);
        if (respuesta === 1) {
          if (this.formulario.valid) {
            const formularioLimpio = limpiaConjuntoDatos(this.formulario.getRawValue());
            this.procesosService.registroAlumno(formularioLimpio).subscribe({
              next: (proceso) => {
                const mensajeResultado = this.matDialog.open(DialogoMensajePersonalizadoComponent, {
                  data: {
                    titulo: 'Atención',
                    mensaje: proceso.msj,
                  },
                  minWidth: '300px',
                });
                mensajeResultado.afterClosed().subscribe({
                  next: () => {
                    this.deshabilitaBotonEnvioFormulario.set(false);
                    if (proceso.error === 0) {
                      this.matDialogRef.close(1);
                    }
                  },
                });
              },
              error: (errores) => {
                this.deshabilitaBotonEnvioFormulario.set(false);
                console.error(errores);
                this.matDialog.open(DialogoMensajePersonalizadoComponent, {
                  data: {
                    titulo: 'Atención',
                    mensaje: 'Ocurrió un error al procesar la información.',
                  },
                  minWidth: '300px',
                });
              },
            });
          } else {
            const mensaje = this.matDialog.open(DialogoMensajePersonalizadoComponent, {
              data: {
                mensaje: 'Por favor, compruebe su información.',
              },
              minWidth: '300px',
            });
            mensaje.afterClosed().subscribe({
              next: () => {
                this.deshabilitaBotonEnvioFormulario.set(false);
              },
            });
          }
        } else {
          this.matDialog.open(DialogoMensajePersonalizadoComponent, {
            data: {
              titulo: 'Atención',
              mensaje: 'Se canceló el registro del alumno.',
            },
            minWidth: '300px',
          });
          this.deshabilitaBotonEnvioFormulario.set(false);
        }
      },
    });
  }

  /**
   * Cierra el diálogo y devuelve al componente origen el valor establecido por
   * el usuario.
   *
   * @param respuesta 1 si confirma su decisión o un 0 para indicar que el
   *     usuario cambió de opinión.
   */
  cierraDialogo(respuesta: number): void {
    this.matDialogRef.close(respuesta);
  }
}
