import { useReducer, useCallback } from 'react';

// const INPUT_CHANGE = 'INPUT_CHANGE';
// const CONFIGURE_FORM = 'CONFIGURE_FORM';

export enum FormAction {
  INPUT_CHANGE = 'INPUT_CHANGE'
  // CONFIGURE_FORM = 'CONFIGURE_FORM'
}

export type FormActionType<T extends Record<string, unknown>> = {
  type: FormAction;
  payload: Partial<T>;
};

export function formReducer<T extends Record<string, unknown>>(
  state: T,
  action: FormActionType<T>
): T {
  const { type, payload } = action;
  if (type === FormAction.INPUT_CHANGE) {
    // const { name, value } = payload;
    // const inputs = {
    //   ...state,
    //   ...payload
    // };
    // const elements = Object.values(inputs);
    // const formIsValid = !elements.some(el => !el.isValid);
    return {
      ...state,
      ...payload
      // isValid: formIsValid,
      // inputs
    };
  }
  // if (type === CONFIGURE_FORM) {
  //   const { fields, initialState } = payload;
  //   if (!fields || !initialState) {
  //     return state;
  //   }
  //   const fieldsKeys = fields.map(item => item.name);
  //   const { inputs } = state;
  //   const currentInputs = Object.keys(inputs);
  //   const newInputs = { ...inputs };
  //   let newFields;
  //   if (fieldsKeys.length === currentInputs.length) {
  //     return state;
  //   }
  //   if (fields.length > currentInputs.length) {
  //     newFields = fieldsKeys.filter(i => !newInputs.includes(i));
  //     newFields.forEach(field => {
  //       newInputs[field] = initialState[field];
  //       return {
  //         isValid: false,
  //         inputs: newInputs
  //       };
  //     });
  //   } else {
  //     newFields = currentInputs.filter(i => !fieldsKeys.includes(i));
  //     newFields.forEach(input => {
  //       delete newInputs[input];
  //     });
  //     return {
  //       isValid: state.isValid,
  //       inputs: newInputs
  //     };
  //   }
  // }
  return state;
}

export type FormValidator = {
  validate: (val?: any) => boolean;
  errorText: string;
};

export type FormValidators<T> = Partial<
  Record<keyof T & string, FormValidator>
>;

//TODO add a new property to signal if values of the form have been changed
export function useForm<T extends Record<string, unknown>>(
  initialState: T,
  validators?: FormValidators<T>
): {
  values: T;
  changeHandler: (val: T) => void;
  validate: () => { isValid: boolean; errors: Record<string, string> };
}[] {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const changeHandler = useCallback(
    (payload: Partial<T>) => {
      dispatch({ type: FormAction.INPUT_CHANGE, payload });
    },
    [dispatch]
  );

  const validate = () => {
    let isValid = true;
    const errors: Record<string, string> = {};
    if (!validators) {
      return { isValid, errors };
    }
    const fields = Object.keys(validators);
    fields.forEach(field => {
      const validator = validators[field];
      if (validator) {
        const isFieldValid = validator.validate(state[field]);
        isValid = isValid && isFieldValid;
        if (!isFieldValid) {
          errors[field] = validator.errorText;
        }
      }
    });
    return { isValid, errors };
  };

  // const setFormData = useCallback(
  //   (fields, initialConfig) => {
  //     dispatch({
  //       type: CONFIGURE_FORM,
  //       payload: { fields, initialState: initialConfig }
  //     });
  //   },
  //   [dispatch]
  // );
  const values = state as T;
  return [{ values, changeHandler, validate }];
}
