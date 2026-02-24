import { Component, input, signal, computed, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  id?: number | string;
  name?: string;
  label?: string; // Pour la compatibilité
  value?: any;
}

@Component({
  selector: 'form-select-component', // Doit matcher votre HTML
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.css',
})
export class FormSelectComponent implements ControlValueAccessor {
  label = input<string>('');
  options = input<SelectOption[]>([]);
  selectedOption = input<string>('');
  placeholder = input<string>('');
  required = input<boolean>(false);

  value = signal<any>('');
  isDisabled = signal<boolean>(false);
   

  // L'injection de NgControl lie le composant au formControlName "status" du parent
  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
   
  }
  hasError = computed(() => {
    return !!(this.ngControl?.invalid && (this.ngControl?.touched ?? this.ngControl?.dirty));
  });

  // --- Implémentation ControlValueAccessor ---
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {     
    this.value.set(value !== undefined && value !== null ? value : '');
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

  handleSelect(event: Event): void {
  const val = (event.target as HTMLSelectElement).value;
  this.value.set(val); // Met à jour le signal local
  this.onChange(val);  // Informe le Reactive Form du parent
  this.onTouched();   // Marque le champ comme "manipulé" pour la validation
}
}
