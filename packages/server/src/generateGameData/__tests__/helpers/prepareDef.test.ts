import { prepareDef } from '../../helpers';

describe('prepareDef', () => {
  it('should return an empty string if def is undefined', () => {
    const result = prepareDef(undefined, 'test');
    expect(result).toBe('');
  });

  it('should return an empty string if def is null', () => {
    const result = prepareDef(null, 'test');
    expect(result).toBe('');
  });

  it('should return an empty string if name is undefined', () => {
    const result = prepareDef('This is a test definition.', undefined);
    expect(result).toBe('');
  });

  it('should return an empty string if name is null', () => {
    const result = prepareDef('This is a test definition.', null);
    expect(result).toBe('');
  });

  it('should replace occurrences of the name in the middle of the definition', () => {
    const def = 'The test is a common procedure. This test will be repeated.';
    const name = 'test';
    const result = prepareDef(def, name);
    expect(result).toBe(
      'The [...] is a common procedure. This [...] will be repeated.'
    );
  });

  it('should replace occurrences of the name at the beginning of the definition', () => {
    const def = 'Test is very important in science.';
    const name = 'test';
    const result = prepareDef(def, name);
    expect(result).toBe('[...] is very important in science.');
  });

  it('should replace occurrences of the name at the end of the definition', () => {
    const def = 'This is a very important test';
    const name = 'test';
    const result = prepareDef(def, name);
    expect(result).toBe('This is a very important [...]');
  });

  it('should handle mixed case for the name', () => {
    const def = 'This Test is important. Test it well.';
    const name = 'test';
    const result = prepareDef(def, name);
    expect(result).toBe('This [...] is important. [...] it well.');
  });

  it('should not replace partial word matches', () => {
    const def = 'Testing is important, but not the same as a test.';
    const name = 'test';
    const result = prepareDef(def, name);
    expect(result).toBe('Testing is important, but not the same as a [...].');
  });
});
