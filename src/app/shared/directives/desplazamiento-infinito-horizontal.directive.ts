/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[desplazamientoInfinitoHorizontal]',
  standalone: true,
})
export class DesplazamientoInfinitoHorizontalDirective {
  constructor(private elemento: ElementRef) {}

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    event.preventDefault();

    if (event.deltaY > 0) {
      if (
        this.elemento.nativeElement.scrollWidth -
          this.elemento.nativeElement.clientWidth ===
        this.elemento.nativeElement.scrollLeft
      ) {
        this.elemento.nativeElement.scrollLeft = 0;
      } else {
        this.elemento.nativeElement.scrollLeft += 17;
      }
    } else {
      if (0 === this.elemento.nativeElement.scrollLeft) {
        this.elemento.nativeElement.scrollLeft =
          this.elemento.nativeElement.scrollWidth -
          this.elemento.nativeElement.clientWidth;
      } else {
        this.elemento.nativeElement.scrollLeft -= 17;
      }
    }
  }
}
