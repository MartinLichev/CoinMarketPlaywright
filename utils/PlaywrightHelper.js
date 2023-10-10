const {chromium} = require('playwright');
class PlaywrightHelper {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async launchBrowser() {
        this.browser = await chromium.launch({
            headless: false
        });
        const context = await this.browser.newContext();
        this.page = await context.newPage();
    }

    async closeBrowser() {
        await this.browser.close();
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async resolveLocator(locator) {
        if (locator.constructor.name === 'ElementHandle') {
            return locator;
        } else if (locator.startsWith('//')) {
            return await this.page.$(`xpath=${locator}`);
        } else {
            return await this.page.$(locator);
        }
    }

    async waitForElement(locator, options = {
        state: 'attached'
    }) {
        if (locator.startsWith('//')) {
            await this.page.waitForSelector(`xpath=${locator}`, options);
        } else {
            await this.page.waitForSelector(locator, options);
        }
    }

    async click(locator) {
        const element = await this.resolveLocator(locator);
        if (element) {
            await element.click();
        } else {
            throw new Error(`Element not found for locator: ${locator}`);
        }
    }

    async type(locator, text) {
        const element = await this.resolveLocator(locator);
        if (element) {
            await element.type(text);
        } else {
            throw new Error(`Element not found for locator: ${locator}`);
        }
    }

    async getText(locator) {
        const element = await this.resolveLocator(locator);
        if (element) {
            return await element.innerText();
        } else {
            throw new Error(`Element not found for locator: ${locator}`);
        }
    }

    async getAttribute(locator, attributeName) {
        const element = await this.resolveLocator(locator);
        if (element) {
            return await element.getAttribute(attributeName);
        } else {
            throw new Error(`Element not found for locator: ${locator}`);
        }
    }

    async dragAndDrop(source, target) {
        const sourceEl = await this.resolveLocator(source);
        const targetEl = await this.resolveLocator(target);
        if (sourceEl && targetEl) {
            const sourceBox = await sourceEl.boundingBox();
            const targetBox = await targetEl.boundingBox();
            await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
            await this.page.mouse.up();
        }
    }

    async switchToFrame(frameLocator) {
        const frameElement = await this.resolveLocator(frameLocator);
        const frame = await frameElement.contentFrame();
        this.page = frame;
    }

    async switchToMainFrame() {
        this.page = this.page.mainFrame();
    }

    async runJavaScript(code) {
        return await this.page.evaluate(code);
    }

    async screenshot(path) {
        await this.page.screenshot({
            path
        });
    }

    async pressKey(key) {
        await this.page.keyboard.press(key);
    }

    async waitForElementWithTimeout(locator, timeout = 8000) {
        await this.page.waitForSelector(locator, {
            timeout
        });
    }

    // Assertion Wrappers based on Official Playwright Documentation

    async assertToBeAttached(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeAttached();
    }

    async assertToBeChecked(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeChecked();
    }

    async assertToBeDisabled(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeDisabled();
    }

    async assertToBeEditable(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeEditable();
    }

    async assertToBeEmpty(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeEmpty();
    }

    async assertToBeEnabled(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeEnabled();
    }

    async assertToBeFocused(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeFocused();
    }

    async assertToBeHidden(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeHidden();
    }

    async assertToBeVisible(locator, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toBeVisible();
    }

    async assertToContainText(locator, text, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toContainText(text);
    }

    async assertToHaveAttribute(locator, name, value, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toHaveAttribute(name, value);
    }

    async assertToHaveClass(locator, className, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toHaveClass(className);
    }

    async assertToHaveCount(locator, count, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toHaveCount(count);
    }

    async assertToHaveCSS(locator, name, value, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toHaveCSS(name, value);
    }

    async assertToHaveId(locator, id, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toHaveId(id);
    }

    async assertToHaveText(locator, text, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toHaveText(text);
    }

    async assertToHaveValue(locator, value, timeout = 8000) {
        await this.waitForElementWithTimeout(locator, timeout);
        const element = await this.resolveLocator(locator);
        await expect(element).toHaveValue(value);
    }

    async assertUrl(expectedUrl) {
        const actualUrl = await this.page.url();
        assert.strictEqual(actualUrl, expectedUrl, `Expected URL to be "${expectedUrl}" but found "${actualUrl}"`);
    }
}

module.exports = PlaywrightHelper;