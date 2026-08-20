import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDateFormats, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS } from '@angular/material/core';

import { environment } from '../environments/environment';
import { provideSpanishPaginator } from '@csi-sie/ngx-iest-base/providers';

//import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { NGX_IEST_BASE_CONFIG, NgxIestBaseConfig } from '@csi-sie/ngx-iest-base';

const NGX_IEST_BASE_CONFIGURACION: NgxIestBaseConfig = {
  servidor: environment.servidor,
  produccion: environment.produccion,
  proyecto: environment.proyecto,
  //secreto: environment.secreto,
  apiURL: environment.apiURL,
  //nivelDepuracion: environment.nivelDepuracion,
};

/**
 * Se modifica el formato a uno más natural.
 */
const CUSTOM_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions,
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es-Mx' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'auto',
      },
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: NGX_IEST_BASE_CONFIG, useValue: NGX_IEST_BASE_CONFIGURACION },
    provideSpanishPaginator(),
  ],
};
