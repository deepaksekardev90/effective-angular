import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal';
import { ContentSlotsComponent } from '../content-slots/content-slots';

@Component({
  selector: 'app-content-projection',
  imports: [ModalComponent, ContentSlotsComponent],
  templateUrl: './content-projection.html',
  styleUrl: './content-projection.scss',
})
export class ContentProjectionComponent {
  basicModalShown = false;
  multiSlotModalShown = false;
  workaroundModalShown = false;

  headers = ['Alpha', 'Beta', 'Gamma'];
}
