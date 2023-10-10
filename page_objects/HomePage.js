
const PlaywrightHelper = require('../utils/PlaywrightHelper.js');

class HomePage extends PlaywrightHelper {
    constructor(page) {
        super();
        this.page = page;
    }

    searchInputLocator = '//div[text() = "Search"]';
    currencyValidationLocator = '//span[@data-role="coin-name" and @title="Bitcoin"]/span[@class="coin-name-pc"]';

    async navigateToHomePage(url) {
        await this.navigate(url);
    }

    async performSearch(searchTerm) {
        await this.waitForElement(this.searchInputLocator);
        await this.click(this.searchInputLocator);
        await this.type(this.searchInputLocator, searchTerm);
        await this.pressKey('Enter');
    }

    async assertCurrencyIsDisplayed() {
        await this.assertToBeVisible(this.currencyValidationLocator);
        await this.assertToHaveText(this.currencyValidationLocator, 'Bitcoin');
    }
}

module.exports = HomePage;
