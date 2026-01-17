import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentStore } from '@app/features/dashboard/stores/comment.store';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  id = signal<string | number>(0);
  submitted = false;
  private fb = inject(FormBuilder);
  private commentStore = inject(CommentStore);

  form!: FormGroup;

  ngOnInit() {
    if (this.id() === 0 || this.id() === null) {
      this.initCreateForm();
    } else {
      this.initUpdateForm();
    }
  }

  private initCreateForm(): void {
    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      task_id: [''],
      user_id: [''],
      subject: ['', Validators.minLength(6), Validators.maxLength(255)],
      content: ['', Validators.minLength(6), Validators.maxLength(255)],
      created_at: ['', Validators.required],
      updated_at: ['', Validators.required],
    });
  }
  private initUpdateForm(): void {
    //this.projectInstanceStore.getProjectInstanceById(Number(this.id()));
    // const data: IProjectInstance = this.projectInstanceStore.currentProject();
    // const data: IComment = {};
    const data = {};

    if (!data) {
      this.initCreateForm();
      return;
    }

    this.form = this.fb.nonNullable.group({
      id: ['', Validators.required],
      task_id: [''],
      user_id: [''],
      subject: ['', Validators.minLength(6), Validators.maxLength(255)],
      content: ['', Validators.minLength(6), Validators.maxLength(255)],
      created_at: ['', Validators.required],
      updated_at: ['', Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    if (this.id() === 0 || this.id() === null) {
      //this.projectInstanceStore.createProjectInstance(formValue);
      console.log('Création:', formValue);
    } else {
      //this.projectInstanceStore.updateProjectInstance(String(this.id()), formValue);
      console.log('Modification:', formValue);
    }
  }
}
