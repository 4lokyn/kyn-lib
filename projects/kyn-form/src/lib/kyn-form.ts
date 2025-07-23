import {
  Component,
  computed,
  contentChildren,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef, Signal,
  TemplateRef
} from '@angular/core';
import {KynFormControlGenerator} from './services/kyn-form-control-generator';
import {NamedTemplate} from './directives/named-template';
import {KynFormItemBase} from './models/kyn-form-item-base';
import {KynFormButton} from './models/kyn-form-button';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {KynFormItem} from './components/kyn-form-item/kyn-form-item';

@Component({
  selector: 'kyn-form',
  imports: [
    ReactiveFormsModule,
    MatButton,
    KynFormItem
  ],
  providers: [KynFormControlGenerator],
  templateUrl: 'kyn-form.html',
  styles: ``
})
export class KynForm implements OnInit {
  private readonly formControlGenerator: KynFormControlGenerator = inject(KynFormControlGenerator);
  private emitCounter: number = 0;
  private namedTemplates: Signal<readonly NamedTemplate[]> = contentChildren(NamedTemplate);
  public formItems: InputSignal<KynFormItemBase<string>[] | null> = input<KynFormItemBase<string>[] | null>([]);
  public className: InputSignal<string> = input('');
  public buttons: InputSignal<KynFormButton[]> = input<KynFormButton[]>([]);
  public triggerOnInit: InputSignal<boolean> = input(false);
  public patchForm: InputSignal<any> = input<any>();
  public onFormValueChanges: OutputEmitterRef<any> = output();
  public onFormSubmit: OutputEmitterRef<any> = output<any>();
  public onButtonAction: OutputEmitterRef<string>  = output<string>();
  protected isEventEmitterBased: Signal<boolean> = computed(() => this.buttons().length === 0);

  ngOnInit(): void {
    if (this.patchForm()){
      this.form().patchValue(this.patchForm());
    }
  }

  protected readonly templateMap = computed(() => {
    const map = new Map<string, TemplateRef<any>>();
    this.namedTemplates().forEach(dir => {
      map.set(dir.name(), dir.templateRef);
    });
    return map;
  });

  protected form = computed<FormGroup>(() =>
    this.formControlGenerator.toFormGroup(this.formItems() as KynFormItemBase<string>[]),
  );

  protected onSubmit() {
    if (this.form().valid) {
      this.onFormSubmit.emit(this.form().value);
    }
  }

  protected onAction(button: KynFormButton) {
    if (button.action === 'submit') {
      return;
    }
    if (button.action === 'reset') {
      this.form().reset();
    }
    this.onButtonAction.emit(button.action);
  }

  protected handleFormValueChange(onInitTrigger: boolean | void = false) {
    const formItemsLength = Object.keys(this.form().controls).length;
    this.emitCounter ++
    if (formItemsLength === this.emitCounter && onInitTrigger) {
      this.onFormValueChanges.emit(this.form().getRawValue());
      this.emitCounter = 0
    }
    if(!onInitTrigger) {
      this.onFormValueChanges.emit(this.form().getRawValue());
    }

  }
}
