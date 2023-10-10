const PlaywrightWrapper = require('../PlaywrightWrapper');

class HomePage extends PlaywrightWrapper {
    constructor(page, expect) {
        super(page, expect);
    }

    searchInputLocator = 'xpath=//div[text() = "Search"]';
    currencySelectedLocator = '(//img/following::p[@data-sensors-click="true"])[1]';
    currencyLocator = '//span[@class="coin-name-pc"]';

    async performSearch(item) {
        await this.fillInput(this.searchInputLocator, item);
        await this.assertElementToHaveText(this.currencySelectedLocator, item);
        await this.click(this.currencySelectedLocator);
    }

    async verifyCurrencyIsDisplayed(item) {
        await this.waitForElementVisible(this.currencyLocator);
        await this.assertElementToHaveText(this.currencyLocator, item);
    }

    async acceptSiteCookies() {
        await this.acceptCookies(cookieButtonSelector);
    }
}
module.exports = HomePage;