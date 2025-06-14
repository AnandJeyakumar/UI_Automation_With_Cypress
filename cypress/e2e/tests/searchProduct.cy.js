import testData from '../../fixtures/testData.json'
import { generateRandomUser } from "../../support/dataUtils";
import { pageManager } from '../../support/pageManager';
import { Commands } from '../../support/enum';


const poManager  = new pageManager();
const homePageObj  =  poManager .getHomePage()
const productsPageObj = poManager .getProductsPage()



describe("Hands On Cypress Test cases",()=>{
    let user;
    beforeEach(() => {
        user = generateRandomUser(testData.createAccountData);
        cy.visit('')
      });

    it("TestCase_D - Search and validate results",()=>{
        homePageObj.navigateToUrlEndPoint(testData.bagsPageURLEndPoint)
        homePageObj.enterSearchItem(testData.productToSearch)
        homePageObj.getSearchResult().filter((index,el) => el.innerText.trim() === testData.productToSearch).click();
        homePageObj.getHeader().should(Commands.CONTAIN_TEXT,testData.productToSearch)
        productsPageObj.getProduct(testData.productToSearch).should(Commands.BE_VISIBLE).and(Commands.CONTAIN_TEXT,testData.productToSearch)
    })

    
})