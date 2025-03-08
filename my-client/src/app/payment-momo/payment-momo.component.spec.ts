import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMomoComponent } from './payment-momo.component';

describe('PaymentMomoComponent', () => {
  let component: PaymentMomoComponent;
  let fixture: ComponentFixture<PaymentMomoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMomoComponent]
    });
    fixture = TestBed.createComponent(PaymentMomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
