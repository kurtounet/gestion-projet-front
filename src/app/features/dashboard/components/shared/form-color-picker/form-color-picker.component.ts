import { Component, input, signal, computed, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-color-picker-component',
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

      <div class="picker-container">
        <input
          type="color"
          [value]="value()"
          [disabled]="isDisabled()"
          (input)="handleInput($event)"
          (blur)="onTouched()"
          [class.is-invalid]="hasError()"
        />
        <input
          type="text"
          [value]="value()"
          [disabled]="isDisabled()"
          (input)="handleInput($event)"
          (blur)="onTouched()"
          placeholder="#000000"
          class="hex-input"
        />
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
      .picker-container {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      input[type='color'] {
        width: 40px;
        height: 40px;
        padding: 0;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        background: none;
      }
      .hex-input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        font-family: monospace;
        text-transform: uppercase;
      }
      .hex-input:focus {
        outline: none;
        border-color: #3498db;
      }
    `,
  ],
})
export class FormColorPickerComponent implements ControlValueAccessor {
  label = input<string>('');
  required = input<boolean>(false);

  value = signal<string>('#000000');
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
    this.value.set(value || '#000000');
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
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }
}
