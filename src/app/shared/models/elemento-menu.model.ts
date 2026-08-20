/**
 * La lógica del menú está basada en
 * https://github.com/thisiszoaib/responsive-toolbar
 */
export interface ElementoMenu {
  /**
   * Texto a mostrar en el botón.
   */
  etiqueta: string;
  /**
   * Texto a mostrar en el titulo
   */
  modulo: string;
  /**
   * Icono a utilizar en el botón.
   */
  icono: string;
  /**
   * Bandera para indicar si el elemento será visible en móviles.
   */
  visibleEnMovil: boolean;
  /**
   * Bandera para indicar si el elemento será visible en tabletas.
   */
  visibleEnTablet: boolean;
  /**
   * Bandera para indicar si el elemento será visible en navegadores
   * convencionales y pantallas de dimensiones promedio o superiores.
   */
  visibleEnEscritorio: boolean;
  /**
   * Acción que realizará el botón. El campo objeto contiene la ruta a navegar o
   * el nombre del componente a cargar en un diálogo. El campo tipo determina
   * cómo se procesará el campo objeto. Los posibles valores son:
   * ['url' | 'component'].
   */
  accion: {
    objeto: string;
    tipo: string;
  };
  /**
   * Arreglo de rutas en donde se omitirá mostrar el botón. Una buena idea sería
   * omitir:
   * ```
   * [
   *    '/', // Ruta raíz
   *    'debe-iniciar-sesion-SIE' // Pantalla de solicitud de inicio de sesión
   * ]
   * ```
   * La ruta actual es omitida de forma predeterminada. _¿Por qué mostrar el
   * botón de Inicio estando en Inicio?_
   */
  excepciones: string[];
  /**
   * Desaparece el elemento sin importar las demás validaciones.
   */
  inhabilitar: boolean;
}
