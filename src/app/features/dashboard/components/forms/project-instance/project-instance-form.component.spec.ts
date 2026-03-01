import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectInstanceFormComponent } from './project-instance-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { ProjectInstanceStore, initialProjectState } from '../../../stores/project-instance.store';
import { StatusStore } from '../../../stores/status.store';
import { PriorityStore } from '../../../stores/priority.store';
import { ProjectTemplateStore } from '../../../stores/project-template.store';
import { ModalService } from '../../../services/modal.service';
import { DateService } from '../../../services/date.service';
import { of } from 'rxjs';

describe('ProjectInstanceFormComponent', () => {
  let component: ProjectInstanceFormComponent;
  let fixture: ComponentFixture<ProjectInstanceFormComponent>;
  let projectInstanceStoreMock: any;
  let statusStoreMock: any;
  let priorityStoreMock: any;
  let projectTemplateStoreMock: any;
  let modalServiceMock: any;

  beforeEach(async () => {
    projectInstanceStoreMock = {
      currentProject: signal(initialProjectState),
      createProjectInstance: vi.fn(),
      updateProjectInstance: vi.fn(),
    };

    statusStoreMock = {
      statuses: signal([{ id: 1, label: 'En cours' }]),
      getLabelById: vi.fn().mockReturnValue('En cours'),
      getIdByLabel: vi.fn().mockReturnValue('/api/statuses/1'),
    };

    priorityStoreMock = {
      priorities: signal([{ id: 1, label: 'Haute' }]),
      getLabelById: vi.fn().mockReturnValue('Haute'),
      getIdByLabel: vi.fn().mockReturnValue('/api/priorities/1'),
    };

    projectTemplateStoreMock = {
      projectTemplates: signal([{ id: 1, name: 'Template 1' }]),
    };

    modalServiceMock = {
      action: signal('create'),
    };

    await TestBed.configureTestingModule({
      imports: [ProjectInstanceFormComponent, ReactiveFormsModule],
      providers: [
        { provide: ProjectInstanceStore, useValue: projectInstanceStoreMock },
        { provide: StatusStore, useValue: statusStoreMock },
        { provide: PriorityStore, useValue: priorityStoreMock },
        { provide: ProjectTemplateStore, useValue: projectTemplateStoreMock },
        { provide: ModalService, useValue: modalServiceMock },
        DateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectInstanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in create mode', () => {
    modalServiceMock.action.set('create');
    fixture.detectChanges();
    expect(component.isNew()).toBe(true);
    expect(component.getForm.id.value).toBe(0);
  });

  it('should initialize in edit mode and patch values', () => {
    modalServiceMock.action.set('edit');
    const mockProject = {
      ...initialProjectState,
      id: 1,
      name: 'Projet Test',
      status: '/api/statuses/1',
      priority: '/api/priorities/1',
    };
    projectInstanceStoreMock.currentProject.set(mockProject);

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.isNew()).toBe(false);
    expect(component.getForm.name.value).toBe('Projet Test');
    expect(component.getForm.status.value).toBe('En cours');
  });

  it('should call createProjectInstance on submit when in create mode', () => {
    modalServiceMock.action.set('create');
    fixture.detectChanges();
    component.ngOnInit();

    component.getForm.name.setValue('Nouveau Projet');
    component.getForm.position.setValue(1);
    component.getForm.startDate.setValue('2023-01-01');
    component.getForm.endDate.setValue('2023-12-31');
    component.getForm.isFavory.setValue(false);
    component.getForm.pathProject.setValue('/path/to/project');
    component.getForm.pathFileDatabase.setValue('/path/to/db');

    component.onSubmit();

    expect(projectInstanceStoreMock.createProjectInstance).toHaveBeenCalled();
  });

  it('should call updateProjectInstance on submit when in edit mode', () => {
    modalServiceMock.action.set('edit');
    const mockProject = {
      ...initialProjectState,
      id: 1,
      name: 'Projet Existant',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      position: 1,
      isFavory: false,
      pathProject: '/path/to/project',
      pathFileDatabase: '/path/to/db',
    };
    projectInstanceStoreMock.currentProject.set(mockProject);
    fixture.detectChanges();
    component.ngOnInit();

    component.getForm.name.setValue('Projet Modifié');

    component.onSubmit();

    expect(projectInstanceStoreMock.updateProjectInstance).toHaveBeenCalledWith(
      '1',
      expect.anything(),
    );
  });
});
