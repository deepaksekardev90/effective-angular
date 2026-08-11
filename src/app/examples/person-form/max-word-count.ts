import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaxWordCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxWordCountDirective),
      multi: true,
    },
  ],
})
export class MaxWordCountDirective implements Validator {
  @Input('appMaxWordCount') maxWords = 0;

  validate(control: AbstractControl): ValidationErrors | null {
    const wordCount = control?.value?.trim().split(/\s+/).filter(Boolean).length ?? 0;
    return wordCount > this.maxWords ? { maxWordCount: { count: wordCount, max: this.maxWords } } : null;
  }
}
