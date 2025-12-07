import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IPriority } from '../models/priority.model';
export interface IHydraCollection<T> {
    'hydra:member': T[];
    'hydra:totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class PriorityService {
    private routeApi = `${environment.baseApiUrl}/priority`;
    private httpClient = inject(HttpClient);

    constructor() { }

    // Get all Priority
    getAllPriority(): Observable<IPriority[]> {
        return this.httpClient.get<IHydraCollection<IPriority>>(this.routeApi).pipe(
            map(response => {
                return response['hydra:member'];
            })
        );
    }

    // Get Priority by ID
    getPriorityById(id: string): Observable<IPriority> {
        return this.httpClient.get<IPriority>(`${this.routeApi}/${id}`);
    }

    // Create a new Priority
    createPriority(body: IPriority): Observable<IPriority> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<IPriority>(this.routeApi, body, { headers });
    }

    // Update Priority by ID
    updatePriority(id: string, body: IPriority): Observable<IPriority> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<IPriority>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete Priority
    deletePriority(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }
}
