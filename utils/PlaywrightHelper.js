
const { chromium, firefox, webkit } = require('playwright');

class PlaywrightHelper {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async launchBrowser(browserType = 'chromium') {
        this.browser = await browserType.launch();
    }

    async openPage(url) {
        this.page = await this.browser.newPage();
        await this.page.goto(url);
    }

    async clickElement(selector) {
        await this.page.click(selector);
    }

    async fillInput(selector, value) {
        await this.page.fill(selector, value);
    }

    async getText(selector) {
        return await this.page.textContent(selector);
    }

    async closeBrowser() {
        await this.browser.close();
    }
}

module.exports = PlaywrightHelper;
