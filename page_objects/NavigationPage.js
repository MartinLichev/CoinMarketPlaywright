const PlaywrightWrapper = require('../PlaywrightWrapper');
const config = require('../conf');
class Navigation extends PlaywrightWrapper {
    constructor(page, expect) {
        super(page, expect);
    }

    async navigateToPortfolio() {
        await this.navigate(config.NAVIGATION_URLS.PORTFOLIO);
        await this.verifyPortfolioPage();
    }

    async navigateToCommunity() {
        await this.navigate(config.NAVIGATION_URLS.COMMUNITY);
        await this.verifyCommunityPage();
    }

    async navigateToNews() {
        await this.navigate(config.NAVIGATION_URLS.NEWS);
        await this.verifyNewsPage();
    }

    async navigateToExchanges() {
        await this.navigate(config.NAVIGATION_URLS.EXCHANGES);
        await this.verifyExchangesPage();
    }

    async navigateToWatchlist() {
        await this.navigate(config.NAVIGATION_URLS.WATCHLIST);
        await this.verifyWatchlistPage();
    }

    async verifyPortfolioPage() {
        await this.verifyUrl(config.NAVIGATION_URLS.PORTFOLIO);
    }

    async verifyCommunityPage() {
        await this.verifyUrl(config.NAVIGATION_URLS.COMMUNITY);
    }

    async verifyNewsPage() {
        await this.verifyUrl(config.NAVIGATION_URLS.NEWS);
    }

    async verifyExchangesPage() {
        await this.verifyUrl(config.NAVIGATION_URLS.EXCHANGES);
    }

    async verifyWatchlistPage() {
        await this.verifyUrl(config.NAVIGATION_URLS.WATCHLIST);
    }
}

module.exports = Navigation;