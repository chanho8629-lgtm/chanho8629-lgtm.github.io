const revealItems = document.querySelectorAll('.reveal-ai');
const isDirectSectionEntry = Boolean(location.hash);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  if (isDirectSectionEntry) item.classList.add('is-visible');
  else revealObserver.observe(item);
});

const consolePanel = document.querySelector('.system-console');
let frame = 0;
const renderConsole = () => {
  frame = 0;
  if (!consolePanel || innerWidth <= 1050 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const progress = Math.min(1, Math.max(0, scrollY / innerHeight));
  consolePanel.style.transform = `perspective(1300px) rotateY(${-4 + progress * 4}deg) translateY(${progress * 20}px)`;
};

addEventListener('scroll', () => {
  if (!frame) frame = requestAnimationFrame(renderConsole);
}, { passive: true });
addEventListener('resize', renderConsole);
renderConsole();
