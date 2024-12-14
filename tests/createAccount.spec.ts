//Test_001 Account creation (register) with valid credentials

import { test, expect } from '@playwright/test';

test('Verify user can successfully register and create an account', async ({ page }) => {
  test.setTimeout(180000); // Set test timeout to 3 minutes to ensure all steps complete




  //section 01
  try {
    // Navigate to the Wiley website and click Login/Register
    try {
      await page.goto('https://onlinelibrary.wiley.com/');
      console.log('Successfully opened Online Library Wiley.');
    } catch (error) {
      console.error('Failed to open Online Library Wiley:', error);
      throw error;
    }

    try {
      await page.click('#indivLogin'); // id for the Login/Register button
      console.log('Successfully clicked Login/Register.');
    } catch (error) {
      console.error('Failed to click Login/Register:', error);
      throw error;
    }

    try {
      await page.click('//a[contains(text(), "Register")]'); // Register button locator
      console.log('Successfully clicked Register.');
    } catch (error) {
      console.error('Failed to click Register:', error);
      throw error;
    }





    //section 02
    // Enter the email address and click the “Continue” button.
    const emailAddress = 'kanzur@gmail.com'; // Can adjust the email address as needed
    try {
      await page.fill('input[name="email"]', emailAddress);
      await page.click('#sign-up-btn');

      console.log('Successfully entered email and clicked Continue.');

    } catch (error) {
      console.error('Failed to enter email and click Continue:', error);
      throw error;
    }




    //section 03
    // Paused the test to allow manual entry of the verification code
    console.log('Pausing the test. Please enter the verification code from the mail you had entered and click the sign-up button.');
    await page.pause();


    //section 04
    // Enter First Name, Last Name, Select the Country/region, password and click “Continue” button.
    try {
      await page.fill('input[name="firstName"]', 'Test');
      await page.fill('input[name="lastName"]', 'User');
      await page.selectOption('select[name="country"]', 'US'); // Adjust the value as needed
      await page.fill('input[name="password"]', 'SecurePassword123'); //for testing purpose only
      await page.fill('input[name="confirmPassword"]', 'SecurePassword123'); //for testing purpose only
      await page.click('#complete-account-btn');
      console.log('Successfully entered personal details and clicked Continue.');
    } catch (error) {
      console.error('Failed to enter personal details and click Continue:', error);
      throw error;
    }

    // Enter the “Confirm” button to accept the registration confirmation.
    try {
      await page.click('#confirm-btn'); 
      console.log('Successfully clicked Confirm.');
    } catch (error) {
      console.error('Failed to click Confirm:', error);
      throw error;
    }





    //section 05
    // Verify the user is redirected to a confirmation page or dashboard
    try {
      const currentURL = page.url();
      console.log(`Current URL: ${currentURL}`);
      await expect(page).toHaveURL(/.*confirmation/); // Adjust the URL pattern as needed
      console.log('Successfully redirected to confirmation page.');
    } catch (error) {
      console.error('Failed to redirect to confirmation page:', error);
      throw error;
    }




    
    //section 06
    // Log "Test run successfully" to the terminal and include it in the report
    try {
      console.log('Test run successfully');
      await expect(page.locator('text=Test run successfully')).toBeVisible(); // Adjust the text as needed
    } catch (error) {
      console.error('Failed to log "Test run successfully":', error);
      throw error;
    }

  } catch (error) {
    console.error('An error occurred during the test:', error);
    throw error; // Re-throw the error to ensure the test fails
  }
});