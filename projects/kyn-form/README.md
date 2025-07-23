# Dynamic Form Generation with kyn-form

This guide explains how to dynamically generate forms in your Angular application using the `<kyn-form>` component. The core principle is to define the form structure, validation, and data within an injectable service. This approach keeps your components lean and focused on business logic, promoting reusability and separation of concerns.

---

## Step 1: Create a Form Configuration Service

The foundation of a dynamic form is an Angular service that implements the `KynFormConfig` interface. This service must contain a `configureForm()` method, which is responsible for providing the form's entire configuration as an `Observable` stream of form items (`Observable<KynFormItemBase<string>[]>`).

This architecture seamlessly supports both static form definitions and dynamic configurations populated with data from an API.

## `KynFormItemBase<T>` Configuration Properties

Each object passed into the `formItems` array is an instance of a class that extends `KynFormItemBase<T>`. This base class defines the common properties for all form controls.

| Property | Type | Description |
| :--- | :--- | :--- |
| **`key`** | `string` | **Required.** The unique identifier for the form control. This is used as the `formControlName`. |
| **`label`** | `string` | **Required.** The text label displayed above or next to the form control. |
| `value` | `T` | The initial value of the form control. |
| `order` | `number` | A number that determines the display order of the control within the form. Lower numbers appear first. Defaults to `1`. |
| `controlType` | `string` | The type of control (e.g., 'textbox', 'select'). This is typically set automatically by the specific class you instantiate. |
| `type` | `string` | The native HTML `type` attribute for an input element (e.g., 'text', 'password', 'email', 'number'). |
| `placeholder` | `string` | The placeholder text to display inside the input field when it is empty. |
| `validators` | `any[]` | An array of Angular validator objects (e.g., `{ key: 'minlength', validatorFunc: Validators.minLength(8), message: 'Too short!' }`). |
| `tooltip` | `string` | Optional text to display in a tooltip icon next to the form control's label for extra guidance. |
| `className` | `string` | An optional CSS class to apply to the wrapper element of the form control for custom styling. |
| `templateName` | `string` | The name of a custom template to use for rendering this specific control, allowing for advanced customizations. |
| `formStyle` | `MatFormFieldAppearance` | Sets the appearance of the Material Form Field. Can be `'outline'`, `'fill'`, `'standard'`, or `'legacy'`. Defaults to `'outline'`. |

---

## `KynFormItemSelect` Configuration Properties

In addition to the common properties from `KynFormItemBase<T>`, the `KynFormItemSelect` class accepts the following options to customize its behavior.

| Property | Type | Description |
| :--- | :--- | :--- |
| **`options`** | `{ key: string; value: string }[]` | **Required.** An array of objects to populate the select dropdown. Each object must have a `key` (the value) and a `value` (the display text). |
| `multi` | `boolean` | If `true`, allows the user to select multiple options. Defaults to `false`. |
| `all` | `boolean` | If `multi` is `true`, this adds a "Select All" checkbox at the top of the options list. Defaults to `false`. |
| `allText` | `string` | In multi-select mode, this is the text displayed in the input field when all options are selected. Defaults to `'All'`. |
| `allTriggerText` | `string` | The label for the "Select All" checkbox in the options panel. Defaults to `'Select All'`. |
| `selectAllByDefault` | `boolean` | If `multi` is `true`, this will pre-select all available options when the form initializes. Defaults to `true`. |
| `searchDisplayLength`| `number` | If the number of items in `options` exceeds this value, a search bar will be displayed within the select panel to filter options. |

### Example 1: Static Form Configuration

For forms with fixed fields, such as login or contact forms, you can define the configuration directly within the service. The service creates an array of form control configurations (e.g., `KynFormItemText`, `KynFormItemPassword`, `KynFormItemSelect`) and returns it as an observable using RxJS `of()`.

```typescript
@Injectable()
export class ExampleOneFormService implements KynFormConfig {

  constructor() {}

  configureForm(): Observable<KynFormItemBase<string>[]> {
    const formItems: KynFormItemBase<string>[] = [
      // --- Text Input for Email ---
      new KynFormItemText({
        key: 'email',
        label: 'Email',
        placeholder: 'example@mail.com',
        validators: [
          { key: 'email', validatorFunc: Validators.email, message: 'Please enter a valid email address!' },
          { key: 'required', validatorFunc: Validators.required, message: 'This field is required!' }
        ],
        order: 1,
      }),

      // --- Password Input ---
      new KynFormItemPassword({
        key: 'password',
        label: 'Password',
        validators: [
          { key: 'required', validatorFunc: Validators.required, message: 'This field is required!' }
        ],
        order: 2,
      }),

      // --- Select Input with static options ---
      new KynFormItemSelect({
        key: 'role',
        label: 'Role',
        options: [
          { key: 'support', value: 'Support' },
          { key: 'manager', value: 'Manager' },
          { key: 'owner', value: 'Owner' },
        ],
        order: 3,
      }),
    ];

    // Return the items sorted by the 'order' property
    return of(formItems.sort((a, b) => a.order - b.order));
  }
}
```
### Example 2: Dynamic Form Configuration from a Server

For more complex scenarios, you can fetch data from an API to dynamically populate form controls.

This example injects a data service (MockProductService) and uses RxJS operators like pipe and map to transform the fetched data into options for a KynFormItemSelect before constructing the final form configuration.

```typescript
@Injectable()
export class ExampleTwoFormService implements KynFormConfig {
  private mockProductsService = inject(MockProductService);

  constructor() {}

  configureForm(): Observable<KynFormItemBase<string>[]> {
    return this.mockProductsService.getProducts().pipe(
      map((products: Product[]) => {
        // Transform the API response into options for the select input
        const productOptions: KynFormItemOptions[] = products.map(product => ({
          key: product.id,
          value: product.name
        }));

        const formItems: KynFormItemBase<string>[] = [
          new KynFormItemText({
            key: 'email',
            label: 'Email',
            placeholder: 'example@mail.com',
            validators: [
              { key: 'email', validatorFunc: Validators.email, message: 'Please enter a valid email address!' },
              { key: 'required', validatorFunc: Validators.required, message: 'This field is required!' }
            ],
            order: 1,
          }),

          // --- Select Input populated with server data ---
          new KynFormItemSelect({
            key: 'products',
            label: 'Products',
            placeholder: 'Search product...',
            multi: true,
            all: true,
            selectAllByDefault: true,
            options: productOptions, // Assign the dynamic options
            order: 2,
          })
        ];

        return formItems.sort((a, b) => a.order - b.order);
      })
    );
  }
}
```

## Step 2: Implement the Form in a Component
After creating the service, you can integrate the form into any component with a few simple steps:

Provide the Service: Add your form configuration service to the providers array of your component.

Inject the Service: Inject the service instance and call the configureForm() method to get the configuration Observable.

Bind to Template: Pass the configuration Observable to the [formItems] input of the <kyn-form> component in your template, using the async pipe to manage the subscription.
```typescript
@Component({
  selector: 'app-some-component',
  standalone: true,
  imports: [CommonModule, KynForm],
  providers: [ExampleOneFormService], // 1. Provide the service
  templateUrl: './some.component.html',
})
export class SomeComponent {
  // 2. Inject the service and get the form configuration
  protected form$ = inject(ExampleOneFormService).configureForm();

  // Define buttons for form actions
  buttons: KynFormButton[] = [
    { label: 'Confirm', color: 'primary', action: 'submit' }
  ];

  // Method to handle the form submission event
  onSubmit(formValue: any) {
    console.log('Form Submitted:', formValue);
    // Add your submission logic here (e.g., API call)
  }
}

```

```html
<h1>Dynamic Form Example</h1>

<div class="kyn-container">
  <kyn-form
    className="generic-form"
    [triggerOnInit]="true"
    [buttons]="buttons"
    [formItems]="form$ | async"
    (onFormSubmit)="onSubmit($event)"
  />
</div>
```

## <kyn-form> Component API

This section provides an overview of all public `@Input` (Properties) and `@Output` (Events) for the `<kyn-form>` component.

### Properties (`@Input`)

| Property        | Type                                  | Description                                                                                                       |
| :-------------- | :------------------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| **`formItems`** | `KynFormItemBase<string>[] \| null`    | **Required.** An array of configuration objects that defines the form's structure and fields.                     |
| `buttons`       | `KynFormButton[]`                     | An array of button configuration objects. A button with `action: 'submit'` enables form submission mode.          |
| `className`     | `string`                              | An optional CSS class added to the form's container `<div>` for custom styling.                                   |
| `triggerOnInit` | `boolean`                             | If `true`, it will automaticaly emit values. Defaults to `false`.         |



### Events (`@Output`)

| Event                  | Payload | Description                                                                                                     |
| :--------------------- | :------ | :-------------------------------------------------------------------------------------------------------------- |
| `onFormSubmit`         | `any`   | Emits the complete form value when the user clicks a button with `action: 'submit'`.                              |
| `onFormValueChanges`   | `any`   | Emits the complete form value whenever any field's value changes. This is the default mode if no submit button is provided. |****

---

## ❗ Important Installation Step: Styling

For the components, especially the custom select dropdown, to be styled correctly, you **must** import the necessary SCSS file into your project's main stylesheet.

Add the following line to your global `styles.scss` file:

```scss
// In your main styles.scss file

@use "@alokyn/kyn-form/src/styles/components/select";
