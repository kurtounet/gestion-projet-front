import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentStore } from '@app/features/dashboard/stores/comment.store';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormTextareaComponent } from '../../shared/form-textarea/form-textarea.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';

import { IComment } from '@app/features/dashboard/models/comment.model';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormInputComponent, FormTextareaComponent, FormSelectComponent],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  private fb = inject(FormBuilder);
  private commentStore = inject(CommentStore);

  // Signaux d'état
  id = signal<string | number>(0);
  isNew = signal<boolean>(false);
  submitted = signal(false);

  // Formulaire typé
  protected form = this.fb.nonNullable.group({
    id: [0],
    taskId: [0, [Validators.required]],
    userId: [0, [Validators.required]],
    subject: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    content: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });

  ngOnInit() {
    const data = this.commentStore.currentComment();

    if (data && !this.isNew()) {
      this.form.patchValue(data);
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
    const commentData: IComment = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: new Date(rawValue.createdAt),
      updatedAt: new Date(rawValue.updatedAt),
    };

    if (this.isNew()) {
      this.commentStore.createComment(commentData);
    } else {
      this.commentStore.updateComment(String(this.id()), commentData);
    }
  }
}

