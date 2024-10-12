import murtherWord from '../../fetchWord/mockFetchWord/mocks/ENGLISH/murther';
import heartWord from '../../fetchWord/mockFetchWord/mocks/ENGLISH/heart';
import caerWord from '../../fetchWord/mockFetchWord/mocks/SPANISH/caerse';
import idiomaWord from '../../fetchWord/mockFetchWord/mocks/SPANISH/idioma';
import { formatDictionaryWord } from '../merriamWebster/formatDictionaryWord';

const incompleteWord = {
  meta: {
    id: 'voluminous',
    uuid: '0d01b967-971f-4ec5-8fe0-10513d29c39b'
  },
  hwi: {
    hw: 'vo*lu*mi*nous'
  },
  fl: 'adjective',
  shortdef: [
    'having or marked by great volume or bulk : large; also : full',
    'numerous',
    'filling or capable of filling a large volume or several volumes'
  ]
};

describe('formatDictionaryWord', () => {
  test('should return correct result with Spanish verb', async () => {
    const result = formatDictionaryWord(caerWord[0]);
    expect(result?.conjugation).toHaveLength(20);
    expect(result).toMatchSnapshot();
  });

  test('should return correct result with Spanish noun', async () => {
    const result = formatDictionaryWord(idiomaWord[0]);
    expect(result).toMatchSnapshot();
  });

  test('should return correct result minimal English word', async () => {
    // @ts-expect-error: testing with incomplete data
    const result = formatDictionaryWord(murtherWord[0]);
    expect(result).toMatchSnapshot();
  });

  test('should return correct result with complex English word', async () => {
    // @ts-expect-error: testing with incomplete data
    const result = formatDictionaryWord(heartWord[0]);
    expect(result).toMatchSnapshot();
  });

  test('should return undefined with incomplete data', async () => {
    // @ts-expect-error: testing with incomplete data
    const result = formatDictionaryWord(incompleteWord);
    expect(result).toBe(undefined);
  });
});
