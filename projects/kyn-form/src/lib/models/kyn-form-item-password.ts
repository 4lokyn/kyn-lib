import {KynFormItemBase} from './kyn-form-item-base';

export class KynFormItemPassword extends KynFormItemBase<string> {
  constructor(options: any = {}) {
    super(options);
    this.controlType = 'password';
  }
}
