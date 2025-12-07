import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplateFormComponent } from './project-template-form.component';

describe('ProjectTemplateFormComponent', () => {
  let component: ProjectTemplateFormComponent;
  let fixture: ComponentFixture<ProjectTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTemplateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTemplateFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
