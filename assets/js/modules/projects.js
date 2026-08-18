const GITHUB_USER = 'Shadow-TermDev';
// Repos que no se cuentan como "proyectos" (el sitio y el perfil).
// Añade aquí cualquier repo que quieras excluir del contador y las tarjetas.
const EXCLUDED_REPOS = ['Shadow-TermDev.github.io', 'Shadow-TermDev'];
const CACHE_KEY = 'shadow-termdev-projects';
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

const getPublicRepos = async () => {
  // Caché en localStorage para no agotar el rate limit de la API pública
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return data;
    }
  } catch {
    // caché corrupta o localStorage no disponible: ignorar
  }

  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
  if (!res.ok) throw new Error(`Error de GitHub API: ${res.status}`);
  const data = await res.json();

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // localStorage no disponible: ignorar
  }

  return data;
};

const humanizeName = (name) => name.replace(/[_-]+/g, ' ');

const createCard = (repo) => {
  const card = document.createElement('div');
  card.className = 'project-card neon-card';

  const header = document.createElement('div');
  header.className = 'project-header';

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = humanizeName(repo.name);

  const badge = document.createElement('span');
  badge.className = 'project-badge';
  badge.textContent = repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : 'Public';

  header.appendChild(title);
  header.appendChild(badge);
  card.appendChild(header);

  const desc = document.createElement('p');
  desc.className = 'project-description';
  desc.textContent = repo.description || 'Proyecto open source de Shadow-TermDev.';
  card.appendChild(desc);

  if (repo.language) {
    const tags = document.createElement('div');
    tags.className = 'project-tags';

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = repo.language;
    tags.appendChild(tag);

    card.appendChild(tags);
  }

  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'neon-button primary';
  link.appendChild(document.createTextNode('Ver en GitHub '));

  const icon = document.createElement('span');
  icon.className = 'icon';
  icon.textContent = '→';
  link.appendChild(icon);

  card.appendChild(link);

  return card;
};

export const initProjects = async () => {
  const countEl = document.getElementById('projects-count');
  const container = document.getElementById('projects-container');
  if (!countEl || !container) return;

  try {
    const repos = await getPublicRepos();
    const filtered = repos.filter(
      (repo) => !repo.fork && !repo.archived && !EXCLUDED_REPOS.includes(repo.name)
    );

    countEl.textContent = `${filtered.length} proyectos públicos`;

    container.innerHTML = '';
    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'projects-empty';
      empty.textContent = 'Aún no hay proyectos públicos.';
      container.appendChild(empty);
    } else {
      filtered.forEach((repo) => container.appendChild(createCard(repo)));
    }
  } catch (error) {
    console.error('Error al cargar proyectos:', error);
    countEl.textContent = 'No se pudo cargar el número de proyectos';
    container.innerHTML = '';
    const errorMsg = document.createElement('p');
    errorMsg.className = 'projects-empty';
    errorMsg.textContent = 'No se pudieron cargar los proyectos.';
    container.appendChild(errorMsg);
  }
};