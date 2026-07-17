# Painel Administrativo — Atualização automática da SELIC/UPF na virada do mês

Widget **`itcd_admin`**. Objetivo: quando o mês vira, o painel **lança SELIC 1,00 automaticamente** no mês corrente e **abre um popup** pedindo (a) a **SELIC consolidada do mês anterior** e (b) a **UPF do mês corrente** (obrigatória).

## Por que funciona sem quebrar o cálculo
No simulador, `selicAcumuladaDetalhes` soma a SELIC **armazenada** apenas dos meses **entre** o vencimento e o mês atual, e para o **mês atual** soma sempre **+1,0** fixo (nunca lê o valor gravado do mês corrente). Portanto, gravar `1,00` no mês corrente é inócuo — e é exatamente o valor que precisa ser **substituído pela SELIC real** assim que o mês vira (o mês corrente de ontem passa a ser lido como “mês passado” nos cálculos). Daí o popup.

Decisões adotadas: **UPF do mês corrente fica em branco** e o popup **exige** o preenchimento; **popup interativo** com botão Salvar (grava os dois meses de uma vez); a **SELIC do mês corrente é bloqueada** no formulário de Índices (sempre 1,00, pois o simulador não a lê). O popup pede apenas **UPF do mês corrente** + **SELIC do mês anterior**.

São **4 blocos** do widget `itcd_admin`. Nada aqui reescreve o widget inteiro — são inserções pontuais.

---

## 1) Server Script (Bloco 4)

**Onde:** cole os **dois blocos** abaixo **imediatamente antes** da linha `// ===== Dados para exibição =====`.

```javascript
/* ===== [NOVO] AÇÃO: salvar virada de mês (UPF do mês corrente + SELIC do mês anterior) ===== */
if (data.autenticado && input && input.acao === 'salvarViradaMes') {
  try {
    var vMesCorr = (input.mesCorrente || '').toString().trim();
    var vMesAnt  = (input.mesAnterior  || '').toString().trim();
    var vUpf = parseFloat(input.upfCorrente);
    var vSelicAnt = (input.selicAnterior === '' || input.selicAnterior === null || input.selicAnterior === undefined) ? null : parseFloat(input.selicAnterior);
    if (!/^\d{4}-\d{2}$/.test(vMesCorr)) { data.msg = 'Mês corrente inválido.'; data.viradaErro = true; }
    else if (isNaN(vUpf) || vUpf <= 0) { data.msg = 'Informe a UPF do mês corrente (obrigatória).'; data.viradaErro = true; }
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
      if (vSelicAnt !== null && !isNaN(vSelicAnt) && /^\d{4}-\d{2}$/.test(vMesAnt)) {
        var gAnt = new GlideRecord(TB_IDX);
        gAnt.addQuery('u_mes', vMesAnt); gAnt.query();
        if (gAnt.next()) { gAnt.setValue('u_selic', vSelicAnt); gAnt.update(); }
      }
      data.msg = 'Índices atualizados: UPF de ' + vMesCorr + (vSelicAnt !== null ? ' e SELIC de ' + vMesAnt : '') + '.';
      data.viradaOk = true;
    }
  } catch (eV) { data.msg = 'Erro ao atualizar virada de mês: ' + eV; data.viradaErro = true; }
}

/* ===== [NOVO] Detecção de virada de mês + lançamento automático de SELIC 1,00 ===== */
data.novoMes = false;
data.mesCorrente = '';
data.mesAnterior = '';
data.selicAnteriorAtual = null;
data.upfSugerida = null;
if (data.autenticado) {
  try {
    var _ym = gs.nowDateTime().slice(0, 7);                 // 'AAAA-MM'
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
      // Mês virou: cria a linha do mês corrente com SELIC 1,00 (UPF em branco)
      var giNew = new GlideRecord(TB_IDX);
      giNew.initialize();
      giNew.setValue('u_mes', _ym);
      giNew.setValue('u_selic', 1);
      giNew.insert();
      _upfCur = null;
    }
    // O popup reaparece enquanto a UPF do mês corrente estiver em branco/zero
    data.novoMes = !(_upfCur > 0);

    var gPrev = new GlideRecord(TB_IDX);
    gPrev.addQuery('u_mes', _ymPrev); gPrev.query();
    if (gPrev.next()) {
      var _sPrev = gPrev.getValue('u_selic');
      data.selicAnteriorAtual = (_sPrev === '' || _sPrev === null) ? null : (parseFloat(_sPrev) || 0);
      data.upfSugerida = parseFloat(gPrev.getValue('u_valor')) || null;
    }
  } catch (eR) {}
}
```

> Observação: `TB_IDX` já existe no topo do server (`'u_ndice_upf_e_selic'`). Os blocos usam as mesmas variáveis do widget.

---

## 2) Client Script (Bloco 3)

**2a.** Cole este bloco **antes da última linha** `};` do controller (fim de `api.controller`):

```javascript
  /* ===== [NOVO] Virada de mês: popup de atualização de índices ===== */
  c.popupVirada = false;
  c.viradaMsg = '';
  c.virada = { upf: null, selic: null };
  c.syncVirada = function() {
    c.popupVirada = !!(c.data && c.data.novoMes);
    c.viradaMsg = '';
    c.virada = { upf: null, selic: (c.data && c.data.selicAnteriorAtual != null) ? c.data.selicAnteriorAtual : null };
  };
  c.salvarViradaMes = function() {
    c.viradaMsg = '';
    if (!c.virada.upf || parseFloat(c.virada.upf) <= 0) { c.viradaMsg = 'Informe a UPF do mês corrente.'; return; }
    c.data.acao = 'salvarViradaMes';
    c.data.senha = c.senha;
    c.data.upfCorrente = c.virada.upf;
    c.data.selicAnterior = (c.virada.selic === '' || c.virada.selic === undefined) ? null : c.virada.selic;
    c.server.update().then(function() {
      if (c.data.viradaOk) { c.popupVirada = false; }
      else if (c.data.viradaErro && c.data.msg) { c.viradaMsg = c.data.msg; }
    });
  };
  c.adiarVirada = function() { c.popupVirada = false; };
  c.syncVirada();
```

**2b.** Dentro de `c.entrar`, no `.then`, adicione `c.syncVirada();` logo após `c.erroLogin = !c.data.autenticado;`:

```javascript
    c.server.update().then(function() {
      c.erroLogin = !c.data.autenticado;
      c.syncVirada();               // <-- ADICIONAR: abre o popup se o mês virou
    });
```

---

## 3) HTML Template (Bloco 1)

**Onde:** cole logo **após** a linha `<div ng-if="c.data.autenticado">`.

```html
    <!-- ===== [NOVO] POPUP: virada de mês (atualização de índices) ===== -->
    <div class="itcd-modal-overlay" ng-if="c.popupVirada">
      <div class="itcd-modal" role="dialog" aria-modal="true" aria-labelledby="mv-titulo">
        <div class="mv-icone" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
        <h3 id="mv-titulo">Novo m&ecirc;s detectado: {{c.data.mesCorrente}}</h3>
        <p class="mv-texto">Lancei <strong>SELIC 1,00</strong> (provis&oacute;ria) para o m&ecirc;s corrente. Para manter os c&aacute;lculos corretos, atualize os &iacute;ndices abaixo:</p>
        <div class="mv-campo">
          <label>SELIC consolidada de {{c.data.mesAnterior}} (%)</label>
          <input type="number" step="0.01" ng-model="c.virada.selic" placeholder="Ex: 1.10">
          <span class="mv-hint">Substitua o 1,00 provis&oacute;rio pelo valor real do Sicalc do m&ecirc;s anterior.</span>
        </div>
        <div class="mv-campo">
          <label>UPF de {{c.data.mesCorrente}} (R$) <span class="mv-req">*</span></label>
          <input type="number" step="0.01" ng-model="c.virada.upf" placeholder="Ex: 265.00" ng-keyup="$event.keyCode === 13 && c.salvarViradaMes()">
          <span class="mv-hint" ng-if="c.data.upfSugerida">UPF do m&ecirc;s anterior: R$ {{c.fmt(c.data.upfSugerida)}} (repita se n&atilde;o houver reajuste anual).</span>
        </div>
        <div class="mv-msg" ng-if="c.viradaMsg" role="alert">{{c.viradaMsg}}</div>
        <div class="mv-acoes">
          <button class="btn-adm mv-salvar" ng-click="c.salvarViradaMes()">Salvar</button>
          <button class="mv-adiar" ng-click="c.adiarVirada()">Adiar</button>
        </div>
        <p class="mv-nota">Enquanto a UPF do m&ecirc;s corrente n&atilde;o for informada, este aviso reaparecer&aacute; ao abrir o painel.</p>
      </div>
    </div>
```

---

## 4) CSS - SCSS (Bloco 2)

**Onde:** cole no **final** do CSS do painel admin.

```css
/* ===== [NOVO] Popup de virada de mês (índices) ===== */
.itcd-admin .itcd-modal-overlay { position: fixed; inset: 0; background: rgba(16,24,40,.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; box-sizing: border-box; }
.itcd-admin .itcd-modal { background: #fff; border-radius: 12px; max-width: 460px; width: 100%; padding: 26px 26px 20px; box-shadow: 0 16px 48px rgba(16,24,40,.28); box-sizing: border-box; }
.itcd-admin .mv-icone { width: 48px; height: 48px; border-radius: 50%; background: #F3F7FE; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.itcd-admin .mv-icone svg { width: 26px; height: 26px; stroke: #2A66D9; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.itcd-admin .itcd-modal h3 { margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #101828; }
.itcd-admin .mv-texto { margin: 0 0 18px; font-size: 15px; line-height: 1.5; color: #4A5565; }
.itcd-admin .mv-texto strong { color: #2A66D9; }
.itcd-admin .mv-campo { margin-bottom: 16px; }
.itcd-admin .mv-campo label { display: block; font-size: 14px; font-weight: 600; color: #364153; margin-bottom: 6px; }
.itcd-admin .mv-req { color: #DC2626; }
.itcd-admin .mv-campo input { width: 100%; box-sizing: border-box; height: 44px; padding: 0 14px; font-size: 16px; color: #101828; border: 1px solid #D1D5DC; border-radius: 8px; outline: none; }
.itcd-admin .mv-campo input:focus { border-color: #2A66D9; box-shadow: 0 0 0 3px rgba(42,102,217,.18); }
.itcd-admin .mv-hint { display: block; margin-top: 5px; font-size: 12.5px; color: #6A7282; line-height: 1.45; }
.itcd-admin .mv-msg { margin: 0 0 12px; font-size: 13.5px; font-weight: 600; color: #B91C1C; }
.itcd-admin .mv-acoes { display: flex; gap: 10px; align-items: center; margin-top: 4px; }
.itcd-admin .mv-salvar { flex: 1; }
.itcd-admin .mv-adiar { height: 44px; padding: 0 16px; background: #fff; color: #4A5565; border: 1px solid #D1D5DC; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
.itcd-admin .mv-nota { margin: 14px 0 0; font-size: 12px; color: #6A7282; line-height: 1.45; }
```

> Se o painel admin já tiver um `.btn-adm` (tem), o botão **Salvar** reaproveita esse estilo.

---

## 5) Bloquear a SELIC do mês corrente (aba Índices)

Como o simulador **nunca lê** a SELIC do mês corrente (usa sempre +1,0 fixo), esse campo é bloqueado para evitar edição inútil. O **popup continua pedindo os dois valores que importam**: **UPF do mês corrente** e **SELIC do mês anterior** (não há campo de SELIC do mês corrente no popup).

**5a. HTML (Bloco 1)** — na aba Índices, **substitua** a linha do campo “SELIC do mês (%)” do formulário `adm-form`:

```html
<!-- ANTES -->
<div class="af-campo"><label>SELIC do mês (%)</label><input type="number" step="0.01" ng-model="c.novo.selic" placeholder="Ex: 1.10"></div>

<!-- DEPOIS -->
<div class="af-campo"><label>SELIC do mês (%)</label>
  <input ng-if="c.novo.mes !== c.data.mesCorrente" type="number" step="0.01" ng-model="c.novo.selic" placeholder="Ex: 1.10">
  <div ng-if="c.novo.mes === c.data.mesCorrente" class="af-fixo">1,00 <span>fixo &middot; n&atilde;o usada no c&aacute;lculo</span></div>
</div>
```

**5b. Server (Bloco 4)** — dentro da ação `addIndice`, logo **após** a linha `var selic = ...;`, adicione a salvaguarda (garante 1,00 mesmo que alguém burle a UI):

```javascript
      // [NOVO] SELIC do mês corrente é sempre 1,00 (o simulador não a lê)
      if (mes === gs.nowDateTime().slice(0, 7)) { selic = 1; }
```

**5c. CSS (Bloco 2)** — acrescente o estilo do campo travado:

```css
.itcd-admin .af-fixo { height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 12px; box-sizing: border-box; background: #F3F4F6; border: 1px dashed #D1D5DC; border-radius: 8px; color: #6A7282; font-size: 15px; font-weight: 700; }
.itcd-admin .af-fixo span { font-weight: 400; font-size: 12px; line-height: 1.25; }
```

---

## Como testar
1. Cole os 4 blocos e salve o widget.
2. **Simular a virada:** na aba Índices, **remova** a linha do mês corrente (ou renomeie para um mês futuro). Recarregue o painel → o popup deve abrir e a linha do mês corrente reaparece com SELIC 1,00.
3. Preencha a UPF (obrigatória) e, se quiser, a SELIC consolidada do mês anterior → **Salvar** → popup fecha e a tabela reflete os valores.
4. Clique **Adiar** sem preencher a UPF → ao recarregar, o popup volta.

> Observação honesta: este é código de servidor ServiceNow (GlideRecord) — validei a **sintaxe** e o **popup em navegador**, mas não pude executá-lo contra uma instância real. Recomendo testar em `sefazmtdev` antes de subir para produção. O ponto mais sensível é a gravação automática ao abrir o painel: ela só ocorre para admin autenticado e é idempotente (só insere se a linha do mês não existir).
