<!--1-->
Requisitos Nao Funcionais Sistema de Gerenciamento Financeiro Familiar


1. Segurança

Perguntas: Como proteger dados sensíveis de patrimônio? O site exige protocolos específicos?
Soluções: Criptografia obrigatória para todos os dados financeiros. Implementação de protocolos de segurança para impedir acesso não autorizado a informações pessoais.

2. Capacidade

Perguntas: Qual o limite de transações que o sistema suporta sem ficar lento?
Soluções: O banco de dados deve ser otimizado para suportar mais de 500 registros de transações por família com indexação de alta performance.

3. Compatibilidade

Perguntas: Onde o usuário acessará o sistema? Quais navegadores são essenciais?
Soluções: Garantir 100% de funcionalidade nas últimas 3 versões do Chrome, Safari e Firefox, além de suporte total para Android e iOS via Webview (interface responsiva).

4. Confiabilidade e Disponibilidade

Perguntas: Qual a tolerância a falhas e o tempo de recuperação em caso de queda?
Soluções: Disponibilidade de 99,9% (SLA). Plano de Recuperação de Desastres (DRP) capaz de restaurar dados financeiros em até 4 horas.

5. Manutenibilidade e Gerenciabilidade

Perguntas: O código é fácil de manter e testar para evitar erros em cálculos críticos?Soluções: Uso de Clean Architecture e cobertura mínima de 80% em testes unitários, garantindo que regras de juros e cálculos sejam facilmente corrigíveis.

6. Escalabilidade

Perguntas: O sistema aguenta o pico de acessos no fechamento do mês?
Soluções: Utilização de auto-scaling na infraestrutura para suportar picos de até 10x o tráfego normal entre os dias 28 e 05 de cada mês.

7. Usabilidade 

Perguntas: Um usuário sem técnica consegue usar o app? Qual a margem de erro aceitável?Soluções: O "Lançamento Rápido" deve ser intuitivo a ponto de um usuário leigo ter um índice de erro inferior a 10% na primeira tentativa, sem treinamento.

8. Desempenho

Perguntas: Qual a velocidade de carregamento em redes móveis (4G)?
Soluções: O Dashboard consolidado deve carregar em no máximo 1,5 segundos sob conexões 4G estáveis.

9. Conformidade

Perguntas: Como o sistema lida com a privacidade legal dos dados da família?
Soluções: Total conformidade com a LGPD, garantindo funções nativas para exportação ou exclusão definitiva de todos os dados do usuário.

10. Ambiental

Perguntas: Em que condições físicas o usuário usará o sistema?
Soluções: Foco em uso mobile "sempre à mão" com a implementação de Modo Escuro (Dark Mode) nativo para economizar bateria e facilitar a leitura em baixa luminosidade.

