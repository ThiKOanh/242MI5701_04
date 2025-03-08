import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaterogyLevel1Component } from './add-caterogy-level-1.component';

describe('AddCaterogyLevel1Component', () => {
  let component: AddCaterogyLevel1Component;
  let fixture: ComponentFixture<AddCaterogyLevel1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCaterogyLevel1Component]
    });
    fixture = TestBed.createComponent(AddCaterogyLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
