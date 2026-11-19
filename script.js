const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.site-nav a')];
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('.about-content, .project-card, .hobby-card, .featured-post, .blog article, .contact-panel');
revealItems.forEach((item) => item.classList.add('reveal-item'));
const revealObserver = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('is-visible');
  obs.unobserve(entry.target);
}), { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
