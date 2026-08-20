import { MatPaginatorIntl } from '@angular/material/paginator';

/**
 * Redefine las características de la paginación para cambiar el texto al
 * español.
 *
 * @param page El número de página actual.
 * @param pageSize La cantidad máxima de elementos por página.
 * @param length La cantidad total de elementos.
 * @returns La leyenda correspondiente a la paginación.
 */
const rangoEspanol = (
  page: number,
  pageSize: number,
  length: number,
): string => {
  if (length === 0 || pageSize === 0) {
    return `0 de ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  /*
   * Si el largo de la lista completa rebasa el largo de la página propuesta,
   * procede a la paginación.
   */
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

/**
 * Redefine los mensajes mostrados en el paginador para que se muestren en
 * español.
 *
 * @returns Una instancia de MatPaginatorIntl con las etiquetas en español.
 */
export function estableceEspanol(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  paginatorIntl.getRangeLabel = rangoEspanol;
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.firstPageLabel = 'Primera página';

  return paginatorIntl;
}
