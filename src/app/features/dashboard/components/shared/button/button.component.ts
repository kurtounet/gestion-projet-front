import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="buttonClasses"
      (click)="onClick($event)"
    >
      @if (loading()) {
        <span class="spinner"></span>
      } @else {
        @if (icon()) {
          <i [class]="icon()"></i>
        }
        <ng-content></ng-content>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  icon = input<string | null>(null);
  customClass = input<string>('');

  btnClick = output<MouseEvent>();

  get buttonClasses(): string {
    const classes = ['btn'];
    classes.push(`btn-${this.variant()}`);
    if (this.size() !== 'md') {
      classes.push(`btn-${this.size()}`);
    }
    if (this.loading()) {
      classes.push('is-loading');
    }
    if (this.customClass()) {
      classes.push(this.customClass());
    }
    return classes.join(' ');
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.btnClick.emit(event);
    }
  }
}
