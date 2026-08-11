import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const ADDRESS_TEXT_FIELDS = ['no', 'street', 'area', 'city'];

function countWords(value: string | null | undefined): number {
  return (value ?? '').trim().split(/\s+/).filter(Boolean).length;
}

export function maxWordCountValidator(maxWords: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const count = countWords(control.value);
    return count > maxWords ? { maxWordCount: { count, max: maxWords } } : null;
  };
}

export function addressWordCountValidator(maxWords: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const count = ADDRESS_TEXT_FIELDS.reduce(
      (total, field) => total + countWords(control.get(field)?.value),
      0,
    );
    return count > maxWords ? { addressWordCount: { count, max: maxWords } } : null;
  };
}

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
