import { caesar } from '../src/index';

const sentence = 'friday is best day of the week';

describe('with small offset', () => {
  const encodedSentence = 'iulgdb lv ehvw gdb ri wkh zhhn';
  it('encodes sentence with small offset', () => {
    const { encode } = caesar({ encryptionOffset: 3 });
    expect(encode(sentence)).toBe(encodedSentence);
  });

  it('decodes sentence with small offset', () => {
    const { decode } = caesar({ encryptionOffset: 3 });
    expect(decode(encodedSentence)).toBe(sentence);
  });
});

describe('with big offset', () => {
  const encodedSentence = 'htkfca ku dguv fca qh vjg yggm';
  it('encodes sentence with big offset', () => {
    const { encode } = caesar({ encryptionOffset: 340 });
    expect(encode(sentence)).toBe(encodedSentence);
  });

  it('decodes sentence with big offset', () => {
    const { decode } = caesar({ encryptionOffset: 340 });
    expect(decode(encodedSentence)).toBe(sentence);
  });
});

describe('with negative offset', () => {
  const encodedSentence = 'lxojge oy hkyz jge ul znk ckkq';
  it('encodes sentence with negative offset', () => {
    const { encode } = caesar({ encryptionOffset: -20 });
    expect(encode(sentence)).toBe(encodedSentence);
  });

  it('decodes sentence with negative offset', () => {
    const { decode } = caesar({ encryptionOffset: -20 });
    expect(decode(encodedSentence)).toBe(sentence);
  });
});
