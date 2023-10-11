
const PlaywrightWrapper = require('../PlaywrightWrapper');

class SortingPage extends PlaywrightWrapper {
    constructor(page, expect) {
        super(page, expect);
    }

    rankLocator = "//a[@href='/' and contains(text(), 'Ranking')]";
    recentlyAddedLocator = "//a[@href='/new/' and contains(text(), 'Recently Added')]";
    categoriesLocator = "//a[@href='/cryptocurrency-category/' and contains(text(), 'Categories')]";
    spotlightLocator = "//a[@href='/best-cryptos/' and contains(text(), 'Spotlight')]";
    gainersLosersLocator = "//a[@href='/gainers-losers/' and contains(text(), 'Gainers & Losers')]";
    globalChartsLocator = "//a[@href='/charts/' and contains(text(), 'Global Charts')]";
    historicalSnapshotsLocator = "//a[@href='/historical/' and contains(text(), 'Historical Snapshots')]";
    byNameButton = "//p[text() = 'Name']";
    byPriceButton = "//p[text() = 'Price']";
    byMarketCapButton = "//p[text() = 'Market Cap']";
    byVolumeButton = "//p[text() = 'Volume(24h)']";
    nameColumnData = "//tbody/tr/td[3]//a";
    priceColumnData = "//tbody/tr/td[4]//span";
    marketCapColumnData = "//tbody/tr/td[5]//span";
    volumeColumnData = "//tbody/tr/td[6]//span";

    async navigateToRanking() {
        await this.click(this.rankLocator);
    }

    async navigateToRecentlyAdded() {
        await this.click(this.recentlyAddedLocator);
    }

    async navigateToCategories() {
        await this.click(this.categoriesLocator);
    }

    async navigateToSpotlight() {
        await this.click(this.spotlightLocator);
    }

    async navigateToGainersLosers() {
        await this.click(this.gainersLosersLocator);
    }

    async navigateToGlobalCharts() {
        await this.click(this.globalChartsLocator);
    }

    async navigateToHistoricalSnapshots() {
        await this.click(this.historicalSnapshotsLocator);
    }

    async clickByNameSortButton() {
        await this.click(this.byNameButton);
    }

    async clickByPriceSortButton() {
        await this.click(this.byPriceButton);
    }

    async clickByMarketCapButton() {
        await this.click(this.byMarketCapButton);
    }

    async clickByVolumeSortButton() {
        await this.click(this.byVolumeButton);
    }

    async verifyRankSorting() {
        const ranks = await this.getElementText(this.firstColumnData);
        const sortedRanks = [...ranks].sort((a, b) => a - b);
        this.expect(ranks).toEqual(sortedRanks);
    }

    async verifyNameSorting() {
        const names = await this.getElementText(this.secondColumnData);
        const sortedNames = [...names].sort();
        this.expect(names).toEqual(sortedNames);
    }

    async verifyPriceSorting() {
        const prices = await this.getElementsText(this.thirdColumnData);
        const sortedPrices = [...prices].sort((a, b) => parseFloat(a) - parseFloat(b));
        this.expect(prices).toEqual(sortedPrices);
    }
}

module.exports = SortingPage;