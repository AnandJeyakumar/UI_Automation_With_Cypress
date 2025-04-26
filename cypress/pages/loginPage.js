export class loginPage {
    webLocators = {  
        email: "#email",
        password: "#pass",
        signInButton: ".primary#send2"
    };

    enterEmail(email) {
        cy.get(this.webLocators.email).type(email);
    }

    enterPassword(password) {
        cy.get(this.webLocators.password).type(password);
    }

    clickOnSignIn() {
        cy.get(this.webLocators.signInButton).click();
    }
}
