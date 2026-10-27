/**
 * Micrositio Bioético: Sesgos Algorítmicos en el Triaje Médico
 * Juan Felipe Rendón Herrera - Ingeniería de Sistemas
 * Assets JavaScript: Interactions, Simulator, Multimedia & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons initialization
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initReadingProgress();
  initScrollSpy();
  initMobileNav();
  initTradeoffSimulator();
  initInfografiaNarrada();
  initVideoModal();
  initReferencesFilter();
  initAuditChecklist();
});

/* -------------------------------------------------------------
 * 1. READING PROGRESS BAR
 * ------------------------------------------------------------- */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* -------------------------------------------------------------
 * 2. SCROLLSPY & NAVIGATION (Sin subrayado, solo enfoque de color)
 * ------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-sky-400', 'font-semibold', 'active-nav');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-sky-400', 'font-semibold', 'active-nav');
      }
    });
  }, { passive: true });
}

/* -------------------------------------------------------------
 * 3. MOBILE NAVIGATION
 * ------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------------------------
 * 4. INTERACTIVE BIOETHICAL TRADEOFF SIMULATOR
 * ------------------------------------------------------------- */
function initTradeoffSimulator() {
  const debiasSlider = document.getElementById('sim-debias');
  const thresholdSlider = document.getElementById('sim-threshold');

  if (!debiasSlider || !thresholdSlider) return;

  function updateSimulation() {
    const debias = parseFloat(debiasSlider.value); // 0 (pure utilitarian) to 100 (strict equity)
    const threshold = parseFloat(thresholdSlider.value); // 30 to 80 (risk cutoff)

    const thresholdFactor = 1 - Math.pow((threshold - 55) / 60, 2) * 0.15;
    const debiasSurvivalPenalty = (debias / 100) * 3.8;
    const globalSurvival = (88.5 * thresholdFactor - debiasSurvivalPenalty).toFixed(1);

    const disparateImpact = (0.54 + (debias / 100) * 0.42).toFixed(2);

    const errPrivileged = (7.5 + (debias / 100) * 3.8 + (threshold - 50) * 0.1).toFixed(1);
    const errVulnerable = (34.8 - (debias / 100) * 22.2 + (threshold - 50) * 0.15).toFixed(1);

    const justiceScore = Math.min(100, Math.round(30 + (debias / 100) * 65));
    const beneficenceScore = Math.min(100, Math.round(globalSurvival * 1.1));
    const nonMaleficenceScore = Math.min(100, Math.round(100 - (parseFloat(errVulnerable) * 1.8)));

    document.getElementById('val-debias').textContent = `${debias}%`;
    document.getElementById('val-threshold').textContent = `${threshold}%`;

    document.getElementById('stat-survival').textContent = `${globalSurvival}%`;
    document.getElementById('stat-disparate').textContent = `${disparateImpact}`;
    document.getElementById('stat-err-vuln').textContent = `${errVulnerable}%`;
    document.getElementById('stat-err-priv').textContent = `${errPrivileged}%`;

    document.getElementById('bar-justice').style.width = `${justiceScore}%`;
    document.getElementById('bar-beneficence').style.width = `${beneficenceScore}%`;
    document.getElementById('bar-nonmaleficence').style.width = `${nonMaleficenceScore}%`;

    document.getElementById('score-justice').textContent = `${justiceScore}/100`;
    document.getElementById('score-beneficence').textContent = `${beneficenceScore}/100`;
    document.getElementById('score-nonmaleficence').textContent = `${nonMaleficenceScore}/100`;

    const verdictEl = document.getElementById('sim-verdict');
    if (verdictEl) {
      if (debias < 30) {
        verdictEl.className = 'p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-red-300 text-sm';
        verdictEl.innerHTML = `<strong>⚠️ Postura Utilitarista Extrema (Violación de Justicia):</strong> El sistema maximiza la supervivencia agregada (${globalSurvival}%), pero condena a la población vulnerable a una tasa de falso negativo inaceptable (${errVulnerable}%). Incumple el principio de <em>Justicia Distributiva</em> de Rawls y genera daño desproporcionado (<em>Maleficencia Algorítmica</em>).`;
      } else if (debias <= 75) {
        verdictEl.className = 'p-4 rounded-xl border border-sky-500/30 bg-sky-950/20 text-sky-200 text-sm';
        verdictEl.innerHTML = `<strong>⚖️ Ponderación Bioética Equilibrada (Postura Defendida):</strong> Se alcanza un ratio de impacto dispar aceptable (${disparateImpact}) mitigando drásticamente el sesgo histórico sin desmoronar la eficacia clínica global (${globalSurvival}%). Equilibrio viable entre <em>Beneficencia Macro</em> y <em>No Maleficencia Individual</em> bajo supervisión humana.`;
      } else {
        verdictEl.className = 'p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-200 text-sm';
        verdictEl.innerHTML = `<strong>🛡️ Postura Deontológica Estricta (Paridad Demográfica Forzada):</strong> Máxima equidad estadística (${disparateImpact}), pero con una ligera reducción de la tasa de supervivencia hospitalaria (${globalSurvival}%). Cumple con el imperativo categórico kantiano al no instrumentalizar a ningún grupo vulnerable.`;
      }
    }
  }

  debiasSlider.addEventListener('input', updateSimulation);
  thresholdSlider.addEventListener('input', updateSimulation);
  updateSimulation();
}

/* -------------------------------------------------------------
 * 5. INFOGRAFÍA NARRADA INTERACTIVA (Deliberación Bioética)
 * ------------------------------------------------------------- */
function initInfografiaNarrada() {
  const stepBtns = document.querySelectorAll('.narrativa-step-btn');
  const stepPanels = document.querySelectorAll('.narrativa-step-panel');
  const playNarratorBtn = document.getElementById('narrador-audio-btn');
  const narratorStatus = document.getElementById('narrador-status');

  if (!stepBtns.length) return;

  function setActiveStep(stepIndex) {
    stepBtns.forEach((btn, idx) => {
      if (idx === stepIndex) {
        btn.classList.add('active-step', 'bg-sky-600', 'text-white', 'border-sky-400');
        btn.classList.remove('bg-slate-800', 'text-slate-300', 'border-slate-700');
      } else {
        btn.classList.remove('active-step', 'bg-sky-600', 'text-white', 'border-sky-400');
        btn.classList.add('bg-slate-800', 'text-slate-300', 'border-slate-700');
      }
    });

    stepPanels.forEach((panel, idx) => {
      if (idx === stepIndex) {
        panel.classList.remove('hidden');
        panel.classList.add('block');
      } else {
        panel.classList.add('hidden');
        panel.classList.remove('block');
      }
    });
  }

  stepBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      setActiveStep(idx);
      playChime(350 + idx * 80);
    });
  });

  // Audio preview simulation tone
  let audioCtx = null;
  function playChime(freq = 440) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {}
  }

  if (playNarratorBtn) {
    let isPlaying = false;
    let stepTimer = null;
    let currentStep = 0;

    playNarratorBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      const playIcon = playNarratorBtn.querySelector('.play-narrator-icon');
      const pauseIcon = playNarratorBtn.querySelector('.pause-narrator-icon');

      if (isPlaying) {
        if (playIcon) playIcon.classList.add('hidden');
        if (pauseIcon) pauseIcon.classList.remove('hidden');
        if (narratorStatus) narratorStatus.textContent = 'Guía guiada activa • Avanzando por estaciones de deliberación';
        playChime(520);

        stepTimer = setInterval(() => {
          currentStep = (currentStep + 1) % stepBtns.length;
          setActiveStep(currentStep);
          playChime(420 + currentStep * 70);
        }, 5500);
      } else {
        if (playIcon) playIcon.classList.remove('hidden');
        if (pauseIcon) pauseIcon.classList.add('hidden');
        if (narratorStatus) narratorStatus.textContent = 'Lectura guiada pausada • Selecciona una estación manualmente';
        clearInterval(stepTimer);
      }
    });
  }
}

/* -------------------------------------------------------------
 * 6. MODAL DE VIDEO DE ENTREVISTA (Registro Audiovisual)
 * ------------------------------------------------------------- */
function initVideoModal() {
  const videoPlayBtn = document.getElementById('interview-video-play');
  const videoModal = document.getElementById('video-modal');
  const closeModalBtn = document.getElementById('close-video-modal');

  if (!videoPlayBtn || !videoModal) return;

  videoPlayBtn.addEventListener('click', () => {
    videoModal.classList.remove('hidden');
    videoModal.classList.add('flex');
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
    });
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
    }
  });
}

/* -------------------------------------------------------------
 * 7. REFERENCES LIVE SEARCH & APA CITATION CLIPBOARD
 * ------------------------------------------------------------- */
function initReferencesFilter() {
  const searchInput = document.getElementById('ref-search');
  const filterBtns = document.querySelectorAll('.ref-filter-btn');
  const refItems = document.querySelectorAll('.ref-item');
  const toast = document.getElementById('citation-toast');

  if (!refItems.length) return;

  function filterRefs() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const activeCategory = document.querySelector('.ref-filter-btn.active-filter')?.getAttribute('data-category') || 'all';

    refItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      const category = item.getAttribute('data-category');

      const matchesSearch = !query || text.includes(query);
      const matchesCategory = activeCategory === 'all' || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterRefs);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter', 'bg-sky-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.add('active-filter', 'bg-sky-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      filterRefs();
    });
  });

  // Copy citation buttons
  document.querySelectorAll('.copy-apa-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const citeText = btn.getAttribute('data-cite');
      if (citeText) {
        navigator.clipboard.writeText(citeText).then(() => {
          showToast("Cita en formato APA (7.ª ed.) copiada al portapapeles.");
        }).catch(() => {
          showToast("Copia manual: " + citeText.substring(0, 40) + "...");
        });
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 3200);
  }
}

/* -------------------------------------------------------------
 * 8. BIOETHICAL AUDIT CHECKLIST (Diagnostic Tool for Systems)
 * ------------------------------------------------------------- */
function initAuditChecklist() {
  const checkboxes = document.querySelectorAll('.audit-checkbox');
  const scoreResult = document.getElementById('audit-score');
  const levelBadge = document.getElementById('audit-level-badge');
  const feedbackEl = document.getElementById('audit-feedback');

  if (!checkboxes.length || !scoreResult) return;

  function calculateAudit() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    const percentage = Math.round((checkedCount / checkboxes.length) * 100);
    scoreResult.textContent = `${percentage}%`;

    if (percentage < 40) {
      levelBadge.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-red-900/60 text-red-300 border border-red-500/40';
      levelBadge.textContent = 'Riesgo Crítico / No Conforme';
      feedbackEl.textContent = 'El sistema presenta vulnerabilidades éticas severas: alta opacidad, sesgo no auditado y riesgo de vulnerar los principios de Justicia y No Maleficencia. Requiere suspensión inmediata según el marco AI Act.';
    } else if (percentage < 80) {
      levelBadge.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-amber-900/60 text-amber-300 border border-amber-500/40';
      levelBadge.textContent = 'Conformidad Parcial / En Observación';
      feedbackEl.textContent = 'El algoritmo cuenta con algunas salvaguardas técnicas, pero carece de trazabilidad explicable continua o mecanismos de objeción clínica independientes. Requiere regularización de equidad.';
    } else {
      levelBadge.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-500/40';
      levelBadge.textContent = 'Madurez Bioética Alta / Certificable';
      feedbackEl.textContent = 'El sistema satisface los criterios de Bioética por Diseño (Ethics by Design): auditoría continua de drift, explicabilidad clínica activa (XAI), paridad de falsos negativos y supervisión humana vinculante.';
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', calculateAudit));
  calculateAudit();
}
