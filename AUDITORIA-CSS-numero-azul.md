# Auditoria CSS — escala A+/A- “irregular” (Widget `simulador_itcd`, ServiceNow)

**Sintoma relatado:** ao usar **+A / −A**, *alguns* textos aumentam (inclusive parte das letras azuis) e outros não. Fica **irregular**. O número azul `.rh-valor` (TOTAL A RECOLHER) é um dos que não mexem.

---

## 1. Causa-raiz (medida no código)

O CSS do widget **mistura dois sistemas de tamanho de fonte**:

| Como o tamanho é definido | Qtde de regras | Escala com A+/A-? |
|---|---:|---|
| `font-size: var(--text-* / --fs-*)` (tokens) | **57** | ✅ sim |
| `font-size: NNpx` (valor fixo no código) | **65** | ❌ **não** |

O botão **+A/−A** só troca o atributo `data-fontsize`, que redefine os **tokens** (`--text-*`). Logo, **apenas os ~57 textos que usam token crescem**; os ~65 com `px` fixo (h1 32px, labels, mini-cards, tooltips, estrelas e o número azul `36px`) ficam parados. Daí a impressão de “irregular”: metade escala, metade não — e algumas letras azuis usam token (escalam) enquanto o número azul usa `px` fixo (não escala).

Confirmado num navegador real: no CSS original, todo elemento com `px` fixo mantém proporção **1.000** em todos os níveis, enquanto os de token crescem.

> Observação: o `.rh-valor` até tinha 2 regras especiais (`[data-fontsize="1"|"2"]`) para crescer, mas nada para o nível `−1`, e ainda assim dependia do mesmo gatilho — era um remendo isolado, não a correção do problema de fundo.

## 2. Correção aplicada — uma escala única para tudo

Em vez de caçar e converter 65 valores `px` um a um (frágil, muda o visual no nível 0 e ainda deixa o crescimento desigual porque os tokens têm razões diferentes entre si), a correção aplica **um único fator de escala no widget inteiro via `zoom`** — técnica que **este mesmo CSS já usa** (a impressão usa `zoom: 0.65`). Assim **100% do texto** (token ou `px`) cresce/diminui pela **mesma proporção**.

**Diff (3 blocos alterados, no painel CSS - SCSS):**

```css
/* (a) REMOVER os dois remendos do número azul: */
- .itcd-sim[data-fontsize="1"] .rh-valor { font-size: 42px !important; }
- .itcd-sim[data-fontsize="2"] .rh-valor { font-size: 48px !important; }

/* (b) SUBSTITUIR os três blocos que só reescalavam os tokens: */
- .itcd-sim[data-fontsize="-1"] { --text-xs: 15px; ... --fs-p65: 21.5px; }
- .itcd-sim[data-fontsize="1"]  { --text-xs: 18px; ... --fs-p65: 24.5px; }
- .itcd-sim[data-fontsize="2"]  { --text-xs: 19px; ... --fs-p65: 25.5px; }
/* por uma escala global: */
+ .itcd-sim[data-fontsize="-1"] { zoom: 0.9; }
+ .itcd-sim[data-fontsize="1"]  { zoom: 1.12; }
+ .itcd-sim[data-fontsize="2"]  { zoom: 1.24; }

/* (c) ADICIONAR no fim, para a impressão não somar as duas escalas: */
+ @media print { .itcd-sim[data-fontsize="-1"], .itcd-sim[data-fontsize="1"], .itcd-sim[data-fontsize="2"] { zoom: 1 !important; } }
```

Nada muda no HTML, Client ou Server. Os tokens continuam existindo com os valores do nível 0, então **o visual padrão (sem A+/A-) fica idêntico** ao atual.

### Verificação no navegador (proporção da altura renderizada vs. nível 0)

Elementos de tipos diferentes — `h1` (32px fixo), label (12px fixo), **número azul** (36px fixo), mini-card (16px fixo) e botão (token) — todos passam a escalar **juntos**:

| Nível | h1 | label | nº azul | mini-card | botão |
|---|---|---|---|---|---|
| −1 | 0.91 | 0.90 | 0.90 | 0.90 | 0.90 |
| 0  | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 |
| +1 | 1.13 | 1.12 | 1.12 | 1.12 | 1.12 |
| +2 | 1.24 | 1.24 | 1.24 | 1.24 | 1.24 |

Também verificado: numa coluna de largura fixa (como a do Service Portal) o `zoom` **não** gera barra de rolagem horizontal — o conteúdo reflui dentro da coluna (o widget já tem `overflow-x: hidden`).

## 3. Responsividade dos cards no celular

Auditei também o comportamento no celular (render real a 360px e 414px). Dois problemas:

1. **Ordem de origem no CSS derrubava overrides.** Havia um bloco `@media (max-width: 640px)` *antes* das definições-base dos componentes. Como têm a mesma especificidade, a definição-base (mais abaixo no arquivo) vencia — vários ajustes de celular simplesmente não pegavam. Corrigido movendo os ajustes para um bloco `@media` **no fim do arquivo**.
2. **Conectores dos mini-cards quebravam.** No desktop os 3 cards do resumo formam uma equação horizontal `[Base] → [Imposto] + [Multa]`. No celular eles empilham, mas as setas `→` e `+` ficavam órfãs à direita, com espaço morto.

**Correção (bloco novo no fim, só afeta ≤ 640px):**
- mini-cards empilham em **coluna, largura total**, com padding menor;
- os conectores ficam **centralizados entre os cards**, e a seta gira 90° (aponta para baixo ↓), lendo como equação vertical;
- o card **“Avalie o Simulador”** passa a ocupar a **linha inteira**;
- cabeçalho mais compacto (menos margem).

Verificado: **sem rolagem horizontal** a 360/414px; o desktop **não muda** (mini-cards continuam em linha). O `zoom` da acessibilidade e a responsividade convivem sem conflito.

## 4. Alinhamentos (desktop)

Três ajustes pedidos, todos verificados por render real:
- **(a)** O estado vazio (“Sua simulação aparecerá aqui”) desce para o **ícone ficar alinhado ao centro do card “Herança”** da 1ª coluna (`.empty-state { margin-top: 71px }`; medido: ícone e centro do card na mesma linha, delta 0px). Só afeta o desktop (2 colunas).
- **(b)** Os cabeçalhos de etapa **1** e **2** dos cards de entrada ficam **centralizados** (`.card-etapa { justify-content: center; text-align: center }`).
- **(c)** O botão **Simular imposto** fica **centralizado** (`.area-acoes.acoes-linha { justify-content: center }`).

## 5. Responsividade — demais seções no celular

- **Cards de opção (Herança/Doação):** já empilham corretamente; sem alteração necessária.
- **Tabelas (“Como o imposto foi calculado” e encargos):** o modo empilhado (`data-label`) já existia. Corrigidos dois pontos a ≤ 768px: o **cabeçalho oculto deixava uma faixa vazia** (`thead { display: none }`) e as **células sem valor** da linha ITCD deixavam rótulos órfãos (`td:empty { display: none }`).
- **Abas do detalhamento:** os botões “Como o imposto foi calculado” / “Multa e juros por atraso” **quebravam em 4–5 linhas** no celular. A ≤ 640px ficam compactos (`font-size: 13px`, padding menor, `flex: 1 1 0`).

Verificado: **sem rolagem horizontal** a 360/414px; desktop inalterado.

## 6. Como aplicar

Arquivo pronto para colar: **`simulador_itcd - CSS-SCSS (corrigido).css`** (neste repositório).
No Widget Editor do `simulador_itcd` → painel **CSS - SCSS** → **Ctrl+A → colar → Ctrl+S**. Carimbo esperado após colar: `VERSAO_CSS_SIMULADOR: 2026-07-17-R64`.

## 7. Observação (risco latente, não é a causa aqui)

`.tooltip-box`: `max-width: min(300px, 74vw)`. Compiladores SCSS antigos (libsass) tratam `min()`/`max()` como função Sass e podem falhar ao misturar `px`+`vw`. Na sua instância isso compilou (o widget está estilizado), então **não é a causa** — mas se um dia a folha inteira “sumir” após colar, troque por `max-width: 300px`.
