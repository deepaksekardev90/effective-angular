import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
})
export class Switch {
  role = signal<'admin' | 'editor' | 'viewer'>('editor');
}
