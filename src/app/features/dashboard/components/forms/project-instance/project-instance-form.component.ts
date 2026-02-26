import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';
import { PriorityStore } from '@app/features/dashboard/stores/priority.store';
import { StatusStore } from '@app/features/dashboard/stores/status.store';
import { ProjectTemplateStore } from '@app/features/dashboard/stores/project-template.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { FormCheckboxComponent } from '../../shared/form-checkbox/form-checkbox.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';
import { FormColorPickerComponent } from '../../shared/form-color-picker/form-color-picker.component';
import { FormFilePickerComponent } from '../../shared/form-file-picker/form-file-picker.component';
import { IProjectInstance } from '@app/features/dashboard/models/project-instance.model';
import { GetStatusPipe } from '@app/pipes/get-status-pipe';
import { GetPriorityPipe } from '@app/pipes/get-priority-pipe';
import { IsoDatePipe } from '@app/pipes/IsoDatePipe/iso-date.pipe';

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
  private isoDatePipe = inject(IsoDatePipe);

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
    id: [0], // Optionnel pour la création
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    description: ['', [Validators.minLength(6), Validators.maxLength(255)]],
    pathProject: ['', [Validators.required]],
    pathFileDatabase: ['', [Validators.required]],
    color: [''],
    icon: [''],
    position: [0],
    startDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    endDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
    status: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    projectTemplate: [''],
    comment: [''],
    sprintInstances: [[] as string[]],
    projectInstances: [[] as string[]],
    isFavory: [false],
  });

  ngOnInit() {
    const data = this.projectInstanceStore.currentProject();

    if (data && !this.isNew()) {
       const formattedData = {
        ...data,
        id: data.id,
        status: this.statusStore.getLabelById(Number(data.status)),
        priority: this.priorityStore.getLabelById(Number(data.priority)) ,
        startDate: this.isoDatePipe.transform(data.startDate),
        endDate: this.isoDatePipe.transform(data.endDate),
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

    // getRawValue() est parfait ici car il récupère même les champs disabled
    const rawValue = this.form.getRawValue();

    // On crée l'objet final en s'assurant du respect strict de l'interface
    const projectData: IProjectInstance = {
      ...rawValue,
      // On s'assure que l'ID est un nombre (cas du mode édition)
      id: rawValue.id || 0,

      // Conversion sécurisée des dates en ISO string
      startDate: rawValue.startDate ? new Date(rawValue.startDate).toISOString() : '',
      endDate: rawValue.endDate ? new Date(rawValue.endDate).toISOString() : '',

      // On garantit que ce sont des tableaux (pour éviter l'erreur string vs string[])
      sprintInstances: Array.isArray(rawValue.sprintInstances) ? rawValue.sprintInstances : [],
      projectInstances: Array.isArray(rawValue.projectInstances) ? rawValue.projectInstances : [],
    };

    if (this.isNew()) {
      this.projectInstanceStore.createProjectInstance(projectData);
    } else {
      this.projectInstanceStore.updateProjectInstance(projectData);
    }
  }
}
