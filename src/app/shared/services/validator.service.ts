import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordComplexityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const minLength = value.length >= 5;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && minLength;

    if (!passwordValid) {
      return {
        passwordComplexity: true
      };
    }

    return null;
  };
}
