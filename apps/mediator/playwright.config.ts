import { devices, PlaywrightTestConfig } from "@playwright/test";
import path from "path";

const port = 3000;

let webServerCmd = `pnpm next dev -p ${port}`;

switch (process.env.E2E_PLAYWRIGHT_MODE) {
  case "BUILD_AND_START":
    webServerCmd = `pnpm build && pnpm start -p ${port}`;
    break;

  case "SKIP_BUILD_AND_START":
    webServerCmd = `pnpm start -p ${port}`;
    break;
}

const outputDir = path.join(__dirname, "e2e/.out");

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // 10s Timeout per test
  timeout: 100 * 1000,
  // Test directory
  testDir: path.join(__dirname, "tests/e2e"),
  // If a test fails, retry it additional 2 times
  retries: 1,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",
  testMatch: "**/*.spec.ts",

  reporter: [
    process.env.CI ? ["github"] : ["list"],
    ["json", { outputFile: `${outputDir}/test-results.json` }],
    [
      "html",
      {
        outputFolder: `${outputDir}/html`,
        open: process.env.CI ? "never" : "on-failure",
      },
    ],
  ],

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: webServerCmd,
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",

    // headless: false,

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // {
    //   name: 'Desktop Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // Test against mobile viewports.
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: devices["iPhone 12"],
    // },
  ],
};
export default config;
