import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentStore } from '@app/features/dashboard/stores/index';
import {
  FormInputComponent,
  FormTextareaComponent,
  FormSelectComponent,
} from '../../shared/index';

import { IComment } from '@app/features/dashboard/models/index';

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
    subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    content: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(65535)]],
    task: [null as string | null],
    user: [null as string | null],
    });

    ngOnInit() {
    const data = this.commentStore.currentComment();

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
    const commentData: IComment = {
      ...rawValue,
      id: rawValue.id || 0,
      createdAt: '', // Will be set by backend
    };

    if (this.isNew()) {
      this.commentStore.createComment(commentData);
    } else {
      this.commentStore.updateComment(String(commentData.id), commentData);
    }
  }
}
