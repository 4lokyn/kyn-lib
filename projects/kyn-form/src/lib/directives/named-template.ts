import {Directive, inject, input, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[named]',
})
export class NamedTemplate {
  name = input.required<string>({ alias: 'named' });
  public templateRef = inject(TemplateRef);
}
