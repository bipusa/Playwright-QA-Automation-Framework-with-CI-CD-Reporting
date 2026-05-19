import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 50 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure', //off or retain-on-failure or on

    },
});