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

// ... KynFrom interface ostaje isti ...
interface KynForm {
  configureForm(): Observable<KynFormItemBase<string>[]>;
}

@Injectable()
export class ExampleFormService implements KynForm {
  mockProductsService: MockProduct = inject(MockProduct);

  constructor() {}
  /**
   * Constructs and returns an Observable stream of form item configurations.
   * This method fetches product data asynchronously and then maps that data
   * to create a full form configuration.
   */
  configureForm(): Observable<KynFormItemBase<string>[]> {
    // Vraćamo stream koji počinje sa dobavljanjem proizvoda
    return this.mockProductsService.getProducts().pipe(
      // 'map' operator čeka da podaci stignu, i tek onda izvršava kod unutar sebe
      map((products: Product[]) => {
        // KORAK 1: Transformiši proizvode u format koji tvoja 'select' komponenta očekuje
        const productOptions: KynFormItemOptions[] = products.map(product => ({
          key: product.id,
          value: product.name
        }));

        // KORAK 2: Kreiraj celu konfiguraciju forme SADA kada imaš sve podatke
        const formItems: KynFormItemBase<string>[] = [
          // --- Text Input for Email ---
          new KynFormItemText({
            key: 'email',
            label: 'Email',
            placeholder: 'pat@email.com',
            order: 1,
            // ...ostala podešavanja
          }),

          // --- Password Input ---
          new KynFormItemPassword({
            key: 'password',
            label: 'Unesite lozinku',
            order: 2,
            // ...ostala podešavanja
          }),

          // --- Select Input for Users ---
          new KynFormItemSelect({
            key: 'users',
            label: 'Users',
            multi: true,
            all: true,
            options: [
              { key: 1, value: 'John Smith' },
              { key: 2, value: 'Sara Jackson' }
            ],
            order: 3,
          }),

          // --- Select Input for Products ---
          // Sada se kreira sa podacima koji su upravo stigli
          new KynFormItemSelect({
            key: 'products',
            label: 'Products',
            placeholder: 'Search product...',
            multi: true,
            all: true,
            options: productOptions, // Koristimo sveže pripremljene podatke
            order: 4,
          })
        ];

        // KORAK 3: Vrati finalnu, sortiranu listu
        return formItems.sort((a, b) => a.order - b.order);
      })
    );
  }
}
