import testData from '../../fixtures/testData.json'
import { generateRandomUser } from "../../support/dataUtils";
import { registerUser } from "../../support/apiUtils";
import { beforeEach } from "mocha"
import { pageManager } from '../../support/pageManager';
require('cypress-grep')();
import { Commands } from '../../support/enum';


const poManager  = new pageManager();
const homePageObj  =  poManager .getHomePage()
const createAccountPageObj  = poManager .getCreateAccountPage()
const myAccountPageObj  = poManager .getMyAccountPage()
const loginPageObj = poManager .getLoginPage()
const productsPageObj = poManager .getProductsPage()
const shippingDetailsPagesObj = poManager .getShippingDetailsPages()
const myWishListPageObj = poManager .getMyWishListPage()


describe("Assessment",()=>{
    let user;
    beforeEach(() => {
        user = generateRandomUser(testData.createAccountData);
        cy.visit('')
      });

    it("TestCase_A - Registration flow with login validation",()=>{
        homePageObj.clickOnLink('Create an Account')
        createAccountPageObj.enterFirstName(user.firstName);
        createAccountPageObj.enterLastName(user.lastName);
        createAccountPageObj.enterEmail(user.email);
        createAccountPageObj.enterPassword(user.password);
        createAccountPageObj.clickCreateAnAccount();
        myAccountPageObj.getRegisterMessage().should(Commands.CONTAIN, testData.messages.registeredSuccessMessage)
        myAccountPageObj.getWelcomeText().should(Commands.CONTAIN,user.firstName).and(Commands.CONTAIN,user.lastName)
        myAccountPageObj.getContactInformation().should(Commands.CONTAIN,user.email)
        myAccountPageObj.clickOnActionDropdown()
        myAccountPageObj.clickOnTextLink(testData.buttonsText.signOut)
        myAccountPageObj.getSignOut().should(Commands.HAVE_TEXT,testData.messages.signedOutMessage)
        homePageObj.clickOnLink(testData.buttonsText.signIn)
        loginPageObj.enterEmail(user.email)
        loginPageObj.enterPassword(user.password)
        loginPageObj.clickOnSignIn()
        myAccountPageObj.getContactInformation().should(Commands.CONTAIN,user.email)
    })


    it("TestCase_B - Place order with multiple products (apply price calculation on checks)", () => {
        homePageObj.clickOnLink('Create an Account')
        cy.createNewUser(user.firstName, user.lastName, user.email, user.password);
        myAccountPageObj.getRegisterMessage().should(Commands.CONTAIN, testData.messages.registeredSuccessMessage);
        myAccountPageObj.mouseOverAndClickSubMenu("Gear", "Bags");
        productsPageObj.verifySubMenuBags();
        productsPageObj.addToCart(testData.productsToAdd);
        productsPageObj.clickOnShowCartIcon();
        productsPageObj.clickOnProceedToCheckout();
        cy.waitForFullLoad()
        cy.enterAddress()
        shippingDetailsPagesObj.expandOrderSummmary();
        shippingDetailsPagesObj.verifyProductInOrderSummary(testData.productsToAdd,testData.productsPrices)
        shippingDetailsPagesObj.waitTillTheLoaderDisappear();
        cy.getElementByButtonText(testData.buttonsText.next).click()
        shippingDetailsPagesObj.validateOrderSummaryAmountDetails(testData.productsPrices,testData.fixedPrice)
        cy.getElementByButtonText(testData.buttonsText.placeOrder).click()
        shippingDetailsPagesObj.getOrderSuccessfullMessage().should(Commands.CONTAIN,testData.messages.orderPlacedSuccessMessage)
    });


    
    it("TestCase_C - Add products in Wishlist and checkout from wishlist",()=>{
        homePageObj.getFormKey().invoke('val').then((formKey) => {
            cy.log('Form Key:', formKey);
            registerUser(formKey, user);
            cy.log("The user email registered through API is ", user.email);
            cy.log("The password registered through API is ", user.password);
        });
        homePageObj.navigateToUrlEndPoint("gear/bags.html")
        productsPageObj.addToWishList(testData.wishListProduct)
        myWishListPageObj.addToCart(testData.wishListProduct)
        myWishListPageObj.getWishListEmptyMessage(testData.messages.emptyItemsInWishList)
        myWishListPageObj.getCartItemNumber().should(Commands.HAVE_TEXT,testData.wishListProduct.length)
        productsPageObj.clickOnShowCartIcon();
        productsPageObj.clickOnProceedToCheckout();
        cy.waitForFullLoad()
        cy.enterAddress()
        shippingDetailsPagesObj.expandOrderSummmary();
        shippingDetailsPagesObj.waitTillTheLoaderDisappear();
        cy.getElementByButtonText(testData.buttonsText.next).click()
        cy.getElementByButtonText(testData.buttonsText.placeOrder).click()
        shippingDetailsPagesObj.getOrderSuccessfullMessage().should(Commands.CONTAIN,testData.messages.orderPlacedSuccessMessage)
    })

    it("TestCase_D - Search and validate results",()=>{
        homePageObj.navigateToUrlEndPoint("gear/bags.html")
        homePageObj.enterSearchItem(testData.productToSearch)
        homePageObj.getSearchResult()
        .filter((index,el) => el.innerText.trim() === testData.productToSearch)
        .click();
        homePageObj.getHeader().should(Commands.CONTAIN_TEXT,testData.productToSearch)
        productsPageObj.getProduct(testData.productToSearch).should(Commands.BE_VISIBLE).and(Commands.CONTAIN_TEXT,testData.productToSearch)
    })
})