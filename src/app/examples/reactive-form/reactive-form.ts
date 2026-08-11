import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  addressWordCountValidator,
  maxWordCountValidator,
  passwordMatchValidator,
} from './validators';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveFormComponent {
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: [null as number | null, [Validators.required, Validators.min(0), Validators.max(120)]],
    address: this.fb.group(
      {
        no: ['', Validators.required],
        street: ['', [Validators.required, maxWordCountValidator(6)]],
        area: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      },
      { validators: addressWordCountValidator(5) },
    ),
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    passwordGroup: this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    ),
    tags: new FormArray([new FormControl('')]),
    statuses: new FormRecord<FormControl<boolean>>({
      active: new FormControl(false, { nonNullable: true }),
      archived: new FormControl(false, { nonNullable: true }),
    }),
  });

  newStatus = new FormControl('', { nonNullable: true });

  submitted = false;

  get address() {
    return this.form.controls.address;
  }

  get passwordGroup() {
    return this.form.controls.passwordGroup;
  }

  get statuses() {
    return this.form.controls.statuses;
  }

  get statusKeys() {
    return Object.keys(this.statuses.controls);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
    console.log('Form submitted', this.form.getRawValue());
  }

  addTag() {
    this.form.controls.tags.insert(0, new FormControl(''));
  }

  removeTag(index: number) {
    this.form.controls.tags.removeAt(index);
  }

  addStatus(): void {
    const name = this.newStatus.value.trim();
    if (!name || this.statuses.contains(name)) {
      return;
    }
    this.statuses.addControl(name, new FormControl(false, { nonNullable: true }));
    this.newStatus.reset('');
  }

  removeStatus(name: string): void {
    (this.statuses as FormGroup).removeControl(name);
  }
}
