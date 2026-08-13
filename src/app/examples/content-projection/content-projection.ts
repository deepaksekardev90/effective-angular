import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal';
import { ContentSlotsComponent } from '../content-slots/content-slots';
import { DisplayScalesComponent } from '../display-scales/display-scales';
import { ScalesProjectionDirective } from '../display-scales/scales-projection.directive';

@Component({
  selector: 'app-content-projection',
  imports: [ModalComponent, ContentSlotsComponent, DisplayScalesComponent, ScalesProjectionDirective],
  templateUrl: './content-projection.html',
  styleUrl: './content-projection.scss',
})
export class ContentProjectionComponent {
  basicModalShown = false;
  multiSlotModalShown = false;
  workaroundModalShown = false;

  headers = ['Alpha', 'Beta', 'Gamma'];
}
