export class myAccountPage{

    webLocators= {  
        registeredMessage : "div[data-bind*='prepareMessageForHtml']",
        welcomeWithUserName: ".panel span.logged-in",
        contactInfo: ".box-content p",
        actionSwitch:".panel .switch[data-action='customer-menu-toggle']",
        signOut: ".base",
        menuItems:"a.level-top"

    }

    getRegisterMessage(){
        return cy.get(this.webLocators.registeredMessage)
    }

    getWelcomeText(){
        return cy.get(this.webLocators.welcomeWithUserName)
    }

    getContactInformation(){
        return cy.get(this.webLocators.contactInfo)
    }

    clickOnActionDropdown(){
        cy.get(this.webLocators.actionSwitch).click()
    }

    clickOnTextLink(textToSelect){
        cy.contains('a', textToSelect).click();
    }

    getSignOut(){
        return cy.get(this.webLocators.signOut)
    }

    getMenuItems(text) {
        return cy.contains(this.webLocators.menuItems, text);
    }

    getSubMenuItems(subMenuItem){
        return cy.contains('a', subMenuItem)
    }

    mouseOverAndClickSubMenu(text,subMenuItem){
        this.getMenuItems(text).should('be.visible').trigger('mouseover');
        this.getSubMenuItems(subMenuItem).should('be.visible').click()
    }

}

