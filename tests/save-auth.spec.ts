import { test } from '@playwright/test';

const storageStatePath = 'facebook_auth.json'; // Path to save the authentication state

test('save facebook auth state', async ({ browser }) => {
  // Launch a new browser instance
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to Facebook (you should already be logged in this context)
  await page.goto('https://www.facebook.com/');
  await page.waitForLoadState('load');

  
  await page.waitForTimeout(5000);

  // Save the storage state
  await context.storageState({ path: storageStatePath });

  console.log(`Authentication state saved to ${storageStatePath}`);

  
  await context.close();
  await browser.close();
});