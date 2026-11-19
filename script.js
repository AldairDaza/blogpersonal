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
const revealItems = document.querySelectorAll('.about-content, .project-card, .hobby-card, .contact-panel');
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
const gamesAlbum = document.querySelector('#games-album');
const seriesAlbum = document.querySelector('#series-album');
const closeButtons = document.querySelectorAll('.album-close');
const departmentGrid = document.querySelector('#department-grid');
const departments = ['Amazonas','Áncash','Apurímac','Arequipa','Ayacucho','Cajamarca','Callao','Cusco','Huancavelica','Huánuco','Ica','Junín','La Libertad','Lambayeque','Lima','Loreto','Madre de Dios','Moquegua','Pasco','Piura','Puno','San Martín','Tacna','Tumbes','Ucayali'];
const visitedDepartments = ['La Libertad','Lambayeque','Cusco','Lima','Loreto','Áncash'];
const travelReference = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80';
const travelImages = {'La Libertad':'media/pasatiempos/trujillo.jpg','Lambayeque':'media/pasatiempos/chiclayo.jpg','Cusco':'media/pasatiempos/images.jpg','Lima':'media/pasatiempos/lima.jpg','Loreto':'media/pasatiempos/loreto.jpg','Áncash':'media/pasatiempos/huaraz.jpg'};

if (departmentGrid) {
  departmentGrid.innerHTML = departments.map((name) => {
    const visited = visitedDepartments.includes(name);
    const image = travelImages[name] || travelReference;
    return `<button class="department-card ${visited ? 'visited' : 'pending'}" type="button" data-department="${name}"><span class="department-photo" style="background-image:url('${encodeURI(image)}')"></span><span class="department-name">${name}</span><small>${visited ? 'Visitado' : 'Foto pendiente'}</small></button>`;
  }).join('');
}
const allAlbums = [album, gamesAlbum, seriesAlbum].filter(Boolean);
const showAlbum = (target) => { allAlbums.forEach((item) => { item.classList.toggle('is-open', item === target); item.setAttribute('aria-hidden', item === target ? 'false' : 'true'); }); target?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
const hideAlbums = () => allAlbums.forEach((item) => { item.classList.remove('is-open'); item.setAttribute('aria-hidden', 'true'); });
const openAlbum = () => showAlbum(album);
travelCard?.addEventListener('click', openAlbum);
travelCard?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openAlbum(); } });
gamesCard?.addEventListener('click', () => showAlbum(gamesAlbum));
gamesCard?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showAlbum(gamesAlbum); } });
const seriesCard = document.querySelector('.hobby-series');
seriesCard?.addEventListener('click', () => showAlbum(seriesAlbum));
seriesCard?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showAlbum(seriesAlbum); } });
closeButtons.forEach((button) => button.addEventListener('click', () => { const target = document.querySelector(`#${button.dataset.close || 'travel-album'}`); target?.classList.remove('is-open'); target?.setAttribute('aria-hidden', 'true'); }));
album?.addEventListener('click', (event) => { if (event.target === album) hideAlbums(); });
allAlbums.filter((item) => item !== album).forEach((item) => item.addEventListener('click', (event) => { if (event.target === item) hideAlbums(); }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hideAlbums(); });

const games = ['Apex Legends','Dota 2','Smite 2','ARK: Survival Ascended','God of War','The Binding of Isaac'];
const series = ['From','Lost','The Flash','The Good Doctor','CSI: Miami','Shingeki no Kyojin','Nanatsu no Taizai'];
const gameImages = {'Dota 2':'media/videojuegos/dota.jpg','Smite 2':'media/videojuegos/smite-2.jpg','ARK: Survival Ascended':'media/videojuegos/ark survival ascended.jpg','God of War':'media/videojuegos/god of war.jpg','The Binding of Isaac':'media/videojuegos/the binding of isaac.jpg'};
const seriesImages = {'From':'media/series/from.jpg','Lost':'media/series/lost.jpg','The Flash':'media/series/flash.jpg','The Good Doctor':'media/series/the good doctor.jpg','Shingeki no Kyojin':'media/series/shingeki no kyoying.jpg','Nanatsu no Taizai':'media/series/nanatzu.jpg'};
const gamesGrid = document.querySelector('#games-grid');
const seriesGrid = document.querySelector('#series-grid');
const imageStyle = (path) => path ? `style="background-image:url('${encodeURI(path)}')"` : '';
if (gamesGrid) gamesGrid.innerHTML = games.map((name, index) => `<a class="media-card game-${index}" ${imageStyle(gameImages[name])} href="https://store.steampowered.com/search/?term=${encodeURIComponent(name)}" target="_blank" rel="noreferrer"><span class="media-card-copy"><strong>${name}</strong><small>Buscar en Steam ↗</small></span></a>`).join('');
if (seriesGrid) seriesGrid.innerHTML = series.map((name, index) => `<article class="media-card series-${index}" ${imageStyle(seriesImages[name])}><span class="media-card-copy"><strong>${name}</strong><small>${seriesImages[name] ? 'Imagen añadida' : 'Imagen pendiente'}</small></span></article>`).join('');

const stackGrid = document.querySelector('#stack-grid');
const stackItems = [
  ['Py','Python','Lenguaje','lenguajes'], ['JS','JavaScript','Lenguaje','lenguajes'], ['<>','HTML / CSS','Lenguaje web','lenguajes'],
  ['Git','Git / GitHub','Control de versiones','herramientas'], ['GC','Google Cloud','Cloud','herramientas'], ['VS','VS Code','Editor','herramientas'],
];
if (stackGrid) stackGrid.innerHTML = stackItems.map(([mark, name, type, group]) => `<article class="stack-card" data-group="${group}"><span class="stack-mark">${mark}</span><div><strong>${name}</strong><small>${type}</small></div></article>`).join('');

const typingTarget = document.querySelector('#typing-text');
const typingPhrases = ['creando experiencias digitales', 'explorando inteligencia artificial', 'diseñando ideas con propósito', 'aprendiendo mientras construyo'];
if (typingTarget) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) typingTarget.textContent = typingPhrases[0];
  else {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const typePhrase = () => {
      const phrase = typingPhrases[phraseIndex];
      typingTarget.textContent = phrase.slice(0, characterIndex);
      if (!deleting && characterIndex < phrase.length) { characterIndex += 1; setTimeout(typePhrase, 62); return; }
      if (!deleting) { deleting = true; setTimeout(typePhrase, 1700); return; }
      if (characterIndex > 0) { characterIndex -= 1; setTimeout(typePhrase, 32); return; }
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      setTimeout(typePhrase, 360);
    };
    typePhrase();
  }
}
