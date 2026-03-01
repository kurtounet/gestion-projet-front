import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskInstanceFormComponent } from './task-instance-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { TaskInstanceStore, initialTaskInstanceState } from '../../../stores/task-instance.store';
import { UserStore } from '../../../stores/user.store';
import { TaskTemplateStore } from '../../../stores/task-template.store';
import { SprintInstanceStore } from '../../../stores/sprint-instance.store';
import { PriorityStore } from '../../../stores/priority.store';
import { StatusStore } from '../../../stores/status.store';
import { TypeTaskStore } from '../../../stores/type-task.store';
import { CommentStore } from '../../../stores/comment.store';
import { ModalService } from '../../../services/modal.service';

describe('TaskInstanceFormComponent', () => {
  let component: TaskInstanceFormComponent;
  let fixture: ComponentFixture<TaskInstanceFormComponent>;
  let taskInstanceStoreMock: any;
  let modalServiceMock: any;
  let statusStoreMock: any;
  let priorityStoreMock: any;

  beforeEach(async () => {
    taskInstanceStoreMock = {
      currentTaskInstance: signal(initialTaskInstanceState),
      createTaskInstance: vi.fn(),
      updateTaskInstance: vi.fn(),
    };

    statusStoreMock = {
      statuses: signal([{ id: 1, label: 'En cours' }]),
      getLabelById: vi.fn().mockReturnValue('En cours'),
      getIdByLabel: vi.fn().mockReturnValue('/api/statuses/1'),
    };

    priorityStoreMock = {
      priorities: signal([{ id: 1, label: 'Basse' }]),
      getLabelById: vi.fn().mockReturnValue('Basse'),
      getIdByLabel: vi.fn().mockReturnValue('/api/priorities/1'),
    };

    modalServiceMock = {
      action: signal('create'),
    };

    await TestBed.configureTestingModule({
      imports: [TaskInstanceFormComponent, ReactiveFormsModule],
      providers: [
        { provide: TaskInstanceStore, useValue: taskInstanceStoreMock },
        { provide: UserStore, useValue: { users: signal([]) } },
        { provide: TaskTemplateStore, useValue: { taskTemplates: signal([]) } },
        { provide: SprintInstanceStore, useValue: { sprintInstances: signal([]) } },
        { provide: PriorityStore, useValue: priorityStoreMock },
        { provide: StatusStore, useValue: statusStoreMock },
        { provide: TypeTaskStore, useValue: { typeTasks: signal([]) } },
        { provide: CommentStore, useValue: { comments: signal([]) } },
        { provide: ModalService, useValue: modalServiceMock },
        IsoDatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInstanceFormComponent);
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
  });

  it('should initialize in edit mode and patch values', () => {
    modalServiceMock.action.set('edit');
    const mockTask = {
      ...initialTaskInstanceState,
      id: 1,
      name: 'Task 1',
      status: '/api/statuses/1',
      priority: '/api/priorities/1',
    };
    taskInstanceStoreMock.currentTaskInstance.set(mockTask);

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.isNew()).toBe(false);
    expect(component.getForm.name.value).toBe('Task 1');
    expect(component.getForm.status.value).toBe('En cours');
  });

  it('should call createTaskInstance on submit when in create mode', () => {
    modalServiceMock.action.set('create');
    fixture.detectChanges();
    component.ngOnInit();

    component.getForm.name.setValue('Nouvelle Tâche');
    component.getForm.description.setValue('Description');
    component.getForm.icon.setValue('fa-task');
    component.getForm.color.setValue('#000000');
    component.getForm.startDate.setValue('2023-01-01');
    component.getForm.dueDate.setValue('2023-01-02');
    component.getForm.user.setValue('/api/users/1');
    component.getForm.taskTemplate.setValue('/api/task_templates/1');
    component.getForm.sprintInstance.setValue('/api/sprint_instances/1');
    component.getForm.priority.setValue('Basse');
    component.getForm.status.setValue('En cours');
    component.getForm.typeTask.setValue('/api/type_tasks/1');

    component.onSubmit();

    expect(taskInstanceStoreMock.createTaskInstance).toHaveBeenCalled();
  });

  it('should call updateTaskInstance on submit when in edit mode', () => {
    modalServiceMock.action.set('edit');
    const mockTask = {
      ...initialTaskInstanceState,
      id: 1,
      name: 'Tâche Existante',
      description: 'Description',
      icon: 'fa-task',
      color: '#000000',
      startDate: '2023-01-01',
      dueDate: '2023-01-02',
      user: '/api/users/1',
      taskTemplate: '/api/task_templates/1',
      sprintInstance: '/api/sprint_instances/1',
      priority: '/api/priorities/1',
      status: '/api/statuses/1',
      typeTask: '/api/type_tasks/1',
    };
    taskInstanceStoreMock.currentTaskInstance.set(mockTask);
    fixture.detectChanges();
    component.ngOnInit();

    component.getForm.name.setValue('Tâche Modifiée');

    component.onSubmit();

    expect(taskInstanceStoreMock.updateTaskInstance).toHaveBeenCalledWith('1', expect.anything());
  });
});
