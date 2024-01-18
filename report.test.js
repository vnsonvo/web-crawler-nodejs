const { test, expect } = require("@jest/globals");
const { sortPages } = require("./report.js");

test("sortPages", () => {
  const input = {
    "https://google.com/search": 2,
    "https://google.com/search?q=1": 1,
    "https://google.com/search?q=4": 4,
    "https://google.com": 100,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://google.com", 100],
    ["https://google.com/search?q=4", 4],
    ["https://google.com/search", 2],
    ["https://google.com/search?q=1", 1],
  ];
  expect(actual).toEqual(expected);
});
