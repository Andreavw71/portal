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

## 3. Como aplicar

Arquivo pronto para colar: **`simulador_itcd - CSS-SCSS (corrigido - escala uniforme).css`** (neste repositório).
No Widget Editor do `simulador_itcd` → painel **CSS - SCSS** → **Ctrl+A → colar → Ctrl+S**. Carimbo esperado após colar: `VERSAO_CSS_SIMULADOR: 2026-07-17-R62`.

## 4. Observação (risco latente, não é a causa aqui)

`.tooltip-box`: `max-width: min(300px, 74vw)`. Compiladores SCSS antigos (libsass) tratam `min()`/`max()` como função Sass e podem falhar ao misturar `px`+`vw`. Na sua instância isso compilou (o widget está estilizado), então **não é a causa** — mas se um dia a folha inteira “sumir” após colar, troque por `max-width: 300px`.
