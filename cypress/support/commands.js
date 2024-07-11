Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Angelo')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillInAllFields', function(){
    cy.get('#firstName').type('Paulo').should('have.value','Paulo')
    cy.get('#lastName').type('Gustavo').should('have.value','Gustavo')
    cy.get('#email').type('paulo@email.com').should('have.value','paulo@email.com')
    
    cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
    
    cy.get('#product').select(1).should('have.value','blog')

    cy.get('#phone').type(123456789)
    
    cy.get('#open-text-area').type('Simple Text for Test')
    
    cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
        
    //cy.get('#privacy a ').should('have.attr', 'target', '_blank')
    cy.contains('button', 'Enviar').click()
    cy.get('[class="success"]').should('be.visible');

})