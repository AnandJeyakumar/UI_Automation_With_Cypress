import testData from '../../fixtures/testData.json'
import { generateRandomUser } from "../../support/dataUtils";
import { registerUser } from "../../support/apiUtils";
import { pageManager } from '../../support/pageManager';
import { Commands } from '../../support/enum';


const poManager  = new pageManager();
const homePageObj  =  poManager .getHomePage()
const createAccountPageObj  = poManager .getCreateAccountPage()
const myAccountPageObj  = poManager .getMyAccountPage()
const loginPageObj = poManager .getLoginPage()
const productsPageObj = poManager .getProductsPage()
const shippingDetailsPagesObj = poManager .getShippingDetailsPages()
const myWishListPageObj = poManager .getMyWishListPage()


describe("Hands On Cypress Test cases",()=>{
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
        cy.getElementByLinkText(testData.buttonsText.signOut).click()
        myAccountPageObj.getSignOut().should(Commands.HAVE_TEXT,testData.messages.signedOutMessage)
        homePageObj.clickOnLink(testData.buttonsText.signIn)
        loginPageObj.enterEmail(user.email)
        loginPageObj.enterPassword(user.password)
        loginPageObj.clickOnSignIn()
        myAccountPageObj.getContactInformation().should(Commands.CONTAIN,user.email)
    })


    // it.only("TestCase_B - Place order with multiple products (apply price calculation on checks)", () => {
    //     homePageObj.clickOnLink('Create an Account')
    //     cy.createNewUser(user.firstName, user.lastName, user.email, user.password);
    //     myAccountPageObj.getRegisterMessage().should(Commands.CONTAIN, testData.messages.registeredSuccessMessage);
    //     myAccountPageObj.mouseOverAndClickSubMenu(testData.menuItem.gearMenu, testData.menuItem.subMenuItem.Bags);
    //     productsPageObj.verifySubMenuBags(testData.menuItem.subMenuItem.Bags);
    //     productsPageObj.addToCart(testData.productsToAdd);
    //     cy.navigateToCartAndEnterAddress()
    //     shippingDetailsPagesObj.expandOrderSummmary();
    //     shippingDetailsPagesObj.verifyProductInOrderSummary(testData.productsToAdd,testData.productsPrices)
    //     cy.getElementByButtonText(testData.buttonsText.next).click()
    //     cy.waitTillTheLoaderDisappear()
    //     shippingDetailsPagesObj.validateOrderSummaryAmountDetails(testData.productsPrices,testData.fixedPrice)
    //     cy.getElementByButtonText(testData.buttonsText.placeOrder).click()
    //     shippingDetailsPagesObj.getOrderSuccessfullMessage().should(Commands.CONTAIN,testData.messages.orderPlacedSuccessMessage)
    //     shippingDetailsPagesObj.getOrderNumber().then((orderNum)=>{
    //         cy.writeFile('cypress/fixtures/orderID.json', { orderNumber: orderNum });
    //         cy.log("THe OrderNum is ", orderNum)
    //         Cypress.env("OderNum", orderNum)
    //     })
    // });


    
    it("TestCase_C - Add products in Wishlist and checkout from wishlist",()=>{
        homePageObj.getFormKey().invoke('val').then((formKey) => {
            cy.log('Form Key:', formKey);
            registerUser(formKey, user);
            cy.log("The user email registered through API is ", user.email);
            cy.log("The password registered through API is ", user.password);
        });
        // homePageObj.navigateToUrlEndPoint(testData.bagsPageURLEndPoint)
        // productsPageObj.addToWishList(testData.wishListProduct)
        // myWishListPageObj.addToCart(testData.wishListProduct)
        // myWishListPageObj.getWishListEmptyMessage(testData.messages.emptyItemsInWishList)
        // myWishListPageObj.getCartItemNumber().should(Commands.HAVE_TEXT,testData.wishListProduct.length)
        // cy.navigateToCartAndEnterAddress()
        // shippingDetailsPagesObj.expandOrderSummmary();
        // cy.waitTillTheLoaderDisappear()
        // cy.getElementByButtonText(testData.buttonsText.next).click()
        // cy.getElementByButtonText(testData.buttonsText.placeOrder).click()
        // shippingDetailsPagesObj.getOrderSuccessfullMessage().should(Commands.CONTAIN,testData.messages.orderPlacedSuccessMessage)
    })

    // it("TestCase_D - Search and validate results",()=>{
    //     homePageObj.navigateToUrlEndPoint(testData.bagsPageURLEndPoint)
    //     homePageObj.enterSearchItem(testData.productToSearch)
    //     homePageObj.getSearchResult().filter((index,el) => el.innerText.trim() === testData.productToSearch).click();
    //     homePageObj.getHeader().should(Commands.CONTAIN_TEXT,testData.productToSearch)
    //     productsPageObj.getProduct(testData.productToSearch).should(Commands.BE_VISIBLE).and(Commands.CONTAIN_TEXT,testData.productToSearch)
    // })

    
})