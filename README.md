# 🧪 Playwright End-to-End Automation Framework with CI

This project is a **Playwright-based End-to-End (E2E) test automation framework** for testing web applications. It automates real browser user flows such as login and navigation.

It also includes a **Continuous Integration (CI) pipeline using GitHub Actions**, which runs tests automatically on every push and pull request.

---

## 🚀 Project Overview

This framework automates **web UI testing in a real browser environment** using Playwright.

It covers end-to-end user flows such as:
- Login functionality
- Navigation between pages
- Form interactions
- UI validations and assertions

The framework supports:
- Local test execution
- CI execution via GitHub Actions

---

## 🛠️ Tech Stack

- Playwright
- Node.js
- JavaScript / TypeScript
- GitHub Actions (CI)
- Playwright HTML Reporter

---

## 📁 Project Structure
















## ▶️ Running Tests Locally

### Install dependencies
```
npm install
```
### Install browsers
```
npx playwright install
```
### Run all tests
```
npx playwright test
```
### Run tests in headed mode (browser visible)
```
npx playwright test ---headed
```
### 📊 Test Reports
HTML Report (Playwright)
After running tests:
```
npx playwright show-report
```
This report shows:
Test results (pass/fail)
Execution steps
Error messages

## 🔄 CI Pipeline (GitHub Actions)

This project uses GitHub Actions to automatically run tests.

What CI does:
Checkout code from repository
Install dependencies
Install Playwright browsers
Run E2E tests
Generate reports
Upload artifacts
CI triggers:
On every push to main
On every pull request
📸 Test Artifacts (Debugging)

When configured, Playwright captures:

📷 Screenshots (on failure)
🎥 Videos (on failure)
🔍 Trace files for debugging

These help debug failures in CI.

## 🧪 Key Features

✔ End-to-End UI automation
✔ Real browser testing
✔ CI integration using GitHub Actions
✔ HTML reporting
✔ Debugging support (screenshots/videos/traces)
✔ Scalable test structure

## 📌 Future Improvements

Page Object Model (POM) structure
Allure reporting integration
Test tagging (API/smoke/regression)
Docker integration for CI

## 👨‍💻 Author

QA Automation Engineer (Learning Project)
Focused on Playwright automation, CI pipelines, and real-world testing practices.

## ⭐ Purpose

This project demonstrates:

UI automation testing (E2E)
Test framework design
CI automation using GitHub Actions




