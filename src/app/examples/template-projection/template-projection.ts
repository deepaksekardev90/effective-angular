import { Component } from '@angular/core';
import { DisplayScalesComponent } from '../display-scales/display-scales';
import { ScalesProjectionDirective } from '../display-scales/scales-projection.directive';

@Component({
  selector: 'app-template-projection',
  imports: [DisplayScalesComponent, ScalesProjectionDirective],
  templateUrl: './template-projection.html',
  styleUrl: './template-projection.scss',
})
export class TemplateProjectionComponent {}
