const { test, expect } = require("@playwright/test");
const SortingPage = require("../page_objects/SortingPage");
const config = require("../conf");

test.describe("Sorting Functionality Verification", () => {
    let sortingPage;
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        sortingPage = new SortingPage(page, expect);
        await sortingPage.navigate(config.BASE_URL);
    });

    test("should verify sorting by Ranking", async () => {
        await sortingPage.navigateToRanking();
        await sortingPage.clickSortButton(sortingPage.byNameButton);
        await sortingPage.verifySorting(sortingPage.nameColumnData);
    });

    test("should verify sorting by Name", async () => {
        await sortingPage.navigateToCategories();
        await sortingPage.clickSortButton(sortingPage.byNameButton);
        await sortingPage.verifySorting(sortingPage.nameColumnData);
    });

    test("should verify sorting by Price", async () => {
        await sortingPage.navigateToGainersLosers();
        await sortingPage.clickSortButton(sortingPage.byPriceButton);
        await sortingPage.verifySorting(sortingPage.priceColumnData, true);
    });

    test("should verify sorting by Market Cap", async () => {
        await sortingPage.navigateToGainersLosers();
        await sortingPage.clickSortButton(sortingPage.byMarketCapButton);
        await sortingPage.verifySorting(sortingPage.marketCapColumnData, true);
    });

    test("should verify sorting by Volume", async () => {
        await sortingPage.navigateToGainersLosers();
        await sortingPage.clickSortButton(sortingPage.byVolumeButton);
        await sortingPage.verifySorting(sortingPage.volumeColumnData, true);
    });
});