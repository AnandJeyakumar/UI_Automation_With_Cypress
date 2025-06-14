import './commands'
import 'cypress-mochawesome-reporter/register';
import 'cypress-real-events/support';
require('cypress-grep')();
import '@testing-library/cypress/add-commands';
import 'cypress-failed-log';


Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the known 'clone' error in Magento's frontend
    if (err.message.includes("reading 'clone'") || err.stack.includes("block-loader.js")) {
      return false; // prevents Cypress from failing the test
    }
  });
  