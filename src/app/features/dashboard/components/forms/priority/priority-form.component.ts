import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PriorityStore } from '@app/features/dashboard/stores/index';
import { FormInputComponent } from '../../shared/index';
import { IPriority } from '@app/features/dashboard/models/index';
import { ModalService } from '@app/features/dashboard/services/modal.service';

@Component({
  selector: 'app-priority-form',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './priority-form.component.html',
  styleUrl: './priority-form.component.css',
})
export class PriorityFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private priorityStore = inject(PriorityStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    label: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    priorityNumber: [0, [Validators.required]],
    color: [null as string | null],
  });

  ngOnInit() {
    const action = this.modalService.action();
    if (action === 'create') {
      this.isNew.set(true);
    }
    const data = this.priorityStore.currentPriority();

    if (data && !this.isNew()) {
      this.form.patchValue(data as any);
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
    const priorityData: IPriority = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
      '@id': '',
      '@type': '',
    };

    if (this.isNew()) {
      this.priorityStore.createPriority(priorityData);
    } else {
      this.priorityStore.updatePriority(String(priorityData.id), priorityData);
    }
  }
}
