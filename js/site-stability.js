(() => {
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
})();
