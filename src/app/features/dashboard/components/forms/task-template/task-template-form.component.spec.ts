import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplateFormComponent } from './task-template-form.component';

describe('TaskTemplateFormComponent', () => {
  let component: TaskTemplateFormComponent;
  let fixture: ComponentFixture<TaskTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTemplateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTemplateFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
