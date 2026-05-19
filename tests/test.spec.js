const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');

test.only('User Login and Create Event Module', async ({ page }) => {
    const baseURL = 'https://eventhub.rahulshettyacademy.com';

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill('thapa.bipusa@outlook.com');
    await page.getByPlaceholder('••••••').fill('Eventhub@1234');
    await page.locator('#login-btn').click();
    await page.waitForLoadState('networkidle');
    expect(page.getByText('Browse Events →').first()).toBeVisible();

    await page.getByText('Admin').click();
    await page.getByText('Manage Events').first().click();
    expect (page.getByText('+ New Event')).toBeVisible();

    await page.getByPlaceholder('Event title').fill('Musical Concert Event Latest');
    await page.getByPlaceholder('Describe the event…').fill('Lets gather to celebrate love for music!!!');
    await page.getByLabel('category').selectOption('Concert');
    await page.getByLabel('city').fill('Mumbai');
    await page.getByLabel('Venue').fill('xyz Central Mall, street 12');
    await page.locator('[id="event-date-&-time"]').pressSequentially('12112026');
    await page.locator('[id="event-date-&-time"]').press('Tab');
    await page.locator('[id="event-date-&-time"]').pressSequentially('0230pm')
    await page.getByLabel('Price ($)*').fill('21.00');
    await page.getByText('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();
    
    await page.locator('#nav-events').click();
    await expect (page.locator('#event-card').first()).toBeVisible();
    const matchedcard = page.locator('.p-4.flex.flex-col.flex-1').nth(3).filter({hasText: "Musical Concert Event"});
    await expect(matchedcard).toBeVisible({timeout: 5000});
    const seatsbeforebooking =  await matchedcard.locator('span.text-xs').textContent();
    console.log(seatsbeforebooking);
    const seats = parseInt(seatsbeforebooking);
    console.log(seats);
    await matchedcard.locator('#book-now-btn').click();
    await page.locator('.text-lg.font-bold.text-gray-900').waitFor();
    await expect(page.locator('#ticket-count').filter({hasText: "1"})).toBeVisible();
    await page.getByLabel('Full Name*').fill("James Bond");
    await page.locator('#customer-email').fill("test@test.com");
    await page.getByPlaceholder('+91 98765 43210').fill('+1234567890');
    await page.getByRole('button', {name: "Confirm Booking"}).click();
    await expect(page.getByText('Booking Confirmed')).toBeVisible({timeout: 5000});
    
    await expect(page.locator('.booking-ref')).toBeVisible();
    const bookingref = await page.locator('.booking-ref').textContent();
    console.log(bookingref);
    await page.getByText('View My Bookings').click();
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
    await expect(page.locator('#booking-card').first()).toBeVisible();
    const bookedCard = page.locator('#booking-card').filter({hasText: bookingref});
    await expect(bookedCard).toContainText('Musical Concert Event Latest');

    await page.locator('#nav-events').click();
    await page.waitForURL('https://eventhub.rahulshettyacademy.com/events');
    await page.reload();

    await expect(page.locator('#event-card').first()).toBeVisible();
    const createdevent = page.locator('#event-card').filter({hasText: 'Musical Concert Event Latest'}).nth(0);
    await expect(createdevent).toBeVisible({timeout: 5000});
    const bookedtext =  await createdevent.locator('span.text-xs', { hasText: 'seats available' }).textContent();
    const seatsafterbooking = parseInt(bookedtext);
    console.log(seatsafterbooking);
    expect(seatsafterbooking).toBe(seats -1);




    






    



});