import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIncompleteOrderComponent } from './admin-incomplete-order.component';

describe('AdminIncompleteOrderComponent', () => {
  let component: AdminIncompleteOrderComponent;
  let fixture: ComponentFixture<AdminIncompleteOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIncompleteOrderComponent]
    });
    fixture = TestBed.createComponent(AdminIncompleteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
