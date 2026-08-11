import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonFormComponent } from './examples/person-form/person-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PersonFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('effective-angular');
}
