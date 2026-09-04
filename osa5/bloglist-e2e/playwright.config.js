const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5174',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: [
    {
      command: 'npm --prefix ../../osa4 run start:e2e',
      url: 'http://127.0.0.1:3004/api/blogs',
      reuseExistingServer: false,
      timeout: 120000,
    },
    {
      command: 'npm --prefix ../bloglist-frontend run dev -- --mode e2e --host 127.0.0.1 --port 5174 --strictPort',
      url: 'http://127.0.0.1:5174',
      reuseExistingServer: false,
      timeout: 120000,
    },
  ],
})
