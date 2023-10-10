const { test, expect } = require('@playwright/test');
const HomePage = require('../page_objects/HomePage');
const config = require('../playwright.config.js');

test.describe('Search Functionality', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('should perform a search and show relevant results', async ({ page }) => {
    await homePage.performSearch('Bitcoin');
    await homePage.assertCurrencyIsDisplayed();
  });
});