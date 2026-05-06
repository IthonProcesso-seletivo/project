<!--1-->

1. Gestão de Patrimônio (Imóveis e Ativos)
Aqui o foco é o valor a longo prazo e a organização documental.

User Story:

Como gestor do patrimônio familiar,
eu quero cadastrar meus imóveis (com valor de compra e endereço),
para que eu tenha uma visão clara de quanto do nosso capital está imobilizado.

Critérios de Aceitação:

O sistema deve permitir anexar fotos ou documentos (escrituras/contratos).

O usuário pode atualizar o valor estimado de mercado anualmente.

Letra              Avaliação INVEST
I (Independente),  Pode ser desenvolvida sem depender da funcionalidade de gastos diários.
N (Negociável),    O time pode negociar se o valor será atualizado manualmente ou via API de mercado.
V (Valiosa),       Dá à família a noção real de sua riqueza imobilizada (o "Net Worth").
E (Estimável),     É um cadastro (CRUD) simples, fácil para o time mensurar o esforço.
S (Pequena),       Focada apenas em imóveis. Outros ativos (carros, ações) ficam para outras histórias.
T (Testável),      É possível testar: Ao salvar um imóvel de R$ 500k, ele aparece no dashboard?