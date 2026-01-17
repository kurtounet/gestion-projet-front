import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInstanceFormComponent } from './task-instance-form.component';

describe('TaskInstanceFormComponent', () => {
  let component: TaskInstanceFormComponent;
  let fixture: ComponentFixture<TaskInstanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInstanceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInstanceFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
