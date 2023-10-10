const {test, expect} = require("@playwright/test");
const HomePage = require("../page_objects/HomePage");
const config = require("../conf");

test.describe("Search Functionality", () => {
  let homePage;
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page, expect);
    await homePage.navigate(config.BASE_URL);
  });

  test("should perform a search and show relevant results", async () => {
    await homePage.performSearch(config.CURRENCIES[0]);
    await homePage.verifyCurrencyIsDisplayed(config.CURRENCIES[0]);
  });
});