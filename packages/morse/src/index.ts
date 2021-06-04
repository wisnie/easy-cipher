import { core } from '@easy-cipher/core';
import type { CoreOptions, Encode, Decode } from '@easy-cipher/core';

type BuildCipher = (...letterParts: string[]) => string;
type ExtendOptions = {
  dot: string;
  dash: string;
  buildCipher: BuildCipher;
};

type MorseOptions = {
  dot?: string;
  dash?: string;
  partsOfLetterSeparator?: string;
  extend?: (options: ExtendOptions) => Record<string, string>;
} & Omit<CoreOptions, 'mappings'>;

type Morse = (options?: MorseOptions) => {
  encode: Encode;
  decode: Decode;
};

const defualtOptions = {
  dot: '.',
  dash: '-',
  partsOfLetterSeparator: '',
  extend: () => ({}),
  ciphertextWordsSeparator: ' / ',
  ciphertextCharactersSeparator: ' ',
  plaintextWordsSeparator: ' ',
  plaintextCharactersSeparator: '',
};

const morse: Morse = ({
  dot = defualtOptions.dot,
  dash = defualtOptions.dash,
  partsOfLetterSeparator = defualtOptions.partsOfLetterSeparator,
  extend = defualtOptions.extend,
  ciphertextWordsSeparator = defualtOptions.ciphertextWordsSeparator,
  ciphertextCharactersSeparator = defualtOptions.ciphertextCharactersSeparator,
  plaintextWordsSeparator = defualtOptions.plaintextWordsSeparator,
  plaintextCharactersSeparator = defualtOptions.plaintextCharactersSeparator,
} = defualtOptions) => {
  const buildCipher: BuildCipher = (...letterParts) =>
    letterParts.join(partsOfLetterSeparator);

  /* If we consider standard morse code, it's an overengineering, however this library
   provides a way to set custom character for both 'dot' and 'dash' &
    custom number of spaces between letter parts
   */
  const characterToCipher = {
    a: buildCipher(dot, dash),
    b: buildCipher(dash, dot, dot, dot),
    c: buildCipher(dash, dot, dash, dot),
    d: buildCipher(dash, dot, dot),
    e: buildCipher(dot),
    f: buildCipher(dot, dot, dash, dot),
    g: buildCipher(dash, dash, dot),
    h: buildCipher(dot, dot, dot, dot),
    i: buildCipher(dot, dot),
    j: buildCipher(dot, dash, dash, dash),
    k: buildCipher(dash, dot, dash),
    l: buildCipher(dot, dash, dot, dot),
    m: buildCipher(dash, dash),
    n: buildCipher(dash, dot),
    o: buildCipher(dash, dash, dash),
    p: buildCipher(dot, dash, dash, dot),
    q: buildCipher(dash, dash, dot, dash),
    r: buildCipher(dot, dash, dot),
    s: buildCipher(dot, dot, dot),
    t: buildCipher(dash),
    u: buildCipher(dot, dot, dash),
    v: buildCipher(dot, dot, dot, dash),
    w: buildCipher(dot, dash, dash),
    x: buildCipher(dash, dot, dot, dash),
    y: buildCipher(dash, dot, dash, dash),
    z: buildCipher(dash, dash, dot, dot),
    0: buildCipher(dash, dash, dash, dash, dash),
    1: buildCipher(dot, dash, dash, dash, dash),
    2: buildCipher(dot, dot, dash, dash, dash),
    3: buildCipher(dot, dot, dot, dash, dash),
    4: buildCipher(dot, dot, dot, dot, dash),
    5: buildCipher(dot, dot, dot, dot, dot),
    6: buildCipher(dash, dot, dot, dot, dot),
    7: buildCipher(dash, dash, dot, dot, dot),
    8: buildCipher(dash, dash, dash, dot, dot),
    9: buildCipher(dash, dash, dash, dash, dot),
  };
  const mappingsExtention = extend({ dot, dash, buildCipher });
  const mappings = Object.assign(characterToCipher, mappingsExtention);

  return core({
    mappings,
    ciphertextWordsSeparator,
    ciphertextCharactersSeparator,
    plaintextWordsSeparator,
    plaintextCharactersSeparator,
  });
};

export { morse };
