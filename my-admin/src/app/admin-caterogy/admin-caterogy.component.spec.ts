import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCaterogyComponent } from './admin-caterogy.component';

describe('AdminCaterogyComponent', () => {
  let component: AdminCaterogyComponent;
  let fixture: ComponentFixture<AdminCaterogyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCaterogyComponent]
    });
    fixture = TestBed.createComponent(AdminCaterogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
