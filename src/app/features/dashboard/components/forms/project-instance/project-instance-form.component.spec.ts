import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInstanceFormComponent } from './project-instance-form.component';

describe('ProjectInstanceFormComponent', () => {
  let component: ProjectInstanceFormComponent;
  let fixture: ComponentFixture<ProjectInstanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectInstanceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectInstanceFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
