import { loginPage } from '../../pages/loginPage';


describe.skip('Login Tests', () => {
    const login = new loginPage();
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/customer/account/login/');
    });

    it.skip('should successfully login with valid credentials', () => {
        // Enter login credentials
        login.enterEmail('test@example.com');
        login.enterPassword('Test@123');
        login.clickOnSignIn();

        // Verify successful login by checking if we're redirected to the account dashboard
        cy.url().should('include', '/customer/account/');
        
        // Additional verification - check for welcome message or account elements
        cy.get('.page-title').should('be.visible');
        
    });
}); 