import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import {
//   ProjectInstanceStore,
//   PriorityStore,
//   StatusStore,
//   ProjectTemplateStore,
// } from '@app/features/dashboard/stores/index';
// import {
//   FormInputComponent,
//   FormSelectComponent,
//   FormCheckboxComponent,
//   FormTextareaComponent,
//   FormColorPickerComponent,
//   FormFilePickerComponent,
// } from '../../shared/index';
import { IProjectInstance } from '@app/features/dashboard/models/index';
import { IsoDatePipe } from '@app/pipes/IsoDatePipe/iso-date.pipe';
import { DateService } from '../../../services/date.service';
import { 
  FormCheckboxComponent, 
  FormColorPickerComponent, 
  FormFilePickerComponent, 
  FormInputComponent, 
  FormSelectComponent, 
  FormTextareaComponent 
} from '../../shared/index';
import { PriorityStore } from '../../../stores/priority.store';
import { ProjectInstanceStore } from '../../../stores/project-instance.store';
import { ProjectTemplateStore } from '../../../stores/project-template.store';
import { StatusStore } from '../../../stores/status.store';

@Component({
  selector: 'app-project-instance-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormColorPickerComponent,
    FormFilePickerComponent,
  ],
  templateUrl: './project-instance-form.component.html',
  providers: [IsoDatePipe],
})
export class ProjectInstanceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dateService = inject(DateService);

  // Injection des stores
  private priorityStore = inject(PriorityStore);
  private statusStore = inject(StatusStore);
  private projectInstanceStore = inject(ProjectInstanceStore);
  private projectTemplateStore = inject(ProjectTemplateStore);

  // Utilisation des signaux des stores pour les options
  protected statusOptions = this.statusStore.statuses;
  protected priorityOptions = this.priorityStore.priorities;
  protected projectTemplateOptions = this.projectTemplateStore.projectTemplates;

  // Signaux d'état
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé (nonNullable garantit que reset() remet les valeurs par défaut au lieu de null)
  protected form = this.fb.nonNullable.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: [null as string | null, [Validators.maxLength(65535)]],
    pathProject: [null as string | null],
    pathFileDatabase: [null as string | null],
    color: [null as string | null],
    icon: [null as string | null],
    position: [0, [Validators.required]],
    startDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    endDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    status: [null as string | null],
    priority: [null as string | null],
    projectTemplate: [null as string | null],
    comment: [null as string | null],
    sprintInstances: [[] as (string | null)[]],
    projectInstances: [[] as (string | null)[]],
    parent: [null as string | null],
    configFramework: [null as string | null],
    isFavory: [false, [Validators.required]],
  });

  ngOnInit() {
    console.log(this.statusOptions());
    console.log(this.priorityOptions());
    const data = this.projectInstanceStore.currentProject();
    if (data && !this.isNew()) {
      const formattedData = {
        ...data,
        id: data.id,
        status: this.statusStore.getLabelById(data.status ?? ''),
        priority: this.priorityStore.getLabelById(data.priority ?? ''),
        startDate: this.dateService.dateForForm(data.startDate),
        endDate: this.dateService.dateForForm(data.endDate),
      };
      this.form.patchValue(formattedData);
    }
  }
  // protected canSubmit = computed(() => {
  //   return this.form.valid && (this.isNew() || this.form.dirty);
  // });
  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) return;

    const rawValue = this.form.getRawValue();

    const formValue: IProjectInstance = {
      ...rawValue,
      priority: this.priorityStore.getIdByLabel(rawValue.priority || ''),
      status: this.statusStore.getIdByLabel(rawValue.status || ''),
      startDate: rawValue.startDate ? new Date(rawValue.startDate).toISOString() : '',
      endDate: rawValue.endDate ? new Date(rawValue.endDate).toISOString() : '',

      // On garantit que ce sont des tableaux (pour éviter l'erreur string vs string[])
      sprintInstances: Array.isArray(rawValue.sprintInstances) ? rawValue.sprintInstances : [],
      projectInstances: Array.isArray(rawValue.projectInstances) ? rawValue.projectInstances : [],
      parent: rawValue.parent || null,
      configFramework: rawValue.configFramework || null,
    };

    if (formValue.id === 0 || formValue.id === null) {
      this.projectInstanceStore.createProjectInstance(formValue);
    } else {
      this.projectInstanceStore.updateProjectInstance(String(formValue.id), formValue);
    }
  }
}
