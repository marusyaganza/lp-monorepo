/** Validators that don't accept arguments */
export enum Validator {
  /**the value can't be emply */
  REQUIRE = 'REQUIRE',
  /**the value is email */
  EMAIL = 'EMAIL',
  /**the value contains at least one capital letter, one special symbol and one mumber */
  PASSWORD = 'PASSWORD'
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
      const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!?@#$%^&*]{6,16}$/;
      isValid = isValid && regExp.test(value);
    }
  });
  return isValid;
}
