import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSprint } from './form-sprint';

describe('FormSprint', () => {
  let component: FormSprint;
  let fixture: ComponentFixture<FormSprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSprint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSprint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
