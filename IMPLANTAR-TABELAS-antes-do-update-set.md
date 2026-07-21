# Implantação das Tabelas em PRODUÇÃO — fazer ANTES do Update Set

**Projeto:** Simulador de ITCD — SEFAZ-MT (widgets `simulador_itcd` e `itcd_admin`)
**Objetivo:** criar as 3 tabelas de dados em produção **antes** de importar/commitar o Update Set dos widgets, para não repetir o erro:

> `GlideRecord.addQuery() - invalid table name: u_ndice_upf_e_selic`

Esse erro acontece porque o widget foi para prod, mas a **tabela não existe lá**. Tabela de dados **não deve depender** do Update Set dos widgets — crie-as primeiro, confira coluna por coluna, e só então rode o Update Set.

---

## 0. Ordem de implantação (não inverter)

1. **Criar as 3 tabelas com as colunas** (este documento). ← comece aqui
2. Conferir cada tabela (seção 4).
3. **Só então**: Retrieved Update Sets → **Preview → Commit** (widgets + páginas).
4. Definir a senha do painel: property `x_itcd.admin_senha` (System Properties).
5. Carregar os índices (aba Índices → Importar lote com a série UPF/SELIC).
6. Acesso público / ACLs (seção 5).

---

## 1. As 3 tabelas (nomes reais — exatos)

| Função | Table name (exato) | Nº de colunas `u_*` |
|---|---|---|
| Índices UPF/SELIC | `u_ndice_upf_e_selic` | 3 |
| Log de simulações | `u_itcd_simulacao` | 15 |
| Avaliações | `u_u_itcd_avaliacao` | 2 |

> ⚠️ **Atenção ao prefixo `u_`.** Ao criar tabela/coluna, o ServiceNow **adiciona `u_`** ao que você digita no *Label*. Por isso:
> - digite o **Label sem `u_`** (ex.: `tipo_fato`) e **confira o campo *Column name*** antes de salvar (ele é editável na criação);
> - o nome final tem que bater **exatamente** com as tabelas abaixo — inclusive o `u_u_` em `u_u_itcd_avaliacao`. **Nome divergente = gravação falha em silêncio.**

**Como criar cada coluna (procedimento-base):**
1. Abra a lista da tabela: `/u_ndice_upf_e_selic_list.do` (idem para as outras).
2. Botão direito num cabeçalho de coluna → **Configure → Table**.
3. Na lista **Columns** → **New**.
4. Preencha nesta ordem: **Type** → **Column label** (sem `u_`) → confira **Column name** → **Max length** (só String) → **Submit**.

---

## 2. Colunas de cada tabela

### 2.1 `u_ndice_upf_e_selic` — Índices (3 colunas)

| # | Column name (exato) | Type | Max length | Guarda |
|---|---|---|---|---|
| 1 | `u_mes` | String | **7** | Competência `AAAA-MM` (1 registro por mês) |
| 2 | `u_valor` | Decimal | — | UPF/MT do mês (R$) |
| 3 | `u_selic` | Decimal | — | SELIC do mês (%) |

> Em `u_mes`, **limpe o *Default value*** se vier preenchido.

### 2.2 `u_itcd_simulacao` — Log de simulações (15 colunas)

| # | Column name (exato) | Type | Max length | Guarda |
|---|---|---|---|---|
| 1 | `u_tipo_fato` | String | 40 | "Causa Mortis" ou "Doação" |
| 2 | `u_valor` | Decimal | — | Valor da herança OU soma das doações |
| 3 | `u_qtd_doacoes` | Integer | — | Qtd. de doações (0 p/ herança) |
| 4 | `u_data_fato` | String | 10 | Data do óbito / 1ª doação (`AAAA-MM-DD`) |
| 5 | `u_data_referencia` | String | 10 | Abertura do inventário / protocolo |
| 6 | `u_doacoes` | String | 4000 | JSON das doações |
| 7 | `u_entrada` | String | 4000 | JSON de todos os dados informados |
| 8 | `u_blocos` | String | **8000** | JSON do cálculo por doação (faixas, encargos, totais) |
| 9 | `u_base` | Decimal | — | Base de cálculo total |
| 10 | `u_imposto` | Decimal | — | Imposto original total |
| 11 | `u_multa` | Decimal | — | Multa total |
| 12 | `u_juros` | Decimal | — | Juros (SELIC) totais |
| 13 | `u_total` | Decimal | — | Total a recolher |
| 14 | `u_dispensa` | True/False | — | Dispensa aplicada |
| 15 | `u_sucessiva` | True/False | — | Doação sucessiva aplicada |

> Data/hora do registro usa a coluna nativa `sys_created_on` — **não criar**.

### 2.3 `u_u_itcd_avaliacao` — Avaliações (2 colunas)

| # | Column name (exato) | Type | Max length | Guarda |
|---|---|---|---|---|
| 1 | `u_estrelas` | Integer | — | Nota de 1 a 5 |
| 2 | `u_comentario` | String | 4000 | Comentário (opcional) |

---

## 3. Se as tabelas ainda NÃO existirem em prod

Crie cada tabela em **System Definition → Tables → New**:
- **Label** sem `u_` (ex.: `itcd simulacao`) e **confira o Table name** gerado — ajuste para ficar exatamente `u_itcd_simulacao`, `u_u_itcd_avaliacao`, `u_ndice_upf_e_selic`.
- Marque **Create access controls** (gera ACLs base — depois ajuste conforme a seção 5).
- Adicione as colunas da seção 2.

> Ignorar tabelas antigas `u_x_sfmt_itcd_indice_upf` e `u_indice_selic` — **não são usadas**.

---

## 4. Conferência (obrigatória antes do Update Set)

Abra cada lista e confira **nome por nome** com a seção 2:
```
/u_ndice_upf_e_selic_list.do
/u_itcd_simulacao_list.do
/u_u_itcd_avaliacao_list.do
```
- Botão direito no cabeçalho → **Configure → Table** → lista **Columns**.
- Confirme: quantidade de colunas, `Column name` exato, `Type`, e `Max length` das String (principalmente `u_blocos = 8000`).
- Confirme que `u_selic` existe em `u_ndice_upf_e_selic` (é a que costuma faltar).

Se algum nome saiu diferente (ex.: `u_u_tipo_fato`), **recrie a coluna** com o nome certo. Nome divergente = o `GlideRecord.setValue()` grava em silêncio no campo errado ou falha.

---

## 5. Acesso público / ACLs (o app é público para o cidadão)

Como o **Simulador** roda como usuário **Guest**, os ACLs precisam permitir:

| Tabela | Operação p/ Guest (público) | Motivo |
|---|---|---|
| `u_ndice_upf_e_selic` | **read** | o simulador lê a série p/ calcular |
| `u_itcd_simulacao` | **create** | registra cada simulação |
| `u_u_itcd_avaliacao` | **create** | registra a avaliação (estrelas/comentário) |

O **Painel Administrativo** (`itcd_admin`) precisa de **read/create/write/delete** nessas tabelas para quem o administra (a proteção extra é a senha do próprio painel).

> Sem esses ACLs, o simulador pode abrir mas **não calcular** (falha ao ler índices) ou **não registrar** simulações/avaliações. Isso é diferente do erro de "invalid table name" (que é tabela inexistente).

---

## 6. Depois das tabelas — sequência final

1. **Update Set** dos widgets/páginas: Retrieved Update Sets → Preview → **Commit**.
2. **Senha do painel**: criar/definir `x_itcd.admin_senha` (o botão *Alterar senha* do painel cria a property).
3. **Índices**: aba Índices → **Importar lote** com a série completa UPF/SELIC (1999-01 até o mês vigente). Sem isso o simulador **não calcula**.
4. **Público**: marcar os widgets como **Public** e liberar acesso anônimo (se houver SSO/Conecta, o time de segurança precisa permitir guest nas páginas públicas).
5. **Teste de regressão** (âncoras do roteiro): herança 15.000.000 (óbito 02/05/2020, abertura 02/05/2025) → **R$ 1.149.079,36**.

---

## Checklist rápido

- [ ] `u_ndice_upf_e_selic` com `u_mes`(7), `u_valor`, `u_selic` — Default de `u_mes` limpo
- [ ] `u_itcd_simulacao` com as 15 colunas (`u_blocos` = 8000)
- [ ] `u_u_itcd_avaliacao` com `u_estrelas`, `u_comentario`(4000)
- [ ] Conferência nome-por-nome em cada `_list.do`
- [ ] ACLs de Guest (read índices; create simulação/avaliação)
- [ ] **Só então** → Update Set → Preview → Commit
- [ ] Senha `x_itcd.admin_senha` definida
- [ ] Índices importados (Importar lote)
- [ ] Widgets Public / acesso anônimo liberado
- [ ] Teste de regressão OK
