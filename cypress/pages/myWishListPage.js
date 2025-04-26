export class myWishListPage{

    webLocators = {
        productItems:".product-item",
        addToCart:"button.primary[title='Add to Cart']",
        productAddedMessage: ".message-success div",
        wishListEmptyMessage:".empty",
        cartItemNumber:".counter-number"
    }

    getCartItemNumber() {
        return cy.get(this.webLocators.cartItemNumber);
    }

    getProductAddedMessage() {
        return cy.get(this.webLocators.productAddedMessage);
    }

    getWishListEmptyMessage(){
        return cy.get(this.webLocators.wishListEmptyMessage);

    }

    addToCart(products) {
        cy.log("Inside Products Loop");
        cy.waitForFullLoad()
        cy.get('.copyright > span').should('be.visible')

        products.forEach(product => {
            cy.log(`Adding product: ${product}`);
            // cy.wait(2000)
            cy.reloadIfErrorVisible()
            cy.contains(this.webLocators.productItems, product)
            .scrollIntoView()
            .should('be.visible')
            .realHover()
            .find(this.webLocators.addToCart) 
            .should('exist')
            .click({ force: true });
            cy.waitForFullLoad()
            // cy.wait(2000)
            cy.reloadIfErrorVisible()
            this.getProductAddedMessage().should('contain', product);
        });
    }
}