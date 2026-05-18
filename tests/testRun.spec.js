const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const AdminPage = require('../pages/AdminPage');
const EventsPage = require('../pages/EventsPage');
const BookingPage = require('../pages/BookingPage');


test.only('User Login and Create Event Module (POM)', async ({ page }) => {
  const login = new LoginPage(page);
  const admin = new AdminPage(page);
  const events = new EventsPage(page);
  const booking = new BookingPage(page);

  const eventTitle = 'Musical Concert Event Latest';

  await login.goto();
  await login.login('thapa.bipusa@outlook.com', 'Eventhub@1234');

  await admin.navigateToCreateEvent();
  await admin.createEvent(eventTitle);

  await events.goToEvents();
  const seatsBefore = await events.getSeats(eventTitle);

  await events.bookEvent(eventTitle);
  await booking.fillBookingDetails();

  const bookingRef = await booking.getBookingRef();
  await booking.goToBookings();
  await booking.verifyBooking(bookingRef, eventTitle);

  await events.goToEvents();
  const seatsAfter = await events.getSeats(eventTitle);

  expect(seatsAfter).toBe(seatsBefore - 1);
});