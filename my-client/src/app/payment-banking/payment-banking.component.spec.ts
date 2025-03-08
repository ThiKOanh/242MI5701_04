import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBankingComponent } from './payment-banking.component';

describe('PaymentBankingComponent', () => {
  let component: PaymentBankingComponent;
  let fixture: ComponentFixture<PaymentBankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentBankingComponent]
    });
    fixture = TestBed.createComponent(PaymentBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
