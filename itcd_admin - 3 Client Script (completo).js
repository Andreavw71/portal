api.controller = function() {
  var c = this;
  c.mostrarSenha = false;
  c.mostrarAltSenha = false;
  c.pagSim = 1;
  c.pagAva = 1;
  c.totalPags = function(lista) { return Math.max(1, Math.ceil((lista || []).length / 150)); };

  // ===== Login por senha =====
  c.senha = '';
  c.erroLogin = false;
  c.entrar = function() {
    if (!c.senha) return;
    c.data.acao = 'login';
    c.data.senha = c.senha;
    c.server.update().then(function() {
      c.erroLogin = !c.data.autenticado;
      c.syncVirada();
    });
  };

  // ===== Alterar senha (após login) =====
  c.novaSenha = '';
  c.novaSenha2 = '';
  c.msgSenhaLocal = '';
  c.alterarSenha = function() {
    c.msgSenhaLocal = '';
    if (!c.novaSenha || c.novaSenha.length < 6) { c.msgSenhaLocal = 'A nova senha deve ter pelo menos 6 caracteres.'; return; }
    if (c.novaSenha !== c.novaSenha2) { c.msgSenhaLocal = 'As duas senhas não conferem.'; return; }
    c.data.acao = 'alterarSenha';
    c.data.senha = c.senha;                 // senha ATUAL (revalidada no servidor)
    c.data.novaSenha = c.novaSenha;
    var nova = c.novaSenha;
    c.server.update().then(function() {
      if (c.data.okSenha) {
        c.senha = nova;                     // mantém a sessão com a nova senha
        c.novaSenha = ''; c.novaSenha2 = '';
      }
    });
  };


  c.imprimirGuia = function() { window.print(); };

  c.sair = function() {
    c.senha = '';
    c.erroLogin = false;
    c.data.autenticado = false;
  };

  c.tab = 'indices';
  c.setTab = function(t) {
    c.pagSim = 1; c.pagAva = 1; c.tab = t; };

  c.novo = { mes: '', upf: null, selic: null };

  c.salvarIndice = function() {
    c.data.acao = 'addIndice';
    c.data.senha = c.senha;
    c.data.mes = c.novo.mes;
    c.data.upf = c.novo.upf;
    c.data.selic = c.novo.selic;
    c.server.update().then(function() {
      c.novo = { mes: '', upf: null, selic: null };
    });
  };

  c.removerIndice = function(sysId, mes) {
    if (!confirm('Remover o índice de ' + mes + '?')) return;
    c.data.acao = 'delIndice';
    c.data.senha = c.senha;
    c.data.sysId = sysId;
    c.server.update();
  };

  // ===== Importação em lote (colar do Excel) =====
  c.lote = '';
  c.importarLote = function() {
    if (!c.lote) return;
    c.data.acao = 'importarLote';
    c.data.senha = c.senha;
    c.data.lote = c.lote;
    c.server.update().then(function() {
      if (!c.data.errosLote || !c.data.errosLote.length) c.lote = '';
    });
  };

  c.fmt = function(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  c.estrelasTexto = function(n) {
    n = parseInt(n, 10) || 0;
    var s = '';
    for (var i = 1; i <= 5; i++) s += (i <= n) ? '\u2605' : '\u2606';
    return s;
  };


  c.parseBlocos = function(json) {
    try {
      var arr = JSON.parse(json || '[]');
      if (!arr || !arr.length) return '';
      return arr.map(function(b) {
        return b.titulo + ': imp ' + c.fmt(b.imposto) + ' + multa ' + c.fmt(b.multa) + ' + juros ' + c.fmt(b.juros) + ' = ' + c.fmt(b.total);
      }).join(' | ');
    } catch (e) { return ''; }
  };


  // ===== Exportar CSV (Excel BR: BOM + ponto-e-vírgula) =====
  function csvCel(v) {
    if (v === null || v === undefined) return '';
    v = String(v).replace(/"/g, '""').replace(/\r?\n/g, ' ');
    return '"' + v + '"';
  }
  function baixarCSV(nome, linhas) {
    var csv = '\ufeff' + linhas.map(function(l){ return l.map(csvCel).join(';'); }).join('\r\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nome;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 200);
  }

  c.exportarSimulacoes = function() {
    var L = [['Data/hora','Tipo','Qtd doações','Valor','Imposto','Multa','Juros','Total','Dispensa','Sucessiva','Data do fato','Data referência','Doações (JSON)','Cálculo por doação (JSON)']];
    (c.data.simulacoes || []).forEach(function(s) {
      L.push([s.dh, s.tipo, s.qtdDoacoes, s.valor, s.imposto, s.multa, s.juros, s.total,
              s.dispensa ? 'Sim' : 'Não', s.sucessiva ? 'Sim' : 'Não',
              s.dataFato || '', s.dataRef || '', s.doacoes || '', s.blocos || '']);
    });
    baixarCSV('itcd_simulacoes.csv', L);
  };

  c.exportarAvaliacoes = function() {
    var L = [['Data/hora','Estrelas','Comentário']];
    (c.data.avaliacoes || []).forEach(function(a) { L.push([a.dh, a.estrelas, a.comentario || '']); });
    baixarCSV('itcd_avaliacoes.csv', L);
  };

  // ===== [NOVO] Exportar índices no formato do "Importar lote" (Mês;UPF;SELIC) =====
  c.exportarIndices = function() {
    var lista = (c.data.indices || []).slice().sort(function(a, b) { return a.mes < b.mes ? -1 : (a.mes > b.mes ? 1 : 0); });
    var linhas = [];
    lista.forEach(function(ix) {
      var upf = (ix.upf === null || ix.upf === undefined || ix.upf === '') ? '' : String(ix.upf).replace('.', ',');
      var sel = (ix.selic === null || ix.selic === undefined || ix.selic === '') ? '' : String(ix.selic).replace('.', ',');
      linhas.push(ix.mes + ';' + upf + ';' + sel);
    });
    var csv = '\ufeff' + linhas.join('\r\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'itcd_indices.csv';
    document.body.appendChild(a); a.click();
    setTimeout(function() { URL.revokeObjectURL(a.href); a.remove(); }, 200);
  };

  c.parseDoacoes = function(json) {
    try {
      var arr = JSON.parse(json || '[]');
      if (!arr || !arr.length) return '';
      return arr.map(function(d) {
        return (d.data || '?') + ' R$ ' + c.fmt(parseFloat(d.valor) || 0) + (d.pago ? ' (pago)' : '');
      }).join(' · ');
    } catch (e) { return ''; }
  };

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
};
