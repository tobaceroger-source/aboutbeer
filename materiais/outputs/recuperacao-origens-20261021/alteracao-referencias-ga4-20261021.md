# GA4 — referências indesejadas e teste controlado

Data: 21/10/2026. Propriedade 426045164; fluxo 6696293162; tag G-KEHQ5TY0KN.

## Alteração aplicada

Foram adicionadas, salvas e reabertas para conferência duas condições de correspondência exata na lista de referências indesejadas:

- 1288719.commercesuite.com.br
- easycheckout.tray.com.br

Evidência: ga4-referencias-corrigidas.png. Esta execução atualiza o status do diagnóstico anterior, que foi escrito antes da alteração. Não houve publicação de contêiner GTM nem reativação das antigas tags GA4.

## Teste realizado

Entrada com utm_source=qa_codex, utm_medium=teste, utm_campaign=validacao_referrals_20261021 e utm_content=entrada.

O Tag Assistant mostrou um hit page_view enviado a G-KEHQ5TY0KN com a URL de entrada contendo as UTMs, identificador de cliente e identificador de sessão. Isto comprova o envio da entrada, não a atribuição final da compra.

Foi percorrido o caminho página inicial → Kit de Higiene Completa About Beer → carrinho → checkout na etapa de identificação. O carrinho e o checkout carregaram em www.aboutbeer.com.br; easycheckout.tray.com.br apareceu como iframe técnico. Um item foi deixado no carrinho de teste para eventual conclusão pelo usuário. Preço exibido: R$ 79,00 ou R$ 71,10 no Pix, antes de frete. O navegador foi deixado na identificação, sem preencher e-mail, CPF ou pagamento.

## Limites da validação

A sessão do Tag Assistant acessível pela ferramenta não acompanhou todas as páginas da aba controlada, embora a página exibisse o indicador de conexão. Por isso não foi possível comparar os identificadores de cliente/sessão em todas as etapas. Nenhum pedido foi concluído, nenhum pagamento realizado e nenhum evento purchase artificial disparado.

Status: configuração aplicada e conferida; navegação até identificação testada; preservação da origem até purchase ainda não comprovada. Não interpretar o desaparecimento das UTMs da barra de endereço nas páginas internas como prova de perda de atribuição.

## Fechamento necessário

Concluir uma compra controlada pelo usuário/cliente, com origem marcada, e obter o número do pedido. Depois localizar a transação no GA4, conferir origem/mídia/campanha de sessão e conciliar com Tray. Caso a sessão de teste expire, iniciar uma nova entrada com as mesmas UTMs antes da compra. Aguardar processamento do GA4 se a transação ainda não aparecer. A inclusão na lista não deve ser tratada como recuperação retroativa de origens históricas nem como solução comprovada para o caso (not set).
