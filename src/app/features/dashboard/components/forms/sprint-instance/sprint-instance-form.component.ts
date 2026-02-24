import { Component, inject, Signal, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SprintInstanceStore } from '@app/features/dashboard/stores/sprint-instance.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
 
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';
import { FormColorPickerComponent } from '../../shared/form-color-picker/form-color-picker.component';
 
import { PriorityStore } from '@app/features/dashboard/stores/priority.store';
import { StatusStore } from '@app/features/dashboard/stores/status.store';
 
import { ISprintInstance } from '@app/features/dashboard/models/sprint-instance.model';
import { SprintTemplateStore } from '@app/features/dashboard/stores/sprint-template.store';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instance.store';
import { IsoDatePipe } from '@app/pipes/IsoDatePipe/iso-date.pipe';
import { GetPriorityPipe } from '@app/pipes/get-priority-pipe';
import { GetStatusPipe } from '@app/pipes/get-status-pipe';

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
  providers: [IsoDatePipe, GetPriorityPipe, GetStatusPipe]
})
export class SprintInstanceFormComponent {
  private fb = inject(FormBuilder);
  private isoDatePipe = inject(IsoDatePipe);
  private getPriority = inject(GetPriorityPipe);
  private getStatus = inject(GetStatusPipe);
   // Injection des stores
   private statusStore = inject(StatusStore);
   private priorityStore = inject(PriorityStore);
   private projectInstanceStore = inject(ProjectInstanceStore);
   private sprintInstanceStore = inject(SprintInstanceStore);
  private sprintTemplateStore = inject(SprintTemplateStore);
  
  protected statusOptions = this.statusStore.statuses;
  protected priorityOptions = this.priorityStore.priorities;
  protected sprintTemplateOptions = this.sprintTemplateStore.sprintTemplates;

 
  isNew = signal<boolean>(false);
  submitted = signal(false);


 
protected form = this.fb.nonNullable.group({
      id: [0],
      projectInstance: [''],
      priority: [''],
      sprintTemplate: [''],
      sprintDependency: [''],
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      description: [''],
      color: [''],
      icon: [''],
      startDate: [new Date().toISOString().substring(0, 10), Validators.required],
      endDate: [new Date().toISOString().substring(0, 10), Validators.required],
      status: [''],
      position: [0],
      comment: [''],
      // createdAt: [''],
      // updatedAt: [''],
    });
  ngOnInit() {
     const data = this.projectInstanceStore.selectedSprint();
     console.log(data); 

    if (data && !this.isNew()) {      
      const formattedData = {
        ...data,
        id: data.id,
        status:  this.getStatus.transform(data.status),
        priority: this.getPriority.transform(data.priority),
        startDate: this.isoDatePipe.transform(data.startDate),
        endDate: this.isoDatePipe.transform(data.endDate)
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
      startDate: new Date(rawValue.startDate),
      endDate: new Date(rawValue.endDate),
    };

    if (formValue.id === 0 || formValue.id === null) {
       this.sprintInstanceStore.createSprintInstance(formValue);
       this.form.reset();
    } else {
      this.sprintInstanceStore.updateSprintInstance(String(formValue.id), formValue);
    }
  }
}
