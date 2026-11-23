# Tracking simples — About Beer / GPT Ads

Implementado em 22/10/2026 pelo navegador interno, na conta About Group LTDA.

**Atualizacao posterior em 22/10:** a campanha foi publicada e ativada por autorizacao expressa do usuario, com R$ 40/dia de 22/10/2026 16:05 a 01/11/2026 16:05 BRT. Grupo e tres anuncios tambem foram ativados. Status final observado: Veiculacao parcial, com algumas URLs ainda em analise. Registro completo e provas em `../GPT-ADS-ATIVACAO-2026-10-22/RESULTADO.md`. As referencias a rascunho abaixo descrevem a fase anterior de implantacao do tracking.

## Implantacao

- Conta Ads: `adacct_6ac7a1b9420881a390d34750547ee89f`.
- Pixel existente reutilizado: **PIXEL - GPT ADS - ABOUT**, ID publico `PoPr5uZHcP5Xu8YB7jb19T`.
- Fonte de dados: `cds_6ada47566f4481a3976b0516a957d6fc`.
- GTM: `GTM-NJNPZWZ5`, conta 6215819468, container 176724010.
- Tag 139: **GPT Ads | Pixel e funil Tray**, HTML personalizado, All Pages, suporte document.write.
- Variavel 140: **nonce**, Elemento DOM / Codigo / `gtmScript` / atributo `data-hash`.
- Versao 29 publicou a tag e a variavel. Versao **30** publicou a propagacao do nonce para o SDK oficial, corrigindo o bloqueio CSP observado no checkout. Nenhuma politica de seguranca do site foi alterada.
- Demais tags preservadas. Workspace sem alteracoes pendentes apos a publicacao.

## Eventos vinculados ao rascunho da campanha

| Nome no Ads | Evento nativo Tray/GA4 | Evento OpenAI | ID da configuracao no Ads |
|---|---|---|---|
| GPT \| Visita | carregamento da pagina | page_viewed | 6ada5000fff881a3bdfb365e5b0c93ec |
| GPT \| Produto | view_item | contents_viewed | 6ada50d4ccc081a3b326104883146235 |
| GPT \| Carrinho | add_to_cart | items_added | 6ada5117232c81a3bf3593e05f10259c |
| GPT \| Checkout | begin_checkout | checkout_started | 6ada516f244481a392dc05f392c4a42f |
| GPT \| Pedido criado | purchase | order_created | 6ada4f65dbf481a39e340ecd73792fd6 |

O adaptador acompanha a fila nativa `dataLayerGa4`, preserva sua funcao push, processa eventos que ja estavam na fila e observa os seguintes. Nao duplica os eventos GA4. O evento personalizado antigo `Compra`/`compra` foi preservado, mas nao foi usado nessa implementacao.

Pedido criado exige transaction_id, envia event_id estavel e possui protecao de repeticao na sessao. Valor do pedido, quando valido, segue em centavos de BRL. Valores de produto/carrinho/checkout foram omitidos, pois a Tray apresentou valores de tabela diferentes do preco de venda. Nao foram adicionados e-mail, CPF, telefone ou credenciais ao codigo. Nao foi criada chave da API de conversoes.

## Validacao

- Pixel inicializado e `page_viewed` recebidos pelo fluxo do Ads.
- `contents_viewed` do produto 135 (Kit de Higiene Completa) recebido pelo fluxo do Ads.
- `checkout_started` do produto 135 recebido pelo fluxo do Ads em 22/10, 18:32:31 UTC (15:32:31 BRT), apos a correcao do nonce.
- `items_added` do produto 135 recebido pelo fluxo do Ads em 22/10, 18:34:00 UTC (15:34:00 BRT), apos adicao real de uma unidade do Kit de Higiene. Evidencia: `pixel-funil-recebido.jpg`.
- Carrinho original: um Kit de Higiene, subtotal R$ 79,00 / R$ 71,10 no Pix. Quantidades adicionais usadas nos testes foram removidas.
- Nenhum pedido foi criado e nenhum dado de identificacao ou pagamento foi preenchido. `order_created` foi validado apenas em teste local sem rede, com valor em centavos, transaction_id obrigatorio e deduplicacao. Falta validacao com pedido real.
- Os eventos de teste nao representam resultados atribuidos a anuncios.
- Algumas abas existentes ainda carregavam o contêiner anterior em cache durante a checagem. O checkout corrigido foi confirmado no Preview da mesma fonte publicada na versao 30; o painel confirmou o recebimento do evento. O carrinho foi confirmado em navegacao da loja.

## Campanha

**[CHATGPT ADS] About Beer | Chopeiras | 10 dias** permanece em rascunho. Os cinco eventos persistiram ao reabrir o rascunho.

- Objetivo cliques, Brasil, orcamento medio R$ 40/dia.
- Cronograma anterior preservado: 08/10/2026 14:54 a 18/10/2026 14:54 BRT. Necessita novas datas antes de veicular.
- UTMs preservadas:

```text
utm_source=chatgpt&utm_medium=cpc&utm_campaign=aboutbeer_chopeiras_10dias&utm_id={campaign_id}&utm_content={ad_id}
```

Nao foi ativada a campanha. O pixel funciona em toda a loja; o vinculo de eventos e o identificador de atribuicao do clique permitem ao Ads separar os resultados da campanha. UTMs permitem a leitura complementar no GA4. Um pedido criado no navegador nao confirma pagamento aprovado; conciliacao com a Tray fica para uma etapa futura.

## Arquivos

- `aboutbeer-openai-pixel.html`: fonte da tag.
- `gtm-editor-publicado.html`: conteudo copiado do editor antes da publicacao da versao 30.
- `verify-tracking.cjs`: teste local, sem rede, incluindo preservacao da fila, etapas, valor, deduplicacao e nonce do SDK.
- Capturas de tela: versoes ativas, tag no Preview, recebimento do pixel e eventos vinculados a campanha.

## Auditoria de conclusao — 22/10/2026

Rechecagem feita diretamente nas telas atuais do GTM e do GPT Ads, apos a implantacao:

| Requisito | Evidencia autoritativa | Resultado |
|---|---|---|
| Publicacao do GTM | Versao 30 marcada como ativa; detalhe compara versoes 29 e 30 e mostra o nonce do SDK e o mapa purchase/order_created | Confirmado |
| Fonte e eventos vinculados | Tabela de Eventos de conversao na conta About Group LTDA; GPT Pedido criado associado ao pixel correto e a uma campanha | Confirmado |
| Visita, produto, carrinho, checkout | Fluxo de eventos do pixel e capturas de recebimento descritas acima | Confirmado |
| Logica local de pedido | verify-tracking.cjs passou novamente, sem rede, cobrindo valor em centavos, ID obrigatorio, deduplicacao e nonce | Confirmado apenas em simulacao local |
| Compra real de ponta a ponta | Nenhum order_created encontrado no fluxo consultado; nenhum pedido de teste foi criado pelo agente | Pendente |

O objetivo permanece aberto por falta da validacao real de compra. Foi solicitado ao usuario concluir um pedido de teste e manter a pagina de confirmacao aberta, ou optar por aguardar uma compra real. Nao e necessario repetir a instalacao nem criar outro pixel. Nenhuma alteracao adicional foi publicada nesta auditoria e a campanha permanece em rascunho.

Rechecagem posterior, aproximadamente 15:42-15:43 BRT: o fluxo do Ads recebeu novas visitas e adicoes ao carrinho, mas nenhum `order_created` apareceu na janela recente consultada. A consulta ao vivo foi encerrada. A mesma pendencia de compra real permanece apos as verificacoes sucessivas; a conclusao fica bloqueada ate haver um pedido real observavel ou o usuario realizar o teste solicitado. Nao foram criados pedidos artificiais nem enviadas compras simuladas ao pixel.

Fontes: [Pixel OpenAI](https://developers.openai.com/ads/measurement-pixel), [eventos suportados](https://developers.openai.com/ads/supported-events), [variavel nonce Tray](https://basedeconhecimento.tray.com.br/hc/pt-br/articles/15603973485723-Como-criar-a-vari%C3%A1vel-base-para-os-scripts-no-Google-Tag-Manager).
