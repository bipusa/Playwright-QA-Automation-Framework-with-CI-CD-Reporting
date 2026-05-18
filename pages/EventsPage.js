class EventsPage {
  constructor(page) {
    this.page = page;
  }

  async goToEvents() {
    await this.page.locator('#nav-events').click();
    await this.page.waitForURL('**/events');
    await this.page.reload();
  }

  getEventCard(title) {
    return this.page.locator('#event-card').filter({ hasText: title }).first();
  }

  async getSeats(title) {
    const card = this.getEventCard(title);
    const text = await card
      .locator('span.text-xs', { hasText: 'seats available' })
      .textContent();
    return parseInt(text);
  }

  async bookEvent(title) {
    const card = this.getEventCard(title);
    await card.locator('#book-now-btn').click();
  }
}

module.exports = EventsPage;
