import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoConfirmacionPersonalizadoComponent } from './dialogo-confirmacion-personalizado.component';

describe('DialogoConfirmacionPersonalizadoComponent', () => {
  let component: DialogoConfirmacionPersonalizadoComponent;
  let fixture: ComponentFixture<DialogoConfirmacionPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DialogoConfirmacionPersonalizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoConfirmacionPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
