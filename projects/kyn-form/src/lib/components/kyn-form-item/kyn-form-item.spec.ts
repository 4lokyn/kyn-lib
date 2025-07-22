import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KynFormItem } from './kyn-form-item';

describe('KynFormItem', () => {
  let component: KynFormItem;
  let fixture: ComponentFixture<KynFormItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KynFormItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KynFormItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
