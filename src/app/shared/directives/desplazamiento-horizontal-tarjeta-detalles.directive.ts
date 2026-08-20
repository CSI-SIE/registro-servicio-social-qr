/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[desplazamientoHorizontalTarjetaDetalles]',
  standalone: true,
})
export class DesplazamientoHorizontalTarjetaDetallesDirective {
  private tarjetaActual: Element | null;

  constructor(private elemento: ElementRef) {
    this.tarjetaActual = null;
    const esperaPorElementos = setInterval(() => {
      if (
        document.querySelectorAll(
          '#' + this.elemento.nativeElement.id + ' .detalle-activo',
        ).length > 0
      ) {
        this.elemento.nativeElement.scrollTo(0, 0);
        clearInterval(esperaPorElementos);
      }
    }, 100);
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    event.preventDefault();

    const lista = document.querySelectorAll(
      '#' + this.elemento.nativeElement.id + ' .detalle-activo',
    );
    let siguienteTarjeta;
    let anteriorTarjeta;

    if (!this.tarjetaActual) {
      this.tarjetaActual = lista[0];
    }

    siguienteTarjeta = this.tarjetaActual.nextElementSibling;
    anteriorTarjeta = this.tarjetaActual.previousElementSibling;

    if (!siguienteTarjeta) {
      siguienteTarjeta = lista[0];
    }

    if (!anteriorTarjeta) {
      anteriorTarjeta = lista[lista.length - 1];
    }

    if (this.tarjetaActual) {
      if (event.deltaY > 0) {
        siguienteTarjeta.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'center',
        });
        this.tarjetaActual = siguienteTarjeta;
      } else {
        anteriorTarjeta.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'center',
        });
        this.tarjetaActual = anteriorTarjeta;
      }
    }
  }
}
