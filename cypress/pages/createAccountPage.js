export class createAccountPage{

    weblocators = {
        firstName : "#firstname",
        lastName : "#lastname",
        email:"#email_address",
        password: "#password",
        confrimPassword : "#password-confirmation",
        createAnAccount : "button[title='Create an Account']"
    }

    enterFirstName(FName){
        cy.get(this.weblocators.firstName).type(FName)
    }

    enterLastName(LName){
        cy.get(this.weblocators.lastName).type(LName)
    }

    enterEmail(email){
        cy.get(this.weblocators.email).type(email)
    }

    enterPassword(password){
        cy.get(this.weblocators.password).type(password)
        cy.get(this.weblocators.confrimPassword).type(password)
    }

    clickCreateAnAccount(){
        cy.get(this.weblocators.createAnAccount).click()
    }

}