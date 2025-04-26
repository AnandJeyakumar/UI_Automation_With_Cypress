import { WaitTimes, Commands } from '../support/enum';

export class myWishListPage {

    webLocators = {
        productItems: ".product-item",
        addToCart: "button.primary[title='Add to Cart']",
        productAddedMessage: ".message-success div",
        wishListEmptyMessage: ".empty",
        cartItemNumber: ".counter-number"
    }

    getCartItemNumber() {
        return cy.get(this.webLocators.cartItemNumber);
    }

    getProductAddedMessage() {
        return cy.get(this.webLocators.productAddedMessage);
    }

    getWishListEmptyMessage() {
        return cy.get(this.webLocators.wishListEmptyMessage);
    }

    addToCart(products) {
        cy.log("Inside Products Loop");
        cy.waitForFullLoad();
        cy.get('.copyright > span').should(Commands.BE_VISIBLE);

        products.forEach(product => {
            cy.log(`Adding product: ${product}`);
            cy.reloadIfErrorVisible();
            cy.contains(this.webLocators.productItems, product)
                .scrollIntoView()
                .should(Commands.BE_VISIBLE)
                .realHover()
                .find(this.webLocators.addToCart)
                .should(Commands.EXIST)
                .click({ force: true });
            cy.waitForFullLoad();
            cy.reloadIfErrorVisible();
            this.getProductAddedMessage().should(Commands.CONTAIN, product);
        });
    }
}
