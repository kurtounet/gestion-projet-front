import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ICodeBase } from '../models/code-base.model';
import { IApiResponseCollection } from '../models/api/response.models';


@Injectable({
  providedIn: 'root',
})
export class CodeBaseService {
  private routeApi = `${environment.baseApiUrl}/codebase`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all CodeBase
  getAllCodeBase(): Observable<ICodeBase[]> {
    return this.httpClient.get<IApiResponseCollection<ICodeBase>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get CodeBase by ID
  getCodeBaseById(id: string): Observable<ICodeBase> {
    return this.httpClient.get<ICodeBase>(`${this.routeApi}/${id}`);
  }

  // Create a new CodeBase
  createCodeBase(body: ICodeBase): Observable<ICodeBase> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<ICodeBase>(this.routeApi, body, { headers });
  }

  // Update CodeBase by ID
  updateCodeBase(id: string, body: ICodeBase): Observable<ICodeBase> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<ICodeBase>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete CodeBase
  deleteCodeBase(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
