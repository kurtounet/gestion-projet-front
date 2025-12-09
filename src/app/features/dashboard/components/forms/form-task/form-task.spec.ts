import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTask } from './form-task';

describe('FormTask', () => {
  let component: FormTask;
  let fixture: ComponentFixture<FormTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTask],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
