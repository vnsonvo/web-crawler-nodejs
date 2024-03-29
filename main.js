const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("No website provided");
  }
  if (process.argv.length > 3) {
    console.log("Many arguments provided");
  }

  const baseURL = process.argv[2];

  console.log(`Start crawling of: ${baseURL}...`);

  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();
