import { Component } from '@angular/core';
import { Highlight } from '../../highlight';
import { Colorchange } from '../../colorchange';

@Component({
  selector: 'app-directive-composition',
  imports: [],
  templateUrl: './directive-composition.html',
  styleUrl: './directive-composition.scss',
  // Directive Composition API: apply Highlight and Colorchange directly to
  // this component's host element, without this component having to add
  // [appHighlight] / [appColorchange] attributes itself, or the caller
  // adding them from outside.
  hostDirectives: [
    {
      directive: Highlight,
      // Only inputs listed here are exposed on <app-directive-composition>;
      // everything else stays private, even though Highlight is applied.
      inputs: ['hoverBgColor'],
    },
    {
      directive: Colorchange,
      // Rename on the way out: consumers bind [color]="..." on this
      // component instead of the directive's own [hoverColor] name.
      inputs: ['hoverColor: color', 'hoverSize'],
    },
  ],
})
export class DirectiveComposition {}
