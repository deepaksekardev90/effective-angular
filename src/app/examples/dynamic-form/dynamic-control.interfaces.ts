import { ValidatorFn } from '@angular/forms';

export type DynamicErrorMessage = string | ((error: any) => string);

export interface DynamicControlBase {
  controlKey: string;
  label?: string;
  errorMessages?: Record<string, DynamicErrorMessage>;
}

export interface DynamicFieldControl extends DynamicControlBase {
  kind: 'control';
  inputType?: 'text' | 'number' | 'tel' | 'password' | 'checkbox';
  defaultValue?: any;
  updateOn?: 'change' | 'blur' | 'submit';
  validators?: ValidatorFn[];
}

export interface DynamicGroupControl extends DynamicControlBase {
  kind: 'group';
  controls: DynamicFieldControl[];
  groupValidators?: ValidatorFn[];
}

export interface DynamicArrayControl extends DynamicControlBase {
  kind: 'array';
  itemTemplate: DynamicFieldControl;
  defaultItems?: any[];
}

export interface DynamicRecordControl extends DynamicControlBase {
  kind: 'record';
  itemTemplate: DynamicFieldControl;
  defaultEntries?: Record<string, any>;
}

export type DynamicControl =
  | DynamicFieldControl
  | DynamicGroupControl
  | DynamicArrayControl
  | DynamicRecordControl;
