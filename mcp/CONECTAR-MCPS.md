# Conexões para continuar a About Beer

O repositório guarda contexto, exemplos e o código do MCP Tray de testes. Não instala aplicativos nem concede autorização às contas do cliente.

## Mapa conferido em 23/11/2026

| Fonte | Finalidade | Estado desta conferência |
| --- | --- | --- |
| GA4 MCP | Aquisição, compras e transações | Consulta de metadados respondeu; e-commerce `426045164` encontrado |
| Google Ads Canovas Mendes | Campanhas e gasto da conta `9185273300` | Configurado localmente; ferramentas não carregadas no chat |
| Meta Ads MCP | Campanhas, gasto e atribuição Meta | Ferramentas presentes; conta não testada nesta entrega |
| ChatGPT Ads Manager | Conta e campanhas ChatGPT Ads | Ferramentas presentes; conta não testada nesta entrega |
| OpenAI Ads — Consulta de campanhas | Consulta de campanhas/atribuição | Ferramentas presentes; conta não testada nesta entrega |
| Bling MCP oficial | Consultas ao ERP e consolidado autorizado | Configurado localmente; ferramentas não carregadas |
| About Beer Analytics — Tray MCP | Pedidos da loja de TESTES `1501140` | Chamada retornou necessidade de reautenticação |
| Jarvis do cliente | Pedidos reais e resumo por origem | API REST usada no histórico; nova chamada autenticada não feita nesta entrega |

O acesso deve ser repetido com a conta do novo gestor. Ferramentas presentes não comprovam autorização válida. [Validação detalhada](validacao-2026-11-23.json).

## ChatGPT web

No fluxo atual documentado: **Plugins → + → Add custom MCP server**, informar endpoint e autenticação, instalar o plugin resultante e selecioná-lo na conversa. O plano e as permissões do workspace podem limitar essa opção. [OpenAI](https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt).

Um servidor local STDIO como o GA4 deste computador precisa de um cliente com execução local ou de uma integração remota autorizada; o caminho de um executável do Windows não é uma URL MCP para colar no ChatGPT web.

## GA4

1. Obter acesso próprio às propriedades corretas. Para e-commerce, a referência é **426045164 — About Beer - Tray**. A Landing Page é outra propriedade, `466524713`.
2. No Codex, instalar e configurar o servidor do projeto oficial [googleanalytics/google-analytics-mcp](https://github.com/googleanalytics/google-analytics-mcp), seguindo a autenticação Google e os requisitos atuais do projeto.
3. O ambiente de origem usa `analytics-mcp` com `GOOGLE_APPLICATION_CREDENTIALS` e `GOOGLE_PROJECT_ID`. Os valores pessoais e o arquivo de credencial não foram copiados.
4. Repetir `get_account_summaries` e `get_property_details` antes de consultar relatórios.

O exemplo [config.codex.example.toml](config.codex.example.toml) mostra a estrutura local. A instalação e o caminho do executável devem corresponder ao computador do novo gestor.

## Google Ads

Endpoint histórico configurado:

```text
https://google-ads-mcp-866821228285.us-central1.run.app/mcp
```

É um serviço privado Canovas Mendes. Solicitar ao responsável pelo MCP a autorização do novo gestor e confirmar acesso à conta **9185273300**. Seguir a autenticação oferecida pelo servidor; a URL sozinha não transfere a sessão Google de Roger.

A MCC Roger `1016652970` foi listada em outro chat do projeto e não mostrou a About Beer naquela consulta. Não usar uma conta diferente para preencher a ausência de acesso. O chat correspondente foi preservado nos anexos fora do escopo.

## Meta, ChatGPT Ads e OpenAI Ads de consulta

Instalar ou conectar os respectivos aplicativos com contas autorizadas do cliente e conferir a empresa/conta de anúncios. No ChatGPT Ads, a referência histórica é **About Group LTDA**, `adacct_6ac7a1b9420881a390d34750547ee89f`.

O aplicativo de consulta de campanhas e o Ads Manager de gestão têm capacidades diferentes. O sucesso de uma consulta não comprova permissão para publicar. Confirmar as ferramentas disponíveis na nova conta e começar por leitura.

## Bling

Endpoint oficial:

```text
https://mcp.bling.com.br/mcp
```

Adicionar o servidor com autenticação **OAuth**, entrar com o próprio usuário Bling autorizado e aprovar os módulos necessários. O histórico deixou pendente a autorização do proprietário. No Codex, a configuração pode ser cadastrada por `codex mcp add bling --url https://mcp.bling.com.br/mcp` e autenticada por `codex mcp login bling`. [Documentação oficial Bling](https://developer.bling.com.br/mcp-server).

O Bling pode expor operações de escrita; iniciar com consultas e conferir as permissões do usuário. Não emitir notas, alterar pedidos ou estoque como parte da validação de acesso.

## MCP Tray privado, exclusivo de testes

Endpoint histórico:

```text
https://aboutbeer-tray-analytics.rogertobace.chatgpt.site/mcp
```

O proprietário precisa conceder acesso ao aplicativo/plugin privado e ao ambiente de hospedagem aplicável, ou preparar uma nova implantação autorizada. O código depende de identidade autenticada fornecida pelo ambiente Sites; não basta copiar a URL para um cliente genérico e supor que o login foi transferido.

O código e seus testes estão em [tray-servidor/README.md](tray-servidor/README.md). O `worker` fixa tanto o ID `1501140` quanto o endereço da loja de testes e rejeita configuração diferente. Os segredos exigidos no ambiente são `TOKEN_ENCRYPTION_KEY` e `TRAY_BOOTSTRAP_TOKENS`; nenhum valor foi incluído. O banco guarda tokens criptografados, e esse banco não integra o backup.

Para produção, confirmar com o cliente o estado da homologação do aplicativo **10055 — About Beer Analytics** e da liberação da loja **1288719**. O último registro específico de 13–14/10 ainda a descrevia como pendente. Uma alteração de ID não substitui autorização e homologação. [Processo Tray](https://developers.tray.com.br/#homologacao-do-aplicativo).

O acesso de pedidos reais usado em novembro pelo Jarvis é outra rota. Ler [JARVIS-API-PRODUCAO.md](JARVIS-API-PRODUCAO.md).

## Exemplos e teste inicial

- `config.codex.example.toml`: entradas desativadas até o gestor preparar autorização e ambiente.
- `mcp-http.example.json`: declaração de endpoints para clientes que usam `mcpServers`; selecionar somente os serviços autorizados. Não há instalação automática nem restrição de ferramentas nesse exemplo JSON.
- `catalogo-tray-ga4.json`: ferramentas observadas dos dois serviços; não contém credenciais.

```text
Liste os conectores disponíveis e teste somente metadados.
No GA4, confirme a propriedade 426045164.
No Google Ads, confirme a conta 9185273300 antes de consultar campanhas.
No Meta e Ads Manager, identifique a conta About Beer/About Group.
No Bling, confirme a empresa e módulos permitidos.
Se usar o MCP Tray, informe explicitamente o ID da loja e se é teste.
Não crie pedidos nem altere dados para testar.
```

Se um serviço pedir nova autenticação, realizar o fluxo da própria conta. Se faltar permissão, solicitar ao administrador correto; não reutilizar links OAuth antigos arquivados nas conversas.
