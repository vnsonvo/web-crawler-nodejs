const printReport = (pages) => {
  console.log("======================");
  console.log("REPORT");
  console.log("======================");
  const sortPages = sortPages(pages);
  for (const sortedPage of sortPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} links to page: ${url}`);
  }
  console.log("======================");
  console.log("END REPORT");
  console.log("======================");
};

const sortPages = (pages) => {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    const aCount = a[1];
    const bCount = b[1];
    return bCount - aCount;
  });
  return pagesArr;
};

module.exports = {
  sortPages,
  printReport,
};
