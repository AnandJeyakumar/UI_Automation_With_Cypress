export class homePage{


    webLocators= {  
        formKey : "[name='form_key']",
        search:"#search",
        searchResult:".qs-option-name",
        header:".base"
        
    }
    
    openURL(){
        cy.visit(Cypress.env('URL'))
    }

    navigateToUrlEndPoint(endPoint){
        cy.visit(Cypress.env('URL')+"gear/bags.html")

    }

    clickOnLink(LinkText){
        cy.contains('a', LinkText).click();
    }

    getFormKey(){
        return cy.get(this.webLocators.formKey)
    }

    enterSearchItem(product){
        cy.get(this.webLocators.search).type(product)
    }

    getSearchResult(){
        return cy.get(this.webLocators.searchResult)
    }

    getHeader(){
        return cy.get(this.webLocators.header)
    }

    
}
