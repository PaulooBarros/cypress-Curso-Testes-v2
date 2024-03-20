Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Angelo')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()



})