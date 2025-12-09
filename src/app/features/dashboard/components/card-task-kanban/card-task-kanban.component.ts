import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ITaskInstance } from '../../models/task-instance.model';
import { boolean } from 'zod';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { IContextMenuItem } from '../../models/components/context-menu-item.model';

@Component({
  selector: 'app-card-task-kanban',
  imports: [DatePipe, NgOptimizedImage, ContextMenuComponent],
  templateUrl: './card-task-kanban.component.html',
  styleUrl: './card-task-kanban.component.scss',
})
export class CardTaskKanbanComponent {
  task = input<ITaskInstance>();
  modalService = inject(ModalService);
  layoutList: boolean = true;
  menuIsVisible = signal<boolean>(false);
  elementRef = inject(ElementRef);

  readonly taskMenuItems: IContextMenuItem[] = [
    { key: 'view', label: 'Voir la tâche' },
    { key: 'edit', label: 'Modifier' },
    { key: 'move', label: 'Changer de colonne' },
    { key: 'duplicate', label: 'Dupliquer' },
    { key: 'delete', label: 'Supprimer', danger: true },
  ];
  ngOnInit() {
    document.addEventListener('click', (e) => {
      if (!this.elementRef.nativeElement.contains(e.target)) {
        this.menuIsVisible.set(false);
      }
    });
  }
  editTask(id: number | undefined) {
    if (!id) return;
    this.modalService.open(`Edit task`, 'edit', 'task', id);
  }
  toogleMenu() {
    this.menuIsVisible.set(!this.menuIsVisible());
  }
  onAction(item: { key: string; label: string }) {
    console.log('Action:', item.key, 'TaskId:', this.task()?.['@id']);
    this.menuIsVisible.set(false);
  }
  deleteTask(id: number | undefined) {
    if (!id) return;
    this.modalService.open(`Delete task`, 'delete', 'task', id);
  }
  onTaskMenuAction(item: IContextMenuItem) {
    const task = this.task();
    if (!task) return;

    switch (item.key) {
      case 'view':
        console.log('Voir', task['@id']);
        break;
      case 'edit':
        console.log('Modifier', task['@id']);
        break;
      case 'move':
        console.log('Changer de colonne', task['@id']);
        break;
      case 'duplicate':
        console.log('Dupliquer', task['@id']);
        break;
      case 'delete':
        console.log('Supprimer', task['@id']);
        break;
    }
  }
}
