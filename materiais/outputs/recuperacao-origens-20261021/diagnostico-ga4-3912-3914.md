# GA4 — investigação dos pedidos 3912 e 3914

Consulta: 21/10/2026. Propriedade About Beer - Tray 426045164; fluxo 6696293162; tag G-KEHQ5TY0KN; moeda BRL; fuso America/Sao_Paulo. Período consultado: 01–21/10/2026, dia 21 parcial. Nenhuma configuração alterada nesta investigação.

## Pedido 3914 — referência interna

Uma compra registrada, receita GA4 R$ 2.286,63. Primeira origem do usuário: facebook / paid. Origem da sessão de compra: 1288719.commercesuite.com.br / referral.

No recorte dessa origem em 05/10 há apenas uma sessão. Às 16h18, session_start e page_view em /chopeiras/5-litros com pageReferrer https://1288719.commercesuite.com.br/. A navegação prossegue por kits, acessórios e copos; purchase às 16h23. Isso confirma a origem técnica já no início dessa sessão, não apenas no evento purchase. A primeira origem Facebook não demonstra por si só qual campanha deve receber crédito pela compra.

No mês, easycheckout.tray.com.br / referral aparece em outras 10 sessões, sem compras atribuídas. A sessão do domínio commercesuite tem uma compra.

Configuração atual verificada na interface da tag: nenhum domínio configurado em medição entre domínios; nenhum domínio preenchido na lista de referências indesejadas. Evidências: ga4-dominios-antes.png e ga4-referencias-antes.png. O estado atual não prova que a configuração era idêntica em 05/10.

Correção indicada: cadastrar correspondência exata para 1288719.commercesuite.com.br e easycheckout.tray.com.br em referências indesejadas. Isso evita tratar infraestrutura da loja como aquisição externa; não recupera informações ausentes, não reconcilia identidades e não corrige retroativamente a origem dos pedidos antigos. Não excluir domínios de campanhas ou toda a plataforma Tray genericamente.

Verificar também se visitantes realmente percorrem os dois domínios da loja. Se ambos continuarem ativos e tiverem a mesma tag, configurar e testar medição entre eles, preservando _gl e a identidade/sessão. Se o domínio técnico for só um alias, priorizar navegação pelo domínio canônico e preservação dos parâmetros nos redirecionamentos. Não adicionar domínio compartilhado de checkout à medição entre domínios sem validar o fluxo e a implementação.

## Pedido 3912 — origem da sessão não definida

Uma compra registrada, receita GA4 R$ 58,98. Origem/mídia/campanha da sessão: (not set). Primeira origem: direct / none. Dispositivo mobile, navegador Samsung Internet. Página de entrada: /acessorios/pecas-reposicao/tampa-barril-growler-keg-about-beer.

Recorte de 05/10 + Samsung Internet + origem (not set): uma sessão, um session_start, cinco page_view e um purchase. Session_start e page_view às 13h21 no produto; carrinho às 13h22; begin_checkout às 13h23; purchase às 13h24. A referência da primeira página está vazia. A consulta agregada isola uma sessão compatível, mas não fornece um rastreamento bruto de usuário/client_id.

Conclusão: a compra e a navegação foram coletadas. Não há fundamento para afirmar ausência de session_start nesse recorte nem para corrigir simplesmente criando um novo session_start. A origem não foi resolvida já no início da sessão. A causa exata não está comprovada pelos relatórios agregados. Não reclassificar manualmente como Direct ou Google Ads.

Próxima validação técnica: acesso de teste com UTMs conhecidas; inspecionar a primeira requisição GA4, estado/ordem de consentimento, client_id e session_id; acompanhar produto → carrinho → checkout, verificando continuidade e ausência de reconfiguração da origem. Repetir no Samsung Internet ou dispositivo equivalente. Corrigir somente o mecanismo reproduzido: parâmetros perdidos no redirecionamento, inicialização tardia, consentimento mal sequenciado ou identidade de sessão descontínua. Manter a integração nativa como emissor GA4; não reativar as tags antigas pausadas no GTM para tentar preencher a origem.

No mês há 29 sessões com origem/mídia (not set), incluindo essa compra. Há 21 eventos session_start nesse grupo; essas contagens não identificam individualmente a causa das sessões restantes.

## Verificações complementares

- O fluxo informa coleta ativa nas últimas 48 horas.
- A conta Google Ads 9185273300 está vinculada à propriedade desde 29/08/2025. Falta de vínculo dessa conta não explica, por si só, o caso 3912.
- As duas compras foram registradas no GA4; o problema analisado é atribuição, não ausência de purchase.
- O histórico GA4 não permite demonstrar que os três outros pedidos classificados como Direct foram erro de rastreamento.

## Critério de validação após correção

Uma visita controlada com origem conhecida deve manter sua identificação até o checkout. Os domínios técnicos não devem assumir o papel de canal de aquisição. Confirmar o mesmo contexto de usuário/sessão e purchase único com transaction_id, valor e moeda corretos. Não prometer eliminação absoluta de Direct ou (not set).

## Documentação

- https://support.google.com/analytics/answer/10327750
- https://support.google.com/analytics/answer/10071811
- https://support.google.com/analytics/answer/13504892
