const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

test("normalizeURL func", () => {
  const input = "https://google.com/search";
  const actual = normalizeURL(input);
  const expected = "google.com/search";
  expect(actual).toEqual(expected);

  // slash /
  const inputContainSlash = "https://google.com/search/";
  const actualResult = normalizeURL(inputContainSlash);
  const expectedResult = "google.com/search";
  expect(actualResult).toEqual(expectedResult);

  // capitals
  const inputContainCapitalLetter = "https://GOOGLE.com/search";
  const actualResult2 = normalizeURL(inputContainCapitalLetter);
  const expectedResult2 = "google.com/search";
  expect(actualResult2).toEqual(expectedResult2);

  // http
  const inputWithHTTP = "http://GOOGLE.com/search";
  const actualResult3 = normalizeURL(inputWithHTTP);
  const expectedResult3 = "google.com/search";
  expect(actualResult3).toEqual(expectedResult3);
});
