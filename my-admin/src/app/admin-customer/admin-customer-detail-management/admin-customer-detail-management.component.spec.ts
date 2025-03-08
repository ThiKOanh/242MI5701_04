import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerDetailManagementComponent } from './admin-customer-detail-management.component';

describe('AdminCustomerDetailManagementComponent', () => {
  let component: AdminCustomerDetailManagementComponent;
  let fixture: ComponentFixture<AdminCustomerDetailManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCustomerDetailManagementComponent]
    });
    fixture = TestBed.createComponent(AdminCustomerDetailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
