import testData from '../../cypress/fixtures/testData.json';
import { createAccountPage } from "../../cypress/pages/createAccountPage";
import { shippingDetailsPages } from "../../cypress/pages/shippingDetailsPages";
import { productsPage } from "../../cypress/pages/productsPage";
import { Commands, WaitTimes } from '../../cypress/support/enum';


const createAccountPageObj = new createAccountPage();
const shippingDetailsPagesObj = new shippingDetailsPages();
const productsPageObj = new productsPage();


Cypress.Commands.add('createNewUser', (firstName, lastName, email, password) => {
    createAccountPageObj.enterFirstName(firstName);
    createAccountPageObj.enterLastName(lastName);
    createAccountPageObj.enterEmail(email);
    createAccountPageObj.enterPassword(password);
    createAccountPageObj.clickCreateAnAccount();
});

Cypress.Commands.add('enterAddress', () => {
    cy.waitTillTheLoaderDisappear()
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
        .should(Commands.HAVE_LENGTH, arrayText.length)
        .each(($el, index) => {
            cy.wrap($el)
                .should(Commands.HAVE_TEXT, arrayText[index].trim());
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
        .should(Commands.BE_VISIBLE)
        .realHover()
        .find(insideElementToClick)
        .should(Commands.EXIST)
        .click({ force: true });
});

Cypress.Commands.add('getElementByButtonText', (text) => {
    console.log("Inside getElementByButtonText");
    return cy.contains('button', text);
});

Cypress.Commands.add('getElementByLinkText', (text) => {
    console.log("Inside getElementByButtonText");
    return cy.contains('a', text);
});

Cypress.Commands.add('navigateToCartAndEnterAddress', (text) => {
    console.log("Inside navigateToCartAndEnterAddress");
    productsPageObj.clickOnShowCartIcon();
    productsPageObj.clickOnProceedToCheckout();
    cy.enterAddress()
    cy.wait(WaitTimes.WAIT_2_SECONDS)
    cy.waitTillTheLoaderDisappear()
});

Cypress.Commands.add('waitTillTheLoaderDisappear', (text) => {
    console.log("Inside waitTillTheLoaderDisappear Commads");
    cy.get('body').then(($body) => {
        if ($body.find(shippingDetailsPagesObj.webLocators.loader).length > 0) {
            cy.log('Loader  found, inside if...');
            cy.get(shippingDetailsPagesObj.webLocators.loader, { timeout: WaitTimes.WAIT_10_SECONDS }).should(Commands.NOT_BE_VISIBLE);
        } else {
            cy.log('Loader not found, proceeding...');
        }
    });
});