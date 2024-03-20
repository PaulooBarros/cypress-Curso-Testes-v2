Cypress._.times(5, function(){

    it('testa a pagina da política de privacidade independente', function(){

        cy.visit('./src/privacy.html')

        cy.contains('Talking About Testing').should('be.visible')


    })

})