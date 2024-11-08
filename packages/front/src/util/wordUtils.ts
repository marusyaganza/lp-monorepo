type TypedData = { __typename?: string };

export function removeTypenames<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(item => removeTypenames(item)) as unknown as T;
  }

  if (obj && typeof obj === 'object') {
    const result: Partial<T> = { ...obj };

    if ('__typename' in result) {
      delete (result as TypedData).__typename;
    }

    for (const key in result) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = removeTypenames(result[key]);
      }
    }

    return result as T;
  }

  return obj;
}
