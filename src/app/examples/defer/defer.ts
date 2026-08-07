import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-defer',
  imports: [],
  templateUrl: './defer.html',
  styleUrl: './defer.scss',
})
export class Defer {
  role = signal<'admin' | 'editor' | 'viewer'>('editor');
}
