//Test_ 004 Search for publication/ article/ etc “ieee 802 wireless systems

import { test, expect } from '@playwright/test';

test('Verify user can search for publications/articles/etc.', async ({ page }) => {
  // Increase the timeout for the test
  test.setTimeout(60000); // 60 seconds timeout



  //section 01
  try {
    //  Go to the Wiley Online Library homepage
    try {
      await page.goto('https://onlinelibrary.wiley.com/');
      console.log('Successfully opened Wiley Online Library homepage.');
    } catch (error) {
      console.error('Failed to open Wiley Online Library homepage:', error);
      throw error;
    }


    // Enter the publication “ieee 802 wireless systems” in the search bar
    try {
      await page.fill('input[name="AllField"]', 'ieee 802 wireless systems');
      console.log('Successfully entered search term.');
    } catch (error) {
      console.error('Failed to enter search term:', error);
      throw error;
    }

    // Click the search button
    try {
      await page.click('button[type="submit"]');
      console.log('Successfully clicked search button.');
    } catch (error) {
      console.error('Failed to click search button:', error);
      throw error;
    }





    //section 02
    // Verify the relevant search results are displayed
    try {
      await expect(page).toHaveURL(/AllField/); // Verify the URL contains 'search'
      console.log('Successfully verified URL contains search term.');
    } catch (error) {
      console.error('Failed to verify URL contains search term:', error);
      throw error;
    }

    try {
      // Verify the search term is visible in the results
      await expect(page.locator('text="ieee 802 wireless systems"')).toBeVisible(); 
      console.log('Successfully verified search term is visible in the results.');
    } catch (error) {
      console.error('Failed to verify search term is visible in the results:', error);
      throw error;
    }

   


    //section 03
    try {
      await page.waitForTimeout(10000); // 10 seconds delay
    } catch (error) {
      console.error('Failed to add delay for inspection:', error);
      throw error;
    }

  } catch (error) {
    console.error('An error occurred during the test:', error);
    throw error; 
  }
});