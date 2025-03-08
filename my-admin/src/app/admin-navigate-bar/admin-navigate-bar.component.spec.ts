import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavigateBarComponent } from './admin-navigate-bar.component';

describe('AdminNavigateBarComponent', () => {
  let component: AdminNavigateBarComponent;
  let fixture: ComponentFixture<AdminNavigateBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNavigateBarComponent]
    });
    fixture = TestBed.createComponent(AdminNavigateBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
