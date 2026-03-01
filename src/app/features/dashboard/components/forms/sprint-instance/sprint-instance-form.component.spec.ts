import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprintInstanceFormComponent } from './sprint-instance-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import {
  SprintInstanceStore,
  initialSprintInstanceState,
} from '../../../stores/sprint-instance.store';
import { ProjectInstanceStore } from '../../../stores/project-instance.store';
import { StatusStore } from '../../../stores/status.store';
import { PriorityStore } from '../../../stores/priority.store';
import { SprintTemplateStore } from '../../../stores/sprint-template.store';
import { ModalService } from '../../../services/modal.service';
import { DateService } from '../../../services/date.service';

describe('SprintInstanceFormComponent', () => {
  let component: SprintInstanceFormComponent;
  let fixture: ComponentFixture<SprintInstanceFormComponent>;
  let sprintInstanceStoreMock: any;
  let projectInstanceStoreMock: any;
  let statusStoreMock: any;
  let priorityStoreMock: any;
  let sprintTemplateStoreMock: any;
  let modalServiceMock: any;

  beforeEach(async () => {
    sprintInstanceStoreMock = {
      createSprintInstance: vi.fn(),
      updateSprintInstance: vi.fn(),
    };

    projectInstanceStoreMock = {
      selectedSprint: signal(initialSprintInstanceState),
    };

    statusStoreMock = {
      statuses: signal([{ id: 1, label: 'To Do' }]),
      getLabelById: vi.fn().mockReturnValue('To Do'),
      getIdByLabel: vi.fn().mockReturnValue('/api/statuses/1'),
    };

    priorityStoreMock = {
      priorities: signal([{ id: 1, label: 'Normal' }]),
      getLabelById: vi.fn().mockReturnValue('Normal'),
      getIdByLabel: vi.fn().mockReturnValue('/api/priorities/1'),
    };

    sprintTemplateStoreMock = {
      sprintTemplates: signal([{ id: 1, name: 'Sprint Template 1' }]),
    };

    modalServiceMock = {
      action: signal('create'),
    };

    await TestBed.configureTestingModule({
      imports: [SprintInstanceFormComponent, ReactiveFormsModule],
      providers: [
        { provide: SprintInstanceStore, useValue: sprintInstanceStoreMock },
        { provide: ProjectInstanceStore, useValue: projectInstanceStoreMock },
        { provide: StatusStore, useValue: statusStoreMock },
        { provide: PriorityStore, useValue: priorityStoreMock },
        { provide: SprintTemplateStore, useValue: sprintTemplateStoreMock },
        { provide: ModalService, useValue: modalServiceMock },
        DateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SprintInstanceFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize in create mode', () => {
    modalServiceMock.action.set('create');
    fixture.detectChanges();
    expect(component.isNew()).toBe(true);
  });

  it('should initialize in edit mode and patch values', () => {
    modalServiceMock.action.set('edit');
    const mockSprint = {
      ...initialSprintInstanceState,
      id: 1,
      name: 'Sprint 1',
      status: '/api/statuses/1',
      priority: '/api/priorities/1',
    };
    projectInstanceStoreMock.selectedSprint.set(mockSprint);

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.isNew()).toBe(false);
    expect(component.getForm.name.value).toBe('Sprint 1');
    expect(component.getForm.status.value).toBe('To Do');
  });

  it('should call createSprintInstance on submit when in create mode', () => {
    modalServiceMock.action.set('create');
    fixture.detectChanges();
    component.ngOnInit();

    component.getForm.name.setValue('Nouveau Sprint');
    component.getForm.startDate.setValue('2023-01-01');
    component.getForm.endDate.setValue('2023-01-15');

    component.onSubmit();

    expect(sprintInstanceStoreMock.createSprintInstance).toHaveBeenCalled();
  });

  it('should call updateSprintInstance on submit when in edit mode', () => {
    modalServiceMock.action.set('edit');
    const mockSprint = {
      ...initialSprintInstanceState,
      id: 1,
      name: 'Sprint Existant',
      startDate: '2023-01-01',
      endDate: '2023-01-15',
    };
    projectInstanceStoreMock.selectedSprint.set(mockSprint);
    fixture.detectChanges();
    component.ngOnInit();

    component.getForm.name.setValue('Sprint Modifié');

    component.onSubmit();

    expect(sprintInstanceStoreMock.updateSprintInstance).toHaveBeenCalledWith(
      '1',
      expect.anything(),
    );
  });
});
