# Testes de rastreamento Tray — 21/10/2026

## Estado da intervenção

Testes de navegação executados na loja real 1288719. Correção de persistência de UTM **não publicada**: o mecanismo que preenche a origem do pedido ainda não foi identificado e validado. Nenhum pedido foi criado, nenhum pagamento realizado e nenhuma configuração de produção alterada.

## Cenário executado

- Entrada na página inicial com `utm_source=teste_tracking&utm_medium=qa&utm_campaign=validacao_utm_20261021&utm_content=entrada`.
- Confirmado que a URL de entrada manteve os quatro parâmetros.
- Navegação pelo link interno para Kit de Higiene Completa About Beer, produto 135.
- Inclusão de uma unidade no carrinho e navegação pelo botão do carrinho até o checkout.
- Checkout abriu no domínio www.aboutbeer.com.br e exibiu corretamente o produto.
- Avanço até a identificação do comprador. Teste interrompido antes de informar e-mail/CPF, criar pedido ou pagar.
- Item de teste removido ao finalizar a auditoria. Carrinho vazio confirmado visualmente; evidência em `carrinho-limpo-teste.png`.
- Links internos e checkout não exibem UTMs. Isso, isoladamente, não demonstra perda: a plataforma pode preservar a origem fora da URL.

## Configurações verificadas

- Integração nativa GA4: G-KEHQ5TY0KN.
- GTM: GTM-NJNPZWZ5.
- Configurações gerais consultadas sem encontrar controle explícito de persistência de UTM.
- As tags antigas de GA4 no GTM estavam pausadas. Não foram reativadas para evitar sobreposição com a integração nativa.

## Evidências no console durante o teste

1. Meta Pixel: `Invalid parameter format for currency`. Aviso visto no produto/carrinho/checkout. Ainda não foi identificado qual evento/pixel originou cada ocorrência. Não comprova erro no evento purchase.
2. Script nativo da integração PMax, em `images.tcdn.com.br/pmax/static/main.js`: `Uncaught TypeError: Cannot read properties of undefined (reading 'checkout')`, observado no carrinho. Não comprova perda de UTM nem perda de todas as conversões.
3. Clarity: carregamento bloqueado por CSP no checkout. Achado separado da atribuição de pedidos.

## Limites e conclusão

Não foi possível verificar a gravação final de UTM no pedido porque o teste não criou pedido e os recursos disponíveis não expõem a persistência nativa da Tray. O MCP Tray disponível atende somente à loja de testes 1501140, não à loja real. A documentação pública de pedidos consultada não apresentou um contrato explícito de UTM que permitisse implementar a correção com segurança.

Não instalar cookie, localStorage ou tag de GA4 arbitrários: isso não garante preenchimento do campo UTM Source da Tray. Não acrescentar UTMs indiscriminadamente a todos os links internos. Não sobrescrever origens dos pedidos antigos com atribuição inferida do GA4.

## Próxima validação necessária

Com a Tray, confirmar: mecanismo nativo de captura de utm_source, duração, regra de sobrescrita, vínculo com carrinho/pedido e comportamento ao recriar pedido/trocar pagamento. A correção precisa ser aplicada nesse mecanismo ou em integração oficialmente suportada.

Após a correção, validar um pedido controlado concluído pelo responsável da loja: entrada com UTMs únicas → produto → carrinho → checkout → pedido. Conferir a origem no detalhe/exportação da Tray e a transação correspondente no GA4. Repetir retorno direto e nova tentativa de pagamento, usando procedimento de teste aprovado pela loja. Não considerar a correção concluída apenas porque a URL ou o GA4 contém UTMs.

## Texto técnico preparado para a Tray — não enviado

Loja 1288719, About Beer. Investigamos pedidos sem UTM Source apesar de transações correspondentes no GA4 com origem identificada. Em teste em 21/10/2026, a entrada preservou utm_source=teste_tracking, utm_medium=qa e utm_campaign=validacao_utm_20261021. Produto, carrinho e checkout carregaram normalmente no mesmo domínio. Não finalizamos pedido. Solicitamos confirmar como a Tray persiste esses parâmetros até o pedido e ao recriar pedidos/trocar pagamento, quais configurações ou customizações podem interferir e qual extensão oficial permite corrigir a persistência. Também observamos aviso de currency inválida do Meta Pixel e erro de leitura de checkout no script nativo PMax; solicitamos investigação separada desses eventos. Precisamos validar a origem no registro do pedido após a correção.

## Referências consultadas

- https://developers.tray.com.br/
- https://support.google.com/analytics/answer/10917952?hl=pt-BR — UTMs padrão são omitidas de algumas dimensões de caminho/página de destino; sua ausência nessas dimensões não prova que o link original estava sem UTMs.
