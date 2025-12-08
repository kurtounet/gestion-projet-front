import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IContext } from '../models/context.model';
export interface IHydraCollection<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
}

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  private routeApi = `${environment.baseApiUrl}/context`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all Context
  getAllContext(): Observable<IContext[]> {
    return this.httpClient.get<IHydraCollection<IContext>>(this.routeApi).pipe(
      map((response) => {
        return response['hydra:member'];
      }),
    );
  }

  // Get Context by ID
  getContextById(id: string): Observable<IContext> {
    return this.httpClient.get<IContext>(`${this.routeApi}/${id}`);
  }

  // Create a new Context
  createContext(body: IContext): Observable<IContext> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<IContext>(this.routeApi, body, { headers });
  }

  // Update Context by ID
  updateContext(id: string, body: IContext): Observable<IContext> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<IContext>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete Context
  deleteContext(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
