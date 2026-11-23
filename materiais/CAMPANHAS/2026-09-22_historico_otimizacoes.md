# About Beer — histórico de análise e otimizações

Data: 22/09/2026. Registro consolidado da conversa; não é uma transcrição integral.

## Objetivo e contexto

O cliente relatou que setembro estava sendo o pior mês do ano e solicitou análise de Meta Ads, Google Ads, GA4 e Merchant Center, com foco nas três ações mais urgentes. Informou que o rastreamento é nativo pela integração da Tray com Google e Meta. Autorizou a verificação pelo navegador e a execução das ações descritas abaixo.

A loja vende chopeiras, não bebidas alcoólicas. Site: https://www.aboutbeer.com.br.

## Ações executadas e verificadas

### 1. Contestações de políticas no Google Ads

- Foram enviadas duas contestações: “Venda de bebidas alcoólicas” e “Informações sobre bebidas alcoólicas”.
- Escopo: anúncios afetados da campanha [PMAX] About Beer, ID 22794274983.
- Motivo selecionado: “Quero contestar decisão”. A interface confirmou “Contestação feita para 1 campanha” em cada envio.
- Não havia campo de texto livre; não foi enviada uma justificativa escrita personalizada.
- Situação ao término da verificação: aguardando análise. Envio de contestação não significa aprovação ou liberação dos produtos.
- A campanha estava qualificada com limitações, orçamento de R$ 80/dia, com restrições em dois dos três grupos de recursos. Não foi alterado orçamento.

### 2. Política de devolução cadastrada na integração Tray × Google

- Página existente conferida: https://www.aboutbeer.com.br/devolucoes-e-cancelamentos.
- Prazo informado na página para arrependimento: 7 dias corridos após a entrega. O prazo de 90 dias para defeitos é separado.
- Foram preenchidos e salvos na integração Google da Tray a URL acima e o prazo de 7 dias após a entrega.
- Verificação após salvar: URL e prazo apareceram em “Minha conta”; o alerta de ausência de política desapareceu na Tray.
- O texto público da política não foi alterado. Não foi confirmada nesta etapa a propagação da informação no Merchant Center.

### 3. Auditoria do GTM e da integração nativa

- Contêiner: GTM-NJNPZWZ5, correspondente ao configurado na Tray.
- Versão publicada auditada: 28, publicada em 21/08/2026, nome “JS checkout a vista no pix produtos”.
- As tags do GA4, incluindo base, PageView, purchase, add_to_cart, view_item e begin_checkout, estavam pausadas na versão publicada.
- Identificador do GA4 nativo na Tray: G-KEHQ5TY0KN, correspondente ao fluxo “Site Tray”, ID 6696293162, propriedade 426045164. Foi observada recepção de dados.
- Não foi encontrada duplicação provocada pelas tags pausadas desse contêiner. Isso não comprova ausência de duplicidade em toda a operação.
- O GTM foi mantido: contém funcionalidades ativas de checkout e Microsoft Clarity. Nenhuma tag foi alterada ou publicada.

### 4. Comparação de pedidos Tray × GA4

| Período | Tray | GA4 | Interpretação |
| --- | --- | --- | --- |
| 21/09/2026 | Um pedido, número 3828, R$ 1.641,60, aguardando envio | Um evento de compra, R$ 1.641,60 | Quantidade e valor coincidem na amostra diária |
| 16 a 22/09/2026 | 12 pedidos: seis enviados, um aguardando envio, quatro cancelados e um cancelado automaticamente | 11 eventos purchase, 11 usuários e R$ 16.587,50 de receita | Cinco de 12 pedidos estão cancelados: 41,7%; os totais não equivalem automaticamente a vendas pagas |

- O período de 16 a 22/09 inclui o dia da consulta, ainda parcial.
- O painel de pagamentos da Tray indicava aproximadamente R$ 9,5 mil pagos e R$ 0 pendentes. Outros cartões apresentavam métricas distintas; não se deve tratá-los como bases idênticas sem conciliação.
- A conciliação individual por transaction_id não foi concluída. Não está comprovado quais pedidos cancelados foram contabilizados no GA4.
- Não foi determinada a causa dos cancelamentos, nem provado que eles explicam integralmente a queda dos resultados.

## Outros achados registrados

### Merchant Center

- Conta vinculada: 5329306689. Google Ads vinculado: 9185273300.
- Chopeira 5L preta, SKU 7-40, e chopeira 2L preta, SKU 115-23, estavam “Em análise”, impedidas de aparecer durante a análise de política.
- Foram observados estoque disponível e preços Pix correspondentes ao site: R$ 1.439,10 e R$ 1.079,10, respectivamente.
- Foi observado conteúdo de CSS nas descrições do feed, pendente de tratamento.
- Havia fontes diferentes: PMax API com 28 produtos, Site Tray antigo com 12 e descoberta automática do site com nove. Isso requer revisão de cobertura e sobreposição; não comprova duplicidade de conversões.
- Dois itens da fonte antiga apareciam próximos de expirar; os IDs desses itens não foram identificados.
- O prazo usual de análise mencionado na conversa foi de três a cinco dias úteis, sem confirmação da data inicial ou garantia para esses casos.

### Tray e Meta

- A campanha nativa “pMax Tray - Não remover (1709561518104)” estava pausada e é diferente da campanha [PMAX] About Beer. Não foi reativada.
- A tela do aplicativo Meta Ads da Tray aberta pelo usuário exibia planos de contratação, não configurações de pixel. Nenhum plano foi contratado.
- Não houve alteração de orçamento, campanha ou configuração de rastreamento Meta nesta etapa.

## Métricas anteriores registradas na conversa

Comparação de 01–21/09 com 01–21/08, obtida na etapa anterior via HYPD. Estes valores foram preservados como contexto e não foram novamente validados pelo navegador nesta execução. Receitas atribuídas entre plataformas não devem ser somadas.

| Plataforma | 01–21/09 | 01–21/08 |
| --- | --- | --- |
| Google Ads | Investimento aproximado R$ 1.911; receita atribuída R$ 10.189; ROAS 5,33 | Investimento aproximado R$ 1.841; receita atribuída R$ 23.907; ROAS 12,99 |
| PMax | Investimento R$ 855,98; receita R$ 5.410,39; quatro conversões | Investimento R$ 746,42; receita R$ 22.569,50; 16,79 conversões atribuídas |
| Meta Ads | Investimento R$ 6.587,59; 38 compras; receita atribuída R$ 55.044 | Investimento R$ 6.534; 54 compras; receita atribuída R$ 65.821 |
| GA4 | Receita R$ 65.393; 47 compras | Receita R$ 66.393; 49 compras |

## Próximas ações pendentes

1. Conferir o resultado das duas contestações e a elegibilidade dos SKUs 7-40 e 115-23. Não foi criada automação de acompanhamento.
2. Conciliar os pedidos por transaction_id entre Tray e GA4, começando por 16–22/09 e ampliando para o mês. Separar pedido gerado, pagamento confirmado, cancelamento e eventual estorno.
3. Investigar os motivos dos cinco cancelamentos antes de atribuir o problema à mídia ou ao rastreamento.
4. Verificar como a integração nativa trata confirmação de pagamento e cancelamento; só então definir ajustes de mensuração, sem adicionar tags duplicadas.
5. Revisar descrições com CSS, fontes antigas e produtos próximos de expirar no Merchant Center.
6. Confirmar o recebimento da política de devolução no Merchant Center.
7. Completar a auditoria da integração Meta na área correta de eventos/pixel, pois a tela de planos da Tray não permite essa validação.

## Texto preparado para WhatsApp do cliente

O texto abaixo foi redigido na conversa. Não foi enviado pelo assistente ao WhatsApp.

> Pessoal, avançamos nas otimizações da About Beer:
>
> ✅ Contestamos as restrições do Google relacionadas a bebidas alcoólicas, pois os anúncios são de chopeiras. As contestações foram enviadas e aguardam análise.
>
> ✅ Regularizamos a política de devolução na integração Tray × Google, cadastrando a página e o prazo de 7 dias após a entrega. O alerta de ausência da política desapareceu.
>
> ✅ Auditamos o rastreamento no GTM: as tags de GA4 e compra estão pausadas, sem duplicação por essas tags com a integração nativa da Tray.
>
> ✅ Conferimos as vendas entre Tray e GA4: em 21/09, ambas registraram uma compra de R$ 1.641,60.
>
> 🔎 Ponto de atenção: entre 16 e 22/09, cinco dos 12 pedidos da Tray estão cancelados (41,7%). O próximo foco é investigar esses cancelamentos e conferir sua contabilização nas conversões, para avaliar os anúncios com base nas vendas efetivamente pagas.

## Orientação para continuidade

Usar este documento como ponto de partida, preservando a distinção entre ações executadas, observações e hipóteses. Revalidar os estados atuais antes de modificar configurações. Não apresentar contestações como aprovadas, o cadastro da política como liberação de produtos, ou a amostra diária como auditoria completa do rastreamento.
