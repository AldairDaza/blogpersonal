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

// Sustituye esta URL por el enlace público exacto de tu perfil de Steam.
const STEAM_PROFILE_URL = 'https://steamcommunity.com/';
const travelCard = document.querySelector('.hobby-travel');
const gamesCard = document.querySelector('.hobby-games');
const album = document.querySelector('#travel-album');
const closeAlbum = document.querySelector('.album-close');
const departmentGrid = document.querySelector('#department-grid');
const departments = ['Amazonas','Áncash','Apurímac','Arequipa','Ayacucho','Cajamarca','Callao','Cusco','Huancavelica','Huánuco','Ica','Junín','La Libertad','Lambayeque','Lima','Loreto','Madre de Dios','Moquegua','Pasco','Piura','Puno','San Martín','Tacna','Tumbes','Ucayali'];
const visitedDepartments = [];
const travelReference = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80';

if (departmentGrid) {
  departmentGrid.innerHTML = departments.map((name) => {
    const visited = visitedDepartments.includes(name);
    return `<button class="department-card ${visited ? 'visited' : 'pending'}" type="button" data-department="${name}"><span class="department-photo" style="background-image:url('${travelReference}')"></span><span class="department-name">${name}</span><small>${visited ? 'Visitado' : 'Foto pendiente'}</small></button>`;
  }).join('');
}
const openAlbum = () => { album?.classList.add('is-open'); album?.setAttribute('aria-hidden', 'false'); };
const hideAlbum = () => { album?.classList.remove('is-open'); album?.setAttribute('aria-hidden', 'true'); };
travelCard?.addEventListener('click', openAlbum);
travelCard?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openAlbum(); } });
gamesCard?.addEventListener('click', () => window.open(STEAM_PROFILE_URL, '_blank', 'noopener,noreferrer'));
gamesCard?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); window.open(STEAM_PROFILE_URL, '_blank', 'noopener,noreferrer'); } });
closeAlbum?.addEventListener('click', hideAlbum);
album?.addEventListener('click', (event) => { if (event.target === album) hideAlbum(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hideAlbum(); });
