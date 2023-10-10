const PlaywrightWrapper = require('../PlaywrightWrapper');
const config = require('../conf');
class CryptoDetailsPage extends PlaywrightWrapper {
    constructor(page, expect) {
        super(page, expect);
    }

    marketCapLocator = '(//dt[contains(text(), "Market cap")]/following-sibling::dd)[1]';
    volumeLocator = '(//dt[contains(text(), "Volume (24h)")]/following-sibling::dd[1])[1]';
    volumeMarketCapLocator = '//dt[contains(text(), "Volume/Market cap (24h)")]/following-sibling::dd[1]';
    circulatingSupplyLocator = '(//dt[contains(text(), "Circulating supply")]/following-sibling::dd[1])[1]';
    totalSupplyLocator = '//dt[contains(text(), "Total supply")]/following-sibling::dd[1]';
    maxSupplyLocator = '//dt[contains(text(), "Max. supply")]/following-sibling::dd[1]';
    fullyDilutedMarketCapLocator = '//dt[contains(text(), "Fully diluted market cap")]/following-sibling::dd[1]';

    async navigateToCurrencyPage(currency) {
        const url = config.getCURRENCY_URL(currency);
        await this.navigate(url);
    }

    async getVolumeMarketCap() {
        return await this.getElementText(this.volumeMarketCapLocator);
    }

    async getTotalSupply() {
        return await this.getElementText(this.totalSupplyLocator);
    }

    async getMaxSupply() {
        return await this.getElementText(this.maxSupplyLocator);
    }

    async getFullyDilutedMarketCap() {
        return await this.getElementText(this.fullyDilutedMarketCapLocator);
    }

    async getMarketCap() {
        return await this.getElementText(this.marketCapLocator);
    }

    async getVolume() {
        return await this.getElementText(this.volumeLocator);
    }

    async getCirculatingSupply() {
        return await this.getElementText(this.circulatingSupplyLocator);
    }

    async verifyMarketCap() {
        const marketCap = await this.getMarketCap();
        const marketCapValue = parseFloat(marketCap.replace(/[$,]/g, ''));
        this.expect(marketCapValue).toBeGreaterThan(0);
    }

    async verifyVolume() {
        const volume = await this.getVolume();
        const volumeValue = parseFloat(volume.replace(/[$,]/g, ''));
        this.expect(volumeValue).toBeGreaterThan(10);
    }

    async verifyCirculatingSupply() {
        const circulatingSupply = await this.getCirculatingSupply();
        const supplyValue = parseFloat(circulatingSupply.replace(/[A-Za-z,]/g, ''));
        this.expect(supplyValue).toBeGreaterThan(1000);
    }

    async verifyVolumeMarketCap() {
        const volumeMarketCap = await this.getVolumeMarketCap();
        const volumeMarketCapValue = parseFloat(volumeMarketCap.replace(/[$,%]/g, ''));
        this.expect(volumeMarketCapValue).toBeGreaterThan(0);
    }

    async verifyTotalSupply() {
        const totalSupply = await this.getTotalSupply();
        const totalSupplyValue = parseFloat(totalSupply.replace(/[A-Za-z,]/g, ''));
        this.expect(totalSupplyValue).toBeGreaterThan(1000);
    }

    async verifyMaxSupply() {
        const maxSupply = await this.getMaxSupply();
        const maxSupplyValue = parseFloat(maxSupply.replace(/[A-Za-z,]/g, ''));
        this.expect(maxSupplyValue).toBeGreaterThan(1000);
    }

    async verifyFullyDilutedMarketCap() {
        const fullyDilutedMarketCap = await this.getFullyDilutedMarketCap();
        const fullyDilutedMarketCapValue = parseFloat(fullyDilutedMarketCap.replace(/[$,]/g, ''));
        this.expect(fullyDilutedMarketCapValue).toBeGreaterThan(100000);
    }
}

module.exports = CryptoDetailsPage;