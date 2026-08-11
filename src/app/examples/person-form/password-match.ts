import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordMatchDirective),
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
