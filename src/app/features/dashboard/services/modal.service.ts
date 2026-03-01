import { I } from '@angular/cdk/keycodes';
import { inject, Injectable, signal } from '@angular/core';
import { FormFactoryService } from './form-factory.service';
type TypeItem = '' | 'project' | 'sprint' | 'task' | 'framework' | 'user' | 'role' | 'permission';
type TypeAction = '' | 'create' | 'edit' | 'delete';
@Injectable({ providedIn: 'root' })
export class ModalService {
  isOpen = signal(false);
  title = signal<string>('');
  action = signal<TypeAction>('');
  id = signal<number>(0);
  typeItem = signal<TypeItem>('');

  // formFactory = inject(FormFactoryService);

  open(title: string = '', action: TypeAction = '', typeItem: TypeItem = '', id: number = 0) {
    this.title.set(title);
    this.action.set(action);
    this.typeItem.set(typeItem);
    this.id.set(id);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
