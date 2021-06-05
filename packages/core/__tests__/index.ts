import { core } from "../src/index";

const mappings = {
  a: "x",
  b: "y",
  c: "z",
};

describe("with default values", () => {
  const sentence = "bca abc cba bca";
  const encodedSentence = "yzx xyz zyx yzx";

  it("encodes a sentence", () => {
    const { encode } = core({
      mappings,
    });
    expect(encode(sentence)).toBe(encodedSentence);
  });

  it("throws an error on encoding unknown character", () => {
    const sentence = "abcd dcab dcba";
    const { encode } = core({
      mappings,
    });
    expect(() => encode(sentence)).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported character \\"d\\", not found in {\\"a\\":\\"x\\",\\"b\\":\\"y\\",\\"c\\":\\"z\\"}"`
    );
  });

  it("decodes a sentence", () => {
    const { decode } = core({
      mappings,
    });
    expect(decode(encodedSentence)).toBe(sentence);
  });

  it("throws an error on decoding unknown cipher", () => {
    const encodedSentence = "yzxs xypz ryx ytx";
    const { decode } = core({
      mappings,
    });
    expect(() => decode(encodedSentence)).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported ciphertext \\"s\\", not found in {\\"x\\":\\"a\\",\\"y\\":\\"b\\",\\"z\\":\\"c\\"}"`
    );
  });
});

describe("with specified options", () => {
  it("does not throw an error on encoding if throwOnUnknownCharacters is false", () => {
    const sentence = "abcd dcab dcba";
    const { encode } = core({
      mappings,
    });
    expect(encode(sentence, { throwOnUnknownCharacters: false })).toBe(
      "xyz zxy zyx"
    );
  });

  it("does not throw an error on decoding if throwOnUnknownCharacters is false", () => {
    const encodedSentence = "yzxs xypz ryx ytx";
    const { decode } = core({
      mappings,
    });
    expect(decode(encodedSentence, { throwOnUnknownCharacters: false })).toBe(
      "bca abc ba ba"
    );
  });
});
