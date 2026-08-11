import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export interface PersonForm {
  name: string;
  age: number | null;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-person-form',
  imports: [FormsModule],
  templateUrl: './person-form.html',
  styleUrl: './person-form.scss',
})
export class PersonFormComponent {
  model: PersonForm = {
    name: '',
    age: null,
    address: '',
    phone: '',
  };

  submitted = false;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.submitted = true;
    console.log('Form submitted', this.model);
  }
}
