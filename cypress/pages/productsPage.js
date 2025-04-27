import { WaitTimes, Commands } from '../support/enum';

export class productsPage {
    webLocators = {
        productAddedMessage: ".message-success div",
        showCart: ".showcart",
        proceedToCheckout: "button.checkout",
        wishList: ".towishlist",
        addToCart: "button.primary[title='Add to Cart']",
        productItems: ".product-item",
        productNames: '.product-item-info',
        header:".base",
        copyrightElement:".copyright > span"
    };

    clickOnProceedToCheckout() {
        cy.reloadIfErrorVisible();
        cy.get(this.webLocators.proceedToCheckout, { timeout: WaitTimes.WAIT_10_SECONDS }).should(Commands.IS_VISIBLE).click({ force: true });
    }

    clickOnShowCartIcon() {
        cy.wait(WaitTimes.WAIT_2_SECONDS);
        cy.get(this.webLocators.showCart).click({ force: true });
    }

    getProduct(productName) {
        return cy.contains(this.webLocators.productNames, productName);
    }

    getProductAddedMessage() {
        return cy.get(this.webLocators.productAddedMessage);
    }

    verifySubMenuBags(text) {
        cy.get(this.webLocators.header).should(Commands.HAVE_TEXT, text);
    }

    addToCart(products) {
        cy.log("Inside Products Loop");
        cy.waitForFullLoad();
        cy.get(this.webLocators.copyrightElement).should(Commands.BE_VISIBLE);

        products.forEach(product => {
            cy.log(`Adding product: ${product}`);
            cy.wait(WaitTimes.WAIT_2_SECONDS);
            this.getProduct(product).should(Commands.BE_VISIBLE);
            cy.reloadIfErrorVisible();
            cy.mouseHowerAndClickInsideElement(this.webLocators.productItems, product,this.webLocators.addToCart)
            cy.waitForFullLoad();
            cy.wait(WaitTimes.WAIT_2_SECONDS);
            cy.reloadIfErrorVisible();
            this.getProductAddedMessage().should(Commands.CONTAIN, product);
        });
    }

    addToWishList(products) {
        cy.log("Inside addToWishList");
        cy.log("The productName is", products);
        cy.reloadIfErrorVisible();

        products.forEach(product => {
            cy.log(`Adding addToWishList: ${product}`);
            cy.reloadIfErrorVisible();
            cy.wait(WaitTimes.WAIT_2_SECONDS);
            this.getProduct(product).should(Commands.BE_VISIBLE);
            cy.mouseHowerAndClickInsideElement(this.webLocators.productItems, product, this.webLocators.wishList);
            cy.reloadIfErrorVisible();
            this.getProductAddedMessage().should(Commands.CONTAIN, product);
        });
    }
}
