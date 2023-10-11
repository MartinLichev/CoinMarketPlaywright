const { test, expect } = require("@playwright/test");
const CurrencyConversionPage = require("../page_objects/CurrencyConversionPage");
const CryptoDetailsPage = require("../page_objects/CryptoDetailsPage");
const config = require("../conf"); 

test.describe("Currency Conversion Verification", () => {
    let currencyConversionPage;
    let cryptoDetailsPage;
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        currencyConversionPage = new CurrencyConversionPage(page, expect);
        cryptoDetailsPage = new CryptoDetailsPage(page, expect);
        await cryptoDetailsPage.navigateToCurrencyPage(config.CURRENCIES[0]);
    });

    test("should verify currency change to Euro", async () => {
        await currencyConversionPage.openCurrencyPicker();
        await currencyConversionPage.selectCurrency(config.REAL_CURRENCIES[0]);
        await currencyConversionPage.verifyCurrencyChange(cryptoDetailsPage, config.CURRENCY_SYMBOLS[0]);
    });
});