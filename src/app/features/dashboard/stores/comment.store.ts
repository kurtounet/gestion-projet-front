import { inject, Injectable, signal } from '@angular/core';
import { IComment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
export const initialCommentState: IComment = {
  id: 0,
  taskId: 0,
  userId: 0,
  subject: '',
  content: '',
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class CommentStore {
  readonly commentService = inject(CommentService);

  comments = signal<IComment[]>([]);
  currentComment = signal<IComment>(initialCommentState);
  commentLoading = signal<boolean>(false);
  commentLoaded = signal<boolean>(false);

  comment = signal<IComment[]>([]);

  getAllComment(): void {
    this.commentLoading.set(true);
    this.commentService.getAllComment().subscribe({
      next: (data) => {
        if (data) {
          this.comments.set(data);
          this.commentLoaded.set(true);
          this.commentLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des comment', err);
        this.commentLoading.set(false);
      },
    });
  }
  getCommentById(id: string): void {
    this.commentLoading.set(true);
    this.commentService.getCommentById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentComment.set(data);
          this.commentLoaded.set(true);
          this.commentLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du comment', err);
        this.commentLoading.set(false);
      },
    });
  }
  updateComment(id: string, body: IComment) {
    this.commentService.updateComment(id, body).subscribe({
      next: (data) => {
        //this.getCurrentComment(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createComment(body: IComment) {
    this.commentService.createComment(body).subscribe({
      next: (data) => {
        // this.getCurrentComment(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe({
      next: (data) => {
        // this.getCurrentComment(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
