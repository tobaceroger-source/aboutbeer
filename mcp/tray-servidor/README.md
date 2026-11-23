# About Beer Analytics — Tray MCP

MCP privado na nuvem, somente leitura, conectado à loja de testes Tray 1501140.
O Sites gerencia a autenticação com a conta ChatGPT e a instalação do plugin.

Ferramentas: verificar conexão, listar pedidos com filtros e consultar um pedido.
Valores monetários permanecem no formato decimal retornado pela Tray, em BRL.
Os dados da loja de testes não representam as vendas da About Beer.

Segredos configurados apenas no ambiente hospedado: TOKEN_ENCRYPTION_KEY e
TRAY_BOOTSTRAP_TOKENS. STORE_ID e TRAY_API_ADDRESS identificam a loja autorizada.
Tokens são criptografados no D1 e renovados sob bloqueio para evitar concorrência.
As consumer keys não fazem parte do servidor nem do repositório.

`npm test`, `npm run build`, `npm run validate` verificam segurança e artefato.
Migrations SQL ficam em drizzle e são incluídas em dist/.openai/drizzle.
Após publicar, usar o plugin privado provisionado pelo Sites.
