import { Component, signal } from '@angular/core';
import { Child } from '../../child/child';

@Component({
  selector: 'app-defer',
  imports: [Child],
  templateUrl: './defer.html',
  styleUrl: './defer.scss',
})
export class Defer {
  role = signal<'admin' | 'editor' | 'viewer'>('editor');
}
