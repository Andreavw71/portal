# Painel Administrativo — Atualização mensal de índices na virada do mês

Widget **`itcd_admin`**. Quando o mês vira, o painel **abre um popup bloqueante** exigindo os dois índices **mensais** antes de liberar o uso:

- **SELIC Mensal do mês anterior** (a que realmente entra no cálculo);
- **UPF Mensal do mês corrente**.

Enquanto os dois não forem salvos, **o painel permanece bloqueado**. A SELIC do mês corrente é fixada em `1,00` automaticamente e **bloqueada** no formulário (o simulador nunca a lê).

> Exemplo: como a UPF é **mensal**, em julho o popup **não** abre (julho já tem UPF). No **1º de agosto** ele abre pedindo **SELIC mensal de julho** + **UPF de agosto**.

## Como aplicar (recomendado: arquivos completos)
Os 4 blocos já vêm prontos neste repositório — **Ctrl+A → colar** em cada painel do Widget Editor do `itcd_admin`:

| Arquivo | Painel |
|---|---|
| `itcd_admin - 1 HTML Template (completo).html` | HTML Template |
| `itcd_admin - 2 CSS-SCSS (completo).css` | CSS - SCSS |
| `itcd_admin - 3 Client Script (completo).js` | Client Script |
| `itcd_admin - 4 Server Script (completo).js` | Server Script |

Ordem sugerida: Server → Client → HTML → CSS → salvar.

As seções abaixo documentam **o que** foi inserido em cada bloco (caso queira aplicar manualmente sobre uma versão sua).

---

## Por que é seguro (não altera o cálculo do Simulador)
`selicAcumuladaDetalhes` (no Simulador) soma a SELIC **armazenada** apenas dos meses **entre** o vencimento e o mês atual, e para o **mês atual** soma sempre **+1,0 fixo** — **nunca lê** o valor gravado do mês corrente. Por isso gravar `1,00` no mês corrente é inócuo, e é justamente o valor que precisa ser **substituído pela SELIC real** quando o mês vira (o mês corrente de ontem passa a ser lido como “mês anterior”). Daí o popup obrigatório.

---

## 1) Server Script — o que foi inserido

**1a.** Ação `salvarViradaMes` + detecção de virada, **imediatamente antes** de `// ===== Dados para exibição =====`. Grava a UPF do mês corrente e a SELIC do mês anterior; **ambas obrigatórias**:

```javascript
/* AÇÃO: salvar virada de mês (UPF mensal do corrente + SELIC mensal do anterior) — ambos obrigatórios */
if (data.autenticado && input && input.acao === 'salvarViradaMes') {
  try {
    var vMesCorr = (input.mesCorrente || '').toString().trim();
    var vMesAnt  = (input.mesAnterior  || '').toString().trim();
    var vUpf = parseFloat(input.upfCorrente);
    var vSelicAnt = (input.selicAnterior === '' || input.selicAnterior === null || input.selicAnterior === undefined) ? null : parseFloat(input.selicAnterior);
    if (!/^\d{4}-\d{2}$/.test(vMesCorr)) { data.msg = 'Mês corrente inválido.'; data.viradaErro = true; }
    else if (vSelicAnt === null || isNaN(vSelicAnt)) { data.msg = 'Informe a SELIC mensal do mês anterior.'; data.viradaErro = true; }
    else if (isNaN(vUpf) || vUpf <= 0) { data.msg = 'Informe a UPF mensal do mês corrente.'; data.viradaErro = true; }
    else {
      var gCorr = new GlideRecord(TB_IDX);
      gCorr.addQuery('u_mes', vMesCorr); gCorr.query();
      if (gCorr.next()) {
        gCorr.setValue('u_valor', vUpf);
        var sCorrAtual = gCorr.getValue('u_selic');
        if (sCorrAtual === '' || sCorrAtual === null) gCorr.setValue('u_selic', 1);
        gCorr.update();
      } else {
        var giC = new GlideRecord(TB_IDX);
        giC.initialize();
        giC.setValue('u_mes', vMesCorr);
        giC.setValue('u_valor', vUpf);
        giC.setValue('u_selic', 1);
        giC.insert();
      }
      if (/^\d{4}-\d{2}$/.test(vMesAnt)) {
        var gAnt = new GlideRecord(TB_IDX);
        gAnt.addQuery('u_mes', vMesAnt); gAnt.query();
        if (gAnt.next()) { gAnt.setValue('u_selic', vSelicAnt); gAnt.update(); }
      }
      data.msg = 'Índices atualizados: UPF de ' + vMesCorr + ' e SELIC de ' + vMesAnt + '.';
      data.viradaOk = true;
    }
  } catch (eV) { data.msg = 'Erro ao atualizar virada de mês: ' + eV; data.viradaErro = true; }
}

/* Detecção de virada de mês (só dispara quando o mês vira) + SELIC 1,00 no mês corrente */
data.novoMes = false;
data.mesCorrente = '';
data.mesAnterior = '';
data.upfSugerida = null;
if (data.autenticado) {
  try {
    var _ym = gs.nowDateTime().slice(0, 7);
    var _y = parseInt(_ym.slice(0, 4), 10), _m = parseInt(_ym.slice(5, 7), 10);
    var _pm = _m - 1, _py = _y; if (_pm < 1) { _pm = 12; _py -= 1; }
    var _ymPrev = _py + '-' + (_pm < 10 ? '0' + _pm : '' + _pm);
    data.mesCorrente = _ym;
    data.mesAnterior = _ymPrev;
    var gCur = new GlideRecord(TB_IDX);
    gCur.addQuery('u_mes', _ym); gCur.query();
    var _upfCur = null, _existe = false;
    if (gCur.next()) { _existe = true; _upfCur = parseFloat(gCur.getValue('u_valor')); }
    if (!_existe) {
      var giNew = new GlideRecord(TB_IDX);
      giNew.initialize();
      giNew.setValue('u_mes', _ym);
      giNew.setValue('u_selic', 1);
      giNew.insert();
      _upfCur = null;
    }
    // Bloqueia (popup) enquanto a UPF mensal do mês corrente não estiver informada
    data.novoMes = !(_upfCur > 0);
    var gPrev = new GlideRecord(TB_IDX);
    gPrev.addQuery('u_mes', _ymPrev); gPrev.query();
    if (gPrev.next()) { data.upfSugerida = parseFloat(gPrev.getValue('u_valor')) || null; }
  } catch (eR) {}
}
```

**1b.** Salvaguarda na ação `addIndice` — logo após `var selic = ...;`:

```javascript
      // SELIC do mês corrente é sempre 1,00 (o simulador não a lê)
      if (mes === gs.nowDateTime().slice(0, 7)) { selic = 1; }
```

---

## 2) Client Script — o que foi inserido

**2a.** Antes da última linha `};` do controller:

```javascript
  /* Virada de mês: popup bloqueante (SELIC mensal anterior + UPF mensal corrente) */
  c.popupVirada = false;
  c.viradaMsg = '';
  c.virada = { upf: null, selic: null };
  c.syncVirada = function() {
    c.popupVirada = !!(c.data && c.data.novoMes);
    c.viradaMsg = '';
    c.virada = { upf: null, selic: null };
  };
  c.salvarViradaMes = function() {
    c.viradaMsg = '';
    var sel = (c.virada.selic === '' || c.virada.selic === null || c.virada.selic === undefined) ? NaN : parseFloat(c.virada.selic);
    var upf = parseFloat(c.virada.upf);
    if (isNaN(sel)) { c.viradaMsg = 'Informe a SELIC mensal do mês anterior.'; return; }
    if (isNaN(upf) || upf <= 0) { c.viradaMsg = 'Informe a UPF mensal do mês corrente.'; return; }
    c.data.acao = 'salvarViradaMes';
    c.data.senha = c.senha;
    c.data.upfCorrente = c.virada.upf;
    c.data.selicAnterior = c.virada.selic;
    c.server.update().then(function() {
      if (c.data.viradaOk) { c.popupVirada = false; }
      else if (c.data.viradaErro && c.data.msg) { c.viradaMsg = c.data.msg; }
    });
  };
  c.syncVirada();
```

**2b.** Em `c.entrar`, no `.then`, após `c.erroLogin = !c.data.autenticado;`:

```javascript
      c.syncVirada();   // abre o popup se o mês virou
```

---

## 3) HTML Template — o que foi inserido

**3a.** Popup logo **após** `<div ng-if="c.data.autenticado">` (bloqueia o painel; sem botão “Adiar”):

```html
    <!-- POPUP: virada de mês — BLOQUEIA o painel até salvar os dois índices -->
    <div class="itcd-modal-overlay" ng-if="c.popupVirada">
      <div class="itcd-modal" role="dialog" aria-modal="true" aria-labelledby="mv-titulo">
        <div class="mv-icone" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
        <h3 id="mv-titulo">Novo mês detectado: {{c.data.mesCorrente}}</h3>
        <p class="mv-texto">Para manter os cálculos corretos, informe os índices mensais abaixo:</p>
        <div class="mv-campo">
          <label>SELIC Mensal de {{c.data.mesAnterior}} (%) <span class="mv-req">*</span></label>
          <input type="number" step="0.01" ng-model="c.virada.selic" placeholder="Ex: 1.10">
        </div>
        <div class="mv-campo">
          <label>UPF Mensal de {{c.data.mesCorrente}} (R$) <span class="mv-req">*</span></label>
          <input type="number" step="0.01" ng-model="c.virada.upf" placeholder="Ex: 265.00" ng-keyup="$event.keyCode === 13 && c.salvarViradaMes()">
          <span class="mv-hint" ng-if="c.data.upfSugerida">UPF do mês anterior: R$ {{c.fmt(c.data.upfSugerida)}} (repita se não houver reajuste anual).</span>
        </div>
        <div class="mv-msg" ng-if="c.viradaMsg" role="alert">{{c.viradaMsg}}</div>
        <div class="mv-acoes">
          <button class="btn-adm mv-salvar" ng-click="c.salvarViradaMes()">Salvar e continuar</button>
        </div>
        <p class="mv-nota">Enquanto os índices não forem informados, o Painel permanece bloqueado.</p>
      </div>
    </div>
```

**3b.** Bloqueio da SELIC do mês corrente no formulário de Índices — **substitui** a linha do campo “SELIC do mês (%)”:

```html
<div class="af-campo"><label>SELIC do mês (%)</label>
  <input ng-if="c.novo.mes !== c.data.mesCorrente" type="number" step="0.01" ng-model="c.novo.selic" placeholder="Ex: 1.10">
  <div ng-if="c.novo.mes === c.data.mesCorrente" class="af-fixo">1,00 <span>fixo &middot; n&atilde;o usada no c&aacute;lculo</span></div>
</div>
```

---

## 4) CSS - SCSS — o que foi acrescentado

Estilos do popup (`.itcd-modal-overlay`, `.itcd-modal`, `.mv-*`) e do campo travado (`.af-fixo`) — já inclusos no arquivo `itcd_admin - 2 CSS-SCSS (completo).css`.

---

## Como testar
1. Cole os 4 blocos e salve.
2. **Simular a virada:** na aba Índices, remova a linha do mês corrente (ou renomeie para um mês futuro) e recarregue o painel → o popup abre e **bloqueia** o painel.
3. Tente fechar sem preencher → não há como avançar (sem botão Adiar; Salvar exige os dois campos).
4. Informe a SELIC mensal do mês anterior e a UPF mensal do mês corrente → **Salvar e continuar** → popup fecha e a tabela reflete os valores.

> Observação: código de servidor (GlideRecord) validado por **sintaxe** e popup verificado em navegador, mas **não executado** contra instância real — testar em `sefazmtdev` antes de produção. A gravação só ocorre para admin autenticado e é idempotente.

## Observação (risco latente, não é a causa aqui)
`.tooltip-box` do Simulador usa `max-width: min(300px, 74vw)`. Compiladores SCSS antigos (libsass) podem falhar ao misturar `px`+`vw`. Na sua instância compilou; se um dia a folha “sumir” após colar, troque por `max-width: 300px`.
