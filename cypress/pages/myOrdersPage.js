
export class myOrdersPage{

    webLocators={
        totalAmount:".grand_total .amount .price"
    }

    getTotalAmount(){
        cy.get(this.webLocators.totalAmount)
    }

}