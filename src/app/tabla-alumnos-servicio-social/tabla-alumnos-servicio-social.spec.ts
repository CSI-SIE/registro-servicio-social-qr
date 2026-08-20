import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAlumnosServicioSocial } from './tabla-alumnos-servicio-social';

describe('TablaAlumnosServicioSocial', () => {
  let component: TablaAlumnosServicioSocial;
  let fixture: ComponentFixture<TablaAlumnosServicioSocial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaAlumnosServicioSocial],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaAlumnosServicioSocial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
