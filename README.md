# Cypress UI Automation Assessment

This project demonstrates end-to-end UI test automation using **Cypress** on the Magento demo website:  
🔗 [https://magento.softwaretestingboard.com/](https://magento.softwaretestingboard.com/)

---

## ✅ Project Highlights

- ✅ **Page Object Model (POM)** structure
- ✅ **Reusable components** and clean modular code
- ✅ **Dynamic user creation** using randomization of test data
- ✅ **External test data** (JSON)
- ✅ **Custom commands and API utilities**
- ✅ **All tests included in a single spec file** for easy review (can be modularized)
- ✅ **Added Enums for managing common test actions and wait times**, making the test flow more structured and easier to maintain:

---

## 🧪 Automated Test Cases

| Test Case | Description |
|----------|-------------|
| A | Registration flow with login validation (UI-driven dynamic user creation) |
| B | Place order with multiple products (validates price calculations, UI-driven dynamic user creation) |
| C | Add products to Wishlist and checkout from Wishlist (API-driven user creation for efficiency) |
| D | Search for a product and validate search results |

---

## 🛠️ Setup Instructions

1. **Clone this repo:**
   git clone https://github.com/your-username/project-name.git
   cd project-name

2. **Install dependencies:**
   npm install

3. **Run tests in headed mode:**
   npx cypress open

3. **Run tests in headless mode:**
   npm run test

4. **For Report Generation:**
   npm install cypress-mochawesome-reporter --save-dev

5. **Install Grep for Grouping:**
   npm install -D cypress-grep
   2. Update your cypress.config.js

Add this inside setupNodeEvents:

setupNodeEvents(on, config) {
  require('cypress-mochawesome-reporter/plugin')(on);
  require('cypress-grep/src/plugin')(config);   
  return config;
}


Updated Scripts Section in package.json

In the package.json file, I've added the following scripts to run specific test cases using --grep to filter the tests by their names:

    "scripts": {
    "cy:testA": "npx cypress run --spec 'cypress/e2e/tests/Assessment.cy.js' --env grep=TestCase_A",
    "cy:testB": "npx cypress run --spec 'cypress/e2e/tests/Assessment.cy.js' --env grep=TestCase_B",
    "cy:testC": "npx cypress run --spec 'cypress/e2e/tests/Assessment.cy.js' --env grep=TestCase_C",
    "cy:testD": "npx cypress run --spec 'cypress/e2e/tests/Assessment.cy.js' --env grep=TestCase_D"
    }

📌 Notes

✅ Test Case A and B involve full UI-driven automation for account creation and validation, dynamically generating user credentials in each test run.

✅ For Test Case C, I implemented an API endpoint to create users, optimizing execution time.

✅ All four test cases are included in one file for assessment clarity. In real-world scenarios, tests would be modularized into separate spec files.

✅ Test data, including user credentials, is dynamically generated using random values in the test code itself.

✅ --grep is used to filter and group tests based on their names. This is useful for organizing tests in real-time into different categories such as:
        Regression Tests
        Sanity Tests
        Smoke Tests

✅ I used an enum.js to avoid hardcoding command strings directly inside the tests. It improves reusability and avoids typos, following clean code practices.

✅ This project dynamically handles user account creation during test execution. As a result, no external API keys, authentication tokens, or other sensitive credentials are required for the tests.

✅ There is no need for manual setup or configuration of keys; everything is handled within the automation itself.

✅ Simply run the tests, and the necessary user accounts will be created automatically.


📬 Contact
For questions or feedback, feel free to reach out to:
anandjeyakumar7@gmail.com
