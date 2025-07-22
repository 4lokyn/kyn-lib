import {
  Component,
  computed,
  HostBinding,
  input, InputSignal,
  OnInit,
  output,
  OutputEmitterRef, Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, startWith} from 'rxjs';
import {KynFormItemsType} from '../../enums/kyn-form-item-type';
import {MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption} from '@angular/material/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatSelectSearchComponent} from 'ngx-mat-select-search';
import {MatSelect, MatSelectTrigger} from '@angular/material/select';
import {MatTooltip} from '@angular/material/tooltip';
import {NgTemplateOutlet} from '@angular/common';
import {SelectedOptionCounter} from '../../pipes/selected-option-counter';

@Component({
  selector: 'kyn-form-item',
  imports: [
    MatIconButton,
    MatSuffix,
    MatError,
    MatIcon,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    MatCheckbox,
    MatSelectSearchComponent,
    MatSelectTrigger,
    SelectedOptionCounter,
    MatSelect,
    MatTooltip,
    MatFormField,
    NgTemplateOutlet,
    MatLabel,
  ],
  templateUrl: './kyn-form-item.html',
  styleUrl: './kyn-form-item.scss'
})
export class KynFormItem implements OnInit {
  private valueBeforeOpening: any;
  private formControl: Signal<FormControl<any>> = computed((): FormControl<any> => this.form().get(this.formItem().key) as FormControl);
  protected selectSearchCtrl: FormControl = new FormControl();
  private selectSearchTerm: Signal<any> = toSignal(this.selectSearchCtrl.valueChanges.pipe(startWith('')), {initialValue: ''});
  protected hide: WritableSignal<boolean> = signal(true);
  formItem: InputSignal<any> = input.required<any>();
  form: InputSignal<any> = input.required<any>();
  triggerOnInit: InputSignal<boolean> = input(false)
  isEventEmitterBased: InputSignal<boolean> = input(false);
  selectEmitter: OutputEmitterRef<boolean | void> = output();
  textEmitter: OutputEmitterRef<boolean | void> = output();
  customTemplate: InputSignal<any> = input<any>();

  @HostBinding('class') get hostClass(): string {
    return this.formItem().className;
  }

  ngOnInit(): void {
    const item = this.formItem();
    const control = this.formControl();


    if(this.isEventEmitterBased() && (this.formItem().controlType === KynFormItemsType.Text || this.formItem().controlType === KynFormItemsType.Password)) {
      this.form().get(this.formItem().key).valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
        this.textEmitter.emit()
      })
    }

    if (item.selectAllByDefault && item.multi && control && item.options && control.value?.length === 0) {
      const allOptionKeys = item.options.map((opt: any) => opt.key);
      control.setValue(allOptionKeys);
    }

    if(this.triggerOnInit()) {
      if(this.formItem().controlType === KynFormItemsType.Text || this.formItem().controlType === KynFormItemsType.Password) {
        this.textEmitter.emit(true);
      }
      if(this.formItem().controlType === KynFormItemsType.Select) {
        if(!this.formItem().multi && this.formItem().all && this.formItem().selectAllByDefault) {
          control.setValue(this.formItem().allText)
        }
        this.selectEmitter.emit(true);
      }
    }
  }

  filteredOptions = computed(() => {
    const options = this.formItem().options;
    if (!options) return [];
    const searchTerm = this.selectSearchTerm()?.toLowerCase();
    if (!searchTerm) return options;
    return options.filter((option: any) =>
      option.value.toLowerCase().includes(searchTerm)
    );
  });

  isAllComplete(): boolean {
    const filtered = this.filteredOptions();
    if (filtered.length === 0) return false;
    const selected = new Set(this.formControl()?.value);
    return filtered.every((opt: any) => selected.has(opt.key));
  }

  isIndeterminate(): boolean {
    if (this.isAllComplete()) return false;
    const filtered = this.filteredOptions();
    if (filtered.length === 0) return false;
    const selected = new Set(this.formControl()?.value);
    return filtered.some((opt: any) => selected.has(opt.key));
  }

  toggleAllSelection(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const control = this.formControl();
    const filtered = this.filteredOptions();
    if (filtered.length === 0) return;

    const areAllSelected = this.isAllComplete();
    const currentSelection = new Set(control.value || []);
    const filteredKeys = filtered.map((opt: any) => opt.key);

    if (areAllSelected) {
      filteredKeys.forEach((key: any) => currentSelection.delete(key));
    } else {
      filteredKeys.forEach((key: any) => currentSelection.add(key));
    }
    if(currentSelection.has(null)) {
      currentSelection.delete(null);
    }
    control.setValue(Array.from(currentSelection));
  }

  getErrorMessage(formControl: any, validators: any): string {
    let message = '';
    if (validators) {
      validators.forEach((x: any) => {
        if(formControl.hasError(x.key)) {
          message = x.message
        }
      })
    }
    return message;
  }

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSelectionChange(opened: boolean): void {
    const control = this.formControl();

    if (opened) {
      this.valueBeforeOpening = JSON.stringify(control.value);
      return;
    }

    const valueAfterClosing = JSON.stringify(control.value);

    if (this.valueBeforeOpening !== valueAfterClosing) {
      if (this.isEventEmitterBased()) {
        this.selectEmitter.emit();
      }
    }
  }

  toggleAllNotMultiSelection() {
    this.selectEmitter.emit();
  }

  protected readonly FormItemsType = KynFormItemsType;
}
