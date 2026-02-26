import { Component, input, signal, computed, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-file-picker-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-group">
      @if (label()) {
        <label
          >{{ label() }}
          @if (required()) {
            <span class="required">*</span>
          }
        </label>
      }

      <div class="file-container" [class.is-invalid]="hasError()" [class.disabled]="isDisabled()">
        <input
          #fileInput
          type="file"
          (change)="onFileSelected($event)"
          [accept]="accept()"
          [disabled]="isDisabled()"
          style="display: none"
        />

        <div class="file-info">
          @if (fileName()) {
            <span class="file-name">{{ fileName() }}</span>
          } @else {
            <span class="placeholder">{{ placeholder() || 'Aucun fichier sélectionné' }}</span>
          }
        </div>

        <button
          type="button"
          class="browse-btn"
          (click)="fileInput.click()"
          [disabled]="isDisabled()"
        >
          Parcourir
        </button>
      </div>

      @if (hasError()) {
        <div class="error-msg">
          @if (ngControl.errors?.['required']) {
            Ce champ est obligatoire
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .file-container {
        display: flex;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        transition: border-color 0.3s;
      }
      .file-container.is-invalid {
        border-color: #e74c3c;
      }
      .file-container.disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
      .file-info {
        flex: 1;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        min-width: 0;
      }
      .file-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333;
      }
      .placeholder {
        color: #999;
      }
      .browse-btn {
        padding: 0.5rem 1rem;
        background: #3498db;
        color: white;
        border: none;
        border-left: 1px solid #ddd;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }
      .browse-btn:hover:not(:disabled) {
        background: #2980b9;
      }
      .browse-btn:disabled {
        background: #bdc3c7;
        cursor: not-allowed;
      }
    `,
  ],
})
export class FormFilePickerComponent implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  required = input<boolean>(false);
  accept = input<string>('*');

  fileName = signal<string>('');
  isDisabled = signal<boolean>(false);

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  hasError = computed(() => {
    return !!(this.ngControl?.invalid && (this.ngControl?.touched || this.ngControl?.dirty));
  });

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    // Si c'est un chemin ou un nom de fichier stocké en string
    if (typeof value === 'string') {
      this.fileName.set(value.split(/[\\/]/).pop() || '');
    } else if (value instanceof File) {
      this.fileName.set(value.name);
    } else {
      this.fileName.set('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.[0];
    if (file) {
      this.fileName.set(file.name);
      this.onChange(file); // On propage l'objet File au formulaire parent
    }
  }
}
