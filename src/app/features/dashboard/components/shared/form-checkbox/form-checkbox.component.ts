import { Component, input, signal, computed, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-checkbox-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-check">
      <label class="checkbox-container">
        <input
          type="checkbox"
          [checked]="value()"
          [disabled]="isDisabled()"
          (change)="handleChange($event)"
          (blur)="onTouched()"
          [class.is-invalid]="hasError()"
        />
        <span class="checkmark"></span>
        @if (label()) {
          <span class="label-text">
            {{ label() }}
            @if (required()) {
              <span class="required">*</span>
            }
          </span>
        }
      </label>

      @if (hasError()) {
        <div class="error-msg">
          @if (ngControl.errors?.['required']) {
            Ce champ est obligatoire
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
    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      font-weight: 500;
      color: #333;
    }
    input {
      margin-right: 0.5rem;
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
    }
    .required {
      color: #e74c3c;
      margin-left: 2px;
    }
    .error-msg {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    input.is-invalid {
      outline: 1px solid #e74c3c;
    }
  `]
})
export class FormCheckboxComponent implements ControlValueAccessor {
  label = input<string>('');
  required = input<boolean>(false);

  value = signal<boolean>(false);
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
    this.value.set(!!value);
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

  handleChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.value.set(isChecked);
    this.onChange(isChecked);
  }
}
