class AdminPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToCreateEvent() {
    await this.page.getByText('Admin').click();
    await this.page.getByText('Manage Events').first().click();
  }

  async createEvent(title) {
    await this.page.getByPlaceholder('Event title').fill(title);
    await this.page.getByPlaceholder('Describe the event…').fill('Lets gather to celebrate love for music!!!');
    await this.page.getByLabel('category').selectOption('Concert');
    await this.page.getByLabel('city').fill('Mumbai');
    await this.page.getByLabel('Venue').fill('xyz Central Mall, street 12');

    await this.page.locator('[id="event-date-&-time"]').pressSequentially('12112026');
    await this.page.locator('[id="event-date-&-time"]').press('Tab');
    await this.page.locator('[id="event-date-&-time"]').pressSequentially('0230pm');

    await this.page.getByLabel('Price ($)*').fill('21.00');
    await this.page.getByText('Total Seats').fill('50');
    await this.page.locator('#add-event-btn').click();

    await this.page.getByText('Event created!').waitFor();
  }
}

module.exports = AdminPage;