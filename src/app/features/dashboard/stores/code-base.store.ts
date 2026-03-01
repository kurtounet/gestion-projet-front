import { inject, Injectable, signal } from '@angular/core';
import { ICodeBase } from '@app/features/dashboard/models/code-base.model';
import { CodeBaseService } from '@app/features/dashboard/services/code-base.service';
export const initialCodeBaseState: ICodeBase = {
  id: 0,
  label: '',
  code: '',
  pathFile: '',
  feature: '',
  createdAt: new Date().toISOString(),
  updatedAt: null,
};
@Injectable({
  providedIn: 'root',
})
export class CodeBaseStore {
  readonly codeBaseService = inject(CodeBaseService);

  codeBases = signal<ICodeBase[]>([]);
  currentCodeBase = signal<ICodeBase>(initialCodeBaseState);
  codeBaseLoading = signal<boolean>(false);
  codeBaseLoaded = signal<boolean>(false);

  codeBase = signal<ICodeBase[]>([]);

  getAllCodeBase(): void {
    this.codeBaseLoading.set(true);
    this.codeBaseService.getAllCodeBase().subscribe({
      next: (data) => {
        if (data) {
          this.codeBases.set(data);
          this.codeBaseLoaded.set(true);
          this.codeBaseLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des codeBase', err);
        this.codeBaseLoading.set(false);
      },
    });
  }
  getCodeBaseById(id: string): void {
    this.codeBaseLoading.set(true);
    this.codeBaseService.getCodeBaseById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentCodeBase.set(data);
          this.codeBaseLoaded.set(true);
          this.codeBaseLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du codeBase', err);
        this.codeBaseLoading.set(false);
      },
    });
  }
  updateCodeBase(id: string, body: ICodeBase) {
    this.codeBaseService.updateCodeBase(id, body).subscribe({
      next: (data) => {
        //this.getCurrentCodeBase(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createCodeBase(body: ICodeBase) {
    this.codeBaseService.createCodeBase(body).subscribe({
      next: (data) => {
        // this.getCurrentCodeBase(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteCodeBase(id: string) {
    this.codeBaseService.deleteCodeBase(id).subscribe({
      next: (data) => {
        // this.getCurrentCodeBase(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
