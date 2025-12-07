import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { IFile } from '../models/file.model';
export interface IHydraCollection<T> {
    'hydra:member': T[];
    'hydra:totalItems': number;
}

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private routeApi = `${environment.baseApiUrl}/file`;
    private httpClient = inject(HttpClient);

    constructor() { }

    // Get all File
    getAllFile(): Observable<IFile[]> {
        return this.httpClient.get<IHydraCollection<IFile>>(this.routeApi).pipe(
            map(response => {
                return response['hydra:member'];
            })
        );
    }

    // Get File by ID
    getFileById(id: string): Observable<IFile> {
        return this.httpClient.get<IFile>(`${this.routeApi}/${id}`);
    }

    // Create a new File
    createFile(body: IFile): Observable<IFile> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<IFile>(this.routeApi, body, { headers });
    }

    // Update File by ID
    updateFile(id: string, body: IFile): Observable<IFile> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.patch<IFile>(`${this.routeApi}/${id}`, body, { headers });
    }

    // Delete File
    deleteFile(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.routeApi}/${id}`);
    }
}
