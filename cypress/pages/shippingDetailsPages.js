import { should } from "chai"
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

    getButtonByText(text){
        return cy.contains('button', text)
    }

    selectCountry(country){
        cy.get(this.webLocators.country).select(country)
    }

    enterStreet(street){
        cy.get(this.webLocators.street).should('be.visible').type(street)
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

    getFixedAmount() {
        return cy.get(this.webLocators.shippingMethods)  // Get the parent container for shipping methods
            .contains('tr', 'Fixed')  // Find the <tr> containing the text 'Fixed'
            .find('td:nth-child(2)')  // Within that row, get the second column (td)
            .invoke('text')  // Retrieve the text inside the second column
            .then((text) => {
                cy.log('Fixed method price:', text);
                // return text; // Return the price as a promise
            });
    }
    

    waitTillTheLoaderDisappear() {
        cy.get(this.webLocators.loader).should('not.be.visible');
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
    const fixedPriceNumber = parseFloat(fixedPrice); // Convert to number
    const newPriceArray = [sum, fixedPriceNumber];
    const sumWithDollar = `$${sum.toFixed(2)}`
    cy.get(this.webLocators.subTotal).should('have.text',sumWithDollar)
    cy.get(this.webLocators.shippingAmount).should('have.text',fixedAmount[0])
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

    getOrderNumber(){
        return cy.get(this.webLocators.orderNumber)
    }
    

}






