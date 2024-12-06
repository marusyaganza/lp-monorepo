import { DictionaryWord, Role, Suggestions } from '../generated/graphql';
import {
  IAutenticatedContext,
  IResolverContext,
  IUserTokenInfo,
  IWordWithAudio
} from './types';

export function isSuggestion(data: any): data is Suggestions {
  return 'suggestions' in data;
}

export function isAutenticatedContext(
  context: IResolverContext
): context is IAutenticatedContext {
  return typeof context?.user?.id === 'string';
}

export function assertIsTypedArray<T>(
  data: any,
  validator: (arg: any) => arg is T
): asserts data is T[] {
  if (!Array.isArray(data)) {
    throw new Error(`not an array, ${JSON.stringify(data)}`);
  }
  if (data.some(item => !validator(item))) {
    throw new Error('Data is invalid');
  }
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

export function isWordWithAudio(data: any): data is IWordWithAudio {
  return 'audioUrl' in data;
}

export function isDictionaryWord(data: any): data is DictionaryWord {
  return (
    typeof data?.uuid === 'string' &&
    typeof data?.name === 'string' &&
    Array.isArray(data?.shortDef)
  );
}

export function isString(data: any): data is string {
  return typeof data === 'string';
}

export function assertIsUserTokenInfo(
  data: any
): asserts data is IUserTokenInfo {
  const isValid =
    typeof data?.id === 'string' && Object.values(Role).includes(data?.role);
  if (!isValid) {
    throw new Error('invalid User token data');
  }
}

export function isUserTokenInfo(data: any): data is IUserTokenInfo {
  const isValid =
    typeof data?.id === 'string' && Object.values(Role).includes(data?.role);
  return isValid;
}
