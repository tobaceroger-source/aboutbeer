# Jarvis — pedidos reais da About Beer

## Natureza e autorização

O usuário forneceu o contrato abaixo em **11/11/2026**, no chat [Consultar pedidos da Tray](../conversas/consultar-pedidos-da-tray--01a1cb09-1833-7a23-b561-3f9acfb1dc02.md). As consultas posteriores desse chat e de CAMPANHAS usaram a API do cliente.

Base: `https://jarvis.aboutbeer.com.br`.

Autenticação: cabeçalho `Authorization: Bearer CREDENCIAL_PROPRIA_AUTORIZADA`. A chave não vai na URL. Solicitar ao Igor / administrador uma credencial adequada ao novo gestor; guardar em cofre ou nas configurações privadas da integração.

No computador anterior foi usado o alvo `aboutbeer-jarvis-api` no Gerenciador de Credenciais do Windows. Esse registro protegido não foi exportado e não deve ser reconstruído a partir do histórico.

## Contrato histórico de leitura

### Resumo por origem

```http
GET /api/trafego/resumo?de=2026-11-01&ate=2026-11-16&agrupar=origem
```

`agrupar`: `origem`, `dia` ou `origem_dia`.

Retorno descrito: pedidos, aprovados, aguardando pagamento, cancelados, estornados, valores totais/aprovados/cancelados/estornados, taxa de aprovação e ticket médio aprovado, por origem UTM.

### Lista de pedidos

```http
GET /api/trafego/pedidos?de=2026-11-01&ate=2026-11-16&pagina=1&limite=200
```

Retorno descrito: número, data/hora, situação, grupo, pago, enviado, entregue, valor total/produtos, frete, desconto, cupom, pagamento, parcelas e UTMs. Percorrer todas as páginas para fechar um período.

As datas dos exemplos são históricas. Substituir pelo intervalo atual acordado e confirmar o contrato vigente com o administrador.

## Interpretação dos grupos

| Grupo informado pelo cliente | Interpretação |
| --- | --- |
| `aprovado` | Pago e válido; base do ROAS com receita paga |
| `aguardando_pagamento` | Pedido criado, ainda sem confirmação de pagamento |
| `cancelado` | Cancelamento por algum motivo operacional; não equivale a venda paga |
| `estornado` | Chargeback ou estorno após pagamento |

Limites informados no contrato: somente **GET**, até **60 chamadas/minuto**, intervalo máximo de **366 dias por chamada**, e `limite` de até **500** na lista. O administrador pode rever essas condições; respeitar o contrato atual e a resposta do serviço.

O campo `cobertura_utm` descreve quantos pedidos têm origem. A cobertura depende das importações e da captura; ausência de UTM não demonstra ausência de venda. O cliente informou que as respostas não trazem nome, CPF, e-mail, telefone ou endereço.

## Como continuar pelo ChatGPT/Codex

- **Codex com execução autorizada:** pode consultar a API por um cliente HTTP, obtendo a chave de um cofre/entrada privada e mantendo-a apenas no cabeçalho. Nunca colocar a chave em argumentos de terminal, logs ou no Git.
- **ChatGPT via MCP:** o responsável precisa disponibilizar um conector MCP autenticado que encapsule esses GET, ou conceder acesso a um conector existente. A base REST do Jarvis não é um endpoint MCP. Este pacote não criou nem implantou um novo MCP Jarvis.
- **Primeira conferência:** obter o resumo de um período pequeno autorizado, conferir a empresa e depois a paginação dos pedidos. Não usar a loja de testes como substituta quando a API real estiver indisponível.

A tentativa de ler o OpenAPI pelo mecanismo de pesquisa nesta entrega não retornou conteúdo utilizável. Nenhuma consulta autenticada atual ao Jarvis foi realizada. O contrato acima está documentado pelo histórico do usuário, não por uma nova validação de produção em 23/11/2026.
