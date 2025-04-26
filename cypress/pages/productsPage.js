export class productsPage {


    webLocators = {
        productAddedMessage: ".message-success div",
        showCart: ".showcart",
        proceedToCheckout:"button.checkout",
        wishList:".towishlist",
        addToCart:"button.primary[title='Add to Cart']",
        productItems:".product-item"
    }

    clickOnProceedToCheckout(){
        cy.reloadIfErrorVisible()
        cy.get(this.webLocators.proceedToCheckout,{ timeout: 10000 }).should('is.visible').click({force:true})
        }
    
    clickOnShowCartIcon(){
        cy.wait(2000)
        cy.get(this.webLocators.showCart).click({force:true})
    }
    addtoCart() {
        return cy.contains('button', "Add to Cart");
    }

    getProduct(productName) {
        return cy.contains('.product-item-info', productName);
    }

    getProductAddedMessage() {
        return cy.get(this.webLocators.productAddedMessage);
    }

    verifySubMenuBags() {
        cy.get(".base").should('have.text', 'Bags');
    }

    

    addToCart(products) {
        cy.log("Inside Products Loop");
        cy.waitForFullLoad()
        cy.get('.copyright > span').should('be.visible')

        products.forEach(product => {
            cy.log(`Adding product: ${product}`);
            cy.wait(2000)
            this.getProduct(product).should('be.visible')
            cy.reloadIfErrorVisible()
            cy.mouseHowerAndClickInsideElement(this.webLocators.productItems, product,this.webLocators.addToCart)
            cy.waitForFullLoad()
            cy.wait(2000)
            cy.reloadIfErrorVisible()
            this.getProductAddedMessage().should('contain', product);
        });
    }

    addToWishList(products) {
        cy.log("Inside addToWishList");
        cy.log("The productName is", products);
        cy.reloadIfErrorVisible()
        products.forEach(product => {
            cy.log(`Adding addToWishList: ${product}`);
            cy.reloadIfErrorVisible();
            cy.wait(2000)
            this.getProduct(product).should('be.visible')
            cy.mouseHowerAndClickInsideElement(this.webLocators.productItems, product,this.webLocators.wishList)
            cy.reloadIfErrorVisible();
            this.getProductAddedMessage().should('contain', product);
        });
    }
    
}
