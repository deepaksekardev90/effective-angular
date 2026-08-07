import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appColorchange]',
})
export class Colorchange {
  @Input() hoverColor: string = 'orange';
  @Input() hoverSize: string = '20px';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.hoverColor);
    this.renderer.setStyle(this.el.nativeElement, 'fontSize', this.hoverSize);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
    this.renderer.removeStyle(this.el.nativeElement, 'fontSize');
  }
}
