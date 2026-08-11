import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

const ADDRESS_TEXT_FIELDS = ['no', 'street', 'area', 'city'];

@Directive({
  selector: '[appAddressWordCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressWordCountDirective),
      multi: true,
    },
  ],
})
export class AddressWordCountDirective implements Validator {
  @Input('appAddressWordCount') maxWords = 0;

  validate(control: AbstractControl): ValidationErrors | null {
    const wordCount = ADDRESS_TEXT_FIELDS.reduce((total, field) => {
      const value: string = control.get(field)?.value ?? '';
      return total + value.trim().split(/\s+/).filter(Boolean).length;
    }, 0);
    return wordCount > this.maxWords
      ? { addressWordCount: { count: wordCount, max: this.maxWords } }
      : null;
  }
}
