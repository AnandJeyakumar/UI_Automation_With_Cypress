import { Commands, WaitTimes } from '../support/enum';
export class shippingDetailsPages{



    webLocators={
        country:"[name='country_id']",
        street:"[name='street[0]']",
        city:"[name='city']",
        state:"[name='region_id']",
        postCode:"[name='postcode']",
        phoneNumber : "[name='telephone']",
        shippingMethods: "tr.row",
        loader:".loader",
        productName:".product-item-name",
        itemsInCart:".items-in-cart",
        orderSummmaryProductPrice:".cart-price .price",
        subTotal:"[data-th='Cart Subtotal']",
        shippingAmount:"[data-th='Shipping']",
        orderTotal:"[data-th='Order Total']",
        orderSuccessfullMessage :".page-title",
        orderNumber:".order-number > strong"
    }

    getOrderSuccessfullMessage(){
        return cy.get(this.webLocators.orderSuccessfullMessage)
    }

    selectCountry(country){
        cy.get(this.webLocators.country).select(country)
    }

    enterStreet(street){
        cy.wait(WaitTimes.WAIT_2_SECONDS);
        cy.get(this.webLocators.street).should(Commands.BE_VISIBLE).type(street)
    }

    enterCity(city){
        cy.get(this.webLocators.city).type(city)
    }

    selectState(state){
        cy.get(this.webLocators.state).select(state)
    }

    enterPostCode(postCode){
        cy.get(this.webLocators.postCode).type(postCode)
    }

    enterPhoneNumber(phoneNumber){
        cy.get(this.webLocators.phoneNumber).type(phoneNumber)
    }

    expandOrderSummmary(){
        cy.get(this.webLocators.itemsInCart).click()
    }

    verifyProductInOrderSummary(products, productPrice){
        cy.log("Inside OrderSummary Verification")
        cy.log("The products are ", products)
        cy.log("The productPrices are ", productPrice)
        cy.verifyMultipleElementsAndText(this.webLocators.productName,products)
        cy.verifyMultipleElementsAndText(this.webLocators.orderSummmaryProductPrice,productPrice)
    }

    // Currently, this function is fixed to validate the prices of two products.
    // The 'productPrice' parameter should be provided as an array.
    // If needed in future, we can refactor the code to make it more reusable by creating separate logic for the calculations.
    validateOrderSummaryAmountDetails(productPrice,fixedAmount)
    {
        cy.log("Inside validateOrderSummaryAmountDetails");
        const price1 = productPrice[0].replace('$', '').trim(); 
        const price2 = productPrice[1].replace('$', '').trim(); 
        const price1Number = parseFloat(price1);
        const price2Number = parseFloat(price2);
        const sum = price1Number + price2Number;
        cy.log("Calculated sum:", sum);

        const fixedPrice = fixedAmount[0].replace('$', '').trim();
        const fixedPriceNumber = parseFloat(fixedPrice); 
        const newPriceArray = [sum, fixedPriceNumber];
        const sumWithDollar = `$${sum.toFixed(2)}`
        cy.get(this.webLocators.subTotal).should(Commands.HAVE_TEXT,sumWithDollar)
        cy.get(this.webLocators.shippingAmount).should(Commands.HAVE_TEXT,fixedAmount[0])
        let totalAmount = 0;
        for (let i of newPriceArray) {
            totalAmount += i; 
        }
        const totalWithDollar = `$${totalAmount.toFixed(2)}`;
        cy.log("The Total Amount is", totalWithDollar);
        cy.get(this.webLocators.orderTotal)
        .invoke('text')
        .then((actualText) => {
        expect(actualText.trim()).to.eq(totalWithDollar);
    
  });

}

}






