import { DefExample, WordDefinition } from '../../../generated/graphql';
import { getExamples } from '../../helpers';

describe('getExamples', () => {
  it('should return undefined if defs is not an array', () => {
    expect(getExamples(null)).toBeUndefined();
    expect(getExamples(undefined)).toBeUndefined();
    expect(
      getExamples('not an array' as unknown as WordDefinition[])
    ).toBeUndefined();
  });

  it('should return an empty array if defs is an empty array', () => {
    expect(getExamples([])).toEqual([]);
  });

  it('should return examples from valid definitions', () => {
    const defs: WordDefinition[] = [
      { def: 'Definition 1', examples: [{ text: 'Example 1' }] },
      {
        def: 'Definition 2',
        examples: [{ text: 'Example 2', translation: 'Translation 2' }]
      }
    ];

    const expected: DefExample[] = [
      { text: 'Example 1' },
      { text: 'Example 2', translation: 'Translation 2' }
    ];

    expect(getExamples(defs)).toEqual(expected);
  });

  it('should ignore definitions without examples', () => {
    const defs: WordDefinition[] = [
      { def: 'Definition 1' }, // No examples
      { def: 'Definition 2', examples: [{ text: 'Example 2' }] }
    ];

    const expected: DefExample[] = [{ text: 'Example 2' }];

    expect(getExamples(defs)).toEqual(expected);
  });

  it('should ignore null or undefined defs within the array', () => {
    const defs: (WordDefinition | null)[] = [
      null,
      { def: 'Definition 1', examples: [{ text: 'Example 1' }] },
      // @ts-expect-error: testing incorrect args case
      undefined
    ];

    const expected: DefExample[] = [{ text: 'Example 1' }];

    expect(getExamples(defs)).toEqual(expected);
  });

  it('should return a maximum of 5 examples', () => {
    const defs: WordDefinition[] = [
      { def: 'Definition 1', examples: [{ text: 'Example 1' }] },
      { def: 'Definition 2', examples: [{ text: 'Example 2' }] },
      { def: 'Definition 3', examples: [{ text: 'Example 3' }] },
      { def: 'Definition 4', examples: [{ text: 'Example 4' }] },
      { def: 'Definition 5', examples: [{ text: 'Example 5' }] },
      { def: 'Definition 6', examples: [{ text: 'Example 6' }] }
    ];

    const expected: DefExample[] = [
      { text: 'Example 1' },
      { text: 'Example 2' },
      { text: 'Example 3' },
      { text: 'Example 4' },
      { text: 'Example 5' }
    ];

    expect(getExamples(defs)).toEqual(expected);
  });

  it('should handle mixed valid and invalid examples', () => {
    const defs: (WordDefinition | null)[] = [
      { def: 'Definition 1', examples: [{ text: 'Example 1' }] },
      null,
      {
        def: 'Definition 2',
        examples: [{ text: 'Example 2', translation: 'Translation 2' }]
      },
      // @ts-expect-error: testing incorrect args case
      undefined,
      { def: 'Definition 3', examples: [] } // No valid examples
    ];

    const expected: DefExample[] = [
      { text: 'Example 1' },
      { text: 'Example 2', translation: 'Translation 2' }
    ];

    expect(getExamples(defs)).toEqual(expected);
  });

  it('should return empty array if there are no valid examples', () => {
    const defs: WordDefinition[] = [
      { def: 'Definition 1' }, // No examples
      { def: 'Definition 2', examples: [] } // Empty examples array
    ];

    expect(getExamples(defs)).toEqual([]);
  });
});
