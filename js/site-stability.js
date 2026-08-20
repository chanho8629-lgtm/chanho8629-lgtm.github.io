(() => {
  document.body.classList.add('interview-ready');

  // Keep the hero immediate, but defer below-the-fold portfolio imagery.
  document.querySelectorAll('main img').forEach(image => {
    const isHeroImage = Boolean(image.closest('.hero'));
    image.decoding = 'async';
    image.loading = isHeroImage ? 'eager' : 'lazy';
    image.fetchPriority = isHeroImage ? 'high' : 'low';
  });

  const heroCopy = document.querySelector('.hero > .reveal:not(.hero-visual)');
  if (heroCopy && !heroCopy.querySelector('.hero-positioning')) {
    const positioning = document.createElement('aside');
    positioning.className = 'hero-positioning';
    positioning.setAttribute('aria-label', '개발 방식과 구현 범위');
    positioning.innerHTML = `
      <span class="hero-positioning__label">BACKEND OWNER · AI-ASSISTED DEVELOPMENT</span>
      <strong>직접 구현한 백엔드 위에 AI를 연결했습니다.</strong>
      <p>AI 도구로 구현 속도를 높였고, 데이터 흐름·API 계약·예외 처리 로직을 검토해 면접에서 설명할 수 있습니다.</p>
      <div class="hero-positioning__proof">
        <span>CRUD · AUCTION · PAYMENT · S3</span>
        <span>FASTAPI · RAG · ML</span>
        <a class="hero-positioning__cta" href="bideo.html">대표 프로젝트 →</a>
        <a class="hero-positioning__cta hero-positioning__cta--ghost" href="https://github.com/chanho8629-lgtm">GitHub →</a>
      </div>`;
    heroCopy.append(positioning);
  }

  const heroBrief = document.querySelector('.hero-question__brief');
  if (heroBrief) {
    heroBrief.innerHTML = '<b>AI-ASSISTED / LOGIC-UNDERSTOOD</b><i></i><span>BUILD · REVIEW · CONNECT · EXPLAIN</span>';
  }

  const answerKicker = document.querySelector('.answer-kicker');
  if (answerKicker) answerKicker.textContent = 'Backend Owner · AI-Assisted Developer';

  const contactLead = document.querySelector('#contact .lead');
  if (contactLead) {
    contactLead.textContent = 'Spring Boot 백엔드를 직접 구현하고, AI 도구로 개발 속도를 높이면서 데이터·API·서비스 연결 로직을 이해하고 설명하는 개발자입니다.';
  }

  const aiSection = document.querySelector('#ai');
  if (aiSection) {
    const aiTitle = aiSection.querySelector('.section-title');
    const aiCopy = aiSection.querySelector('.section-copy');
    if (aiTitle) aiTitle.innerHTML = 'AI를 활용하되,<span>로직을 이해해 연결합니다.</span>';
    if (aiCopy) aiCopy.textContent = '생성형 AI 도구와 LLM·ML 모델을 활용해 구현했으며, 입력 데이터부터 모델 실행, FastAPI 요청·응답 계약, Spring Boot 서비스 연결까지의 흐름을 검토하고 설명할 수 있습니다.';

    if (!aiSection.querySelector('.ai-stance')) {
      const stance = document.createElement('div');
      stance.className = 'ai-stance';
      stance.innerHTML = `
        <article><small>01 · USE</small><strong>AI를 구현 도구로 활용</strong><p>반복 코드와 실험 속도는 높이되 결과를 그대로 사용하지 않고 서비스 조건에 맞춰 확인합니다.</p></article>
        <article><small>02 · UNDERSTAND</small><strong>입력부터 응답까지 이해</strong><p>전처리, 모델 목적, 추론 결과와 API 데이터 계약이 어떻게 이어지는지 설명합니다.</p></article>
        <article><small>03 · VERIFY</small><strong>백엔드 연결 로직 검증</strong><p>Spring Boot에서 호출하는 위치, 실패 처리와 사용자 기능에 반영되는 흐름을 점검합니다.</p></article>`;
      aiSection.querySelector('.ai-layout')?.before(stance);
    }
  }

  const stage = document.querySelector('.learning-stage');
  const depth = document.querySelector('main > section.section#learning');

  // Keep stable IDs in the final DOM even if older inline logic is cached.
  if (stage) stage.id = 'learning';
  if (depth) depth.id = 'learning-depth';

  const revealTarget = target => {
    if (!target) return;
    target.classList.add('deep-link-visible');
    target.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('visible', 'deep-link-visible');
    });
  };

  const moveToHash = ({ smooth = false } = {}) => {
    const hash = decodeURIComponent(location.hash || '');
    if (!hash || hash === '#home') return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    document.documentElement.classList.add('is-deep-link');
    revealTarget(target);
    target.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'auto' });
  };

  if (location.hash) {
    requestAnimationFrame(() => requestAnimationFrame(() => moveToHash()));
    addEventListener('load', () => setTimeout(() => moveToHash(), 80), { once: true });
  }

  addEventListener('hashchange', () => moveToHash({ smooth: true }));
  addEventListener('pageshow', () => {
    if (location.hash) moveToHash();
  });

  // Lightweight 3D depth for the hero. Transform-only motion keeps it responsive
  // and falls back to the static editorial layout for touch/reduced-motion users.
  const hero = document.querySelector('.hero');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  if (hero && finePointer.matches && !reduceMotion.matches) {
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    const renderDepth = () => {
      frame = 0;
      current.x += (target.x - current.x) * .085;
      current.y += (target.y - current.y) * .085;
      hero.style.setProperty('--hero-tilt-x', `${(-current.y * 3.2).toFixed(2)}deg`);
      hero.style.setProperty('--hero-tilt-y', `${(current.x * 4.4).toFixed(2)}deg`);
      hero.style.setProperty('--hero-card-tilt-x', `${(current.y * 1.45).toFixed(2)}deg`);
      hero.style.setProperty('--hero-card-tilt-y', `${(-current.x * 2).toFixed(2)}deg`);
      hero.style.setProperty('--hero-depth-x', `${(current.x * 13).toFixed(2)}px`);
      hero.style.setProperty('--hero-depth-y', `${(current.y * 9).toFixed(2)}px`);
      hero.style.setProperty('--hero-light-x', `${(50 + current.x * 18).toFixed(2)}%`);
      hero.style.setProperty('--hero-light-y', `${(42 + current.y * 14).toFixed(2)}%`);
      if (Math.abs(target.x - current.x) > .001 || Math.abs(target.y - current.y) > .001) {
        frame = requestAnimationFrame(renderDepth);
      }
    };
    const requestDepth = () => {
      if (!frame) frame = requestAnimationFrame(renderDepth);
    };
    hero.addEventListener('pointermove', event => {
      target.x = (event.clientX / innerWidth - .5) * 2;
      target.y = (event.clientY / innerHeight - .5) * 2;
      requestDepth();
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      target.x = 0;
      target.y = 0;
      requestDepth();
    }, { passive: true });
  }
})();
