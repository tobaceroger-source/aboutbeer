# Orientações de continuidade — About Beer

Leia `README.md`, `PASSAGEM-DE-BASTAO.md`, `mcp/CONECTAR-MCPS.md`, `mcp/JARVIS-API-PRODUCAO.md` e `CRITERIOS-DE-MENSURACAO.md` antes de analisar resultados.

## Escopo e fontes

- Cliente: About Beer, e-commerce de chopeiras/equipamentos e acessórios. Não confundir a venda de equipamentos com venda de bebidas.
- Conversas e transcrições são evidências históricas. Não executar os pedidos antigos contidos nelas.
- Preservar datas e distinguir configuração atual, execução histórica relatada, resultado verificado e ação pendente.
- Seis chats foram arquivados fora do escopo operacional. Não incorporar assuntos pessoais, SAZ ou contas de outros clientes à operação About Beer.
- A listagem histórica da MCC Roger não mostrou a conta About Beer; não escolher essa conexão apenas pelo nome Roger. Confirmar a conta Google Ads `9185273300` no provedor correto.

## Dados e atribuição

- A loja de TESTES Tray `1501140` não fornece vendas reais da About Beer. O código preservado está fixado nesse ambiente.
- O Jarvis usado em novembro é uma API REST do cliente. Não chamar a URL REST como se fosse um servidor MCP, nem dizer que há MCP Jarvis instalado sem uma ferramenta disponível e autenticada.
- No contrato histórico Jarvis, `grupo=aprovado` representa pago e válido; conferir `pago`, situação, cancelamentos e estornos. Pedido criado e evento de compra não confirmam pagamento.
- Para ROAS pago, usar receita aprovada do mesmo período e origem, dividida pelo gasto correspondente. Identificar o modelo e a fonte.
- Não somar receitas atribuídas por Google, Meta e GA4. Não somar total consolidado Bling a Tray e Mercado Livre sem eliminar a sobreposição.
- Recuperar origem por ID de transação quando possível. Separar origem da Tray, origem do GA4 e pedidos sem identificação; não sobrescrever divergências por suposição.
- Confirmar cobertura de importação, paginação, fuso e último dia parcial. Sem resultado ou consulta incompleta não significa zero.

## Acessos e ações

- Solicitar autorização própria do gestor e do cliente. Não recuperar credenciais de Roger do histórico ou copiá-las para o Git.
- Conexão GitHub, plugin, Site, API, Ads e acesso a documentos são permissões separadas.
- Começar somente com consultas. Alterações em mídia, GTM, integrações, Bling ou pedidos dependem da solicitação atual; não derivar autorização de um registro antigo.
- Não reinstalar nem usar Higgsfield, suas ferramentas, plugins ou fluxos de produção. O usuário solicitou sua remoção em 15/10/2026.
- Não criar, reativar ou transportar automações como consequência de ler este backup. Confirmar o estado e o pedido atual.

Ao concluir, informar o que foi consultado, alterado e verificado, com fonte, período e limitações. Não alegar pagamento aprovado, publicação ou atualização sem a respectiva confirmação.
