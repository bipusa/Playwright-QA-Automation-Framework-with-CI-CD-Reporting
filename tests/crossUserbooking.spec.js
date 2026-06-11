const { test, request, expect } = require('@playwright/test');

const yahoo_login = { email: 'bonchan01@yahoo.com', password: 'Eventhub@1234' };
const gmail_login = { email: "thapa.bipusa@outlook.com", password: "Eventhub@1234" };

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

async function loginAs(page, user) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').waitFor({ state: 'visible' });

    await page.getByPlaceholder('you@email.com').fill(user.email);
    await page.getByLabel('Password').fill(user.password);

    await page.locator('#login-btn').click();

    await expect(page.getByRole('link', { name: 'Browse Events →' }))
        .toBeVisible({ timeout: 10000 });
}

test('cross-user booking access denined', async ({ page }) => {
    const apiContext = await request.newContext();

// ---------------- LOGIN YAHOO USER ----------------
    const loginYH = await apiContext.post(`${API_URL}/auth/login`, {
        data: yahoo_login,
    });
    expect(loginYH.ok()).toBeTruthy();
    const { token } = await loginYH.json();
    console.log(token);

// ---------------- GET EVENTS ----------------
    const eventYH = await apiContext.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    expect(eventYH.ok()).toBeTruthy();
    const eventYHData = await eventYH.json();
    const eventYHId = eventYHData.data[0].id;
    console.log(eventYHId);

 // ---------------- CREATE BOOKING ----------------

    const bookingYH = await apiContext.post(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
            eventId: eventYHId,
            customerName: 'YahooUser',
            customerEmail: yahoo_login.email,
            customerPhone: '1234556789',
            quantity: 1,
        },
    });
    expect(bookingYH.ok()).toBeTruthy();
    const yahooBookingId = (await bookingYH.json()).data.id;

    console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);

// ---------------- UI LOGIN (GMAIL USER) ----------------
    await loginAs(page, gmail_login);
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

// ── Step 6: Validate Access Denied ───────────────────────────────────────
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
});





