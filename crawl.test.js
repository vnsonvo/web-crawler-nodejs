const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

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

test("getURLsFromHTML func", () => {
  // absolute
  const inputURL = "https://google.com";
  const inputBody =
    '<html><body><a href="https://google.com"><span>Google></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://google.com/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://google.com";
  const inputBody =
    '<html><body><a href="/search"><span>Google></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://google.com/search"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://google.com";
  const inputBody =
    '<html><body><a href="/path/one"><span>Google></span></a><a href="https://other.com/path/one"><span>Youtube></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://google.com/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://google.com";
  const inputBody =
    '<html><body><a href="path/one"><span>Google></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
