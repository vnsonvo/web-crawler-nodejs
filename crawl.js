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

const crawlPage = async (currentURL) => {
  try {
    const res = await fetch(currentURL);
    if (res.status > 399) {
      console.log(`Error, status code: ${res.stats}`);
      return;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Non-html response: ${contentType}`);
      return;
    }
    const content = await res.text();
    console.log("Content", content);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
