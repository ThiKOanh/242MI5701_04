import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryLevel1Component } from './edit-category-level-1.component';

describe('EditCategoryLevel1Component', () => {
  let component: EditCategoryLevel1Component;
  let fixture: ComponentFixture<EditCategoryLevel1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoryLevel1Component]
    });
    fixture = TestBed.createComponent(EditCategoryLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
