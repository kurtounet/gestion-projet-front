import { I } from '@angular/cdk/keycodes';
import { inject, Injectable, signal } from '@angular/core';
import { FormFactoryService } from './form-factory.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
  isOpen = signal(false);
  title = signal<string>('');
  action = signal<string>('');
  id = signal<number>(0);
  typeItem = signal<string>('');

  formFactory = inject(FormFactoryService);

  open(title: string = '', action: string = '', typeItem: string = '', id: number = 0) {
    this.title.set(title);
    this.action.set(action);
    this.typeItem.set(typeItem);
    this.id.set(id);
    this.isOpen.set(true);
    console.log('modal open', this.isOpen);
  }

  close() {
    this.isOpen.set(false);
  }
}
