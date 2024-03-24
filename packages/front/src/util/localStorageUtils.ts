import { Language, SortBy, SortWordsBy } from '../generated/graphql';

type UserDataType = {
  token: string;
  userId: string;
  expiration: string;
};

export interface StoredData {
  language: Language;
  userData: UserDataType;
  previousLocation: string;
  gamesSortOrder: boolean;
  sortGamesBy: SortBy;
  wordsSortOrder: boolean;
  sortWordsBy: SortWordsBy;
  tags?: string[];
  gameTags?: string[];
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
  if (!data || !propName) {
    return;
  }
  localStorage.setItem(propName, JSON.stringify(data));
}
