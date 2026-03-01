import { Component, inject, Signal, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ISprintInstance } from '@app/features/dashboard/models/index';

// import { DateService, ModalService } from '@app/features/dashboard/services/index';
// import {
//   FormColorPickerComponent,
//   FormInputComponent,
//   FormSelectComponent,
//   FormTextareaComponent,
// } from '../../shared/index';
// import {
//   StatusStore,
//   PriorityStore,
//   ProjectInstanceStore,
//   SprintInstanceStore,
//   SprintTemplateStore,
// } from '@app/features/dashboard/stores/index';
import { 
  FormColorPickerComponent, 
  FormInputComponent, 
  FormSelectComponent, 
  FormTextareaComponent 
} from '../../shared/index';
import { PriorityStore } from '../../../stores/priority.store';
import { ProjectInstanceStore } from '../../../stores/project-instance.store';
import { SprintInstanceStore } from '../../../stores/sprint-instance.store';
import { SprintTemplateStore } from '../../../stores/sprint-template.store';
import { StatusStore } from '../../../stores/status.store';
import { DateService } from '../../../services/date.service';
import { ModalService } from '../../../services/modal.service';
import { IsoDatePipe } from '@app/pipes/IsoDatePipe/iso-date.pipe';
@Component({
  selector: 'app-sprint-instance-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormColorPickerComponent,
  ],
  templateUrl: './sprint-instance-form.component.html',
  styleUrl: './sprint-instance-form.component.css',
  providers: [IsoDatePipe],
})
export class SprintInstanceFormComponent {
  private fb = inject(FormBuilder);
  private dateService = inject(DateService);

  // Injection des stores
  private statusStore = inject(StatusStore);
  // private modalService = inject(ModalService);
  private priorityStore = inject(PriorityStore);
  private projectInstanceStore = inject(ProjectInstanceStore);
  private sprintInstanceStore = inject(SprintInstanceStore);
  private sprintTemplateStore = inject(SprintTemplateStore);

  protected statusOptions = this.statusStore.statuses;
  protected priorityOptions = this.priorityStore.priorities;
  protected sprintTemplateOptions = this.sprintTemplateStore.sprintTemplates;

  submitted = signal(false);
  isNew = signal<boolean>(false);
  id = signal<number>(0);

  protected form = this.fb.nonNullable.group({
    id: [0],
    projectInstance: [null as string | null],
    sprintTemplate: [null as string | null],
    sprintDependency: [null as string | null],
    name: ['Mon Nouveau Sprint', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: [null as string | null],
    color: [null as string | null],
    icon: [null as string | null],
    startDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    endDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    priority: [null as string | null],
    status: [null as string | null],
    position: [0 as number | null],
    comment: [null as string | null],
  });
  ngOnInit() {
    // const action = this.modalService.action();
    // if (action === 'create') {       
    //   this.isNew.set(true);
    // }

    const data = this.projectInstanceStore.selectedSprint();

    if (data && !this.isNew()) {
      console.log(data.status);
      const status = this.statusStore.getLabelById(data.status ?? '');
      const priority = this.priorityStore.getLabelById(data.priority ?? '');
      // const sprintTemplate = this.sprintTemplateStore.sprintTemplates();

      const formattedData = {
        ...data,
        id: data.id,
        status: status,
        priority: priority,
        startDate: this.dateService.dateForForm(data.startDate),
        endDate: this.dateService.dateForForm(data.endDate),
      };

      this.form.patchValue(formattedData as any);
    }
  }

  get getForm() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      return;
    }

    const rawValue = this.form.getRawValue();
   
    const formValue: ISprintInstance = {
      ...rawValue,
      priority: this.priorityStore.getIdByLabel(rawValue.priority || ''),
      status: this.statusStore.getIdByLabel(rawValue.status || ''),
      startDate: new Date(rawValue.startDate).toISOString(),
      endDate: new Date(rawValue.endDate).toISOString(),
    };
      console.log(formValue);
    let data = null;
    if (formValue.id === 0 || formValue.id === null) {
      data = this.sprintInstanceStore.createSprintInstance(formValue);       
    } else {
      data = this.sprintInstanceStore.updateSprintInstance(
        String(formValue.id),
        formValue,
      );
    }
    console.log(data);
  }
}
