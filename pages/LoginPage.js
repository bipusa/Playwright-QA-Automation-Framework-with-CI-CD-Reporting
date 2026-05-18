class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByPlaceholder('you@email.com');
    this.password = page.getByPlaceholder('••••••');
    this.loginBtn = page.locator('#login-btn');
  }

  async goto() {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
  }

  async login(user, pass) {
    await this.email.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}

module.exports = LoginPage;
