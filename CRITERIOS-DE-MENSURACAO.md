# Pedidos, receita, canais e ROAS

Critérios extraídos do histórico About Beer. Definir o relatório e o período antes de comparar fontes.

## Cada fonte mede uma coisa

| Fonte | O que ajuda a responder | Limitação a preservar |
| --- | --- | --- |
| Jarvis / pedidos Tray reais | Pedido, grupo de situação, pagamento e UTM importada | Depende da cobertura e atualização do sistema do cliente |
| Bling consolidado | Vendas, canais e valores bruto/líquido do ERP | Pode já conter Tray e Mercado Livre; evitar sobreposição |
| GA4 | Eventos, aquisição, campanhas e transaction_id | `purchase` não confirma pagamento nem mostra necessariamente a mesma origem da Tray |
| Google/Meta/ChatGPT Ads | Gasto e conversões atribuídas pelo modelo da plataforma | Uma mesma venda pode aparecer em mais de uma plataforma |
| Mercado Livre | Venda e indicadores do marketplace | Confirmar cancelamentos, itens excluídos e se o número veio de estimativa ou pedidos individuais |
| MCP Tray loja 1501140 | Validação técnica da integração | Dados de teste; não entram em receita da About |

## Pedido criado, aprovado, cancelado e estornado

No contrato Jarvis de 11/11, `aprovado` significa pago e válido; `aguardando_pagamento`, `cancelado` e `estornado` ficam separados. Para receita paga, conferir esses campos, sem inferir pagamento apenas de `payment_date`, envio de evento ou criação de pedido.

Para comparar períodos, registrar se o agrupamento é por **data do pedido**, **data do pagamento** ou **data de fechamento do ERP**. Os exemplos históricos Jarvis usam data do pedido. Não misturar essas datas silenciosamente.

## ROAS

```text
ROAS com receita paga atribuída = receita aprovada da origem no período / gasto correspondente no período
```

Identificar a fonte e o critério de origem usados. Separar esse cálculo do ROAS da plataforma, que depende da sua atribuição. Conferir se valores incluem frete, desconto, devolução/estorno e quais componentes são comparáveis.

Não somar receitas atribuídas por Google, Meta e GA4 para formar receita real. Não somar Bling consolidado + Tray + Mercado Livre sem eliminar a duplicidade.

## Origem e UTMs

1. Começar pela origem registrada no pedido e pela cobertura UTM informada no Jarvis.
2. Para um pedido sem UTM, buscar o **mesmo número/transaction_id** no GA4. Valor e proximidade de horário isoladamente não comprovam o vínculo.
3. Preservar campos separados para UTM Tray e origem de sessão/evento no GA4. Registrar divergência, sem escolher automaticamente a que atribui a venda à mídia.
4. Manter `Direto` e `sem transação localizada no GA4` separados. Os dois podem permanecer sem aquisição identificada, por motivos diferentes.
5. Se a API não cobrir todo o período ou faltar uma página, não fechar o relatório como completo.

O histórico distinguiu `facebook / paid` de outras mídias identificadas como Facebook. Não atribuir automaticamente toda linha com “Facebook” à campanha Meta paga. A separação PMax/Pesquisa em novembro usou as UTMs de produtos/Shopping e institucional, com confirmação da campanha em veiculação naquele período; validar novamente quando a estrutura mudar.

## ChatGPT Ads

`order_created` é criação de pedido, não pagamento confirmado. A UTM histórica usada foi:

```text
utm_source=chatgpt&utm_medium=cpc&utm_campaign=aboutbeer_chopeiras_10dias&utm_id={campaign_id}&utm_content={ad_id}
```

Manter teste de rastreamento e compras canceladas fora da receita paga. Se a plataforma informar valor atribuído sem IDs de pedidos, não confirmar a venda por mera coincidência do total.

Gasto elegível, crédito liberado e crédito consumido são estados distintos no histórico da promoção. A instrução de pausa antiga dependia do consumo do crédito, não apenas da meta que o liberava. Revalidar saldo e autorização antes de executar algo.

## Projeções e comparações históricas

- Explicitar data de corte e se o último dia está completo. Um print sem filtro de data/status não comprova o recorte.
- Comparar bruto com bruto e líquido com líquido. Os dois cenários aparecem no histórico Bling de novembro; não escolher um sem confirmar o painel.
- Um número consolidado estimado de Mercado Livre não equivale à soma de pedidos individualmente pagos.
- Preservar as exclusões de categorias usadas na análise anterior, como notebooks/telas e vinhos, quando o objetivo continuar sendo a operação About Beer; confirmar o universo com o cliente.
- Planejamento de verba, orçamento cadastrado, gasto realizado e valores com encargos são indicadores diferentes.

## Modelo de entrega

```text
Período / fuso / data de corte:
Fonte real e ambiente (produção ou testes):
Critério de data e pagamento:
Cobertura e paginação:
Pedidos aprovados e receita:
Cancelados / estornados / aguardando pagamento:
Receita por origem, preservando a fonte da atribuição:
Sem UTM / Direto GA4 / não encontrado GA4:
Gasto por plataforma e ROAS pelo critério declarado:
Diferenças para os painéis e limitações:
```

Fontes: conversas `CAMPANHAS`, `Consultar pedidos da Tray`, `Analisar dados` e `GPT ADS`. Consultar [índice](conversas/INDICE.md) e [contrato Jarvis](mcp/JARVIS-API-PRODUCAO.md).
