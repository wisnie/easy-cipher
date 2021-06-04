type CoreOptions = {
  mappings: Record<string, string>;
  ciphertextWordsSeparator?: string;
  ciphertextCharactersSeparator?: string;
  plaintextWordsSeparator?: string;
  plaintextCharactersSeparator?: string;
};

type EncodeOptions = {
  throwOnUnknownCharacters?: boolean;
};
type DecodeOptions = {
  throwOnUnknownCharacters?: boolean;
};
type Encode = (sentence: string, options?: EncodeOptions) => string;
type Decode = (cipher: string, options?: DecodeOptions) => string;

type Core = (options: CoreOptions) => {
  encode: Encode;
  decode: Decode;
};

const empty = '';
const space = ' ';

const core: Core = ({
  mappings,
  ciphertextWordsSeparator = space,
  ciphertextCharactersSeparator = empty,
  plaintextWordsSeparator = space,
  plaintextCharactersSeparator = empty,
}) => {
  const reversedMappings = Object.entries(mappings).reduce(
    (acc, [x, y]) => ({ ...acc, [y as string]: x }),
    {}
  ) as Record<string, string>;

  const encode: Encode = (
    plaintext,
    { throwOnUnknownCharacters } = { throwOnUnknownCharacters: true }
  ) => {
    return plaintext
      .split(plaintextWordsSeparator)
      .map((plaintextWord) =>
        plaintextWord
          .split(plaintextCharactersSeparator)
          .map((plaintextCharacter) => {
            const mapping =
              mappings[plaintextCharacter as keyof typeof mappings];
            if (mapping) {
              return mapping;
            }
            if (throwOnUnknownCharacters) {
              throw new Error('Unsupported character!');
            }
            return empty;
          })
          .join(ciphertextCharactersSeparator)
      )
      .join(ciphertextWordsSeparator);
  };

  const decode: Decode = (
    ciphertext: string,
    { throwOnUnknownCharacters } = { throwOnUnknownCharacters: true }
  ) => {
    return ciphertext
      .split(ciphertextWordsSeparator)
      .map((ciphertextWord) =>
        ciphertextWord
          .split(ciphertextCharactersSeparator)
          .map((ciphertextCharacter) => {
            const character =
              reversedMappings[
                ciphertextCharacter as keyof typeof reversedMappings
              ];
            if (character) {
              return character;
            }
            if (throwOnUnknownCharacters) {
              throw new Error('Unknown ciphertext!');
            }
            return empty;
          })
          .join(plaintextCharactersSeparator)
      )
      .join(plaintextWordsSeparator);
  };

  return {
    encode,
    decode,
  };
};

export { core };
export type { Encode, Decode, CoreOptions };
