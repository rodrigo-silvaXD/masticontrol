/* ===========================
   MASTICONTROL – script.js
=========================== */

// ─── MENU MOBILE ───────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const nav     = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.classList.toggle('active');
});

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.classList.remove('active');
  });
});

// ─── FADE-UP ao rolar ──────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ─── BOTÃO VOLTAR AO TOPO ──────────────────────────────────
const backBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backBtn.classList.toggle('show', window.scrollY > 400);
});

function voltarTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── RIPPLE NOS BOTÕES (melhoria) ─────────────────────────
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const r    = document.createElement('span');
  r.className = 'btn-ripple';
  const rect = btn.getBoundingClientRect();
  r.style.left = (e.clientX - rect.left) + 'px';
  r.style.top  = (e.clientY - rect.top)  + 'px';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 520);
});

// ─── TEXT-TO-SPEECH (seções) ───────────────────────────────
const ttsControl = document.getElementById('ttsControl');

function lerTexto(idElemento) {
  if (!('speechSynthesis' in window)) {
    alert('Seu navegador não suporta leitura de voz. Tente pelo Chrome.');
    return;
  }
  const el = document.getElementById(idElemento);
  if (!el) return;
  _falarTexto(el.innerText || el.textContent);

  // Marca botão ativo
  document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('reading'));
  const btn = el.closest('section')?.querySelector('.tts-btn');
  if (btn) btn.classList.add('reading');
}

function _falarTexto(texto) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang   = 'pt-BR';
  u.rate   = 0.88;
  u.pitch  = 1.05;
  u.volume = 1;

  const vozes = window.speechSynthesis.getVoices();
  const vozPT = vozes.find(v => v.lang.startsWith('pt-BR'))
             || vozes.find(v => v.lang.startsWith('pt'))
             || null;
  if (vozPT) u.voice = vozPT;

  ttsControl.style.display = 'block';
  u.onend  = _limparTTS;
  u.onerror = _limparTTS;
  window.speechSynthesis.speak(u);
}

function _limparTTS() {
  document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('reading'));
  ttsControl.style.display = 'none';
}

function pararLeitura() {
  window.speechSynthesis.cancel();
  _limparTTS();
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ─── QUIZ ──────────────────────────────────────────────────

const perguntas = [
  {
    pergunta: "Qual a ordem correta de ordenha das vacas?",
    opcoes: [
      "Vacas com mastite → vacas com mais lactações → vacas de primeira lactação",
      "Vacas de primeira lactação → vacas com mais lactações → vacas com mastite",
      "Vacas com mais lactações → vacas com mastite → vacas de primeira lactação"
    ],
    correta: 1,
    msgErro: "A ordem de ordenha não foi realizada corretamente. O ideal é iniciar pelas vacas de primeira lactação, seguir pelas mais velhas e deixar as vacas com mastite por último, evitando a disseminação de doenças."
  },
  {
    pergunta: "Qual a importância da higienização do ambiente de ordenha?",
    opcoes: [
      "Reduz a presença de bactérias e evita contaminação do leite",
      "Apenas melhora a aparência do local",
      "Serve somente para facilitar o trabalho do ordenhador"
    ],
    correta: 0,
    msgErro: "A higienização do ambiente é essencial para reduzir a presença de bactérias e evitar a contaminação do leite. Essa etapa não deve ser negligenciada."
  },
  {
    pergunta: "Qual o objetivo de descartar os primeiros jatos de leite na caneca de fundo preto?",
    opcoes: [
      "Aumentar a produção de leite",
      "Reduzir o tempo de ordenha",
      "Identificar alterações no leite como a mastite e reduzir contaminação"
    ],
    correta: 2,
    msgErro: "O descarte dos primeiros jatos de leite é importante para identificar alterações como mastite e reduzir a contaminação. Essa prática deve ser sempre realizada."
  },
  {
    pergunta: "Qual é a sequência correta do pré-dipping?",
    opcoes: [
      "Aplicar desinfetante → secar → esperar 30 segundos",
      "Aplicar desinfetante → esperar 30 segundos → secar com papel individual",
      "Secar → aplicar desinfetante → iniciar ordenha"
    ],
    correta: 1,
    msgErro: "A sequência do pré-dipping está incorreta. O correto é aplicar o desinfetante, aguardar o tempo de ação (mínimo 30 segundos) e depois secar com papel toalha individual."
  },
  {
    pergunta: "Por que deve-se utilizar papel toalha individual para cada teto?",
    opcoes: [
      "Para evitar contaminação cruzada entre os tetos",
      "Para economizar material",
      "Para acelerar o processo de ordenha"
    ],
    correta: 0,
    msgErro: "O uso de papel toalha individual é fundamental para evitar contaminação cruzada entre os tetos. Cada teto deve ser seco com um papel diferente."
  },
  {
    pergunta: "Qual a função principal do pré-dipping?",
    opcoes: [
      "Aumentar a produção de leite",
      "Eliminar bactérias presentes antes da ordenha",
      "Facilitar o encaixe das teteiras"
    ],
    correta: 1,
    msgErro: "O pré-dipping tem como principal função eliminar bactérias antes da ordenha, reduzindo o risco de infecção e melhorando a qualidade do leite."
  },
  {
    pergunta: "Como deve ser feita a higienização das teteiras?",
    opcoes: [
      "Apenas no final da ordenha",
      "Após cada vaca, antes de utilizar na próxima",
      "Somente quando estiverem visivelmente sujas"
    ],
    correta: 1,
    msgErro: "As teteiras devem ser higienizadas após cada vaca. A falta dessa prática pode favorecer a transmissão de doenças entre os animais."
  },
  {
    pergunta: "Qual a função do pós-dipping?",
    opcoes: [
      "Melhorar o sabor do leite",
      "Eliminar bactérias contagiosas após a ordenha",
      "Aumentar o volume de leite produzido"
    ],
    correta: 1,
    msgErro: "O pós-dipping é essencial para eliminar bactérias contagiosas após a ordenha, protegendo os tetos contra infecções."
  },
  {
    pergunta: "Por que é importante cuidar do esfíncter do teto após a ordenha?",
    opcoes: [
      "Porque ele permanece aberto e facilita a entrada de bactérias",
      "Porque aumenta a produção de leite",
      "Porque evita que o leite esfrie"
    ],
    correta: 0,
    msgErro: "Após a ordenha, o esfíncter do teto permanece aberto, facilitando a entrada de bactérias. Por isso, os cuidados nesse período são fundamentais."
  },
  {
    pergunta: "Qual manejo ajuda a proteger o esfíncter após a ordenha?",
    opcoes: [
      "Deixar a vaca deitada imediatamente",
      "Oferecer alimento para manter a vaca em pé",
      "Lavar os tetos com água fria"
    ],
    correta: 1,
    msgErro: "Manter a vaca em pé após a ordenha, oferecendo alimento, ajuda a proteger o esfíncter do teto e reduz o risco de contaminação."
  },
  {
    pergunta: "Qual o objetivo da higienização das mãos antes da ordenha?",
    opcoes: [
      "Evitar transmissão de bactérias para os tetos e leite",
      "Apenas cumprir protocolo",
      "Melhorar a aderência na teteira"
    ],
    correta: 0,
    msgErro: "A higienização das mãos antes da ordenha é essencial para evitar a transmissão de bactérias para os tetos e o leite."
  },
  {
    pergunta: "Qual a forma correta de aplicação do pré-dipping?",
    opcoes: [
      "Aplicar apenas na ponta do teto",
      "Imergir completamente o teto na solução desinfetante",
      "Aplicar apenas após a ordenha"
    ],
    correta: 1,
    msgErro: "O pré-dipping deve ser feito com a imersão completa do teto na solução desinfetante, garantindo maior eficiência na eliminação de bactérias."
  }
];

// Letras das alternativas para leitura em voz
const LETRAS = ['A', 'B', 'C'];

let perguntaAtual = 0;
let pontuacao     = 0;
let erros         = []; // índices das perguntas erradas
let respostaFeita = false;

// ─── LOCALIZAÇÃO ÚLTIMO RESULTADO (melhoria: localStorage) ─
function salvarResultado(acertos, total) {
  localStorage.setItem('masticontrol_resultado', JSON.stringify({
    acertos, total, data: new Date().toLocaleDateString('pt-BR')
  }));
}

function carregarUltimoResultado() {
  try {
    const r = JSON.parse(localStorage.getItem('masticontrol_resultado'));
    if (r) return r;
  } catch { /* ignore */ }
  return null;
}

// ─── INICIAR / REINICIAR ───────────────────────────────────
function iniciarQuiz() {
  perguntaAtual = 0;
  pontuacao     = 0;
  erros         = [];
  respostaFeita = false;

  document.getElementById('quizBox').style.display       = 'block';
  document.getElementById('quizResultado').style.display = 'none';

  mostrarPergunta();
}

// ─── MOSTRAR PERGUNTA ──────────────────────────────────────
function mostrarPergunta() {
  const p = perguntas[perguntaAtual];
  respostaFeita = false;

  // Progresso
  const pct = (perguntaAtual / perguntas.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  // Texto da pergunta
  document.getElementById('quizQuestion').textContent = p.pergunta;

  // Opções
  const optsEl = document.getElementById('quizOptions');
  optsEl.innerHTML = '';

  p.opcoes.forEach((texto, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML =
      `<span class="opt-letra">${LETRAS[i]}</span><span class="opt-texto">${texto}</span>`;
    btn.onclick = () => responder(i);
    optsEl.appendChild(btn);
  });

  // Reseta feedback e botão
  document.getElementById('quizFeedback').style.display = 'none';
  document.getElementById('btnNext').style.display      = 'none';

  // Reseta estado do botão ouvir
  const btnOuvir = document.getElementById('btnOuvirPergunta');
  if (btnOuvir) btnOuvir.classList.remove('reading');
}

// ─── TTS DA PERGUNTA ATUAL ─────────────────────────────────
function lerPerguntaAtual() {
  const p = perguntas[perguntaAtual];
  if (!p) return;

  const texto =
    `Pergunta ${perguntaAtual + 1}. ${p.pergunta} ` +
    p.opcoes.map((op, i) => `${LETRAS[i]}: ${op}`).join('. ');

  document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('reading'));
  const btnOuvir = document.getElementById('btnOuvirPergunta');
  if (btnOuvir) btnOuvir.classList.add('reading');

  _falarTexto(texto);
}

// ─── RESPONDER ─────────────────────────────────────────────
function responder(indice) {
  if (respostaFeita) return;
  respostaFeita = true;

  // Para leitura de voz se estiver ativa
  window.speechSynthesis.cancel();
  _limparTTS();

  const p        = perguntas[perguntaAtual];
  const opts     = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quizFeedback');
  const acertou  = (indice === p.correta);

  // Destaca opções
  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === p.correta) {
      btn.classList.add('correta');
    } else if (i === indice && !acertou) {
      btn.classList.add('errada');
    }
  });

  // Registra acerto/erro
  if (acertou) {
    pontuacao++;
    feedback.className   = 'quiz-feedback ok';
    feedback.textContent = '✅ Correto!';
  } else {
    erros.push(perguntaAtual);
    feedback.className   = 'quiz-feedback erro';
    feedback.textContent = '❌ ' + p.msgErro;
  }

  feedback.style.display = 'block';

  // Botão avançar
  const btnNext = document.getElementById('btnNext');
  btnNext.textContent  = perguntaAtual < perguntas.length - 1
    ? 'Próxima pergunta →'
    : 'Ver resultado ✅';
  btnNext.style.display = 'block';
}

// ─── AVANÇAR PERGUNTA ──────────────────────────────────────
function proximaPergunta() {
  window.speechSynthesis.cancel();
  _limparTTS();

  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

// ─── RESULTADO FINAL ───────────────────────────────────────
function mostrarResultado() {
  document.getElementById('quizBox').style.display       = 'none';
  document.getElementById('quizResultado').style.display = 'block';

  const total = perguntas.length;

  // Salva no localStorage
  salvarResultado(pontuacao, total);

  // Avaliação por faixa
  let icone, titulo, texto;
  if (pontuacao <= 4) {
    icone  = '💪';
    titulo = 'Precisa melhorar bastante';
    texto  = 'Não desanime! Leia as seções acima e tente novamente.';
  } else if (pontuacao <= 8) {
    icone  = '📚';
    titulo = 'Está no caminho certo';
    texto  = 'Bom progresso! Revise os pontos que errou para melhorar ainda mais.';
  } else {
    icone  = '🏆';
    titulo = 'Excelente manejo';
    texto  = 'Parabéns! Você demonstra ótimo conhecimento sobre boas práticas de ordenha.';
  }

  document.getElementById('resultadoIcon').textContent   = icone;
  document.getElementById('resultadoTitulo').textContent = titulo;
  document.getElementById('resultadoTexto').textContent  = texto;
  document.getElementById('resultadoPontos').textContent =
    `Você acertou ${pontuacao} de ${total} perguntas`;

  // Feedback personalizado por erros
  const errosFeedbackEl = document.getElementById('errosFeedback');
  errosFeedbackEl.innerHTML = '';

  if (erros.length > 0) {
    const titulo = document.createElement('h4');
    titulo.className   = 'erros-titulo';
    titulo.textContent = '📋 O que revisar:';
    errosFeedbackEl.appendChild(titulo);

    erros.forEach(idx => {
      const item = document.createElement('div');
      item.className = 'erro-item';
      item.innerHTML =
        `<span class="erro-num">P${idx + 1}</span>` +
        `<span class="erro-msg">${perguntas[idx].msgErro}</span>`;
      errosFeedbackEl.appendChild(item);
    });
  }
}

// ─── REINICIAR ─────────────────────────────────────────────
function reiniciarQuiz() {
  iniciarQuiz();
}

// ─── PROCEDIMENTO: TTS por etapa ───────────────────────────
function lerEtapa(btn) {
  const titulo   = btn.dataset.title   || '';
  const conteudo = btn.dataset.content || '';
  const texto    = titulo + '. ' + conteudo;

  // Remove reading de todos, depois adiciona no btn atual
  document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('reading'));
  _falarTexto(texto);
  btn.classList.add('reading');
}

// ─── PROCEDIMENTO: Progresso + Destaque ao rolar ───────────
function initProcedimento() {
  const cards        = document.querySelectorAll('.proc-card');
  const barraLabel   = document.getElementById('procBarraLabel');
  const dotsEl       = document.getElementById('procDots');
  if (!cards.length || !barraLabel || !dotsEl) return;

  const total = cards.length;

  // Cria um dot por etapa
  cards.forEach((card, i) => {
    const dot = document.createElement('span');
    dot.className    = 'proc-dot';
    dot.title        = 'Etapa ' + (i + 1);
    dot.dataset.step = i + 1;
    dot.addEventListener('click', () => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    dotsEl.appendChild(dot);
  });

  // IntersectionObserver: atualiza etapa ativa ao rolar
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const step    = parseInt(entry.target.dataset.step, 10);
      const dotAtivo = dotsEl.querySelector(`[data-step="${step}"]`);

      // Destaca card ativo
      cards.forEach(c => c.classList.remove('proc-ativa'));
      entry.target.classList.add('proc-ativa');

      // Atualiza dots
      dotsEl.querySelectorAll('.proc-dot').forEach(d => d.classList.remove('ativo'));
      if (dotAtivo) dotAtivo.classList.add('ativo');

      // Atualiza label
      barraLabel.textContent = 'Etapa ' + step + ' de ' + total;
    });
  }, {
    threshold: 0.35,
    rootMargin: '-5% 0px -5% 0px'
  });

  cards.forEach(card => io.observe(card));
}

// ─── INICIALIZAÇÃO ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  iniciarQuiz();
  initProcedimento();
  initEvolucao();
  initOrdenacao();

  // Ativa fade-up em elementos já visíveis
  setTimeout(() => {
    fadeEls.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});

/* ==============================================
   ACOMPANHAMENTO DA EVOLUÇÃO
============================================== */

const EVOL_KEY   = 'masticontrol_evolucao';
let   evolDados  = [null, null, null, null]; // índices 0-3 = semanas 1-4
let   evolTemp   = { 1: null, 2: null, 3: null, 4: null }; // Sim/Não antes de salvar
let   evolAnimId = null;

// ── Inicialização ──────────────────────────────────────────
function initEvolucao() {
  try {
    const raw = localStorage.getItem(EVOL_KEY);
    if (raw) evolDados = JSON.parse(raw);
  } catch { evolDados = [null, null, null, null]; }

  // Pré-carrega evolTemp com dados salvos
  evolDados.forEach((d, i) => {
    if (d !== null) evolTemp[i + 1] = d.novos;
  });

  renderSemanas();
  desenharGrafico(true); // true = com animação
  atualizarResultado();
}

// ── Renderiza os 4 cards de semana ─────────────────────────
function renderSemanas() {
  const container = document.getElementById('evolSemanas');
  if (!container) return;
  container.innerHTML = '';

  // Melhoria: primeira semana não preenchida = "atual"
  const idxAtual = evolDados.findIndex(d => d === null);

  for (let i = 0; i < 4; i++) {
    const sem    = i + 1;
    const dado   = evolDados[i];
    const salvo  = dado !== null;
    const atual  = (idxAtual === i);

    const card = document.createElement('div');
    card.id        = `evol-card-${sem}`;
    card.className = 'evol-card'
      + (salvo ? ' evol-salvo' : '')
      + (atual  ? ' evol-atual' : '');

    card.innerHTML = `
      <div class="evol-card-header">
        <span class="evol-sem-badge${salvo ? ' ok' : ''}">
          ${salvo ? '✅' : '📝'} Semana ${sem}
        </span>
        ${atual ? `<span class="evol-atual-tag">← Preencher agora</span>` : ''}
        ${salvo ? `<button class="evol-btn-editar" onclick="editarSemana(${sem})">✏️ Editar</button>` : ''}
      </div>

      <div class="evol-campo">
        <label class="evol-label" for="evol-casos-${sem}">
          🐄 Número de casos de mastite:
        </label>
        <input
          type="number"
          class="evol-input"
          id="evol-casos-${sem}"
          min="0" max="9999"
          value="${salvo ? dado.casos : ''}"
          placeholder="Ex: 3"
          ${salvo ? 'readonly' : `oninput="lerCasosInput(${sem})"`}
        />
      </div>

      <div class="evol-campo">
        <label class="evol-label">🔍 Houve novos casos?</label>
        <div class="evol-sim-nao">
          <button
            class="evol-btn-sn${salvo && dado.novos === true  ? ' ativo-sim' : ''}${salvo ? ' bloqueado' : ''}"
            id="evol-sim-${sem}"
            ${salvo ? '' : `onclick="selecionarNovos(${sem}, true)"`}
          >👍 Sim</button>
          <button
            class="evol-btn-sn${salvo && dado.novos === false ? ' ativo-nao' : ''}${salvo ? ' bloqueado' : ''}"
            id="evol-nao-${sem}"
            ${salvo ? '' : `onclick="selecionarNovos(${sem}, false)"`}
          >👎 Não</button>
        </div>
      </div>

      ${!salvo
        ? `<button class="btn btn-green evol-btn-salvar" onclick="salvarSemana(${sem})">
             ✅ Salvar semana ${sem}
           </button>`
        : ''}
    `;

    container.appendChild(card);
  }
}

// ── Seleciona Sim ou Não (antes de salvar) ─────────────────
function selecionarNovos(sem, valor) {
  evolTemp[sem] = valor;

  const btnSim  = document.getElementById(`evol-sim-${sem}`);
  const btnNao  = document.getElementById(`evol-nao-${sem}`);
  const inputEl = document.getElementById(`evol-casos-${sem}`);
  if (!btnSim || !btnNao) return;

  btnSim.className = 'evol-btn-sn' + (valor === true  ? ' ativo-sim' : '');
  btnNao.className = 'evol-btn-sn' + (valor === false ? ' ativo-nao' : '');

  // Se "Não", zera automaticamente o campo de casos
  if (valor === false && inputEl && inputEl.value === '') {
    inputEl.value = '0';
  }

  // TTS acessibilidade
  _falarTexto(valor ? 'Houve casos' : 'Não houve casos');
}

// ── TTS ao digitar número de casos ────────────────────────
function lerCasosInput(sem) {
  const inputEl = document.getElementById(`evol-casos-${sem}`);
  if (!inputEl || inputEl.value === '') return;
  clearTimeout(window._evolTTSTimer);
  window._evolTTSTimer = setTimeout(() => {
    _falarTexto(inputEl.value + ' casos');
  }, 700); // lê 700ms após parar de digitar
}

// ── Salva semana ───────────────────────────────────────────
function salvarSemana(sem) {
  const inputEl = document.getElementById(`evol-casos-${sem}`);
  if (!inputEl) return;

  let casosVal = inputEl.value.trim();

  // Se "Não" selecionado e campo vazio → auto-preenche 0
  if (evolTemp[sem] === false && casosVal === '') {
    casosVal = '0';
    inputEl.value = '0';
  }

  // Validação: campo obrigatório
  if (casosVal === '' || isNaN(parseInt(casosVal, 10)) || parseInt(casosVal, 10) < 0) {
    inputEl.focus();
    inputEl.style.borderColor = 'var(--vermelho)';
    setTimeout(() => { inputEl.style.borderColor = ''; }, 2000);
    return;
  }
  // Validação: Sim/Não obrigatório
  if (evolTemp[sem] === null) {
    const snWrap = document.querySelector(`#evol-card-${sem} .evol-sim-nao`);
    if (snWrap) {
      snWrap.style.outline = '2px solid var(--vermelho)';
      snWrap.style.borderRadius = '12px';
      setTimeout(() => { snWrap.style.outline = ''; }, 2000);
    }
    return;
  }

  evolDados[sem - 1] = {
    casos: parseInt(casosVal, 10),
    novos: evolTemp[sem]
  };

  _persistirEvolucao();
  renderSemanas();
  desenharGrafico(true);
  atualizarResultado();

  // TTS: confirma salvamento
  _falarTexto(`Semana ${sem} salva`);
}

// ── Editar semana (desfaz o save) ─────────────────────────
function editarSemana(sem) {
  evolDados[sem - 1] = null;
  evolTemp[sem]      = null;
  _persistirEvolucao();
  renderSemanas();
  desenharGrafico(false);
  atualizarResultado();

  // TTS: informa edição
  _falarTexto(`Editando semana ${sem}`);
}

// ── Persiste no localStorage ───────────────────────────────
function _persistirEvolucao() {
  localStorage.setItem(EVOL_KEY, JSON.stringify(evolDados));
}

// ── Resultado mensal (quando todas 4 semanas preenchidas) ──
function atualizarResultado() {
  const resEl = document.getElementById('evolResultado');
  if (!resEl) return;

  const todas = evolDados.every(d => d !== null);
  resEl.style.display = todas ? 'block' : 'none';
  if (!todas) return;

  const totalCasos = evolDados.reduce((acc, d) => acc + d.casos, 0);
  const media      = (totalCasos / 4).toFixed(1);
  const primeira   = evolDados[0].casos;
  const ultima     = evolDados[3].casos;
  const tendencia  = ultima < primeira ? 'redução' : ultima > primeira ? 'aumento' : 'estabilidade';
  const tendIcon   = ultima < primeira ? '📉' : ultima > primeira ? '📈' : '➡️';
  const tendClass  = ultima < primeira ? 'destaque-verde' : ultima > primeira ? 'destaque-red' : 'destaque-azul';

  // Guarda para TTS
  window._evolResumo = { totalCasos, media, tendencia };

  document.getElementById('evolStats').innerHTML = `
    <div class="evol-stat-card destaque-azul">
      <div class="evol-stat-icon">🧮</div>
      <div class="evol-stat-valor">${totalCasos}</div>
      <div class="evol-stat-label">Total de casos no mês</div>
    </div>
    <div class="evol-stat-card">
      <div class="evol-stat-icon">📊</div>
      <div class="evol-stat-valor">${media}</div>
      <div class="evol-stat-label">Média semanal</div>
    </div>
    <div class="evol-stat-card ${tendClass}">
      <div class="evol-stat-icon">${tendIcon}</div>
      <div class="evol-stat-valor" style="font-size:18px;text-transform:capitalize">${tendencia}</div>
      <div class="evol-stat-label">Comparado à semana 1</div>
    </div>
  `;
}

// ── TTS do resultado ───────────────────────────────────────
function lerResultadoEvolucao() {
  const r = window._evolResumo;
  if (!r) return;

  const texto = `Resultado do mês. Total de casos: ${r.totalCasos}. `
    + `Média semanal: ${r.media} casos. `
    + `Situação: houve ${r.tendencia} em relação à primeira semana.`;

  document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('reading'));
  const btn = document.getElementById('btnOuvirResultado');
  if (btn) btn.classList.add('reading');

  _falarTexto(texto);
}

// ── Limpar dados ───────────────────────────────────────────
function confirmarLimpar() {
  if (!confirm('Deseja apagar todos os dados registrados?')) return;
  evolDados = [null, null, null, null];
  evolTemp  = { 1: null, 2: null, 3: null, 4: null };
  localStorage.removeItem(EVOL_KEY);
  renderSemanas();
  desenharGrafico(false);
  atualizarResultado();
}

// ── Gráfico Canvas ─────────────────────────────────────────
function desenharGrafico(animar) {
  const canvas = document.getElementById('evolCanvas');
  if (!canvas) return;

  // Define dimensões reais do canvas
  canvas.width  = canvas.offsetWidth  || 700;
  canvas.height = canvas.offsetHeight || 260;

  const ctx = canvas.getContext('2d');
  const W   = canvas.width;
  const H   = canvas.height;

  const PAD = { top: 36, right: 64, bottom: 48, left: 58 };
  const IW  = W - PAD.left - PAD.right;   // largura interna
  const IH  = H - PAD.top  - PAD.bottom;  // altura interna

  // Dados disponíveis (só semanas preenchidas)
  const pontos = evolDados
    .map((d, i) => d !== null ? { idx: i, casos: d.casos, novos: d.novos ? 1 : 0 } : null)
    .filter(Boolean);

  const maxCasos = Math.max(...pontos.map(p => p.casos), 1);

  // X = posição fixa para cada semana (0-3)
  const xPos = (idx) => PAD.left + (idx / 3) * IW;
  const yC   = (v)   => PAD.top  + IH - (v / maxCasos) * IH;
  const yN   = (v)   => PAD.top  + IH - v * IH;

  const COR_AZUL  = '#1a6fc4';
  const COR_VERDE = '#27a84e';

  let startTs = null;
  const DUR   = 900; // ms

  cancelAnimationFrame(evolAnimId);

  function frame(ts) {
    if (!startTs) startTs = ts;
    const prog = animar ? Math.min((ts - startTs) / DUR, 1) : 1;

    // ── Limpa ──
    ctx.clearRect(0, 0, W, H);

    // ── Fundo ──
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, W, H);

    // ── Gridlines horizontais ──
    const gridN = 5;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth   = 1;
    for (let g = 0; g <= gridN; g++) {
      const gy = PAD.top + (g / gridN) * IH;
      ctx.beginPath(); ctx.moveTo(PAD.left, gy); ctx.lineTo(PAD.left + IW, gy); ctx.stroke();
    }

    // ── Gridlines verticais (4 semanas) ──
    for (let s = 0; s < 4; s++) {
      const gx = xPos(s);
      ctx.beginPath(); ctx.moveTo(gx, PAD.top); ctx.lineTo(gx, PAD.top + IH); ctx.stroke();
    }

    // ── Eixos ──
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(PAD.left, PAD.top);
    ctx.lineTo(PAD.left, PAD.top + IH);
    ctx.lineTo(PAD.left + IW, PAD.top + IH);
    ctx.stroke();

    // ── Labels eixo Y esquerdo (casos) ──
    ctx.fillStyle  = COR_AZUL;
    ctx.font       = 'bold 12px Nunito, sans-serif';
    ctx.textAlign  = 'right';
    for (let g = 0; g <= gridN; g++) {
      const val = Math.round(maxCasos * (gridN - g) / gridN);
      const gy  = PAD.top + (g / gridN) * IH;
      ctx.fillText(val, PAD.left - 8, gy + 4);
    }

    // ── Labels eixo Y direito (novos: Sim/Não) ──
    ctx.fillStyle = COR_VERDE;
    ctx.textAlign = 'left';
    ctx.font      = 'bold 11px Nunito, sans-serif';
    ctx.fillText('Sim', PAD.left + IW + 6, PAD.top + 4);
    ctx.fillText('Não', PAD.left + IW + 6, PAD.top + IH + 4);

    // ── Labels eixo X ──
    ctx.fillStyle = '#4a5568';
    ctx.textAlign = 'center';
    ctx.font      = 'bold 13px Nunito, sans-serif';
    ['Sem 1','Sem 2','Sem 3','Sem 4'].forEach((lb, i) => {
      ctx.fillText(lb, xPos(i), PAD.top + IH + 22);
    });

    if (pontos.length === 0) {
      // Mensagem placeholder
      ctx.fillStyle  = '#a0aec0';
      ctx.font       = 'bold 15px Nunito, sans-serif';
      ctx.textAlign  = 'center';
      ctx.fillText('Preencha as semanas para ver o gráfico', W / 2, H / 2);
      return;
    }

    // ── Clip progressivo para animação ──
    const clipW = PAD.left + IW * prog;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, clipW, H);
    ctx.clip();

    // ── Linha: Casos (azul, sólida) ──
    if (pontos.length >= 1) {
      ctx.strokeStyle = COR_AZUL;
      ctx.lineWidth   = 3.5;
      ctx.lineJoin    = 'round';
      ctx.setLineDash([]);
      ctx.beginPath();
      pontos.forEach((p, i) => {
        if (i === 0) ctx.moveTo(xPos(p.idx), yC(p.casos));
        else         ctx.lineTo(xPos(p.idx), yC(p.casos));
      });
      ctx.stroke();

      // Pontos + valores
      pontos.forEach(p => {
        ctx.beginPath();
        ctx.arc(xPos(p.idx), yC(p.casos), 7, 0, Math.PI * 2);
        ctx.fillStyle   = COR_AZUL;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth   = 2.5;
        ctx.stroke();

        ctx.fillStyle  = COR_AZUL;
        ctx.font       = 'bold 12px Nunito, sans-serif';
        ctx.textAlign  = 'center';
        ctx.fillText(p.casos, xPos(p.idx), yC(p.casos) - 14);
      });
    }

    // ── Linha: Novos casos (verde, tracejada) ──
    if (pontos.length >= 1) {
      ctx.strokeStyle = COR_VERDE;
      ctx.lineWidth   = 2.5;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      pontos.forEach((p, i) => {
        if (i === 0) ctx.moveTo(xPos(p.idx), yN(p.novos));
        else         ctx.lineTo(xPos(p.idx), yN(p.novos));
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Pontos
      pontos.forEach(p => {
        ctx.beginPath();
        ctx.arc(xPos(p.idx), yN(p.novos), 5, 0, Math.PI * 2);
        ctx.fillStyle   = COR_VERDE;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth   = 2;
        ctx.stroke();
      });
    }

    ctx.restore();

    if (prog < 1) evolAnimId = requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/* ==============================================
   ORDENAÇÃO DE IMAGENS
============================================== */

const ORD_TOTAL   = 8;          // total de imagens
let   ordAtual    = [];          // ordem atual (valores 1-8)
let   dragSrcPos  = null;        // posição de origem do drag

// ── Embaralha garantindo que não fique na ordem correta ───
function _shuffleNaoCorreta(arr) {
  let s;
  do {
    s = [...arr].sort(() => Math.random() - 0.5);
  } while (s.every((v, i) => v === arr[i]));
  return s;
}

// ── Inicializa a seção ─────────────────────────────────────
function initOrdenacao() {
  const grade = document.getElementById('ordGrade');
  if (!grade) return;
  resetOrdem();
}

// ── Renderiza a grade com a ordem atual ───────────────────
function renderOrdenacao() {
  const grade = document.getElementById('ordGrade');
  if (!grade) return;
  grade.innerHTML = '';
  grade.classList.remove('ord-animacao-acerto');

  ordAtual.forEach((num, pos) => {
    const item = document.createElement('div');
    item.className        = 'ord-item';
    item.draggable        = true;
    item.dataset.pos      = pos;
    item.dataset.num      = num;
    item.id               = `ord-item-${pos}`;

    item.innerHTML = `
      <div class="ord-pos-badge">${pos + 1}</div>
      <div class="ord-img-wrap">
        <img src="ordem${num}.jpg" alt="Imagem ${num}" class="ord-img" loading="lazy" />
      </div>
      <div class="ord-item-btns">
        <button class="ord-btn-mover" title="Mover para cima"
          onclick="moverItem(${pos}, -1)"
          ${pos === 0 ? 'disabled' : ''}>↑</button>
        <button class="ord-btn-mover" title="Mover para baixo"
          onclick="moverItem(${pos}, 1)"
          ${pos === ordAtual.length - 1 ? 'disabled' : ''}>↓</button>
      </div>
    `;

    // ── Drag & drop events ──
    item.addEventListener('dragstart', _ordDragStart);
    item.addEventListener('dragenter', _ordDragEnter);
    item.addEventListener('dragover',  _ordDragOver);
    item.addEventListener('dragleave', _ordDragLeave);
    item.addEventListener('drop',      _ordDrop);
    item.addEventListener('dragend',   _ordDragEnd);

    grade.appendChild(item);
  });

  // Esconde feedback ao re-renderizar
  const fb = document.getElementById('ordFeedback');
  if (fb) fb.style.display = 'none';
}

// ── Drag & Drop handlers ───────────────────────────────────
function _ordDragStart(e) {
  dragSrcPos = parseInt(this.dataset.pos, 10);
  this.classList.add('ord-dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function _ordDragEnter(e) {
  e.preventDefault();
  this.classList.add('ord-dragover');
}
function _ordDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function _ordDragLeave() {
  this.classList.remove('ord-dragover');
}
function _ordDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  const targetPos = parseInt(this.dataset.pos, 10);
  if (dragSrcPos !== null && dragSrcPos !== targetPos) {
    const tmp            = ordAtual[dragSrcPos];
    ordAtual[dragSrcPos] = ordAtual[targetPos];
    ordAtual[targetPos]  = tmp;
    renderOrdenacao();
  }
  this.classList.remove('ord-dragover');
}
function _ordDragEnd() {
  document.querySelectorAll('.ord-item').forEach(el =>
    el.classList.remove('ord-dragging', 'ord-dragover')
  );
  dragSrcPos = null;
}

// ── Mover com botões ↑ ↓ ─────────────────────────────────
function moverItem(pos, dir) {
  const novaPos = pos + dir;
  if (novaPos < 0 || novaPos >= ordAtual.length) return;
  const tmp          = ordAtual[pos];
  ordAtual[pos]      = ordAtual[novaPos];
  ordAtual[novaPos]  = tmp;
  renderOrdenacao();
}

// ── Verificar ordem ───────────────────────────────────────
function verificarOrdem() {
  const correta = ordAtual.every((v, i) => v === i + 1);
  const feedEl  = document.getElementById('ordFeedback');
  if (!feedEl) return;

  feedEl.style.display = 'block';

  if (correta) {
    feedEl.className  = 'ord-feedback ord-acerto';
    feedEl.innerHTML  = '🎉 Ordem correta! Parabéns!';
    // Melhoria: animação de glow em todos os cards
    const grade = document.getElementById('ordGrade');
    if (grade) {
      grade.classList.add('ord-animacao-acerto');
      setTimeout(() => grade.classList.remove('ord-animacao-acerto'), 2000);
    }
    _falarTexto('Ordem correta! Parabéns!');
  } else {
    feedEl.className  = 'ord-feedback ord-erro';
    feedEl.innerHTML  = '❌ Ordem incorreta. Tente novamente.';
    _falarTexto('Ordem incorreta. Tente novamente.');
  }
}

// ── Reset: nova ordem aleatória ───────────────────────────
function resetOrdem() {
  ordAtual = _shuffleNaoCorreta([1,2,3,4,5,6,7,8]);
  renderOrdenacao();
}

// Redesenha ao redimensionar a janela
window.addEventListener('resize', () => {
  clearTimeout(window._evolResizeTimer);
  window._evolResizeTimer = setTimeout(() => desenharGrafico(false), 200);
});
