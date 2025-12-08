import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private readonly http = inject(HttpClient);

  saveColumns(columns: any[]) {
    return this.http.put('/api/kanban/columns', { columns });
  }
  /*
  constructor(private kanbanService: KanbanService) {
    this.columnsList = this.columns.map(column => column.label + 'List');
    this.loadKanbanState();
  }

  saveKanbanState() {
    this.kanbanService.updateKanban({
      id: 'kanban-1',
      columns: this.columns,
      lastModified: new Date()
    }).subscribe({
      next: (response) => {
        console.log('Kanban sauvegardé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    });
  }
  */
}
