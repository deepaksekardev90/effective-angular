import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonFormComponent } from './examples/person-form/person-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './examples/reactive-form/reactive-form';
import { DynamicFormComponent } from './examples/dynamic-form/dynamic-form';
import { ContentProjectionComponent } from './examples/content-projection/content-projection';
import { DisplayScalesComponent } from './examples/display-scales/display-scales';
import { ScalesProjectionDirective } from './examples/display-scales/scales-projection.directive';

interface BioForm {
  name:string;
  age:number | null
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormComponent,
    DynamicFormComponent,
    CommonModule,
    ContentProjectionComponent,
    DisplayScalesComponent,
    ScalesProjectionDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('effective-angular');

  model:BioForm = {
    name: '',
    age: null,
  };
}
