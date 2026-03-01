import { inject, Injectable, signal } from '@angular/core';

export type TypeItem =
  | ''
  | 'project'
  | 'sprint'
  | 'task'
  | 'framework'
  | 'user'
  | 'role'
  | 'permission';
export type TypeAction = '' | 'create' | 'edit' | 'delete';
export type TypeResponse = null | 'yes' | 'no';

@Injectable({ providedIn: 'root' })
export class DialogService {
  id = signal<number>(0);
  isOpen = signal(false);
  message = signal<string>('');
  action = signal<TypeAction>('');
  typeItem = signal<TypeItem>('');
  response = signal<TypeResponse>(null);

  private resolveCallback?: (value: TypeResponse) => void;

  // formFactory = inject(FormFactoryService);

  open(
    message: string = '',
    action: TypeAction = '',
    typeItem: TypeItem = '',
    id: number = 0,
  ): Promise<TypeResponse> {
    this.isOpen.set(true);
    this.message.set(message);
    this.action.set(action);
    this.typeItem.set(typeItem);
    this.id.set(id);
    this.response.set(null);

    return new Promise((resolve) => {
      this.resolveCallback = resolve;
    });
  }

  close(res: TypeResponse = null) {
    this.isOpen.set(false);
    this.response.set(res);
    if (this.resolveCallback) {
      this.resolveCallback(res);
      this.resolveCallback = undefined;
    }
  }
}
