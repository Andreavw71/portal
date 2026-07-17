(function() {
  var TB_IDX = 'u_ndice_upf_e_selic';        // índices UPF/SELIC
  var TB_SIM = 'u_itcd_simulacao';   // log de simulações
  var TB_AVA = 'u_u_itcd_avaliacao';   // avaliações

  // ===== Controle de acesso por SENHA (verificada no servidor) =====
  // RECOMENDADO: definir a senha na System Property 'x_itcd.admin_senha'.
  // Enquanto a property não existir, usa o padrão abaixo — TROQUE antes de publicar.
  var SENHA = gs.getProperty('x_itcd.admin_senha', 'ALTERE_ESTA_SENHA');
  data.autenticado = !!(input && input.senha != null && String(input.senha) === String(SENHA));
  data.msg = '';

  function contar(tb) {
    try { var g = new GlideAggregate(tb); g.addAggregate('COUNT'); g.query(); if (g.next()) return parseInt(g.getAggregate('COUNT'), 10) || 0; } catch (e) {}
    return 0;
  }

  function carregarIndices() {
    var lista = [];
    try {
      var gr = new GlideRecord(TB_IDX);
      gr.orderByDesc('u_mes');
      gr.setLimit(700);
      gr.query();
      while (gr.next()) {
        var sel = gr.getValue('u_selic');
        lista.push({
          sysId: gr.getUniqueValue(),
          mes: gr.getValue('u_mes'),
          upf: parseFloat(gr.getValue('u_valor')) || 0,
          selic: (sel === null || sel === '') ? null : (parseFloat(sel) || 0)
        });
      }
    } catch (e) {}
    return lista;
  }

  function carregarSimulacoes() {
    var lista = [];
    try {
      var gr = new GlideRecord(TB_SIM);
      gr.orderByDesc('sys_created_on');
      gr.setLimit(600);
      gr.query();
      while (gr.next()) {
        var disp = gr.getValue('u_dispensa'), suc = gr.getValue('u_sucessiva');
        lista.push({
          dh: gr.getDisplayValue('sys_created_on'),
          tipo: gr.getValue('u_tipo_fato'),
          valor: parseFloat(gr.getValue('u_valor')) || 0,
          imposto: parseFloat(gr.getValue('u_imposto')) || 0,
          multa: parseFloat(gr.getValue('u_multa')) || 0,
          juros: parseFloat(gr.getValue('u_juros')) || 0,
          total: parseFloat(gr.getValue('u_total')) || 0,
          dispensa: (disp == '1' || disp == 'true'),
          sucessiva: (suc == '1' || suc == 'true'),
          qtdDoacoes: parseInt(gr.getValue('u_qtd_doacoes'), 10) || 0,
          dataFato: gr.getValue('u_data_fato'),
          dataRef: gr.getValue('u_data_referencia'),
          doacoes: gr.getValue('u_doacoes'),
          blocos: gr.getValue('u_blocos')
        });
      }
    } catch (e) {}
    return lista;
  }

  function carregarAvaliacoes() {
    var lista = [];
    try {
      var gr = new GlideRecord(TB_AVA);
      gr.orderByDesc('sys_created_on');
      gr.setLimit(600);
      gr.query();
      while (gr.next()) {
        lista.push({
          dh: gr.getDisplayValue('sys_created_on'),
          estrelas: parseInt(gr.getValue('u_estrelas'), 10) || 0,
          comentario: gr.getValue('u_comentario')
        });
      }
    } catch (e) {}
    return lista;
  }

  function mediaEstrelas() {
    try {
      var ga = new GlideAggregate(TB_AVA);
      ga.addAggregate('COUNT'); ga.addAggregate('AVG', 'u_estrelas');
      ga.query();
      if (ga.next()) {
        var n = parseInt(ga.getAggregate('COUNT'), 10) || 0;
        var m = parseFloat(ga.getAggregate('AVG', 'u_estrelas'));
        return { total: n, media: isNaN(m) ? 0 : Math.round(m * 10) / 10 };
      }
    } catch (e) {}
    return { total: 0, media: 0 };
  }

  // ===== AÇÕES (somente admin) =====
  if (data.autenticado && input && input.acao === 'addIndice') {
    try {
      var mes = (input.mes || '').toString().trim();
      var upf = parseFloat(input.upf);
      var selicRaw = input.selic;
      var selic = (selicRaw === '' || selicRaw === null || selicRaw === undefined) ? null : parseFloat(selicRaw);
      // SELIC do mês corrente é sempre 1,00 (o simulador não a lê)
      if (mes === new GlideDate().getValue().slice(0, 7)) { selic = 1; }
      if (!/^\d{4}-\d{2}$/.test(mes)) { data.msg = 'Mês inválido — use o formato AAAA-MM (ex: 2026-08).'; }
      else if (isNaN(upf)) { data.msg = 'UPF inválida.'; }
      else {
        var gr = new GlideRecord(TB_IDX);
        gr.addQuery('u_mes', mes);
        gr.query();
        if (gr.next()) {
          gr.setValue('u_valor', upf);
          if (selic !== null && !isNaN(selic)) gr.setValue('u_selic', selic);
          gr.update();
          data.msg = 'Índice de ' + mes + ' atualizado (UPF ' + upf + (selic !== null ? ', SELIC ' + selic + '%' : '') + ').';
        } else {
          var gi = new GlideRecord(TB_IDX);
          gi.initialize();
          gi.setValue('u_mes', mes);
          gi.setValue('u_valor', upf);
          if (selic !== null && !isNaN(selic)) gi.setValue('u_selic', selic);
          gi.insert();
          data.msg = 'Índice de ' + mes + ' incluído (UPF ' + upf + (selic !== null ? ', SELIC ' + selic + '%' : '') + ').';
        }
      }
    } catch (e) { data.msg = 'Erro ao gravar: ' + e; }
  }

  // ===== AÇÃO: IMPORTAR LOTE (texto colado do Excel: Mês <TAB> UPF <TAB> SELIC) =====

  // ===== AÇÃO: ALTERAR SENHA (grava na System Property; cria se não existir) =====
  if (data.autenticado && input && input.acao === 'alterarSenha') {
    var nova = String(input.novaSenha || '');
    if (nova.length < 6) {
      data.okSenha = false;
      data.msgSenha = 'A nova senha deve ter pelo menos 6 caracteres.';
    } else if (nova === String(SENHA)) {
      data.okSenha = false;
      data.msgSenha = 'A nova senha deve ser diferente da atual.';
    } else {
      try {
        gs.setProperty('x_itcd.admin_senha', nova);
        data.okSenha = true;
        data.msgSenha = 'Senha alterada com sucesso. Use a nova senha no próximo acesso.';
      } catch (eSen) {
        data.okSenha = false;
        data.msgSenha = 'Não foi possível gravar a nova senha: ' + eSen;
      }
    }
  }

  if (data.autenticado && input && input.acao === 'importarLote') {
    var inc = 0, atu = 0, erros = [];
    try {
      var linhas = String(input.lote || '').split(/\r?\n/);
      for (var li = 0; li < linhas.length; li++) {
        var lin = linhas[li].trim();
        if (!lin) continue;
        // separa por TAB (Excel) ou, na falta, por ; ou múltiplos espaços
        var cols = lin.indexOf('\t') >= 0 ? lin.split('\t') : lin.split(/;|\s{2,}/);
        if (cols.length < 2) { erros.push('Linha ' + (li+1) + ': esperado Mês, UPF e (opcional) SELIC'); continue; }

        // Mês: aceita AAAA-MM ou MM/AAAA
        var mes = String(cols[0]).trim();
        var mSlash = mes.match(/^(\d{1,2})\/(\d{4})$/);
        if (mSlash) mes = mSlash[2] + '-' + (mSlash[1].length === 1 ? '0' : '') + mSlash[1];
        if (!/^\d{4}-\d{2}$/.test(mes)) { erros.push('Linha ' + (li+1) + ': mês inválido "' + cols[0] + '" (use AAAA-MM ou MM/AAAA)'); continue; }

        // Números: aceita vírgula decimal e pontos de milhar ("1.234,56")
        function num(s){
          s = String(s == null ? '' : s).trim();
          if (s === '') return null;
          if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
          var n = parseFloat(s);
          return isNaN(n) ? NaN : n;
        }
        var upf = num(cols[1]);
        var selic = (cols.length > 2) ? num(cols[2]) : null;
        if (upf === null || isNaN(upf)) { erros.push('Linha ' + (li+1) + ': UPF inválida "' + cols[1] + '"'); continue; }
        if (selic !== null && isNaN(selic)) { erros.push('Linha ' + (li+1) + ': SELIC inválida "' + cols[2] + '"'); continue; }

        var gL = new GlideRecord(TB_IDX);
        gL.addQuery('u_mes', mes);
        gL.query();
        if (gL.next()) {
          gL.setValue('u_valor', upf);
          if (selic !== null) gL.setValue('u_selic', selic);
          gL.update(); atu++;
        } else {
          var gN = new GlideRecord(TB_IDX);
          gN.initialize();
          gN.setValue('u_mes', mes);
          gN.setValue('u_valor', upf);
          if (selic !== null) gN.setValue('u_selic', selic);
          gN.insert(); inc++;
        }
      }
      data.msg = 'Importação: ' + inc + ' incluído(s), ' + atu + ' atualizado(s)' + (erros.length ? ', ' + erros.length + ' erro(s).' : '.');
      data.errosLote = erros;
    } catch (eLote) { data.msg = 'Erro na importação: ' + eLote; data.errosLote = erros; }
  }

  if (data.autenticado && input && input.acao === 'delIndice') {
    try {
      var grd = new GlideRecord(TB_IDX);
      if (grd.get(input.sysId)) { grd.deleteRecord(); data.msg = 'Índice removido.'; }
    } catch (e) { data.msg = 'Erro ao remover: ' + e; }
  }

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

  /* Detecção de virada de mês (mês atual em formato ISO confiável) + SELIC 1,00 no mês corrente */
  data.novoMes = false;
  data.mesCorrente = '';
  data.mesAnterior = '';
  data.upfSugerida = null;
  if (data.autenticado) {
    try {
      var _ym = new GlideDate().getValue().slice(0, 7);   // AAAA-MM (sempre ISO, independe do locale)
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
      // Bloqueia (popup) só quando a UPF mensal do mês corrente ainda não estiver informada
      data.novoMes = !(_upfCur > 0);
      var gPrev = new GlideRecord(TB_IDX);
      gPrev.addQuery('u_mes', _ymPrev); gPrev.query();
      if (gPrev.next()) { data.upfSugerida = parseFloat(gPrev.getValue('u_valor')) || null; }
    } catch (eR) {}
  }

  // ===== Dados para exibição =====
  if (data.autenticado) {
    data.indices = carregarIndices();
    data.simulacoes = carregarSimulacoes();
    data.avaliacoes = carregarAvaliacoes();
    var med = mediaEstrelas();
    data.avaliacaoMedia = med.media;
    data.avaliacaoTotal = med.total;
    data.totalSimulacoes = contar(TB_SIM);
  } else {
    data.indices = []; data.simulacoes = []; data.avaliacoes = [];
    data.avaliacaoMedia = 0; data.avaliacaoTotal = 0; data.totalSimulacoes = 0;
  }
})();
