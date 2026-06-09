const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.only("Refundable Ticket", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('thapa.bipusa@outlook.com', 'Eventhub@1234');
    await page.waitForLoadState('networkidle');
    expect(page.getByText('Browse Events →').first()).toBeVisible();
    
    await page.locator('#nav-events').click();
    const firsteventcard = page.locator('#event-card').first();
    await expect(firsteventcard).toBeVisible();
    await firsteventcard.getByText("Book Now").click();
    await page.locator('#customerName').fill("Simran Shetty");
    await page.locator('#customer-email').fill("dummyemail@gmail.com");
    await page.locator('#phone').fill("1234567890");
    await page.getByRole('button', {name: "Confirm Booking"}).click();
    await page.getByRole('button', {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL(/bookings/);
    await page.getByRole('button', {name: 'View Details'}).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();
    const bookingID = await page.locator(".text-gray-900.font-mono").textContent();
    console.log(bookingID);
    const eventtitle = await page.locator('.text-2xl.font-bold.text-gray-900').textContent();
    console.log(eventtitle);
    expect(bookingID?.[0]).toBe(eventtitle?.[0]);
    await page.locator('#check-refund-btn').click();
    await expect(page.locator('#refund-spinner')).toBeVisible();
    await expect(page.locator('#refund-spinner')).toBeHidden({timeout: 6000});
    const result = page.locator('#refund-result');
    await expect(result).toBeVisible();
    await expect(result).toContainText('Eligible for refund');
    await expect(result).toContainText('Single-ticket bookings qualify for a full refund.');
    
    await page.locator('#nav-events').click();
    await page.locator('#event-card').first().getByText("Book Now").click();
    const plusButton = page.getByRole('button', {name: "+"});
    const ticketCount = page.locator('#ticket-count');
    const target = 3;

    for(let i = 1; i < target; i ++) {
        await plusButton.click();
        await expect(ticketCount).toHaveText(String(i + 1));
    }
   
    await page.locator('#customerName').fill("Simran Shetty");
    await page.locator('#customer-email').fill("dummyemail@gmail.com");
    await page.locator('#phone').fill("1234567890");
    await page.getByRole('button', {name: "Confirm Booking"}).click();
    await page.getByRole('button', {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL(/bookings/);
    await page.getByRole('button', {name: 'View Details'}).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();
    const bookingID2 = await page.locator(".text-gray-900.font-mono").textContent();
    console.log(bookingID2);
    const eventtitle2 = await page.locator('.text-2xl.font-bold.text-gray-900').textContent();
    console.log(eventtitle2);
    expect(bookingID2?.[0]).toBe(eventtitle2?.[0]);
    await page.locator('#check-refund-btn').click();
    await expect(page.locator('#refund-spinner')).toBeVisible();
    await expect(page.locator('#refund-spinner')).toBeHidden({timeout: 6000});
    const result2 = page.locator('#refund-result');
    await expect(result2).toBeVisible();
    await expect(result2).toContainText('Not eligible for refund');
    await expect(result2).toContainText('Group bookings (3 tickets) are non-refundable.');

    await page.pause();





})