import testData from '../../fixtures/testData.json'
import { generateRandomUser } from "../../support/dataUtils";
import { registerUser } from "../../support/apiUtils";
import { beforeEach } from "mocha"
import { pageManager } from '../../support/pageManager';

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
        myAccountPageObj.getRegisterMessage().should('contain', testData.messages.registeredSuccessMessage)
        myAccountPageObj.getWelcomeText().should('contain',user.firstName).and('contain',user.lastName)
        myAccountPageObj.getContactInformation().should('contain',user.email)
        myAccountPageObj.clickOnActionDropdown()
        myAccountPageObj.clickOnTextLink('Sign Out')
        myAccountPageObj.getSignOut().should('have.text',testData.messages.signedOutMessage)
        homePageObj.clickOnLink('Sign In')
        loginPageObj.enterEmail(user.email)
        loginPageObj.enterPassword(user.password)
        loginPageObj.clickOnSignIn()
        myAccountPageObj.getContactInformation().should('contain',user.email)
    })


    it("TestCase_B - Place order with multiple products (apply price calculation on checks)", () => {
        homePageObj.clickOnLink('Create an Account')
        cy.createNewUser(user.firstName, user.lastName, user.email, user.password);
        myAccountPageObj.getRegisterMessage().should('contain', testData.messages.registeredSuccessMessage);
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
        shippingDetailsPagesObj.getButtonByText("Next").click();
        shippingDetailsPagesObj.validateOrderSummaryAmountDetails(testData.productsPrices,testData.fixedPrice)
        shippingDetailsPagesObj.getButtonByText("Place Order").click();
        shippingDetailsPagesObj.getOrderSuccessfullMessage().should('contain.text',testData.messages.orderPlacedSuccessMessage)
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
        myWishListPageObj.getCartItemNumber().should('have.text',testData.wishListProduct.length)
        productsPageObj.clickOnShowCartIcon();
        productsPageObj.clickOnProceedToCheckout();
        cy.waitForFullLoad()
        cy.enterAddress()
        shippingDetailsPagesObj.expandOrderSummmary();
        shippingDetailsPagesObj.waitTillTheLoaderDisappear();
        shippingDetailsPagesObj.getButtonByText("Next").click();
        shippingDetailsPagesObj.getButtonByText("Place Order").click();
        shippingDetailsPagesObj.getOrderSuccessfullMessage().should('contain.text',testData.messages.orderPlacedSuccessMessage)

    })

    it("TestCase_D - Search and validate results",()=>{
        homePageObj.navigateToUrlEndPoint("gear/bags.html")
        homePageObj.enterSearchItem(testData.productToSearch)
        homePageObj.getSearchResult()
        .filter((index,el) => el.innerText.trim() === testData.productToSearch)
        .click();
        homePageObj.getHeader().should('contain.text',testData.productToSearch)
        productsPageObj.getProduct(testData.productToSearch).should('be.visible').and('contain.text',testData.productToSearch)
    })
})