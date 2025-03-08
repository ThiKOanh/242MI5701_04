import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessengerComponent } from './admin-messenger.component';

describe('AdminMessengerComponent', () => {
  let component: AdminMessengerComponent;
  let fixture: ComponentFixture<AdminMessengerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMessengerComponent]
    });
    fixture = TestBed.createComponent(AdminMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
