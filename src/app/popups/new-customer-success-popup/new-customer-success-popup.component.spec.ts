import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerSuccessPopupComponent } from './new-customer-success-popup.component';

describe('NewCustomerSuccessPopupComponent', () => {
  let component: NewCustomerSuccessPopupComponent;
  let fixture: ComponentFixture<NewCustomerSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomerSuccessPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
