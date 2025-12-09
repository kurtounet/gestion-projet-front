import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Signal,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { IContextMenuItem } from '../../models/components/context-menu-item.model';


@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
})
export class ContextMenuComponent {
  items = input<IContextMenuItem[]>([]);
  align = input<'left' | 'right'>('right');

  @Output() action = new EventEmitter<IContextMenuItem>();

  open = signal(false);

  @ViewChild('menuPanel') menuPanel?: ElementRef<HTMLDivElement>;

  private host = inject(ElementRef<HTMLElement>);

  toggle(event?: MouseEvent) {
    // évite que le clic remonte au document
    event?.stopPropagation();
    this.open.update(v => !v);
  }

  close() {
    this.open.set(false);
  }

  onItemClick(item: IContextMenuItem) {
    if (item.disabled) return;
    this.action.emit(item);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  baseItemClasses =
    'flex w-full items-center justify-between text-sm py-1.5 px-2 ' +
    'rounded hover:cursor-pointer select-none';

  itemClasses(item: IContextMenuItem) {
    return {
      [this.baseItemClasses]: true,
      'hover:bg-gray-100':
        !item.danger && !item.disabled,
      'hover:bg-red-50 text-red-600':
        item.danger && !item.disabled,
      'opacity-50 cursor-not-allowed':
        item.disabled,
    };
  }
}
