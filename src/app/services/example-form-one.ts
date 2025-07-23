import { Validators } from '@angular/forms';
import { KynFormItemBase } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-base';
import { Observable, of } from 'rxjs';
import { KynFormItemText } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-text';
import { KynFormItemPassword } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-password';
import { Injectable } from '@angular/core';
import { KynFormItemSelect } from '../../../projects/kyn-form/src/lib/models/kyn-form-item-select';
import {KynFormConfig} from '../../../projects/kyn-form/src/lib/models/kyn-form-config';

@Injectable()
export class ExampleFormOneService implements KynFormConfig {

  constructor() {}
  configureForm(): Observable<KynFormItemBase<string>[]> {

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
        label: 'Unesite lozinku',
        validators: [
          {
            key: 'required',
            validatorFunc: Validators.required,
            message: 'This field is required!'
          },
        ],
        order: 2,
      }),

      // --- Select Input for Users ---
      new KynFormItemSelect({
        key: 'usersOne',
        label: 'Users',
        options: [
          { key: 1, value: 'John Smith' },
          { key: 2, value: 'Sara Jackson' },
          { key: 3, value: 'Michael Johnson' },
          { key: 4, value: 'Emily Williams' },
          { key: 5, value: 'David Brown' },
          { key: 6, value: 'Olivia Jones' },
          { key: 7, value: 'James Garcia' },
          { key: 8, value: 'Sophia Miller' },
          { key: 9, value: 'Robert Davis' },
          { key: 10, value: 'Isabella Rodriguez' },
          { key: 11, value: 'William Martinez' },
          { key: 12, value: 'Mia Hernandez' },
          { key: 13, value: 'Daniel Lopez' },
          { key: 14, value: 'Charlotte Gonzalez' },
          { key: 15, value: 'Chris Wilson' },
          { key: 16, value: 'Amelia Anderson' },
          { key: 17, value: 'Matthew Thomas' },
          { key: 18, value: 'Ava Moore' }
        ],
        order: 3,
      }),

      new KynFormItemSelect({
        key: 'usersTwo',
        label: 'Users',
        all: true,
        allTriggerText: 'All',
        searchDisplayLength: 5,
        options: [
          { key: 1, value: 'John Smith' },
          { key: 2, value: 'Sara Jackson' },
          { key: 3, value: 'Michael Johnson' },
          { key: 4, value: 'Emily Williams' },
          { key: 5, value: 'David Brown' },
          { key: 6, value: 'Olivia Jones' },
          { key: 7, value: 'James Garcia' },
          { key: 8, value: 'Sophia Miller' },
          { key: 9, value: 'Robert Davis' },
          { key: 10, value: 'Isabella Rodriguez' },
          { key: 11, value: 'William Martinez' },
          { key: 12, value: 'Mia Hernandez' },
          { key: 13, value: 'Daniel Lopez' },
          { key: 14, value: 'Charlotte Gonzalez' },
          { key: 15, value: 'Chris Wilson' },
          { key: 16, value: 'Amelia Anderson' },
          { key: 17, value: 'Matthew Thomas' },
          { key: 18, value: 'Ava Moore' }
        ],
        order: 4,
      }),
      new KynFormItemSelect({
        key: 'usersThree',
        label: 'Users',
        all: true,
        multi: true,
        selectAllByDefault: false,
        allTriggerText: 'All',
        options: [
          { key: 1, value: 'John Smith' },
          { key: 2, value: 'Sara Jackson' },
          { key: 3, value: 'Michael Johnson' },
          { key: 4, value: 'Emily Williams' },
          { key: 5, value: 'David Brown' },
          { key: 6, value: 'Olivia Jones' },
          { key: 7, value: 'James Garcia' },
          { key: 8, value: 'Sophia Miller' },
          { key: 9, value: 'Robert Davis' },
          { key: 10, value: 'Isabella Rodriguez' },
          { key: 11, value: 'William Martinez' },
          { key: 12, value: 'Mia Hernandez' },
          { key: 13, value: 'Daniel Lopez' },
          { key: 14, value: 'Charlotte Gonzalez' },
          { key: 15, value: 'Chris Wilson' },
          { key: 16, value: 'Amelia Anderson' },
          { key: 17, value: 'Matthew Thomas' },
          { key: 18, value: 'Ava Moore' }
        ],
        order: 4,
      }),

    ];
    return of(formItems.sort((a, b) => a.order - b.order));
  }
}
