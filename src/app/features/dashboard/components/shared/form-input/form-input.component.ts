import { Component, input, signal, computed, inject, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-input-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
  // 💡 Note : On SUPPRIME le tableau 'providers' avec NG_VALUE_ACCESSOR
  // car on va injecter NgControl directement.
})
export class FormInputComponent implements ControlValueAccessor {
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  required = input<boolean>(false);

  value = signal<any>('');
  isDisabled = signal<boolean>(false);

  // 💡 L'astuce Angular 21 : Injecter NgControl pour accéder au statut du parent
  // @Self() garantit qu'on récupère le control lié à CE composant précisément
  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // Computed pour savoir si on affiche une erreur (statut du parent + état local)
  hasError = computed(() => {
    return !!(this.ngControl?.invalid && (this.ngControl?.touched || this.ngControl?.dirty));
  });

  // Méthodes CVA
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
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }
}
