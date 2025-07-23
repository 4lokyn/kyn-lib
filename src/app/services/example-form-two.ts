import { Validators } from '@angular/forms';
import { KynFormItemBase } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-base';
import { map, Observable, of } from 'rxjs';
import { KynFormItemText } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-text';
import { KynFormItemPassword } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-password';
import { inject, Injectable } from '@angular/core';
import { KynFormItemSelect } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-select';
import { Product } from '../models/product';
import {MockProduct} from './mock';
import {KynFormItemOptions} from '../../../projects/kyn-form/src/lib/models/kyn-form-item-options';
import {KynFormConfig} from '../../../projects/kyn-form/src/lib/models/kyn-form-config';

@Injectable()
export class ExampleFormTwoService implements KynFormConfig {
  mockProductsService: MockProduct = inject(MockProduct);

  constructor() {}
  /**
   * Constructs and returns an Observable stream of form item configurations.
   * This method fetches product data asynchronously and then maps that data
   * to create a full form configuration.
   */
  configureForm(): Observable<KynFormItemBase<string>[]> {
    return this.mockProductsService.getProducts().pipe(
      map((products: Product[]) => {
        const productOptions: KynFormItemOptions[] = products.map(product => ({
          key: product.id,
          value: product.name
        }));

        const formItems: KynFormItemBase<string>[] = [
          // --- Text Input for Email ---
          new KynFormItemText({
            key: 'email',
            label: 'Email',
            placeholder: 'pat@email.com',
            validators: [
              {
                key: 'email',
                validatorFunc: Validators.email,
                message: 'Please enter a valid email address!'
              },
              {
                key: 'required',
                validatorFunc: Validators.required,
                message: 'This field is required!'
              }
            ],
            order: 1,
          }),

          // --- Password Input ---
          new KynFormItemPassword({
            key: 'password',
            label: 'Password',
            validators: [
              {
                key: 'required',
                validatorFunc: Validators.required,
                message: 'This field is required!'
              }
            ],
            order: 2,
          }),

          // --- Select Input for Products ---
          new KynFormItemSelect({
            key: 'products',
            label: 'Products',
            placeholder: 'Search product...',
            multi: true,
            all: true,
            options: productOptions,
            order: 4,
          })
        ];
        return formItems.sort((a, b) => a.order - b.order);
      })
    );
  }
}
