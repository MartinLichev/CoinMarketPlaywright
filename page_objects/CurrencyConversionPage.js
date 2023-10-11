const PlaywrightWrapper = require('../PlaywrightWrapper');
const CryptoDetailsPage = require('./CryptoDetailsPage');

class CurrencyConversionPage extends PlaywrightWrapper {
    constructor(page, expect) {
        super(page, expect);
    }

    currencyPickerLocator = "//button[@data-qa-id='button-global-currency-picker']";
    currencyOptionLocator = (currencyLabel) => `//span[contains(text(), "${currencyLabel}")]`;
    currencySymbolLocator = 'span.sc-16891c57-0.dxubiK.base-text';

    async openCurrencyPicker() {
        await this.waitForElementVisible(this.currencyPickerLocator);
        await this.click(this.currencyPickerLocator);
    }

    async selectCurrency(currencyLabel) {
        const optionLocator = this.currencyOptionLocator(currencyLabel);
        await this.click(optionLocator);
    }

    async extractCurrencySymbol(textString) {
        return textString.charAt(0);
    }

    async verifyCurrencyChange(cryptoDetailsPage, expectedCurrencySymbol) {
        const marketCap = await cryptoDetailsPage.getMarketCap();
        const volume = await cryptoDetailsPage.getVolume();
        const circulatingSupply = await cryptoDetailsPage.getCirculatingSupply();

        const marketCapSymbol = await this.extractCurrencySymbol(marketCap.trim());
        const volumeSymbol = await this.extractCurrencySymbol(volume.trim());
        const circulatingSupplySymbol = await this.extractCurrencySymbol(circulatingSupply.trim());

        await this.assertElementWithDelay(marketCapSymbol, expectedCurrencySymbol);
        await this.assertElementWithDelay(volumeSymbol, expectedCurrencySymbol);
        await this.assertElementWithDelay(circulatingSupplySymbol, expectedCurrencySymbol);
    }
}

module.exports = CurrencyConversionPage;