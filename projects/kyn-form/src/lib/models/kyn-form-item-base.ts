import {MatFormFieldAppearance} from '@angular/material/form-field';

export class KynFormItemBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  validators: any[];
  order: number;
  controlType: string;
  type: string;
  placeholder: string;
  tooltip?: string;
  className?: string;
  templateName: string;
  formStyle?: MatFormFieldAppearance;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      validators?: any[];
      order?: number;
      controlType?: string;
      type?: string;
      placeholder?: string;
      tooltip?: string;
      className?: string;
      templateName?: string;
      formStyle?: MatFormFieldAppearance;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.validators = options.validators ?? [];
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.placeholder = options.placeholder || '';
    this.tooltip = options.tooltip ?? '';
    this.className = options.className || '';
    this.templateName = options.templateName ?? '';
    this.formStyle = options.formStyle ?? 'outline';
  }
}
