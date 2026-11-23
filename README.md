# About Beer — continuidade da gestão de tráfego

Preparado em **23/11/2026** para o próximo gestor trabalhar com o próprio ChatGPT ou Codex.

## Ordem de leitura

1. [COMECAR-AQUI.md](COMECAR-AQUI.md).
2. [PASSAGEM-DE-BASTAO.md](PASSAGEM-DE-BASTAO.md).
3. [mcp/CONECTAR-MCPS.md](mcp/CONECTAR-MCPS.md).
4. [mcp/JARVIS-API-PRODUCAO.md](mcp/JARVIS-API-PRODUCAO.md) e [CRITERIOS-DE-MENSURACAO.md](CRITERIOS-DE-MENSURACAO.md).
5. Copiar o [PROMPT-DE-RETOMADA.md](PROMPT-DE-RETOMADA.md) no novo chat.

**A consulta de pedidos reais no histórico recente usava a API Jarvis do cliente. O MCP Tray preservado neste pacote está limitado à loja de testes 1501140.** A loja real foi identificada no histórico como 1288719. Não tratar os dados desses ambientes como equivalentes.

## O que foi preservado

| Conteúdo | Local |
| --- | --- |
| Todas as 24 conversas de usuário do projeto local: 384 turnos e 1.412 mensagens; oito chats arquivados | [conversas/INDICE.md](conversas/INDICE.md) |
| Seis conversas pessoais, de outro cliente ou de MCC sem relação comprovada com a About | `conversas/anexos-fora-do-escopo/` |
| Guia dos conectores, exemplos sem credenciais e validação datada | `mcp/` |
| Código do MCP Tray de testes, migração SQL, scripts e testes | `mcp/tray-servidor/` |
| 13 registros de check-in, incluindo trechos incompletos/marcadores, e demais orientações | `materiais/CHECK-IN/` |
| 35 materiais locais selecionados: histórico, tracking, Merchant, planejamento e check-ins | `materiais/manifesto.json` |
| Regras para um agente continuar o trabalho | `AGENTS.md` |
| Inventário e integridade | `MANIFESTO.json` e `checksums.sha256` |

## Conferência desta entrega

- GA4 respondeu à consulta de metadados e listou a propriedade de e-commerce **426045164 — About Beer - Tray**.
- O MCP Tray exposto nesta conversa pediu nova autenticação. Sua descrição e seu código continuam exclusivos de testes.
- Google Ads e Bling estão no arquivo de configuração local, mas sem ferramentas carregadas nesta conversa.
- Meta Ads, ChatGPT Ads Manager e OpenAI Ads de consulta têm ferramentas disponíveis; as contas não foram revalidadas nesta entrega.
- A cópia do código Tray passou em **9 testes**, build e validação do artefato, em pasta de trabalho isolada. Nenhuma implantação nova foi feita.

Detalhes: [mcp/validacao-2026-11-23.json](mcp/validacao-2026-11-23.json). Nenhuma métrica comercial foi recalculada nesta entrega.

## Limites do backup

Esta é uma exportação textual do projeto **local do Codex**, não da conta ChatGPT inteira. Uma conversa foi recuperada do JSONL local compactado porque excedeu o limite de leitura do aplicativo. As outras 23 foram exportadas com paginação completa.

Raciocínio interno, revisões automáticas, threads de subagentes, comandos e saídas brutas de ferramentas não foram exportados. Imagens e anexos permanecem como referências, sem seus binários. Não foram copiados todos os vídeos, planilhas de clientes, pedidos ou audiências do computador.

Chaves, tokens identificados e links temporários de autorização foram removidos. O repositório não transfere acessos às plataformas, ao Jarvis ou à hospedagem. Cada conta precisa de autorização própria.
