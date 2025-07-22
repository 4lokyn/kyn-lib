import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KynForm } from './kyn-form';

describe('KynForm', () => {
  let component: KynForm;
  let fixture: ComponentFixture<KynForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KynForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KynForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
