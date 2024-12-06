import {
  isDef,
  isNotEmptyString,
  isString,
  isTypedArray
} from '../types/typeGuards';

/** Validators that don't accept arguments */
export enum Validator {
  /**the value can't be emply */
  REQUIRE = 'REQUIRE',
  /**the value is email */
  EMAIL = 'EMAIL',
  /**the value contains at least one capital letter, one special symbol and one mumber */
  PASSWORD = 'PASSWORD',
  /**the color hex value, for example #c0c0c0 */
  COLOR = 'COLOR'
}

/** Validators that accept arguments */
export enum ValidatorWithArgs {
  /**lenght if value is >= */
  MINLENGTH = 'MINLENGTH',
  /**lenght if value is <= */
  MAXLENGTH = 'MAXLENGTH'
}
/**@internal */
type _validatorWithArgsType = { type: ValidatorWithArgs; val: number };
/**@internal */
type _validatorWithoutArgsType = { type: Validator };

/**Validator that can be used to validate form values */
export type validatorType = _validatorWithArgsType | _validatorWithoutArgsType;

/**
 * List of all validators available
 */
export const validators = {
  EMAIL: (): _validatorWithoutArgsType => ({ type: Validator.EMAIL }),
  PASSWORD: (): _validatorWithoutArgsType => ({ type: Validator.PASSWORD }),
  REQUIRE: () => ({ type: Validator.REQUIRE }),
  COLOR: () => ({ type: Validator.COLOR }),
  MINLENGTH: (val: number) => ({
    type: ValidatorWithArgs.MINLENGTH,
    val
  }),
  [ValidatorWithArgs.MAXLENGTH]: (val: number) => ({
    type: ValidatorWithArgs.MAXLENGTH,
    val
  })
};
/**
 * Validates form values
 * @param value - value to validate
 * @param validators - array of validators
 * @returns true if valid and false othervise
 */
export function validate(value: string, validators: validatorType[]) {
  let isValid = true;
  validators.forEach(validator => {
    if (validator.type === Validator.REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === ValidatorWithArgs.MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === ValidatorWithArgs.MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === Validator.EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === Validator.PASSWORD) {
      const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!?@#$%^&*]{6,26}$/;
      isValid = isValid && regExp.test(value);
    }
    if (validator.type === Validator.COLOR) {
      const regExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      isValid = isValid && regExp.test(value);
    }
  });
  return isValid;
}

export type FormValidator = {
  validate: (val?: any) => boolean;
  errorText: string;
};

export function validateFormValues<T>(
  validators: Partial<Record<keyof T, FormValidator>>,
  values: T
) {
  let isValid = true;
  const errors: Partial<Record<keyof T, string>> = {};
  if (!validators) {
    return { isValid, errors };
  }
  const fields = Object.keys(validators) as (keyof T)[];
  fields.forEach(field => {
    const validator = validators[field];
    if (validator) {
      const isFieldValid = validator.validate(values[field]);
      isValid = isValid && isFieldValid;
      if (!isFieldValid) {
        errors[field] = validator.errorText;
      }
    }
  });
  return { isValid, errors };
}

export const defsValidator: FormValidator = {
  validate: (data: unknown) => isTypedArray(data, isDef) && data.length > 0,
  errorText: 'definition value cannot be empty'
};

export const stringArrayValidator: FormValidator = {
  validate: (data: unknown) =>
    isTypedArray(data, isNotEmptyString) && data.length > 0,
  errorText: 'value cannot be empty'
};

export const colorValidator: FormValidator = {
  validate: (val: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val),
  errorText: 'color should be a valid hex color'
};

export function getStringValidator(name = ''): FormValidator {
  return {
    validate: (data: unknown) => isString(data) && data.length > 0,
    errorText: `${name} value cannot be empty`.trim()
  };
}
