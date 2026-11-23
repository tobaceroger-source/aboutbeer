# Conexão Tray — About Beer Analytics

- Aplicativo Tray: About Beer Analytics, app_id 10055.
- Loja conectada e validada: testes 1501140.
- API: https://lojatesteintegracaotray01.corpsuite.com.br/web_api
- Resultado de autenticação: HTTP 201.
- Consultas de conexão, listagem e pedido individual validadas com a API.
- A listagem retornou 646 pedidos de teste em 13/10/2026.
- Servidor privado publicado: https://aboutbeer-tray-analytics.rogertobace.chatgpt.site
- Endpoint MCP: https://aboutbeer-tray-analytics.rogertobace.chatgpt.site/mcp
- Projeto Sites: appgprj_6ace8f971ff08191b05fafa5fa1342ab.
- Publicação final: appgdep_6ace92b8973481918dc4687c15cb4a42, status succeeded.
- Plugin privado provisionado: About Beer Analytics — Tray MCP.
- Plugin conectado na conta e as três ferramentas validadas por chamadas remotas.
- Verificação remota: connected true, loja 1501140, total 646 pedidos de teste.
- Listagem paginada e consulta individual (pedido de teste 1485) funcionaram.
- Nove testes locais passaram, incluindo criptografia, autenticação, renovação,
  limites e bloqueio de redirecionamentos que poderiam transmitir tokens.
- Compatibilidade corrigida: fetch utiliza redirect manual com rejeição de HTTP 3xx.

O MCP possui apenas consultas. Acesso à loja de produção não foi instalado ou
validado. A liberação para produção depende do processo de homologação da Tray:
https://developers.tray.com.br/#homologacao-do-aplicativo

Tokens ficam apenas no ambiente secreto do Sites e criptografados no banco.
Chaves consumer key/secret não foram salvas em arquivos ou no repositório.

## Solicitação de homologação enviada

- Loja real confirmada no painel: About Beer 1288719.
- Remetente: rogertobace@v4company.com.
- Destinatário: tray@ajudacliente.com.br.
- Assunto: Homologacao About Beer Analytics - app 10055 - loja 1288719.
- Gmail confirmou o envio em 13/10/2026 às 18:11 (America/Sao_Paulo).
- Três anexos enviados: relatório PDF, evidencias-api.json e evidencias-mcp.json.
- O formulário oficial e o link informado no encerramento do chamado 2049920
  retornaram "Formulário não encontrado"; solicitado canal atualizado.
- Solicitado roteiro complementar dos testes POST/PUT e liberação pontual para
  a loja real após a aprovação. Homologação ainda pendente da Tray.
- Comprovantes de envio salvos em output/tray-homologacao.
