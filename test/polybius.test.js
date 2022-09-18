// Write your tests here!
const expect = require("chai").expect;
const { polybius } = require("../src/polybius");

describe("Polybius Square", () => {
  //ENCRYPTING
  describe("Encryption", () => {
    it("encrypts letters before i correctly", () => {
      const input = "abcdefgh";
      const expected = "1121314151122232";
      const actual = polybius(input);
      expect(actual).to.be.equal(expected);
    });
    it("encrypts all letters correctly", () => {
      const input = "abcdefghijklmnopqrstuvwxyz";
      const expected = "1121314151122232424252132333435314243444541525354555";
      const actual = polybius(input);
      expect(actual).to.be.equal(expected);
    });
    it("encrypts letters seperated by spaces correctly", () => {
      const input = "abcde fghij klmno pqrst uvwxy z";
      const expected =
        "1121314151 1222324242 5213233343 5314243444 5415253545 55";
      const actual = polybius(input);
      expect(actual).to.be.equal(expected);
    });
    it("encrypts correctly regardless of input case", () => {
      const input = "aBcDefGHijKLmnOpqRstUVWxYz";
      const expected = "1121314151122232424252132333435314243444541525354555";
      const actual = polybius(input);
      expect(actual).to.be.equal(expected);
    });
    it("should return correct encryption, even if input contains the word 'false'", () => {
      const input = "no false tests";
      const expected = "3343 1211133451 4451344434";
      const actual = polybius(input);
      expect(actual).to.be.equal(expected);
    });
    it("should return false when attempting to encrypt anything other than letters and spaces", () => {
      const input = "2222";
      const actual = polybius(input);
      expect(actual).to.be.false;
    });
    it("should return false when given no input", () => {
      const actual = polybius();
      expect(actual).to.be.false;
    });
  });
  //DECRYPTING
  describe("Decryption", () => {
    it("decrypts a single code correctly", () => {
      const input = "3251131343";
      const expected = "hello";
      const actual = polybius(input, false);
      expect(actual).to.be.equal(expected);
    });
    it("decrypts codes seperated by spaces correctly", () => {
      const input = "3251131343 2543241341";
      const expected = "hello world";
      const actual = polybius(input, false);
      expect(actual).to.be.equal(expected);
    });
    it("decrypts code 42 as (i/j) correctly", () => {
      const input = "4432423352125413";
      const expected = "th(i/j)nkful";
      const actual = polybius(input, false);
      expect(actual).to.be.equal(expected);
    });
    it("should return false when decrypting a message of odd length", () => {
      const input = "443242335212541";
      const actual = polybius(input, false);
      expect(actual).to.be.false;
    });
    it("should return false when decrypting multiple words with at least one being of an odd length", () => {
      const input = "3251131343 443242335212541 2543241341 ";
      const actual = polybius(input, false);
      expect(actual).to.be.false;
    });
    it("should return correct decryption, even if it contains the word 'false'", () => {
      const input = "3343 1211133451 4451344434";
      const expected = "no false tests";
      const actual = polybius(input, false);
      expect(actual).to.be.equal(expected);
    });
    it("should return false when given invalid codes", () => {
      const input = "66778899";
      const actual = polybius(input, false);
      expect(actual).to.be.false;
    });
    it("should return false when given no input", () => {
      const actual = polybius();
      expect(actual).to.be.false;
    });
  });
});
