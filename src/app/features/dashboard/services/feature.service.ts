import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IFeature } from '../models/feature.model';
export interface IHydraCollection<T> {
    'hydra:member': T[];
    'hydra:totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class FeatureService {
    private routeApi = `${environment.baseApiUrl}/feature`;
    private httpClient = inject(HttpClient);

    constructor() { }

    // Get all Feature
    getAllFeature(): Observable<IFeature[]> {
        return this.httpClient.get<IHydraCollection<IFeature>>(this.routeApi).pipe(
            map(response => {
                return response['hydra:member'];
            })
        );
    }

    // Get Feature by ID
    getFeatureById(id: string): Observable<IFeature> {
        return this.httpClient.get<IFeature>(`${this.routeApi}/${id}`);
    }

    // Create a new Feature
    createFeature(body: IFeature): Observable<IFeature> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<IFeature>(this.routeApi, body, { headers });
    }

    // Update Feature by ID
    updateFeature(id: string, body: IFeature): Observable<IFeature> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<IFeature>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete Feature
    deleteFeature(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }
}
