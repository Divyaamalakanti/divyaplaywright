import { test, expect, chromium, Browser, Page } from '@playwright/test';

let browser: Browser;
let page: Page;

test.describe('Facebook Tests', () => {
 
  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
    page = await browser.newPage();

    // Log into Facebook
    await page.goto('https://www.facebook.com/');
    await page.fill('#email', '8790400396'); 
    await page.fill('#pass', '@divya'); 
    await page.click('button[name="login"]');
    await page.waitForLoadState('load');

    const greeting = page.locator('text=Welcome to Facebook, Dishi');
    await expect(greeting).toBeVisible();
    
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('Like and comment on a specific Facebook photo', async () => {
    await page.goto('https://www.facebook.com/photo/?fbid=4123264934596030&set=pcb.4123264941262696');
    await page.waitForLoadState('load');
    
    await page.waitForSelector('div[aria-label="Like"]', { timeout: 15000 });
    await page.click('div[aria-label="Like"]');

    
    const commentBox = page.locator('div[aria-label="Write a comment…"], textarea[aria-label="Write a comment…"]');
    await commentBox.first().click();
    await commentBox.first().fill('Nice');
    await commentBox.first().press('Enter');
  });

  

test('Create a post on Facebook', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  const postCreationArea = page.locator("What's on your mind, Dishi?");
  await page.waitForLoadState('load');
  try {
    await postCreationArea.waitFor({ timeout: 30000 });
    await postCreationArea.click();
    console.log('Clicked on "What\'s on your mind, Dishi?"');
  } catch (error) {
    console.error('button not found', error);
    return;
  }
  const textBox = page.locator('div[role="textbox"][aria-label="What\'s on your mind, Dishi?"]');
  try {
    await textBox.waitFor({ timeout: 20000 });
    await textBox.click();
    await textBox.fill('Hello from Divya');
    console.log('Typed text into the post box.');
  } catch (error) {
    console.error('Could not find or interact with the post textbox:', error);
    return;
  }
  const postButton = page.locator('div[role="button"]:has-text("Post")');
  try {
    await postButton.waitFor({ timeout: 20000 });
    await postButton.click();
    //console.log('Post submitted successfully');
  } catch (error) {
   // console.error('Could not find or click the Post button:', error);
    return;
  }
});
});