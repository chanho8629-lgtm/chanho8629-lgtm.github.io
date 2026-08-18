const reportItems = document.querySelectorAll('.main > .block, .main > .owner-box, .main > .hl-box');
reportItems.forEach(item => item.classList.add('report-reveal'));
const reportObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('report-visible');
    reportObserver.unobserve(entry.target);
  }
}), {threshold: .12});
reportItems.forEach(item => reportObserver.observe(item));

const reportVisual = document.querySelector('.project-visual');
let reportFrame = 0;
const renderReportVisual = () => {
  reportFrame = 0;
  if (!reportVisual || matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth <= 900) return;
  const progress = Math.min(1, Math.max(0, scrollY / innerHeight));
  reportVisual.style.transform = `perspective(1400px) rotateY(${-3 + progress * 3}deg) translateY(${progress * 22}px)`;
};
addEventListener('scroll', () => {
  if (!reportFrame) reportFrame = requestAnimationFrame(renderReportVisual);
}, {passive: true});
addEventListener('resize', renderReportVisual);
renderReportVisual();
