import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonFormComponent } from './examples/person-form/person-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './examples/reactive-form/reactive-form';

interface BioForm {
  name:string;
  age:number | null
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormComponent, CommonModule],
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
