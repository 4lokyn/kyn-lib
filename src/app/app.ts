import {Component, inject, signal} from '@angular/core';
import {KynForm} from '../../projects/kyn-form/src/lib/kyn-form';
import {ExampleFormService} from './services/auth-form';
import {AsyncPipe} from '@angular/common';
import {NamedTemplate} from '../../projects/kyn-form/src/lib/directives/named-template';

@Component({
  selector: 'app-root',
  imports: [KynForm, AsyncPipe, NamedTemplate],
  providers: [ExampleFormService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'kyn-lib';
  form$ = inject(ExampleFormService).configureForm();


  tmp(event: any) {

  }
}
