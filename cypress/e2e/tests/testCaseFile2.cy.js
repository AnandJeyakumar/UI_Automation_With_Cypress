import testData from '../../fixtures/testData.json'
import { generateRandomUser } from "../../support/dataUtils";
import { registerUser } from "../../support/apiUtils";
import { pageManager } from '../../support/pageManager';
import { Commands } from '../../support/enum';


const poManager  = new pageManager();
const homePageObj  =  poManager .getHomePage()
const myAccountPageObj  = poManager .getMyAccountPage()
const productsPageObj = poManager .getProductsPage()
const shippingDetailsPagesObj = poManager .getShippingDetailsPages()



describe("TestCase_B",()=>{
    let user;
    beforeEach(() => {
        user = generateRandomUser(testData.createAccountData);
        cy.visit('')
      });


    it("TestCase_B - Place order with multiple products (apply price calculation on checks)", () => {
        homePageObj.clickOnLink('Create an Account')
        cy.createNewUser(user.firstName, user.lastName, user.email, user.password);
        myAccountPageObj.getRegisterMessage().should(Commands.CONTAIN, testData.messages.registeredSuccessMessage);
        myAccountPageObj.mouseOverAndClickSubMenu(testData.menuItem.gearMenu, testData.menuItem.subMenuItem.Bags);
        productsPageObj.verifySubMenuBags(testData.menuItem.subMenuItem.Bags);
        productsPageObj.addToCart(testData.productsToAdd);
        cy.navigateToCartAndEnterAddress()
        shippingDetailsPagesObj.expandOrderSummmary();
        shippingDetailsPagesObj.verifyProductInOrderSummary(testData.productsToAdd,testData.productsPrices)
        cy.getElementByButtonText(testData.buttonsText.next).click()
        cy.waitTillTheLoaderDisappear()
        shippingDetailsPagesObj.validateOrderSummaryAmountDetails(testData.productsPrices,testData.fixedPrice)
        cy.getElementByButtonText(testData.buttonsText.placeOrder).click()
        shippingDetailsPagesObj.getOrderSuccessfullMessage().should(Commands.CONTAIN,testData.messages.orderPlacedSuccessMessage)
        shippingDetailsPagesObj.getOrderNumber().then((orderNum)=>{
            cy.writeFile('cypress/fixtures/orderID.json', { orderNumber: orderNum });
            cy.log("THe OrderNum is ", orderNum)
            Cypress.env("OderNum", orderNum)
        })
    });
    
})