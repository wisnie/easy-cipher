import { morse } from '../src/index';

describe('with default values', () => {
  const sentence = 'i love eating apples';
  const sentenceInMorse =
    '.. / .-.. --- ...- . / . .- - .. -. --. / .- .--. .--. .-.. . ...';

  it('encodes messages in morse code', () => {
    const { encode } = morse();
    expect(encode(sentence)).toBe(sentenceInMorse);
  });

  it('decodes messages in morse code', () => {
    const { decode } = morse();
    expect(decode(sentenceInMorse)).toBe(sentence);
  });
});

describe('with extending mappings', () => {
  const sentence = 'hello from the ÄÖÜ';
  const encodedSentence =
    '.... . .-.. .-.. --- / ..-. .-. --- -- / - .... . / .-.- ---. ..--';

  it('encodes extended mappings to morse code', () => {
    const { encode } = morse({
      extend({ dot, dash, buildCipher }) {
        return {
          Ä: buildCipher(dot, dash, dot, dash),
          Ö: buildCipher(dash, dash, dash, dot),
          Ü: buildCipher(dot, dot, dash, dash),
        };
      },
    });
    expect(encode(sentence)).toBe(encodedSentence);
  });

  it('encodes extended mappings to morse code', () => {
    const { decode } = morse({
      extend({ dot, dash, buildCipher }) {
        return {
          Ä: buildCipher(dot, dash, dot, dash),
          Ö: buildCipher(dash, dash, dash, dot),
          Ü: buildCipher(dot, dot, dash, dash),
        };
      },
    });
    expect(decode(encodedSentence)).toBe(sentence);
  });
});
