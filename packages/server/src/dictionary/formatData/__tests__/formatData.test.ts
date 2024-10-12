import murtherWord from '../../fetchWord/mockFetchWord/mocks/ENGLISH/murther';
import heartWord from '../../fetchWord/mockFetchWord/mocks/ENGLISH/heart';
import tenerWord from '../../fetchWord/mockFetchWord/mocks/SPANISH/tener';
import idiomaWord from '../../fetchWord/mockFetchWord/mocks/SPANISH/idioma';
import suggestions from '../../fetchWord/mockFetchWord/mocks/ENGLISH/suggestions';
import { formatData } from '../merriamWebster/formatData';

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

describe('formatData', () => {
  test('should return correct result with Spanish verbs', async () => {
    const result = formatData(tenerWord);
    expect(result).toHaveLength(10);
    expect(result[0]).toMatchSnapshot();
  });

  test('should return correct result with Spanish noun', async () => {
    const result = formatData(idiomaWord);
    expect(result).toHaveLength(1);
    expect(result).toMatchSnapshot();
  });

  test('should return correct result minimal English words', async () => {
    const result = formatData(murtherWord);
    expect(result).toMatchSnapshot();
  });

  test('should return correct result with complex English words', async () => {
    const result = formatData(heartWord);
    expect(result).toMatchSnapshot();
  });

  test('should return [] with incomplete data', async () => {
    const result = formatData([incompleteWord]);
    expect(result).toEqual([]);
  });

  test('should return suggestions', async () => {
    const result = formatData(suggestions);
    expect(result).toEqual([{ suggestions }]);
  });
});
