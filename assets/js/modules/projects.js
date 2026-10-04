const GITHUB_USER = 'Shadow-TermDev';
// Repos that are not counted as "projects" (the site and the profile).
// Add here any repo you want to exclude from the counter and the cards.
const EXCLUDED_REPOS = ['Shadow-TermDev.github.io', 'Shadow-TermDev'];
const CACHE_KEY = 'shadow-termdev-projects';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const getPublicRepos = async () => {
  // Cache in localStorage to avoid exhausting the public API rate limit
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return data;
    }
  } catch {
    // corrupt cache or localStorage unavailable: ignore
  }

  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
  if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);
  const data = await res.json();

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // localStorage unavailable: ignore
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
  desc.textContent = repo.description || 'Shadow-TermDev open source project.';
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
  link.appendChild(document.createTextNode('View on GitHub '));

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

    countEl.textContent = `${filtered.length} public projects`;

    container.innerHTML = '';
    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'projects-empty';
      empty.textContent = 'No public projects yet.';
      container.appendChild(empty);
    } else {
      filtered.forEach((repo) => container.appendChild(createCard(repo)));
    }
  } catch (error) {
    console.error('Error loading projects:', error);
    countEl.textContent = 'Could not load the project count';
    container.innerHTML = '';
    const errorMsg = document.createElement('p');
    errorMsg.className = 'projects-empty';
    errorMsg.textContent = 'Could not load the projects.';
    container.appendChild(errorMsg);
  }
};