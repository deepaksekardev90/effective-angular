import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ScalesProjectionDirective } from './scales-projection.directive';

@Component({
  selector: 'app-display-scales',
  imports: [NgTemplateOutlet],
  templateUrl: './display-scales.html',
  styleUrl: './display-scales.scss',
})
export class DisplayScalesComponent {
  @Input({ required: true }) scaleSizes!: number[];
  @ContentChildren(ScalesProjectionDirective) content!: QueryList<ScalesProjectionDirective>;
}
