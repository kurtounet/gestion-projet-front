import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplateSprintTemplateFormComponent } from './project-template-sprint-template-form.component';

describe('ProjectTemplateSprintTemplateFormComponent', () => {
  let component: ProjectTemplateSprintTemplateFormComponent;
  let fixture: ComponentFixture<ProjectTemplateSprintTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTemplateSprintTemplateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTemplateSprintTemplateFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
