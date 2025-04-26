const { defineConfig } = require("cypress");
const grep = require('cypress-grep/src/plugin'); // 👈 Correct import

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 6000,
  retries: {
    runMode: 1,
    openMode: 2
  },
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com/",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // 👈 Set up reporter
      grep(config); // 👈 Set up grep filter
      return config; // 👈 Return config after setup
    },
  },
  env: {
    URL: "https://magento.softwaretestingboard.com/",
  },
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
});
