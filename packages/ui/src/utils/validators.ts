export enum Validator {
  REQUIRE = 'REQUIRE',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD'
}

export enum ValidatorWithArgs {
  MINLENGTH = 'MINLENGTH',
  MAXLENGTH = 'MAXLENGTH'
}

export type validatorWithArgsType = { type: ValidatorWithArgs; val: number };
export type validatorWithoutArgsType = { type: Validator };
export type validatorType = validatorWithArgsType | validatorWithoutArgsType;

export type validatorFabricType = () => validatorWithoutArgsType;
export type validatorWithArgsFabricType = (
  value: number
) => validatorWithArgsType;
export type validateFuncType = (
  value: string,
  validators: validatorType[]
) => boolean;

export const validators = {
  EMAIL: (): validatorWithoutArgsType => ({ type: Validator.EMAIL }),
  PASSWORD: (): validatorWithoutArgsType => ({ type: Validator.PASSWORD }),
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
 * @public
 * @param value - value to validate
 * @param validators - array of validators
 * @returns true if valid and false othervise
 */
export const validate: validateFuncType = (value, validators) => {
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
      const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      isValid = isValid && regExp.test(value);
    }
  });
  return isValid;
};
