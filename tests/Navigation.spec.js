const { test, expect } = require("@playwright/test");
const Navigation = require("../page_objects/NavigationPage");

test.describe("Navigation Verification", () => {
    let navigation;
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        navigation = new Navigation(page, expect);
    });

    test("should navigate to and verify Portfolio page", async () => {
        await navigation.navigateToPortfolio();
    });

    test("should navigate to and verify Community page", async () => {
        await navigation.navigateToCommunity();
    });

    test("should navigate to and verify News page", async () => {
        await navigation.navigateToNews();
    });

    test("should navigate to and verify Exchanges page", async () => {
        await navigation.navigateToExchanges();
    });

    test("should navigate to and verify Watchlist page", async () => {
        await navigation.navigateToWatchlist();
    });
});