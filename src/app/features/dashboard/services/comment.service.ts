import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IComment } from '../models/comment.model';
export interface IHydraCollection<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private routeApi = `${environment.baseApiUrl}/comment`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all Comment
  getAllComment(): Observable<IComment[]> {
    return this.httpClient.get<IHydraCollection<IComment>>(this.routeApi).pipe(
      map((response) => {
        return response['hydra:member'];
      }),
    );
  }

  // Get Comment by ID
  getCommentById(id: string): Observable<IComment> {
    return this.httpClient.get<IComment>(`${this.routeApi}/${id}`);
  }

  // Create a new Comment
  createComment(body: IComment): Observable<IComment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IComment>(this.routeApi, body, { headers });
  }

  // Update Comment by ID
  updateComment(id: string, body: IComment): Observable<IComment> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<IComment>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete Comment
  deleteComment(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
