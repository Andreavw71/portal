# Auditoria CSS — “o número em azul não aumenta” (Widget `simulador_itcd`, ServiceNow)

**Elemento:** `.rh-valor` — o total em azul (`R$ 34.133,44`) no card **TOTAL A RECOLHER · ESTIMATIVA**.
**Sintoma:** ao usar os botões de acessibilidade **+A / -A**, o resto do texto muda de tamanho, mas o número azul continua igual.

---

## 1. O que foi verificado

As regras atuais do número azul (bloco *Hero do total* do CSS do simulador):

```css
.itcd-sim .rh-valor { font-size: 36px !important; font-weight: 800 !important; color: var(--color-primary, #2A66D9) !important; line-height: 1.2 !important; }
.itcd-sim[data-fontsize="1"] .rh-valor { font-size: 42px !important; }
.itcd-sim[data-fontsize="2"] .rh-valor { font-size: 48px !important; }
```

Testado num navegador real (medindo o `font-size` computado ao alternar `data-fontsize`):

| `data-fontsize` | `.rh-valor` |
|---|---|
| (nenhum) | 36px |
| `-1`      | 36px  ← **não diminui** |
| `1`       | 42px |
| `2`       | 48px |

**Conclusão:** o bloco de regras está correto num navegador comum — o número *cresce* para 42/48px. Portanto o defeito **não** é a cor nem o `!important`.

## 2. Causa-raiz

O número azul é **o único texto escalável que NÃO usa o sistema de variáveis de fonte** do widget.

- Todo o resto do texto escala por **custom properties herdadas** (`--text-*`, `--fs-*`), redefinidas em
  `.itcd-sim[data-fontsize="-1|1|2"] { --text-base: …; … }`. Como as variáveis são declaradas em `.itcd-sim` e **herdam para todos os descendentes**, basta o atributo `data-fontsize` existir no elemento raiz para tudo re-resolver.
- O `.rh-valor` depende de **duas regras especiais com combinador descendente** (`.itcd-sim[data-fontsize="1"] .rh-valor`), separadas do sistema de variáveis.

Isso cria exatamente o sintoma relatado: **se, no build do ServiceNow, essas duas linhas especiais faltarem, se perderem no Ctrl+A→colar, ou forem de uma versão anterior — enquanto os blocos de variáveis continuam intactos — todo o texto cresce e só o número azul fica travado em 36px.** É o caso mais provável de divergência entre o HTML avulso (que funciona) e o widget no ServiceNow.

Problema secundário confirmado no teste: no nível `-1` o número **não diminui** (não há regra para `-1`), ficando inconsistente com o resto.

## 3. Correção (acoplar o número ao mesmo sistema de variáveis)

A correção elimina a fragilidade: o número passa a escalar pela **mesma variável herdada** que todo o resto. Se qualquer texto crescer no ServiceNow, o número cresce junto.

**a) No bloco base de tipografia `.itcd-sim { … }`** (linha do `--text-3xl`), adicionar o token:

```css
--text-3xl: 35px; --fs-total: 36px;
```

**b) No bloco *Hero do total*** — trocar o valor fixo por variável e **remover** as duas regras especiais:

```css
/* ANTES */
.itcd-sim .rh-valor { font-size: 36px !important; font-weight: 800 !important; color: var(--color-primary, #2A66D9) !important; line-height: 1.2 !important; }
.itcd-sim[data-fontsize="1"] .rh-valor { font-size: 42px !important; }
.itcd-sim[data-fontsize="2"] .rh-valor { font-size: 48px !important; }

/* DEPOIS */
.itcd-sim .rh-valor { font-size: var(--fs-total, 36px) !important; font-weight: 800 !important; color: var(--color-primary, #2A66D9) !important; line-height: 1.2 !important; }
```

**c) Nos três blocos de nível de fonte** (`/* ===== Níveis de tamanho de texto ===== */`), adicionar `--fs-total` no início de cada um:

```css
.itcd-sim[data-fontsize="-1"] { --fs-total: 32px; --text-xs: 15px; … }
.itcd-sim[data-fontsize="1"]  { --fs-total: 42px; --text-xs: 18px; … }
.itcd-sim[data-fontsize="2"]  { --fs-total: 48px; --text-xs: 19px; … }
```

### Resultado após a correção (medido no navegador)

| `data-fontsize` | `.rh-valor` |
|---|---|
| (nenhum) | 36px |
| `-1`      | **32px** (agora diminui) |
| `1`       | 42px |
| `2`       | 48px |

## 4. Observação adicional (risco latente, não é a causa aqui)

Linha da `.tooltip-box`: `max-width: min(300px, 74vw)`. Compiladores SCSS antigos (libsass) tratam `min()`/`max()` como funções Sass e podem falhar ao misturar unidades (`px` + `vw`). No ServiceNow atual isso compilou (o widget está estilizado na tela), então **não é a causa** do número não crescer — mas, se um dia a folha inteira “sumir” após colar, troque por um valor fixo (ex.: `max-width: 300px`) para eliminar o risco.

---

**Como aplicar:** no Widget Editor do `simulador_itcd`, painel **CSS - SCSS**, aplicar as 3 edições acima → **Ctrl+S**. Não muda HTML, Client nem Server.
