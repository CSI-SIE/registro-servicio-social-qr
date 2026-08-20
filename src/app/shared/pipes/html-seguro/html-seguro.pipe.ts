import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

/**
 * Angular de forma predeterminada intenta no ser tomado por sorpresa cuando
 * carga código en algún componente y realiza una interpretación del mismo (o
 * emulación) por lo que escapa ciertas etiquetas o técnicas. Y ESO ESTÁ BIEN.
 * Aunque para ciertos casos muy específicos este comportamiento representa una
 * desventaja; como cuando se intenta renderizar código HTML creado por algún
 * editor WYSIWYG o asignar una URL creada de forma dinámica a un elemento. Esta
 * tubería permite ejecutar código HTML sin sanitizar por lo que es importante
 * asegurarse que realmente confías en el código proporcionado para no ser
 * expuesto a ataques XSS.
 */
@Pipe({
  name: 'HTMLSeguro',
  standalone: true,
})
export class HTMLSeguroPipe implements PipeTransform {
  constructor(private _domSanitizer: DomSanitizer) {}

  /**
   * Ejecuta la transformación del contenido.
   *
   * @param {string} contenido El contenido potencialmente no seguro.
   * @param {string} tipo El tipo asumido del contenido (código HTML, estilos
   *    CSS, código Javascript o direcciones Web).
   * @returns {SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl} El
   *    contenido sin sanitizar.
   */
  transform(
    contenido: string,
    tipo: string,
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (tipo) {
      case 'html':
        return this._domSanitizer.bypassSecurityTrustHtml(contenido);
      case 'style':
        return this._domSanitizer.bypassSecurityTrustStyle(contenido);
      case 'script':
        return this._domSanitizer.bypassSecurityTrustScript(contenido);
      case 'url':
        return this._domSanitizer.bypassSecurityTrustUrl(contenido);
      case 'resourceUrl':
        return this._domSanitizer.bypassSecurityTrustResourceUrl(contenido);
      default:
        return this._domSanitizer.bypassSecurityTrustHtml(contenido);
    }
  }
}
