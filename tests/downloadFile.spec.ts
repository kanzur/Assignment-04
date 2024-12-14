//Test_006 Download free publication/ article in pdf format
//Used Try-catch to figure out exactly where was the exact error is been raised.

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Download free publication/article in pdf format', async ({ page }) => {
  test.setTimeout(120000); // Set test timeout to 2 minutes to ensure all steps complete




  //section 01
  try {
    // Go to the Wiley Online Library homepage and search for "ieee 802 wireless systems"
    try {
      await page.goto('https://onlinelibrary.wiley.com/');
      console.log('Successfully opened Wiley Online Library homepage.');
    } catch (error) {
      console.error('Failed to open Wiley Online Library homepage:', error);
      throw error;
    }

    try {
      await page.fill('input[name="AllField"]', 'ieee 802 wireless systems');
      console.log('Successfully entered search term.');
    } catch (error) {
      console.error('Failed to enter search term:', error);
      throw error;
    }

    try {
      await page.click('button[type="submit"]');
      console.log('Successfully clicked search button.');
    } catch (error) {
      console.error('Failed to click search button:', error);
      throw error;
    }



    //The below code won't work due to a cloudflare verification.
    //The code is assumed and wrote, if there is no cloudflare human verification.


    //section 02
    // Click the “Front Matter” publication displayed in the search results
    try {
      // Wait for the meatballs menu button to appear and click it
      await page.waitForSelector('button#settings_button', { timeout: 60000 });
      await page.click('button#settings_button'); // Clicking the meatballs menu
      
      console.log('Successfully opened the meatballs menu.');

      //await page.waitForSelector('//html/body/div[2]/div/div[2]/main/div/div/div[1]/div/div/div[2]/div/div/ul/li[3]/div/h2/span/a'); //Xpath for the "Front Matter" publication is used
      //await page.click('//html/body/div[2]/div/div[2]/main/div/div/div[1]/div/div/div[2]/div/div/ul/li[3]/div/h2/span/a');
      
      console.log('Successfully clicked "Front Matter" publication.');

    } catch (error) {
      console.error('Failed to click "Front Matter" publication:', error);
      throw error;
    }





    //section 03
    // Click the pdf icon on the page
    try {
      await page.waitForSelector('a[title="ePDF"]'); //title for pdf is ePDF
      await page.click('a[title="ePDF"]');

      console.log('Successfully clicked PDF icon.');

    } catch (error) {
      console.error('Failed to click PDF icon:', error);
      throw error;
    }




    //section 04
    // Click the download icon on the page
    try {
      await page.click('/html/body/nav/div[3]/div[3]/div/button/span'); //click for meatballs menu

      await page.waitForSelector('a[aria-label^="Download PDF"]', { timeout: 60000 }); // Match aria-label for the download link
      console.log('Download link is visible.');

      // Handle the file download
      const [download] = await Promise.all([
          page.waitForEvent('download'), 
          page.click('a[aria-label^="Download PDF"]') // Click the link with a reliable aria-label selector
      ]); 


      // const downloadPath = path.join(__dirname, 'downloads', await download.suggestedFilename());
      // await download.saveAs(downloadPath); // Save the downloaded file in saveas format


      console.log('Successfully clicked download icon and downloaded the file.');
    } catch (error) {
      console.error('Failed to click download icon or download the file:', error);
      throw error;
    }




    //section 05
    // Verify the file was downloaded
    try {
      const downloadPath = path.join(__dirname, 'downloads');
      const files = fs.readdirSync(downloadPath);

      const pdfFile = files.find(file => file.endsWith('.pdf'));
      
      expect(pdfFile).toBeDefined();
      console.log('Successfully verified the file was downloaded.');

    } catch (error) {
      console.error('Failed to verify the file was downloaded:', error);
      throw error;
    }





  } catch (error) {
    console.error('An error occurred during the test:', error);
    throw error; // Re-throw the error to ensure the test fails
  }
});