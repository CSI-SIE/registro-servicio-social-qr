import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoMensajePersonalizadoComponent } from './dialogo-mensaje-personalizado.component';

describe('DialogoMensajePersonalizadoComponent', () => {
  let component: DialogoMensajePersonalizadoComponent;
  let fixture: ComponentFixture<DialogoMensajePersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogoMensajePersonalizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoMensajePersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
