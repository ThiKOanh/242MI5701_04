import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSuccessfullyComponent } from './sign-up-successfully.component';

describe('SignUpSuccessfullyComponent', () => {
  let component: SignUpSuccessfullyComponent;
  let fixture: ComponentFixture<SignUpSuccessfullyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpSuccessfullyComponent]
    });
    fixture = TestBed.createComponent(SignUpSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
