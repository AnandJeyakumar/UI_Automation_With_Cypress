import testData from '../../cypress/fixtures/testData.json';
import { createAccountPage } from "../../cypress/pages/createAccountPage";
import { shippingDetailsPages } from "../../cypress/pages/shippingDetailsPages";

const createAccountPageObj = new createAccountPage();
const shippingDetailsPagesObj = new shippingDetailsPages();

Cypress.Commands.add('createNewUser', (firstName, lastName, email, password) => {
    createAccountPageObj.enterFirstName(firstName);
    createAccountPageObj.enterLastName(lastName);
    createAccountPageObj.enterEmail(email);
    createAccountPageObj.enterPassword(password);
    createAccountPageObj.clickCreateAnAccount();
});

Cypress.Commands.add('enterAddress', () => {
    shippingDetailsPagesObj.enterStreet(testData.address.streetAdress);
    shippingDetailsPagesObj.enterCity(testData.address.city);
    shippingDetailsPagesObj.selectState(testData.address.state);
    shippingDetailsPagesObj.enterPostCode(testData.address.postalCode);
    shippingDetailsPagesObj.selectCountry(testData.address.country);
    shippingDetailsPagesObj.enterPhoneNumber(testData.address.phoneNumber);
});

// The Below function is for verifying multiple elements and their text
// first param - element, second param = array of text to verify
Cypress.Commands.add('verifyMultipleElementsAndText', (element, arrayText) => {
    cy.get(element)
        .should('have.length', arrayText.length)
        .each(($el, index) => {
            cy.wrap($el)
                .should('have.text', arrayText[index].trim());
        });
});

Cypress.Commands.add('reloadIfErrorVisible', () => {
    cy.get('body').then($body => {
        if ($body.find('.message-error > div').is(':visible')) {
            cy.log('Error message visible. Reloading...');
            cy.reload();
        } else {
            cy.log('No visible error message.');
        }
    });
});

Cypress.Commands.add('waitForFullLoad', () => {
    console.log("Inside waitForFullLoad");
    cy.document().should('have.property', 'readyState').and('eq', 'complete');
});

Cypress.Commands.add('mouseHowerAndClickInsideElement', (hoverElement, product, insideElementToClick) => {
    cy.contains(hoverElement, product)
        .scrollIntoView()
        .should('be.visible')
        .realHover()
        .find(insideElementToClick)
        .should('exist')
        .click({ force: true });
});

Cypress.Commands.add('getElementByButtonText', (text) => {
    console.log("Inside getElementByButtonText");
    return cy.contains('button', text);
});
