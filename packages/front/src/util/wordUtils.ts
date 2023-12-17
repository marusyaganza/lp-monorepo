import { WordDefinition, DefsInput, InputMaybe } from '../generated/graphql';

type TypedData = {
  __typename?: string;
};

// TODO trim all string values
export function removeTypenames<T>(obj: T & TypedData): T {
  if (Array.isArray(obj)) {
    // @ts-ignore
    return obj.map(removeTypenames);
  }
  if (typeof obj === 'string') {
    // @ts-ignore
    return obj?.trim();
  }
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const result = { ...obj };
  if (result?.__typename) {
    delete result.__typename;
  }
  const keys = Object.keys(result) as (keyof T & string)[];
  keys.forEach(key => {
    const val = result[key];
    // @ts-ignore
    result[key] = removeTypenames(val);
  });
  return result;
}

interface WordWithDefs {
  defs?: InputMaybe<InputMaybe<DefsInput>[]>;
  shortDef?: InputMaybe<InputMaybe<string>[]>;
}

export function cleanDefs<T extends WordWithDefs>(word: T): T {
  const { defs } = word;
  if (!defs) {
    return word;
  }
  const cleanedDefs = defs
    .map(item => {
      return {
        def: item?.def,
        examples: item?.examples?.filter(ex => ex?.text)
      };
    })
    .filter(item => item?.def) as WordDefinition[];
  return {
    ...word,
    defs: cleanedDefs,
    shortDef: word?.shortDef?.filter(Boolean)
  };
}
