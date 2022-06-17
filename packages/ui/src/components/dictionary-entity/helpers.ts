export const CLOSING = ['{/phrase}', '{/it}'];
export const OPENING = ['{it}', '{phrase}'];

export const cleanString = (string: string) => string.replace(/{.*?}/g, '');
export const isSuff = (string: string, criteria:string[] = []) => {
  return criteria.some(item => string.includes(item));
};
