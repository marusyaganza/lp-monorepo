import _ from 'lodash';
import { generateOptions } from '../../helpers';
import { Language, Word } from '../../../generated/graphql';
import { madeUphWords } from '../../../constants/madeUpWord';

describe('generateOptions', () => {
  const data = [
    { id: '1', name: 'word1', shortDef: ['definition1'] },
    { id: '2', name: 'word2', shortDef: ['definition2'] },
    { id: '3', name: 'word3', shortDef: ['definition3'] }
  ] as Word[];

  const currentWord = {
    id: '1',
    name: 'word1',
    shortDef: ['definition1']
  } as Word;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct number of options when data has enough words', () => {
    const count = 2;
    const options = generateOptions(data, count, currentWord, Language.English);
    expect(options.length).toBe(count);
    expect(_.shuffle).toHaveBeenCalled();
    expect(_.take).toHaveBeenCalledWith([data[1], data[2]], count - 1);
  });

  it('should throw an error if there are not enough words to generate options', () => {
    const count = 10;
    expect(() => {
      generateOptions(data, count, currentWord, Language.English);
    }).toThrow('Not enough words to generate options.');
  });

  it('should fill options from made-up words when not enough words in data', () => {
    const count = 4;
    const options = generateOptions(data, count, currentWord, Language.English);
    expect(options.length).toBe(count);

    const optCandidates = data.filter(word => word.id !== currentWord.id);
    const extraWords = madeUphWords[Language.English];
    expect(_.take).toHaveBeenCalledWith(
      extraWords,
      count - optCandidates.length - 1
    );
    expect(_.shuffle).toHaveBeenCalled();
  });

  it('should include current word in the final options', () => {
    const count = 3;
    const options = generateOptions(data, count, currentWord, Language.English);
    expect(options.length).toBe(count);
    expect(options).toContainEqual(currentWord);
    expect(_.shuffle).toHaveBeenCalled();
  });

  it('should generate options correctly in a different language', () => {
    const count = 3;
    const options = generateOptions([], count, currentWord, Language.Spanish);

    const extraWords = madeUphWords[Language.Spanish];
    expect(_.take).toHaveBeenCalledWith(extraWords, count - 1);
    expect(options.length).toBe(count);
    expect(_.shuffle).toHaveBeenCalled();
  });

  it('should handle exactly enough words in data without using made-up words', () => {
    const count = 2;
    const optCandidates = data.filter(word => word.id !== currentWord.id);
    const options = generateOptions(data, count, currentWord, Language.English);

    expect(_.take).toHaveBeenCalledWith(optCandidates, count - 1);
    expect(_.shuffle).toHaveBeenCalled();
    expect(options.length).toBe(count);
    expect(options).toContainEqual(currentWord);
  });

  it('should return a shuffled array of options', () => {
    const count = 3;
    const options = generateOptions(data, count, currentWord, Language.English);

    expect(_.shuffle).toHaveBeenCalled();
    expect(options.length).toBe(count);
  });
});
