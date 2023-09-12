import { Language, SortBy } from '../generated/graphql';

type UserDataType = {
  token: string;
  userId: string;
  expiration: string;
};

export interface StoredData {
  language: Language;
  userData: UserDataType;
  isReverseOrder: boolean;
  previousLocation: string;
  sortBy: SortBy | string;
}

type PropName = keyof StoredData & string;

export function getStoredData<T extends PropName>(
  propName: PropName
): StoredData[T] | undefined {
  const storedData = localStorage.getItem(propName);
  if (!storedData) {
    return;
  }
  return JSON.parse(storedData);
}

export function storeData<T extends PropName>(
  propName: PropName,
  data: StoredData[T]
) {
  localStorage.setItem(propName, JSON.stringify(data));
}
