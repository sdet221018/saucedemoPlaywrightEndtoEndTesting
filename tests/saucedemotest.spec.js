const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');

test('saucedemo: Add Highest Price Item to cart', async ({page})=> {
// Step 1: Navigate to the following URL https://www.saucedemo.com/
// Step 2: Login using the following details (username: standard_user, password: secret_sauce)
// Step 3: Select the highest price item (Please do not use the “Sort By” option on the page)
// Step 4: Add the selected highest price item to the cart

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const inventoryPage = poManager.getInventoryPage();

    const username = "standard_user";
    const secretpassword = "secret_sauce";

// Step 1: Navigate to the following URL https://www.saucedemo.com/
    await loginPage.goto();
    // Assertion to verify URL of the Landing Page.
    await expect(page).toHaveURL("https://www.saucedemo.com");
    // Assertion to verify Title of the the Landing Page.
    await expect(page).toHaveTitle("Swag Labs");

// Step 2: Login using the following details (username: standard_user, password: secret_sauce)
    await loginPage.validLogin(username,secretpassword);
    // Assertion to verify URL of the Inventory Page.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // Assertion to verify the Inventory Page Title as Swag Labs.
    await expect(page).toHaveTitle("Swag Labs");
    // Assertion to vefiry the App Logo has Text as "Swag Labs" after Logging into the Inventory Page.
    await expect(page.locator(".app_logo")).toContainText("Swag Labs");

// Step 3: Select the highest price item (Please do not use the “Sort By” option on the page)
    const highestPriceItemIndex = await inventoryPage.getHighestPriceItem();
    const prices = await page.$$eval(inventoryPage.inventoryItemPrice, (items) =>
        items.map(item => parseFloat(item.textContent.replace('$', '')))
    );
    const maxPrice = Math.max(...prices);
    // Assertion: Check if selected item has the highest price
    expect(prices[highestPriceItemIndex]).toBe(maxPrice); 

// Step 4: Add the selected highest price item to the cart
    await inventoryPage.addItemToCartByIndex(highestPriceItemIndex);
    const cartButton = await page.$('.shopping_cart_badge');
    const cartItemCount = await cartButton.textContent();
    // Assertion: Validate that 1 item is added to the cart
    expect(cartItemCount).toBe('1');

});