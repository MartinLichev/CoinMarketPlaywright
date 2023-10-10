const { chromium, firefox, webkit } = require('@playwright/test');
const HomePage = require('./page_objects/HomePage');
const config = require('./playwright.config.js');

const launchBrowser = async (browserType) => {
  const browser = await browserType.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage(config.use.baseURL);
  return browser;
};

module.exports = async () => {
  const browserTypes = { chromium, firefox, webkit };
  global.browsers = {};

  for (const [key, browserType] of Object.entries(browserTypes)) {
    global.browsers[key] = await launchBrowser(browserType);
  }
};