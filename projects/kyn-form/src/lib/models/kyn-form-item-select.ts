import {KynFormItemBase} from './kyn-form-item-base';

export class KynFormItemSelect extends KynFormItemBase<string> {
  options: { key: string; value: string }[] = [];
  multi: boolean;
  all: boolean;
  allText: string
  allTriggerText: string
  selectAllByDefault?: boolean;

  constructor(options: any = {}) {
    super(options);
    this.controlType = 'select';
    this.options = options.options || [];
    this.multi = !!options.multi;
    this.all = !!options.all;
    this.allText = options.allText || 'All';
    this.allTriggerText = options.allTriggerText || 'Select All';
    this.selectAllByDefault = !!options.selectAllByDefault;
  }
}
