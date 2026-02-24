import { Component, input, signal, computed, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-textarea-component',
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

      <textarea
        [value]="value()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [rows]="rows()"
        (input)="handleInput($event)"
        (blur)="onTouched()"
        [class.is-invalid]="hasError()"
      ></textarea>

      @if (hasError()) {
        <div class="error-msg">
          @if (ngControl.errors?.['required']) {
            Ce champ est obligatoire
          }
          @if (ngControl.errors?.['minlength']) {
            Minimum {{ ngControl.errors?.['minlength'].requiredLength }} caractères
          }
          @if (ngControl.errors?.['maxlength']) {
            Max atteint
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.2rem;
      font-weight: 500;
      color: #333;
    }
    .required {
      color: #e74c3c;
    }
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
      box-sizing: border-box;
      resize: vertical;
      font-family: inherit;
    }
    textarea:focus {
      outline: none;
      border-color: #3498db;
    }
    textarea.is-invalid {
      border-color: #e74c3c;
    }
    textarea:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
    .error-msg {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `]
})
export class FormTextareaComponent implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  required = input<boolean>(false);
  rows = input<number>(3);

  value = signal<string>('');
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
    this.value.set(value || '');
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

  handleInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value.set(val);
    this.onChange(val);
  }
}
