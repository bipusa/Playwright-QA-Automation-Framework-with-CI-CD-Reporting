class BookingPage {
  constructor(page) {
    this.page = page;
  }

  async fillBookingDetails() {
    await this.page.getByLabel('Full Name*').fill('James Bond');
    await this.page.locator('#customer-email').fill('test@test.com');
    await this.page.getByPlaceholder('+91 98765 43210').fill('+1234567890');
    await this.page.getByRole('button', { name: 'Confirm Booking' }).click();
  }

  async getBookingRef() {
    await this.page.locator('.booking-ref').waitFor();
    return await this.page.locator('.booking-ref').textContent();
  }

  async goToBookings() {
    await this.page.getByText('View My Bookings').click();
  }

  async verifyBooking(ref, title) {
    const card = this.page.locator('#booking-card').filter({ hasText: ref });
    await card.waitFor();
    await card.getByText(title).waitFor();
  }
}

module.exports = BookingPage;