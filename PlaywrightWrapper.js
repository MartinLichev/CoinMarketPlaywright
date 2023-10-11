class PlaywrightWrapper {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async click(selector) {
        await this.page.click(selector);
    }

    async pressKey(key) {
        await this.page.keyboard.press(key);
    }

    async clickButton(selector) {
        await this.page.waitForSelector(selector, {state: 'visible'});
        await this.page.click(selector);
    }

    async fillInput(selector, text) {
        await this.page.waitForSelector(selector, {state: 'visible'});
        await this.page.click(selector);
        await this.page.type(selector, text);
    }

    async waitForElementVisible(selector, options = {state: 'visible'}) {
        await this.page.waitForSelector(selector, options);
    }

    async waitForElementNotVisible(selector, options = {state: 'hidden'}) {
        await this.page.waitForSelector(selector, options);
    }

    async waitForElementPresent(selector, options = {state: 'attached'}) {
        await this.page.waitForSelector(selector, options);
    }

    async waitForElementNotPresent(selector, options = {state: 'detached'}) {
        await this.page.waitForSelector(selector, options);
    }

    async assertElementToHaveText(selector, text) {
        await this.page.waitForSelector(selector);
        await this.expect(this.page.locator(selector)).toHaveText(text);
    }

    async assertElementIsVisible(selector) {
        await this.page.waitForSelector(selector);
        await this.expect(this.page.locator(selector)).toBeVisible();
    }

    async assertElementIsChecked(selector) {
        await this.page.waitForSelector(selector);
        await this.expect(this.page.locator(selector)).toBeChecked();
    }

    async assertElementWithDelay(actual, expected, delay = 5000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.expect(actual).toBe(expected);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    }

    async acceptCookies(cookieButtonSelector) {
        try {
            await this.page.waitForSelector(cookieButtonSelector, {timeout: 5000});
            await this.page.click(cookieButtonSelector);
        } catch (e) {
            console.log('Cookie acceptance button not found or not clickable.');
        }
    }

    async getElementText(selector) {
        await this.page.waitForSelector(selector, {state: 'visible'});
        return await this.page.textContent(selector);
    }
}

module.exports = PlaywrightWrapper;