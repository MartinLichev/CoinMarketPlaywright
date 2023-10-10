const { test, expect } = require("@playwright/test");
const CryptoDetailsPage = require("../page_objects/CryptoDetailsPage");
const HomePage = require('../page_objects/HomePage');
const config = require("../conf");

test.describe("Cryptocurrency Details Verification", () => {
    let cryptoDetailsPage;
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        cryptoDetailsPage = new CryptoDetailsPage(page, expect);
        await cryptoDetailsPage.navigateToCurrencyPage(config.CURRENCIES[0]);
    });

    test("should verify market cap", async () => {
        await cryptoDetailsPage.verifyMarketCap();
    });

    test("should verify volume", async () => {
        await cryptoDetailsPage.verifyVolume();
    });

    test("should verify circulating supply", async () => {
        await cryptoDetailsPage.verifyCirculatingSupply();
    });

    test("should verify volume/market cap", async () => {
        await cryptoDetailsPage.verifyVolumeMarketCap();
    });

    test("should verify total supply", async () => {
        await cryptoDetailsPage.verifyTotalSupply();
    });

    test("should verify max supply", async () => {
        await cryptoDetailsPage.verifyMaxSupply();
    });

    test("should verify fully diluted market cap", async () => {
        await cryptoDetailsPage.verifyFullyDilutedMarketCap();
    });
});