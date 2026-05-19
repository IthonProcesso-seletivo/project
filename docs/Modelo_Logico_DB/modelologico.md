<!--2-->

# Modelo Lógico

### Objetivo:

Sistema de gerenciamento de patrimônio familiar desenvolvido para permitir o controle financeiro doméstico por meio da administração de usuários, membros familiares, despesas, salários e patrimônios compartilhados. O sistema busca centralizar informações financeiras do núcleo familiar oferecendo rastreabilidade, organização e acompanhamento dos ativos e gastos da família.

---

## Estrutura do Banco de Dados

### Tabela Família

###### Descrição:

Representa o núcleo familiar principal dentro do sistema, funcionando como entidade central responsável por agrupar usuários, membros e patrimônios.

###### Campos:

* **id:** Identificador único da família.

* **nome:** Nome do núcleo familiar cadastrado.

###### Relacionamentos:

* Possui relacionamento **1:N** com **Membro**.

* Possui relacionamento **1:1** com **Usuário**.

* Possui relacionamento **1:N** com **Patrimônio**.

---

### Tabela Usuário

###### Descrição:

Responsável pela autenticação e credenciamento de acesso ao sistema. Cada usuário está vinculado exclusivamente a uma família.

###### Campos:

* **id:** Identificador único do usuário.

* **id_familia:** Referência da família associada ao usuário.

* **email:** Endereço eletrônico único utilizado para login.

* **senha:** Credencial de autenticação do sistema.

###### Relacionamentos:

* Relacionamento **1:1** com **Família**.

* Relacionamento **1:N** com **Membro**.

###### Regras de Negócio:

* O **email** deve ser único no sistema.

* Uma família pode possuir somente um usuário principal cadastrado.

---

### Tabela Membro

###### Descrição:

Representa cada integrante pertencente ao núcleo familiar. Os membros são responsáveis pela geração de despesas, salários e associação com patrimônios.

###### Campos:

* **id:** Identificador único do membro.

* **id_familia:** Referência da família à qual pertence.

* **id_usuario:** Referência do usuário responsável.

* **nome:** Nome do integrante familiar.

###### Relacionamentos:

* Relacionamento **N:1** com **Família**.

* Relacionamento **N:1** com **Usuário**.

* Relacionamento **1:N** com **Despesa**.

* Relacionamento **1:N** com **Salário**.

* Relacionamento **1:N** com **Patrimônio**.

---

### Tabela Categoria

###### Descrição:

Tabela responsável pela categorização das despesas permitindo organização, classificação e filtragem dos gastos.

###### Campos:

* **id:** Identificador único da categoria.

* **nome:** Nome da categoria financeira.

###### Relacionamentos:

* Relacionamento **1:N** com **Despesa**.

---

### Tabela Despesa

###### Descrição:

Responsável pelo armazenamento de gastos familiares permitindo o registro de despesas fixas e variáveis, incluindo controle de recorrência e parcelamento.

###### Campos:

* **id:** Identificador único da despesa.

* **id_membro:** Membro responsável pelo gasto.

* **id_categoria:** Categoria financeira associada.

* **nome:** Nome da despesa.

* **valor:** Valor monetário registrado.

* **data:** Data da ocorrência da despesa.

* **tipo:** Classificação do gasto (**Fixo** ou **Variável**).

* **periodo:** Frequência de repetição da despesa.

* **parcelas_pagas:** Quantidade de parcelas já quitadas.

* **total_parcelas:** Quantidade total de parcelas.

###### Relacionamentos:

* Relacionamento **N:1** com **Membro**.

* Relacionamento **N:1** com **Categoria**.

###### Regras de Negócio:

* O campo **tipo** aceita apenas:

  * **Fixo**
  * **Variável**

* O campo **periodo** aceita apenas:

  * Semanal
  * Quinzenal
  * Mensal
  * Anual

* Informações de **periodicidade** e **parcelas** são aplicáveis exclusivamente para despesas classificadas como **Fixas**.

* O sistema suporta controle de despesas parceladas por meio dos campos **parcelas_pagas** e **total_parcelas**.

---

### Tabela Salário

###### Descrição:

Armazena informações salariais individuais dos membros da família para composição dos relatórios financeiros.

###### Campos:

* **id:** Identificador único do salário.

* **id_membro:** Referência do membro associado.

* **salario_bruto:** Valor bruto do salário registrado.

* **mes_referencia:** Mês correspondente ao salário informado.

###### Relacionamentos:

* Relacionamento **N:1** com **Membro**.

---

### Tabela Patrimônio

###### Descrição:

Responsável pelo registro dos bens pertencentes ao núcleo familiar, permitindo associação opcional a um membro específico.

###### Campos:

* **id:** Identificador único do patrimônio.

* **id_familia:** Referência da família proprietária.

* **id_membro:** Referência opcional do responsável pelo patrimônio.

* **nome:** Nome do bem cadastrado.

* **tipo:** Categoria do patrimônio.

* **valor:** Valor monetário estimado do ativo.

###### Relacionamentos:

* Relacionamento **N:1** com **Família**.

* Relacionamento **N:1** com **Membro**.

###### Regras de Negócio:

O campo **tipo** aceita apenas:

* Imóvel

* Veículo

* Investimento

* Equipamento

* Outros

---

## Enumeradores (Enums)

### tipo_gasto

###### Descrição:

Define a classificação operacional das despesas registradas.

###### Valores Disponíveis:

* **Fixo:** Gastos recorrentes ou periódicos.

* **Variável:** Gastos ocasionais ou não recorrentes.

---

### tipo_periodo

###### Descrição:

Define a frequência de repetição de despesas fixas.

###### Valores Disponíveis:

* **Semanal**

* **Quinzenal**

* **Mensal**

* **Anual**

---

### tipo_patrimonio

###### Descrição:

Define a classificação dos ativos financeiros e materiais da família.

###### Valores Disponíveis:

* **Imóvel**

* **Veículo**

* **Investimento**

* **Equipamento**

* **Outros**

---

## Regras Gerais do Sistema

###### Regras de Integridade:

* Todo **membro** deve pertencer obrigatoriamente a uma **família**.

* Todo **usuário** deve estar vinculado a uma única **família**.

* Toda **despesa** deve possuir um **membro responsável**.

* Toda **despesa** deve possuir uma **categoria associada**.

* Todo **salário** deve estar associado a um **membro**.

* Todo **patrimônio** deve pertencer obrigatoriamente a uma **família**.

* Um patrimônio pode ou não possuir um **membro responsável** associado.

---

![Link do Modelo][https://dbdiagram.io/d/Ithon-6a0b9247697f99c167a72f96]