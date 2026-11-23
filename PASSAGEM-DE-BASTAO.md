# Continuidade — About Beer

Preparado em 23/11/2026 a partir do projeto. Os resultados e estados operacionais abaixo têm suas datas de origem; campanhas e vendas não foram auditadas novamente nesta entrega.

## Negócio e prioridades

E-commerce de chopeiras/equipamentos e acessórios, com loja Tray, operação em Mercado Livre e consolidado no Bling/Jarvis. Site: https://www.aboutbeer.com.br. O produto anunciado é equipamento, distinção relevante para os problemas históricos de classificação como bebida alcoólica no Google/Merchant.

As frentes registradas incluem chopeiras 5L/2L, kits e acessórios, Core Business, testes de outros produtos, remarketing de catálogo/WhatsApp, Pesquisa e PMax, além de ChatGPT Ads. A Black About aparece nos criativos de novembro. Confirmar preços, estoque, kits, condições e validade das ofertas antes de reutilizar qualquer peça.

Igor aparece como responsável por acessos, dados e pela API Jarvis; Rafael e Wayster participam do contexto de gestão/check-ins. Confirmar responsabilidades atuais com o cliente. Não atribuir cargo formal ou poder de aprovação apenas por participação em reunião.

## Fontes de dados e conexão

**Pedidos reais:** a rota usada no histórico de novembro foi o **Jarvis do cliente**, `https://jarvis.aboutbeer.com.br`, por API REST de leitura. O contrato, as permissões e a interpretação dos pedidos estão em [mcp/JARVIS-API-PRODUCAO.md](mcp/JARVIS-API-PRODUCAO.md).

**MCP Tray criado anteriormente:** About Beer Analytics, app Tray `10055`, conectado à loja de TESTES `1501140`. A loja real registrada era `1288719`; a homologação ainda estava pendente no último registro específico de 13–14/10. Em 23/11, a chamada do plugin pediu reautenticação. Esse MCP não foi validado como fonte de vendas reais.

**GA4:** a propriedade principal do e-commerce é `426045164`. Em 23/11 a listagem respondeu e confirmou a conta About Beer, com essa propriedade e outras duas. Uma nova conta de gestor exige autorização própria.

**Google Ads:** conta histórica `9185273300`, via Canovas Mendes. A MCC Roger consultada em outro chat não listou essa conta; não assumir que qualquer MCP Google Ads atende a About.

**Bling, Meta, Ads Manager:** acesso e permissão de cada plataforma são independentes. O registro de disponibilidade atual e as instruções estão em [mcp/CONECTAR-MCPS.md](mcp/CONECTAR-MCPS.md).

## Plano de mídia registrado em novembro

O quadro de 04/11/2026 preservado em [atualizacao-modelo-usuario.json](materiais/CAMPANHAS/PLANO-MIDIA-NOVEMBRO-2026/atualizacao-modelo-usuario.json) trazia:

| Frente | Verba diária no planejamento |
| --- | ---: |
| Meta — topo: dois posts | R$ 50 |
| Meta — outros produtos | R$ 60 |
| Meta — remarketing catálogo | R$ 20 |
| Meta — Core Business | R$ 130 |
| Meta — remarketing WhatsApp | R$ 20 |
| Google — PMax | R$ 40 |
| Google — Pesquisa | R$ 30 |
| ChatGPT Ads — cenário de mês completo | R$ 40 |
| Reserva Tray/Facebook Shopping — não verificada | R$ 29 |
| **Total diário projetado** | **R$ 419** |

O modelo projetava R$ 12.570 de mídia e **R$ 13.731,75 incluindo o encargo Meta usado na planilha**, contra R$ 13.000 disponíveis: excedente projetado de **R$ 731,75**. A reserva Tray e a projeção de GPT por 30 dias eram premissas; não comprovação de verba executada. O cálculo do encargo é histórico do modelo, sem nova conferência nesta entrega.

A campanha GPT foi posteriormente retomada em 13/11. Portanto, o plano de 04/11 não descreve sozinho a operação posterior. Reconciliar gasto, data, saldo e orçamento atuais antes de mexer em qualquer canal.

## ChatGPT Ads: acompanhamento a retomar

A conversa [GPT ADS](conversas/gpt-ads--01a11ca1-59fa-7873-b50e-2e548aec834c.md) relata retomada em **13/11**, com **R$ 40/dia** e término em **30/11 às 23h59**, horário de Brasília. Em 16/11 foi registrada entrega e gasto elegível de R$ 228,56 para uma promoção que exigia R$ 450 até **26/11 às 13h04**.

O usuário havia solicitado pausar **depois do consumo do crédito**, não quando atingisse a meta para liberá-lo. A agenda de checagem foi alterada de 30 em 30 minutos para uma conferência em 20/11 e posterior revisão conforme o saldo. O estado atual da promoção, do saldo, da campanha e da automação não foi consultado nesta entrega. Revalidar esses pontos; a agenda não migra por estar descrita no GitHub.

No cruzamento registrado em 11/11, não houve venda paga confirmada com UTM ChatGPT. Havia discrepância entre pedidos criados atribuídos pela plataforma e situação/origem dos pedidos Tray; o histórico não permitiu confirmar o vínculo apenas por coincidência de valor. Não transformar esse resultado histórico em um zero atual.

## Último ponto de reconciliação comercial

No chat [CAMPANHAS](conversas/campanhas--01a0c9a4-333c-7802-9671-39bf4f20f6cb.md), a consulta de **01–16/11/2026** relatou **38 pedidos pagos e R$ 43.369,95 na Tray**. Nove pedidos sem UTM representavam R$ 11.979,63; o cruzamento de transaction_id no GA4 recuperou três origens, somando R$ 3.473,83. Restaram seis pedidos e **R$ 8.505,80 sem origem de aquisição identificada**, divididos entre Direto no GA4 e transação não localizada.

O mesmo histórico separou PMax e Pesquisa pelas UTMs Tray: seis pedidos/R$ 7.995,32 e dois/R$ 1.264,08, respectivamente. A origem do GA4 divergiu em parte desses pedidos. Manter ambas as evidências e o modelo de atribuição escolhido; não sobrescrever uma origem apenas para fazer os relatórios coincidirem.

O consolidado com Mercado Livre foi apresentado como estimativa, com exclusões de categorias e limitação de acesso à lista de pedidos. Não usar esse consolidado aproximado como receita contábil definitiva nem somá-lo novamente ao Bling.

## Rastreamento, Merchant e criativos

- GA4/compra são tratados pela integração nativa da Tray no histórico. O GTM `GTM-NJNPZWZ5` também contém funcionalidades de checkout/Clarity. Não ativar tags antigas de purchase sem analisar duplicidade.
- Em 22/10 foi registrado o GTM versão 30 com pixel e eventos do ChatGPT Ads. `order_created` representa criação de pedido; exige reconciliação de pagamento. A cobertura de compra real teve etapas posteriores de teste e cruzamento nas conversas.
- O Merchant histórico é `5329306689`, vinculado à Tray e ao Google Ads `9185273300`. Há histórico de restrições por classificação de bebida, itens em análise e investigação da fonte de dados/preço. As contestações e contatos de suporte não comprovam resolução atual.
- O projeto inclui diagnósticos de Merchant de 28/10 e 04/11 e planejamento PMax/Black About. Tratar cada documento com sua data, sem substituir o estado atual pela conclusão antiga.
- Quatro Shorts Black About tiveram textos salvos em rascunhos no histórico de 17/11. Conferir publicação e aprovação atuais; edição de texto não comprova postagem pública.

## Ativos e acessos úteis

| Ativo | Referência |
| --- | --- |
| Repositório | https://github.com/tobaceroger-source/aboutbeer |
| Loja | https://www.aboutbeer.com.br |
| Jarvis | https://jarvis.aboutbeer.com.br — chave própria por canal seguro com o cliente |
| Google Ads | `9185273300` — confirmar Canovas Mendes e permissão do gestor |
| GA4 e-commerce | `426045164` — https://analytics.google.com/analytics/web/#/p426045164/reports/intelligenthome |
| Merchant Center | `5329306689` — acesso Google separado |
| ChatGPT Ads | About Group LTDA, `adacct_6ac7a1b9420881a390d34750547ee89f` |
| Planejamento de mídia | https://docs.google.com/spreadsheets/d/15Ge9gJOhz9jxH-JR8stHg4Aj98anoh8s2gPbYc6RjgY/edit |
| Resultados mensais citados | https://docs.google.com/spreadsheets/d/1objGiJNeKn8MYTlYWwOsuESe0kQM8GC3m6riUbE2U5A/edit |
| MCP Tray de testes | https://aboutbeer-tray-analytics.rogertobace.chatgpt.site/mcp — acesso privado separado |

## Entrada recomendada

1. Receber acesso próprio ao GitHub, GA4, Google Ads, Meta, Jarvis, Bling e documentos necessários.
2. Validar contas e ambientes. Dar prioridade ao Jarvis real e GA4; manter a loja de testes identificada como teste.
3. Reproduzir um período comercial com pedidos aprovados, cancelados, estornados e cobertura de origem; conferir as somas com o cliente.
4. Revalidar a promoção/saldo do ChatGPT Ads, o limite de verba e a situação das campanhas antes de qualquer alteração.
5. Retomar a conciliação dos pedidos sem origem e o diagnóstico Merchant/GTM conforme as pendências atuais.
6. Conferir ofertas, estoque, criativos e responsabilidades com o cliente; definir então a próxima mudança de mídia.

Fontes principais: `CAMPANHAS`, `GPT ADS`, `Consultar pedidos da Tray`, `API da Tray`, `Analisar dados`, os diagnósticos e o planejamento preservados. Índice: [conversas/INDICE.md](conversas/INDICE.md).
