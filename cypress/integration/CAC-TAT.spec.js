/// <reference types="Cypress" />






describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        cy.clock() 

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Angelo')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type('Neste exemplo, estamos usando o Selenium como driver para o Capybara, configurando-o para usar o Chrome. Em seguida, definimos uma classe Main que inclui Capybara::DSL para poder usar métodos como visit, find, all, etc. As etapas buscar, seleciona_produto e adiciona_carrinho realizam as ações que você descreveu anteriormente.', {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success > strong').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success > strong').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function(){
        cy.clock()

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Angelo')
        cy.get('#email').type('email.email.com')
        cy.get('#open-text-area').type('Neste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    Cypress._.times(3, function(){
        it('campo telefone não numerico', function(){
            cy.get('#phone')
                .type('asd')
                .should('have.value', '')           
        })
    
    })
    it('mensagem de erro telefone obrigatorio',function(){
        cy.clock()

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Angelo')
        cy.get('#email').type('email@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Neste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Angelo')
            .should('have.value', 'Angelo')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('email@email.com')
            .should('have.value', 'email@email.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('432')
            .should('have.value', '432')
            .clear()
            .should('have.value', '')
    })


    it('exibe mensagem de erro ao não preencher campos', function(){
        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })


    it('envia o formulario com sucesso com comando customizado',function(){
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })


    it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })


    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto(Blog) pelo seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "FeedBack"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })


    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    
    })

    
    it('seleciona um arquivo da pasta fixtures', function(){

        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })


    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){

        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('seleciona um arquivo utilizando uma fixture para o qual foi dada um alias', function(){

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a ').should('have.attr', 'target', '_blank')



    })


    it('acessa a pagina privacidade removendo o target', function(){

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')

    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it('preenche a area de texto usando o comando invoke ', function(){
        const longText = Cypress._.repeat('0123456789', 20)
        
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)


    })

    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const { status, statusText, body } = response 
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })


    })


    it('encontra o gato escondido', function(){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')

        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'EU AMO GATOS')

    })

    it.only('fillInAllFields',function(){
        cy.fillInAllFields()
        
    })


})