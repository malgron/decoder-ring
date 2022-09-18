// Write your tests here!
const expect = require("chai").expect;
const { caesar } = require("../src/caesar");

describe("Caesar Shift", () => {
  //ENCRYPTION
  describe("Encryption", () => {
    //POSITIVE SHIFTING
    describe("Positive Shift", () => {
      it("encrypts single word correctly", () => {
        const input = "thinkful";
        const shift = 3;
        const expected = "wklqnixo";
        const actual = caesar(input, shift);
        expect(actual).to.be.equal(expected);
      });

      it("encrypts multiple words correctly", () => {
        const input = "trevor is the name";
        const shift = 2;
        const expected = "vtgxqt ku vjg pcog";
        const actual = caesar(input, shift);
        expect(actual).to.be.equal(expected);
      });

      it("encrypts correctly when shift requires wraping around the alphabet", () => {
        const input = "xylophone has lots of letters near z";
        const shift = 13;
        const expected = "klybcubar unf ybgf bs yrggref arne m";
        const actual = caesar(input, shift);
        expect(actual).to.be.equal(expected);
      });
    });

    //NEGATIVE SHIFTING
    describe("Negative Shift", () => {
      it("encrypts single word correctly", () => {
        const input = "thinkful";
        const shift = -3;
        const expected = "qefkhcri";
        const actual = caesar(input, shift);
        expect(actual).to.be.equal(expected);
      });

      it("encrypts multiple words correctly", () => {
        const input = "trevor is the name";
        const shift = -1;
        const expected = "sqdunq hr sgd mzld";
        const actual = caesar(input, shift);
        expect(actual).to.be.equal(expected);
      });

      it("encrypts correctly when shift requires wraping around the alphabet", () => {
        const input = "granny smith apples has lots of letters near a";
        const shift = -8;
        const expected = "yjsffq kealz shhdwk zsk dglk gx dwllwjk fwsj s";
        const actual = caesar(input, shift);
        expect(actual).to.be.equal(expected);
      });
    });
  });

  //DECRYPTION
  describe("Decryption", () => {
    //POSITIVE SHIFTING
    describe("Positive Shift", () => {
      it("decrypts single word correctly", () => {
        const input = "wklqnixo";
        const shift = 3;
        const expected = "thinkful";
        const actual = caesar(input, shift, false);
        expect(actual).to.be.equal(expected);
      });

      it("decrypts multiple words correctly", () => {
        const input = "vtgxqt ku vjg pcog";
        const shift = 2;
        const expected = "trevor is the name";
        const actual = caesar(input, shift, false);
        expect(actual).to.be.equal(expected);
      });

      it("decrypts correctly when shift requires wraping around the alphabet", () => {
        const input = "klybcubar unf ybgf bs yrggref arne m";
        const shift = 13;
        const expected = "xylophone has lots of letters near z";
        const actual = caesar(input, shift, false);
        expect(actual).to.be.equal(expected);
      });
    });

    //NEGATIVE SHIFTING
    describe("Negative Shift", () => {
      it("decrypts single word correctly", () => {
        const input = "qefkhcri";
        const shift = -3;
        const expected = "thinkful";
        const actual = caesar(input, shift, false);
        expect(actual).to.be.equal(expected);
      });

      it("decrypts multiple words correctly", () => {
        const input = "sqdunq hr sgd mzld";
        const shift = -1;
        const expected = "trevor is the name";
        const actual = caesar(input, shift, false);
        expect(actual).to.be.equal(expected);
      });

      it("decrypts correctly when shift requires wraping around the alphabet", () => {
        const input = "yjsffq kealz shhdwk zsk dglk gx dwllwjk fwsj s";
        const shift = -8;
        const expected = "granny smith apples has lots of letters near a";
        const actual = caesar(input, shift, false);
        expect(actual).to.be.equal(expected);
      });
    });
  });

  //FRINGE CASE INPUT TESTS
  describe("Fringe Case Tests", () => {
    it("should return a lowercase encryption, regardless of input case", () => {
      const input = "TReVoR Is ThE NaME";
      const shift = 2;
      const expected = "vtgxqt ku vjg pcog";
      const actual = caesar(input, shift);
      expect(actual).to.be.equal(expected);
    });

    it("should return a correct encryption when provided with non-letters", () => {
      const input = "i'd rate carl's sandwich: 8/10";
      const shift = 2;
      const expected = "k'f tcvg ectn'u ucpfykej: 8/10";
      const actual = caesar(input, shift);
      expect(actual).to.be.equal(expected);
    });

    it("should return an unencrypted message when all of the input is non-letters", () => {
      const input = "'23 '/>? 6 87 / - -";
      const shift = 7;
      const expected = input;
      const actual = caesar(input, shift);
      expect(actual).to.be.equal(expected);
    });
    it("should return an unencrypted message when all of the input is extended ASCII", () => {
      const input = "これはａｓｃｉｉじゃない";
      const shift = 7;
      const expected = input;
      const actual = caesar(input, shift);
      expect(actual).to.be.equal(expected);
    });
    it("should return false when shift is valid but input is not provided", () => {
      const shift = 7;
      const actual = caesar(undefined, shift);
      expect(actual).to.be.false;
    });
  });

  //FALSE RETURN ON INVALID SHIFT TESTS
  describe("Invalid Shift Errors", () => {
    it("should return false when shift is 0", () => {
      const input = "This message won't be seen.";
      const shift = 0;
      const actual = caesar(input, shift);
      expect(actual).to.be.false;
    });

    it("should return false when shift is less than -25", () => {
      const input = "This message won't be seen.";
      const shift = -6969;
      const actual = caesar(input, shift);
      expect(actual).to.be.false;
    });

    it("should return false when shift is greater than 25", () => {
      const input = "This message won't be seen.";
      const shift = 52;
      const actual = caesar(input, shift);
      expect(actual).to.be.false;
    });
  });
});