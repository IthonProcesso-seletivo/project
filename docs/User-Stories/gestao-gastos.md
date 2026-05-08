<!--1-->

User Stories são descrições breves e simples de uma funcionalidade, escritas sob a perspectiva do usuário final. Elas seguem o formato: "Como [persona], eu quero [objetivo] para que [valor]". Servem para focar nas necessidades reais, facilitando a comunicação e a entrega de valor ágil.


1. Persona: Zélia Santos (A Matriarca)
User Story: Dashboard de Gestão de Imóveis

    - Como gestora do patrimônio imobiliário, quero visualizar um painel simplificado com todos os meus imóveis e seus rendimentos e gastos, para manter o controle sem precisar recorrer a pastas.

2. Persona: Helena Silva (A Organizadora)
User Story: Consolidação Bancária Automática

    - Como responsável pelo orçamento familiar, quero conectar minhas diferentes contas bancárias e cartões, para visualizar o saldo real disponível pós-contas pagas.

3. Persona: Lucas Silva Oliveira (O Jovem)
User Story: Visualização de Metas e Progresso Gráfico

    - Como dependente em fase de aprendizado financeiro, quero visualizar meus gastos variáveis através de gráficos, para entender o impacto dos meus pequenos gastos.

4. Persona: Ricardo Oliveira (O Estrategista)
User Story: Rastreabilidade de Gastos por Membro da Família

    - Como provedor e estrategista financeiro, quero identificar a origem de cada gasto registrado, para analisar rapidamente quais custos podem ser cortados.


O INVEST é um checklist para garantir que uma User Story seja de alta qualidade. Cada letra representa um critério essencial como I: Independente, N: Negociável, V: Valor, E: Estimável, S: Pequena, T:Testável.

1. Avaliação INVEST Zélia Santos:

    I: Independente das transações de cartões de crédito dos outros membros.

    N: O layout do card pode ser ajustado entre lista ou grade conforme o feedback.

    V: Elimina a dependência de papel e dá clareza imediata sobre o lucro imobiliário.

    E: Complexidade média devido à necessidade de consolidar receitas e despesas por imóvel.

    S: Foca exclusivamente na visão consolidada do patrimônio físico.

    T: O teste é bem-sucedido se a Zélia conseguir identificar qual imóvel gerou mais despesa no mês em menos de três cliques.

2. Avaliação INVEST Helena Silva:

    I: Não depende do cadastro de imóveis para funcionar.

    N: A forma de conexão (API ou Importação de arquivo) pode variar.

    V: Economiza horas de trabalho manual e evita erros de digitação.

    E: Esforço alto devido à integração com APIs bancárias e segurança.

    S: Foca apenas na centralização e saldo disponível.

    T: O teste é bem-sucedido se a Helena conseguir visualizar o "Saldo Real" da família imediatamente após o login, sem realizar cálculos manuais.

3. Avaliação INVEST Lucas Silva:

    I: Pode ser desenvolvida de forma isolada no módulo de interface do usuário.

    N: O design gráfico dos elementos pode ser refinado em sprints de UX.

    V: Engaja o jovem através de uma linguagem visual moderna e intuitiva.

    E: Complexidade baixa, focada em visualização de dados (Frontend).

    S: Trata apenas da visualização do comportamento de gasto do jovem.

    T: O teste é bem-sucedido se o Lucas conseguir identificar se está "dentro da meta" de gastos variáveis apenas olhando para a cor do gráfico na tela inicial.


4. Avaliação INVEST Ricardo Oliveira:

    I: Depende apenas dos lançamentos realizados pelos outros membros.

    N: A forma de "sinalizar" (comentário ou tag) pode ser negociada.

    V: Permite a tomada de decisão baseada em dados reais de consumo familiar.

    E: Complexidade média para criar a lógica de hierarquia e permissões.

    S: Foca na auditoria e análise de quem gasta, não no pagamento em si.

    T: O teste é bem-sucedido se o Ricardo conseguir filtrar todas as despesas feitas pelo Lucas no último mês e identificar o gasto de maior valor sem nenhuma dúvida.