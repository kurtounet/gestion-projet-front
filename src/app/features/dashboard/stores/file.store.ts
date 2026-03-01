import { inject, Injectable, signal } from '@angular/core';
import { IFile } from '../models/file.model';
import { FileService } from '../services/file.service';
export const initialFileState: IFile = {
  id: 0,
  path: '',
  keyWord: '',
  createdAt: new Date().toISOString(),
  updatedAt: null,
};
@Injectable({
  providedIn: 'root',
})
export class FileStore {
  readonly fileService = inject(FileService);

  files = signal<IFile[]>([]);
  currentFile = signal<IFile>(initialFileState);
  fileLoading = signal<boolean>(false);
  fileLoaded = signal<boolean>(false);

  file = signal<IFile[]>([]);

  getAllFile(): void {
    this.fileLoading.set(true);
    this.fileService.getAllFile().subscribe({
      next: (data) => {
        if (data) {
          this.files.set(data);
          this.fileLoaded.set(true);
          this.fileLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des file', err);
        this.fileLoading.set(false);
      },
    });
  }
  getFileById(id: string): void {
    this.fileLoading.set(true);
    this.fileService.getFileById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentFile.set(data);
          this.fileLoaded.set(true);
          this.fileLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du file', err);
        this.fileLoading.set(false);
      },
    });
  }
  updateFile(id: string, body: IFile) {
    this.fileService.updateFile(id, body).subscribe({
      next: (data) => {
        //this.getCurrentFile(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createFile(body: IFile) {
    this.fileService.createFile(body).subscribe({
      next: (data) => {
        // this.getCurrentFile(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteFile(id: string) {
    this.fileService.deleteFile(id).subscribe({
      next: (data) => {
        // this.getCurrentFile(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
