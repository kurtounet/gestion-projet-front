import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ITechnologie } from '../models/technologie.model';
export interface IHydraCollection<T> {
    'hydra:member': T[];
    'hydra:totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class TechnologieService {
    private routeApi = `${environment.baseApiUrl}/technologie`;
    private httpClient = inject(HttpClient);

    constructor() { }

    // Get all Technologie
    getAllTechnologie(): Observable<ITechnologie[]> {
        return this.httpClient.get<IHydraCollection<ITechnologie>>(this.routeApi).pipe(
            map(response => {
                return response['hydra:member'];
            })
        );
    }

    // Get Technologie by ID
    getTechnologieById(id: string): Observable<ITechnologie> {
        return this.httpClient.get<ITechnologie>(`${this.routeApi}/${id}`);
    }

    // Create a new Technologie
    createTechnologie(body: ITechnologie): Observable<ITechnologie> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<ITechnologie>(this.routeApi, body, { headers });
    }

    // Update Technologie by ID
    updateTechnologie(id: string, body: ITechnologie): Observable<ITechnologie> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<ITechnologie>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete Technologie
    deleteTechnologie(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }
}
