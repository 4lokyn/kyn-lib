import {Observable} from 'rxjs';
import {KynFormItemBase} from './kyn-form-item-base';


export interface KynFormConfig {
  configureForm(): Observable<KynFormItemBase<string>[]>;
}
