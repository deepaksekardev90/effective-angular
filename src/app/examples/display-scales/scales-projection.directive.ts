import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appScalesProjection]',
})
export class ScalesProjectionDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
