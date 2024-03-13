import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

Given('Eu estou logado com o email {string} e senha {string}', (email, senha) => {
    cy.visit("http://localhost:3000/login")
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type(senha)
    cy.get('.loginbutton').click()
});

Given('Eu clico em "Restaurantes"', () => {
    cy.get('.restaurants').click()
});

Given('Eu clico em {string}', (restname) => {
    cy.get('#preview-description').each(($elemento) => {
     
      if ($elemento.text().includes(restname)) {
        
        cy.wrap($elemento)
          .parent()
          .parent()
          .within(() => {
            cy.get('.restaurant-link-button').click();
          });
      }
    });
});
  

Given('Eu vejo a informação {string} com nota média de {int} estrelas', (text,rating) => {
    cy.get('#avg-rating').contains(text)

    cy.get('.little-star').then($stars => {
        expect($stars).to.have.lengthOf(5);

        $stars.each((index, star) => {
            const starValue = index + 1;
            const expectedColor = starValue <= rating ? 'rgb(255, 193, 7)' : 'rgb(82, 77, 57)';
            
            const currentColor = Cypress.$(star).css('color');
            
            expect(currentColor).to.equal(expectedColor);
        });
    });
});

When('Eu clico em "Criar review”', () => {
    // Clica no botão para criar um novo review
    cy.contains('.create-review').click();
});

When('Eu preencho o título {string}', (title) => {
    cy.get('.title').type(title);
});

When('Eu preencho o texto do review {string}', (text) => {
    // Preenche o texto do review
    cy.get('.text').type(text);
});

When('Eu dou a nota {int} para o restaurante {string}', (rating, restaurant) => {
    cy.get('.star').then($stars => {
       
        $stars.each((index, star) => {
            
            if (index + 1 === rating) {
                return false; 
            }

            cy.wrap(star).click();
        });
    });
});

When('Eu dou a nota “{int}” para o sabor', (sabor) => {
    cy.get('.star').then($stars => {
       
        $stars.each((index, star) => {
            
            if (index + 1 === sabor) {
                return false; 
            }

            cy.wrap(star).click();
        });
    });
});

When('Eu dou a nota {int} para o atendimento', (atendimento) => {
    cy.get('.star').then($stars => {
       
        $stars.each((index, star) => {
            
            if (index + 1 === atendimento) {
                return false; 
            }

            cy.wrap(star).click();
        });
    });
});

When('Eu dou a nota {int} para o tempo de espera', (tempoDeEspera) => {
    cy.get('.star').then($stars => {
       
        $stars.each((index, star) => {
            
            if (index + 1 === tempoDeEspera) {
                return false; 
            }

            cy.wrap(star).click();
        });
    });
});

When('Eu dou a nota {int} para o preço', (preco) => {
    cy.get('.star').then($stars => {
       
        $stars.each((index, star) => {
            
            if (index + 1 === preco) {
                return false; 
            }

            cy.wrap(star).click();
        });
    });
});

When('Eu clico em “Enviar”', () => {
    cy.contains('.create-button').click();
});

Then('Eu vejo o review {string}', (title) => {
    cy.get('.preview-description').contains(title);
});
