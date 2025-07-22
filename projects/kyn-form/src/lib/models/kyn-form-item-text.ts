import {KynFormItemBase} from './kyn-form-item-base';

export class KynFormItemText extends KynFormItemBase<string> {
  constructor(options: any = {}) {
    super(options);
    this.controlType = 'text';
  }
}
