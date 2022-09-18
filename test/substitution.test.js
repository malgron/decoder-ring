// Write your tests here!
const expect = require("chai").expect;
const { substitution } = require("../src/substitution");

describe("Substitution Cypher", () => {
  //ENCRYPTING
  describe("Encryption", () => {
    it("encrypts single word correctly", () => {
      const input = "hello";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "rmwwl";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.equal(expected);
    });
    it("encrypts multiple words correctly", () => {
      const input = "hello world my name is trevor";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "rmwwl ilhwq ae fxam ud jhmzlh";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.equal(expected);
    });
    it("encrypts correctly regardless of case", () => {
      const input = "HeLlO";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "rmwwl";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.equal(expected);
    });
    it("encrypts correctly when substitution alphabet has special characters or numbers", () => {
      const input = "hello";
      const alphabet = "x1yq]cg*uks=af2nthdjp5ibev";
      const expected = "*]==2";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.equal(expected);
    });
    it("should return unaltered message when substitution alphabet matches the standard alphabet", () => {
      const input = "unencrypted";
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.equal(input);
    });
    it("should return false when trying to encrypt a letter not found in the standard alphabet", () => {
      const input = "this message shouldn't be seen.";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });
  });
  //DECRYPTING
  describe("Decryption", () => {
    it("decrypts single word correctly", () => {
      const input = "rmwwl";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "hello";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.be.equal(expected);
    });
    it("decrypts multiple words correctly", () => {
      const input = "rmwwl ilhwq ae fxam ud jhmzlh";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "hello world my name is trevor";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.be.equal(expected);
    });
    it("decrypts correctly regardless of case", () => {
      const input = "rMwWl";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "hello";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.be.equal(expected);
    });
    it("decrypts correctly when input has special characters or numbers found on substitution alphabet", () => {
      const input = "*]==2";
      const alphabet = "x1yq]cg*uks=af2nthdjp5ibev";
      const expected = "hello";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.be.equal(expected);
    });
    it("should return unaltered message when substitution alphabet matches the standard alphabet", () => {
      const input = "unencrypted";
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.be.equal(input);
    });

    it("should return false when trying to decrypt a letter not found in the substitution alphabet", () => {
      const input = "this message shouldn't be seen.";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.be.false;
    });
  });
  //ERROR CASES
  describe("Invalid Alphabet Errors", () => {
    it("should return false when alphabet is not provided", () => {
      const input = "this message should not be seen";
      const actual = substitution(input);
      expect(actual).to.be.false;
    });

    it("should return false when valid alphabet is provided, but input is not provided", () => {
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const actual = substitution(undefined, alphabet);
      expect(actual).to.be.false;
    });

    it("should return false when no arguements are passed", () => {
      const input = "this message should not be seen";
      const actual = substitution();
      expect(actual).to.be.false;
    });

    it("should return false when alphabet length is less than 26", () => {
      const input = "this message should not be seen";
      const alphabet = "abc";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });

    it("should return false when alphabet length is more than 26", () => {
      const input = "this message should not be seen";
      const alphabet = "abcdefghijklmnopqrstuvwxyz123456789";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });

    it("should return false when alphabet contains a repeated character", () => {
      const input = "this message should not be seen";
      const alphabet = "abcdefghilllllopqrstuvwxyz";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });

    it("should return false when alphabet is not a string", () => {
      const input = "this message should not be seen";
      const alphabet = 2021;
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });

    it("Should return false when alphabet has 26 unique characters, but contains additional repeated characters", () => {
      const input = "fl cxwdm jmdjd";
      const alphabet =
        "aaaaaaaaaaaaaaabcdefghijklmnopqrstuvwxyzzzzzzzzzzzzzzzzzz";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });

    it("should still return a correctly encrypted message when input contains the word 'false'", () => {
      const input = "no false tests";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "fl cxwdm jmdjd";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.equal(expected);
    });

    it("should still return a correctly decrypted message when it contains the word 'false'", () => {
      const input = "fl cxwdm jmdjd";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "no false tests";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.be.equal(expected);
    });
  });
});