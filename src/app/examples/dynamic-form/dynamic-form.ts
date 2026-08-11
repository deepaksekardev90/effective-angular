import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  addressWordCountValidator,
  maxWordCountValidator,
  passwordMatchValidator,
} from '../reactive-form/validators';
import {
  DynamicArrayControl,
  DynamicControl,
  DynamicControlBase,
  DynamicFieldControl,
  DynamicGroupControl,
  DynamicRecordControl,
} from './dynamic-control.interfaces';

export const dynamicFormFieldConfig: DynamicControl[] = [
  {
    kind: 'control',
    controlKey: 'name',
    label: 'Name',
    inputType: 'text',
    defaultValue: '',
    validators: [Validators.required, Validators.minLength(2)],
    errorMessages: { minlength: 'Name must be at least 2 characters.' },
  },
  {
    kind: 'control',
    controlKey: 'age',
    label: 'Age',
    inputType: 'number',
    defaultValue: null,
    validators: [Validators.required, Validators.min(0), Validators.max(120)],
    errorMessages: {
      min: 'Age must be between 0 and 120.',
      max: 'Age must be between 0 and 120.',
    },
  },
  {
    kind: 'group',
    controlKey: 'address',
    label: 'Address',
    groupValidators: [addressWordCountValidator(5)],
    errorMessages: {
      addressWordCount: (err) =>
        `Address must be at most ${err.max} words total (currently ${err.count}).`,
    },
    controls: [
      {
        kind: 'control',
        controlKey: 'no',
        label: 'No.',
        inputType: 'text',
        defaultValue: '',
        validators: [Validators.required],
      },
      {
        kind: 'control',
        controlKey: 'street',
        label: 'Street',
        inputType: 'text',
        defaultValue: '',
        validators: [Validators.required, maxWordCountValidator(6)],
        errorMessages: {
          maxWordCount: (err) => `Street must be at most ${err.max} words (currently ${err.count}).`,
        },
      },
      {
        kind: 'control',
        controlKey: 'area',
        label: 'Area',
        inputType: 'text',
        defaultValue: '',
        validators: [Validators.required],
      },
      {
        kind: 'control',
        controlKey: 'city',
        label: 'City',
        inputType: 'text',
        defaultValue: '',
        validators: [Validators.required],
      },
      {
        kind: 'control',
        controlKey: 'pincode',
        label: 'Pincode',
        inputType: 'text',
        defaultValue: '',
        validators: [Validators.required, Validators.pattern(/^[0-9]{6}$/)],
        errorMessages: { pattern: 'Enter a valid 6-digit pincode.' },
      },
    ],
  },
  {
    kind: 'control',
    controlKey: 'phone',
    label: 'Phone No.',
    inputType: 'tel',
    defaultValue: '',
    validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
    errorMessages: { pattern: 'Enter a valid 10-digit phone number.' },
  },
  {
    kind: 'group',
    controlKey: 'passwordGroup',
    label: 'Password',
    groupValidators: [passwordMatchValidator],
    errorMessages: { passwordMismatch: 'Passwords must match.' },
    controls: [
      {
        kind: 'control',
        controlKey: 'password',
        label: 'Password',
        inputType: 'password',
        defaultValue: '',
        validators: [Validators.required],
      },
      {
        kind: 'control',
        controlKey: 'confirmPassword',
        label: 'Confirm Password',
        inputType: 'password',
        defaultValue: '',
        validators: [Validators.required],
      },
    ],
  },
  {
    kind: 'array',
    controlKey: 'tags',
    label: 'Tags',
    itemTemplate: { kind: 'control', controlKey: 'tag', inputType: 'text', defaultValue: '' },
    defaultItems: [''],
  },
  {
    kind: 'record',
    controlKey: 'statuses',
    label: 'Statuses',
    itemTemplate: {
      kind: 'control',
      controlKey: 'status',
      inputType: 'checkbox',
      defaultValue: false,
    },
    defaultEntries: { active: false, archived: false },
  },
];

const DEFAULT_ERROR_MESSAGES: Record<string, (error: any, label: string) => string> = {
  required: (_err, label) => `${label} is required.`,
  minlength: (err, label) => `${label} must be at least ${err.requiredLength} characters.`,
  min: (err, label) => `${label} must be at least ${err.min}.`,
  max: (err, label) => `${label} must be at most ${err.max}.`,
  pattern: (_err, label) => `${label} is not in the correct format.`,
  maxWordCount: (err, label) => `${label} must be at most ${err.max} words (currently ${err.count}).`,
  addressWordCount: (err, label) =>
    `${label} must be at most ${err.max} words total (currently ${err.count}).`,
  passwordMismatch: (_err, label) => `${label} must match.`,
};

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicFormComponent implements OnChanges {
  @Input() formModelConfig: DynamicControl[] = dynamicFormFieldConfig;
  @Output() outputForm = new EventEmitter<any>();

  formModel = new UntypedFormGroup({});
  submitted = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formModelConfig']) {
      this.formModel = this.buildGroup(this.formModelConfig);
      this.submitted = false;
    }
  }

  private buildGroup(config: DynamicControl[], validators: any[] = []): UntypedFormGroup {
    const group = new UntypedFormGroup({}, { validators });
    config.forEach((control) => group.addControl(control.controlKey, this.buildAbstractControl(control)));
    return group;
  }

  private buildAbstractControl(control: DynamicControl): AbstractControl {
    switch (control.kind) {
      case 'control':
        return this.buildItemControl(control, control.defaultValue);
      case 'group': {
        const group = new UntypedFormGroup({}, { validators: control.groupValidators ?? [] });
        control.controls.forEach((child) =>
          group.addControl(child.controlKey, this.buildItemControl(child, child.defaultValue)),
        );
        return group;
      }
      case 'array': {
        const items = control.defaultItems?.length
          ? control.defaultItems
          : [control.itemTemplate.defaultValue];
        return new UntypedFormArray(
          items.map((value) => this.buildItemControl(control.itemTemplate, value)),
        );
      }
      case 'record': {
        const group = new UntypedFormGroup({});
        Object.entries(control.defaultEntries ?? {}).forEach(([name, value]) =>
          group.addControl(name, this.buildItemControl(control.itemTemplate, value)),
        );
        return group;
      }
    }
  }

  private buildItemControl(template: DynamicFieldControl, value: any): UntypedFormControl {
    return new UntypedFormControl(value, {
      updateOn: template.updateOn ?? 'change',
      validators: template.validators ?? [],
    });
  }

  asGroup(key: string): UntypedFormGroup {
    return this.formModel.get(key) as UntypedFormGroup;
  }

  asArray(key: string): UntypedFormArray {
    return this.formModel.get(key) as UntypedFormArray;
  }

  arrayControls(key: string): AbstractControl[] {
    return this.asArray(key).controls;
  }

  recordKeys(key: string): string[] {
    return Object.keys(this.asGroup(key).controls);
  }

  addArrayItem(control: DynamicArrayControl): void {
    this.asArray(control.controlKey).insert(
      0,
      this.buildItemControl(control.itemTemplate, control.itemTemplate.defaultValue),
    );
  }

  removeArrayItem(control: DynamicArrayControl, index: number): void {
    this.asArray(control.controlKey).removeAt(index);
  }

  addRecordEntry(control: DynamicRecordControl, rawName: string): void {
    const name = rawName.trim();
    const group = this.asGroup(control.controlKey);
    if (!name || group.contains(name)) {
      return;
    }
    group.addControl(name, this.buildItemControl(control.itemTemplate, control.itemTemplate.defaultValue));
  }

  removeRecordEntry(control: DynamicRecordControl, name: string): void {
    this.asGroup(control.controlKey).removeControl(name);
  }

  errorsFor(ctrl: AbstractControl | null | undefined, def: DynamicControlBase): string[] {
    if (!ctrl || !ctrl.touched || !ctrl.errors) {
      return [];
    }
    const label = def.label ?? def.controlKey;
    return Object.keys(ctrl.errors).map((key) => this.resolveMessage(key, ctrl.errors![key], def, label));
  }

  private resolveMessage(key: string, errorValue: any, def: DynamicControlBase, label: string): string {
    const override = def.errorMessages?.[key];
    if (typeof override === 'function') {
      return override(errorValue);
    }
    if (typeof override === 'string') {
      return override;
    }
    const fallback = DEFAULT_ERROR_MESSAGES[key];
    return fallback ? fallback(errorValue, label) : `${label} is invalid.`;
  }

  onSubmit(): void {
    if (this.formModel.invalid) {
      this.formModel.markAllAsTouched();
      return;
    }
    this.submitted = true;
    this.outputForm.emit(structuredClone(this.formModel.getRawValue()));
  }
}
