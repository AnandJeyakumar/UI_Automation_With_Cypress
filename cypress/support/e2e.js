import './commands'
import 'cypress-mochawesome-reporter/register';
import 'cypress-real-events/support';


Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the known 'clone' error in Magento's frontend
    if (err.message.includes("reading 'clone'") || err.stack.includes("block-loader.js")) {
      return false; // prevents Cypress from failing the test
    }
  });
  