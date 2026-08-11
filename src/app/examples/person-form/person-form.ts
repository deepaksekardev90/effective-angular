import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MaxWordCountDirective } from './max-word-count';
import { PasswordMatchDirective } from './password-match';

export interface PersonForm {
  name: string;
  age: number | null;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-person-form',
  imports: [FormsModule, MaxWordCountDirective, PasswordMatchDirective],
  templateUrl: './person-form.html',
  styleUrl: './person-form.scss',
})
export class PersonFormComponent {
  model: PersonForm = {
    name: '',
    age: null,
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
