import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) shown = false;
  @Output() shownChange = new EventEmitter<boolean>();

  close(): void {
    this.shown = false;
    this.shownChange.emit(false);
  }
}
