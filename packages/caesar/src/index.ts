import { core } from '@easy-cipher/core';
import type { CoreOptions } from '@easy-cipher/core';

type CaesarOptions = {
  encryptionOffset: number;
  alphabet?: string[];
} & Omit<CoreOptions, 'mappings'>;

const defaultAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const caesar = ({
  encryptionOffset,
  alphabet = defaultAlphabet,
  ciphertextWordsSeparator,
  ciphertextCharactersSeparator,
  plaintextWordsSeparator,
  plaintextCharactersSeparator,
}: CaesarOptions) => {
  const offset =
    encryptionOffset > 0
      ? encryptionOffset % alphabet.length
      : alphabet.length + (encryptionOffset % alphabet.length);
  const mappings = alphabet.reduce(
    (acc, character, index, alphabet) => ({
      ...acc,
      [character]: alphabet[(index + offset) % alphabet.length],
    }),
    {}
  );
  return core({
    mappings,
    ciphertextWordsSeparator,
    ciphertextCharactersSeparator,
    plaintextWordsSeparator,
    plaintextCharactersSeparator,
  });
};

export { caesar };
