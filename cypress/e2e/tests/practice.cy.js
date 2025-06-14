


describe('Login Tests', () => {
    it('Practice', () => {
        console.log("The test is",Cypress.config("practiceSite"))
        cy.visit(Cypress.config("practiceSite"))
        cy.get(".right-align table[id='product'] tbody tr").each(($rows)=>{
            if ($rows.find('td').eq(0).text() == "Jack"){
                const amount = $rows.find('td').eq(3).text()
                cy.log("Amount for Jack: " + amount);
            }
        })
}); 
});

