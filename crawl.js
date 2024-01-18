const { JSDOM } = require("jsdom");

const normalizeURL = (url) => {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const jsdomBody = new JSDOM(htmlBody);
  const anchorElements = jsdomBody.window.document.querySelectorAll("a");
  for (const anchorElement of anchorElements) {
    if (anchorElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(anchorElement.href, baseURL).href);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        urls.push(new URL(anchorElement.href).href);
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  return urls;
};

const crawlPage = async (baseURL, currentURL, pages) => {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (!!pages[normalizedCurrentURL]) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  try {
    const res = await fetch(currentURL);
    if (res.status > 399) {
      console.log(`Error, status code: ${res.stats}`);
      return pages;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Non-html response: ${contentType}`);
      return pages;
    }
    const content = await res.text();
    const nextURLs = getURLsFromHTML(content, baseURL);
    for (const nextURL of nextURLs) {
      pages = crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(err.message);
  }

  return pages;
};

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
