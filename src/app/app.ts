import {Component, inject, signal} from '@angular/core';
import {KynForm} from '../../projects/kyn-form/src/lib/kyn-form';
import {AsyncPipe} from '@angular/common';
import {NamedTemplate} from '../../projects/kyn-form/src/lib/directives/named-template';
import {ExampleFormOneService} from './services/example-form-one';
import {ExampleFormTwoService} from './services/example-form-two';

@Component({
  selector: 'app-root',
  imports: [KynForm, AsyncPipe, NamedTemplate],
  providers: [ExampleFormOneService, ExampleFormTwoService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'kyn-lib';
  formOne$ = inject(ExampleFormOneService).configureForm();
  formTwo$ = inject(ExampleFormTwoService).configureForm();


  tmp(event: any) {

  }
}
