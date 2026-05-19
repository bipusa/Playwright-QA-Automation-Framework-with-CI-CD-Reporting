const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test("Refundable Ticket", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('thapa.bipusa@outlook.com', 'Eventhub@1234');
    await page.waitForLoadState('networkidle');
    expect(page.getByText('Browse Events →').first()).toBeVisible();
    
    await page.locator('#nav-events').click();
    const firsteventcard = page.locator('#event-card').first();
    await expect(firsteventcard).toBeVisible();
    await firsteventcard.getByText("Book Now").click();
    await page.pause();





})