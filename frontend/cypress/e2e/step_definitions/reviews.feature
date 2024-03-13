Feature: Review
    
Scenario: Adicionar review
    Given Eu estou logado com o email "pv@gmail.com" e senha "Senh@123"
    Given Eu clico em "Restaurantes"
    Given Eu clico em "Casa dos Doces"
    Given Eu vejo a informação “2 Avaliações” com nota média de "2" estrelas
    When Eu clico em "Criar review”
    When Eu preencho o título “O melhor bem casado da cidade!”
    When Eu preencho o texto do review "Doces perfeitos. Coxinha nota 10"
    When Eu dou a nota “5” para o restaurante “Casa dos Doces”
    When Eu dou a nota “5” para o sabor
    When Eu dou a nota “5” para o atendimento
    When Eu dou a nota “5” para o tempo de espera
    When Eu dou a nota “5” para o preço
    When Eu clico em “Enviar”
    Then Eu vejo o review "O melhor bem casado da cidade!"

Scenario: Visualização dos Reviews de um Restaurante
    Given Eu estou logado com o email "pv@gmail.com" e senha "Senh@123"
    Given Eu clico em "Login"
    Given Eu clico em "Restaurantes"
    Given Eu clico em "Casa dos Doces"
    When Eu clico em “Reviews de Usuários”
    Then Abre uma página com reviews de usuários
    Then Eu vejo o review "O melhor bem casado da cidade!" de "PedroMonte", com nota "5"
    Then Eu vejo o review "Coxinha Fria" de "MariaLeticia", com nota "3"

Scenario: Edição de Review
    Given Eu estou logado com o email "marialeticia@gmail.com" e senha "Senh@123"
    And Eu clico em "Restaurantes"
    And Eu clico em "Casa dos Doces"
    And Eu clico em "Reviews de Usuário"
    And Eu vejo o review "Coxinha Fria" de "MariaLeticia", com nota "3"
    And Eu clico em "Ver Mais"
    When Eu clico em “Editar Review”
    And Surge uma aba de editar review
    And Eu mudo o título do review para “Coxinha Boa”
    And Eu mudo a nota para "4" estrelas
    And Eu clico em “Enviar”
    Then Aparece uma mensagem “Concluído”
    And Eu volto para a página do review
    And Eu vejo o título "Coxinha boa"
    And Eu vejo a nota "4" estrelas

Scenario: Remoção de Review
    Given Eu estou logado com o email "marialeticia@gmail.com" e senha "Senh@123"
    And Eu clico em "Login"
    And Eu clico em "Restaurantes"
    And Eu clico em "Casa dos Doces"
    And Eu clico em "Reviews de Usuário"
    And Eu vejo o review "Coxinha Fria" de "MariaLeticia", com nota "3"
    And Eu clico em "Ver Mais"
    When Eu clico na opção “Deletar Review”
    Then Aparece uma mensagem “Concluído”

Scenario: Visualização de um Review de um usuário
   Given Eu estou logado com o email "pv@gmail.com" e senha "Senh@123"
    And Eu clico em "Login"
    And Eu clico em "Restaurantes"
    And Eu clico em "Casa dos Doces"
    And Eu clico em "Reviews de Usuário"
    And Eu vejo o review "Coxinha Fria" de "MariaLeticia", com nota "3"
    And Eu clico em "Ver Mais"
    Then Surge uma página com mais informações do review
    And Eu vejo o título "Coxinha fria"
    And Eu vejo o usuário "MariaLeticia"
    And Eu vejo o nome do restaurante "Casa dos Doces"
    And Eu vejo o texto do review "A Coxinha estava fria. Muito ruim"
    And Eu vejo a nota "3" estrelas
    And Eu vejo a nota "2" estrelas dadas para “Sabor”
    And Eu vejo a nota "3" estrelas dadas para “Tempo de Espera”
    And Eu vejo a nota "5" estrelas dadas para “Atendimento”
    And Eu vejo a nota "3" estrelas dados para “Preço”
    And Eu vejo "5" likes
    And Eu vejo "0" dislikes
