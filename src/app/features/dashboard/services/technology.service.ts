import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ITechnology } from '../models/technology.model';
import { IApiResponseCollection } from '../models/api/response.models';


@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  private routeApi = `${environment.baseApiUrl}/technologies`;
  private httpClient = inject(HttpClient);

  constructor() {}

  // Get all Technologie
  getAllTechnologie(): Observable<ITechnology[]> {
    return this.httpClient.get<IApiResponseCollection<ITechnology>>(this.routeApi).pipe(
      map((response) => {
        return response['member'];
      }),
    );
  }

  // Get Technologie by ID
  getTechnologieById(id: string): Observable<ITechnology> {
    return this.httpClient.get<ITechnology>(`${this.routeApi}/${id}`);
  }

  // Create a new Technologie
  createTechnologie(body: ITechnology): Observable<ITechnology> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<ITechnology>(this.routeApi, body, { headers });
  }

  // Update Technologie by ID
  updateTechnologie(id: string, body: ITechnology): Observable<ITechnology> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<ITechnology>(`${this.routeApi}/${id}`, body, { headers });
  }

  // Delete Technologie
  deleteTechnologie(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
  }
}
