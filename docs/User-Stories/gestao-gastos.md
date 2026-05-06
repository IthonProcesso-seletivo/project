<!--1-->

1. Gestão de Patrimônio (Imóveis e Ativos)

User Story: Cadastro de Imóveis

Como gestor do patrimônio familiar, 
quero cadastrar meus imóveis com valor de compra e endereço, 
para manter o inventário da família atualizado.

Critérios de Aceitação:

O sistema deve permitir anexar 1 arquivo (escritura/contrato) de até 10MB.

O campo "Valor de Compra" deve aceitar apenas números positivos.

Avaliação INVEST:

I: Pode ser implementada sem depender do fluxo de gastos diários.

N: O método de validação do endereço pode ser via CEP ou manual.

V: Dá à família a visão real do seu Net Worth (Riqueza Líquida).

E: É um cadastro (CRUD) de complexidade baixa para o time.

S: Focada apenas em imóveis; outros ativos ficam para outras histórias.

T: O teste é bem-sucedido se o sistema processar o salvamento de um imóvel com 1 anexo de 5MB em até 3 segundos.



2. Gastos Fixos (Previsibilidade)

User Story: Agendamento de Despesas Recorrentes

Como responsável pelas contas da casa, 
quero registrar despesas fixas recorrentes, 
para que o sistema me lembre dos vencimentos e eu evite juros.

Critérios de Aceitação:

Permitir configurar a frequência (mensal, trimestral, etc.).

Gerar alerta visual quando faltarem 5 dias para o vencimento.

Avaliação INVEST:

I: Foca apenas no fluxo de caixa mensal, sem depender do patrimônio.

N: O tipo de alerta (Push ou E-mail) pode ser definido depois.

V: Evita o pagamento de multas e juros por esquecimento.

E: Lógica de recorrência é um padrão conhecido e fácil de mensurar.

S: Trata apenas do agendamento; o pagamento real é outra etapa.

T: O teste é bem-sucedido se, ao cadastrar 12 parcelas mensais, o cronograma completo for gerado em menos de 2 segundos.



3. Gastos Diários (Controle de Fluxo)

User Story: Lançamento Rápido de Despesas

Como membro da família, 
quero lançar gastos rápidos do dia a dia (padaria, combustível), 
para que o orçamento mensal não saia do controle.

Critérios de Aceitação:

Interface mobile com seleção de categorias por ícones.

O gasto deve ser subtraído automaticamente do saldo disponível do mês.

Avaliação INVEST:

I: Pode funcionar de forma isolada, sem cadastros prévios.

N: Pode-se discutir se haverá campo de "observação" ou apenas valor.

V: Fundamental para identificar o "ralo de dinheiro" (pequenos gastos).

E: Funcionalidade básica, a mais rápida de estimar do backlog.

S: Focada apenas na entrada do dado; relatórios ficam para depois.

T: O teste é bem-sucedido se um usuário conseguir completar o fluxo (Abrir App -> Digitar Valor -> Selecionar Categoria -> Salvar) em no máximo 8 segundos.