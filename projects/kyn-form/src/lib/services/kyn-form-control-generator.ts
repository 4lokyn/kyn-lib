import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {KynFormItemBase} from '../models/kyn-form-item-base';

@Injectable()
export class KynFormControlGenerator {
  toFormGroup(formItem: KynFormItemBase<string>[]) {
    const group: any = {};
    formItem?.forEach((item) => {
      if(item.validators.length !== 0) {
        group[item.key] = new FormControl(item.value || '' , [...item.validators.map((v: any)=> v.validatorFunc)])
      } else {
        group[item.key] = new FormControl(item.value || '')
      }
    });
    return new FormGroup(group);
  }
}
