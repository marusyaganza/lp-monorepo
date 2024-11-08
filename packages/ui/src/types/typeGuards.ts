import { DefExample, WordDefinition } from '../generated/graphql';

export function isNotEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isDef(data?: object | null): data is WordDefinition {
  return data ? 'def' in data && isNotEmptyString(data.def) : false;
}

export function isExample(data?: object | null): data is DefExample {
  return data ? 'text' in data && isNotEmptyString(data.text) : false;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isTypedArray<T>(
  data: any,
  validator: (arg: any) => arg is T
): data is T[] {
  if (!Array.isArray(data)) {
    return false;
  }
  const hasInvalidElements = data?.some(item => !validator(item));
  return !hasInvalidElements;
}
