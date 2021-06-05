# morse

[![npm](https://img.shields.io/npm/v/@easy-cipher/morse.svg)](https://www.npmjs.com/package/@easy-cipher/morse)
[![npm bundle size (minified + gzip)](https://badgen.net/bundlephobia/minzip/@easy-cipher/morse)](https://bundlephobia.com/result?p=@easy-cipher/morse)
[![no external dependencies](https://badgen.net/bundlephobia/dependency-count/@easy-cipher/morse)](https://bundlephobia.com/result?p=@easy-cipher/morse)

`morse` package is morse code mapping package built on the `core` which is package responsible for mapping strings, thus the implementation of the package has to be compatible with `core` API. The idea  behind this package was to give customization to almost everything in the library, therefore almost any piece of code depends of constants (More on it later on).

## Basic usage

Without any customizations, `morse` can be used as is.

```ts
const sentence = 'friday is best day of the week';
const { encode } = morse();

const result = encode(sentence);
// Returns ..-. .-. .. -.. .- -.-- / .. ... / -... . ... - / -.. .- -.-- / --- ..-. / - .... . / .-- . . -.-
```

Decoding the cipher is also a piece of cake

```ts
const cipher =
  '..-. .-. .. -.. .- -.-- / .. ... / -... . ... - / -.. .- -.-- / --- ..-. / - .... . / .-- . . -.-';
const { decode } = morse();

const result = decode(cipher);
// Returns 'friday is best day of the week'
```

### Caveat

Keep in mind that every time you call `morse`, all mappings are created dynamically, so instead of calling it over and over again. Call it once, and save encode and decode somewhere.

## encode & decode

`encode` & `decode` functions comes from the [core package](https://www.npmjs.com/package/@easy-cipher/core).

## Customization

`morse` has a `extend` method on configuration object. The `extend` has to return an `Record<string, string>` and will be merged with default international mappings for morse code. The `extend` function goal was to provide a quick way to add some characters to morse code or overwrite existing ones. If you wanna pre-define the whole layout, see the [core package](https://www.npmjs.com/package/@easy-cipher/core).

```ts
const sentence = 'hello from the ÄÖÜ';
const cipher =
  '.... . .-.. .-.. --- / ..-. .-. --- -- / - .... . / .-.- ---. ..--';
const { encode, decode } = morse({
  extend: () => ({
      Ä: '.-.-',
      Ö: '---.',
      Ü: '..--',
  }),
});

encode(sentence);
// Returns '.... . .-.. .-.. --- / ..-. .-. --- -- / - .... . / .-.- ---. ..--'

decode(cipher);
// Returns 'hello from the ÄÖÜ'
```
But that's not the end of it. `morse` also takes three additinal configuration arguments (outside of [core package](https://www.npmjs.com/package/@easy-cipher/core) configuratoin arguments).

#### dot, dash & partsOfLetterSeparator

The `morse` library supprots `dot`, `dash` and `partsOfLettersSeparator` constants. `dot` is a character used to represnt dot symbol in `Morse code`. By the default the character is `.`, dash by default is `-` and there is no separator between parts of letters. However you can customize it to your needs.

```ts
const { morse } = require('@easy-cipher/morse');

const sentence = 'friday is best day of the week';
const cipher =
  'acacbca acbca aca bcaca acb bcacbcb / aca acaca / bcacaca a acaca b / bcaca acb bcacbcb / bcbcb acacbca / b acacaca a / acbcb a a bcacb';
const { encode, decode } = morse({
  dot: 'a',
  dash: 'b',
  partsOfLetterSeparator: 'c',
});

encode(sentence);
// Returns acacbca acbca aca bcaca acb bcacbcb / aca acaca / bcacaca a acaca b / bcaca acb bcacbcb / bcbcb acacbca / b acacaca a / acbcb a a bcacb

decode(cipher);
// Returns 'friday is best day of the week'
```

I don't know if it's most useful feature of the world, but for sure it's a funny one. You can also control the separator between the letters and words. More on that in [core package](https://www.npmjs.com/package/@easy-cipher/core) docs.

If you're using custom characters and additionaly you extend the mappings, there's a ready utility in extend function parameters.

```ts
const sentence = 'hello from the ÄÖÜ';
const cipher =
  'acacaca a acbcaca acbcaca bcbcb / acacbca acbca bcbcb bcb / b acacaca a / acbcacb bcbcbca acacbcb';
const { encode, decode } = morse({
  dot: 'a',
  dash: 'b',
  partsOfLetterSeparator: 'c',
  extend: ({ dot, dash, buildCipher }) => ({
    Ä: buildCipher(dot, dash, dot, dash),
    Ö: buildCipher(dash, dash, dash, dot),
    Ü: buildCipher(dot, dot, dash, dash),
  }),
});

encode(sentence);
// Returns acacbca acbca aca bcaca acb bcacbcb / aca acaca / bcacaca a acaca b / bcaca acb bcacbcb / bcbcb acacbca / b acacaca a / acbcb a a bcacb

decode(cipher);
// Returns 'hello from the ÄÖÜ'

```

### Caveat

If you wanna also encode upper-case letters, you have to convert it to lowercase (The defualt mappings cover just lowercase letters).

```ts
const sentence = 'Friday IS best day of the WEEK';
const { encode } = morse();

const result = encode(sentence.toLocaleLowerCase());
// Returns ..-. .-. .. -.. .- -.-- / .. ... / -... . ... - / -.. .- -.-- / --- ..-. / - .... . / .-- . . -.-
```

Currently support for unicode characters may be difficult, because of using `split` Array method.

### Other customizations

Other customizations are available and are described in the [core package](https://www.npmjs.com/package/@easy-cipher/core) in deep.