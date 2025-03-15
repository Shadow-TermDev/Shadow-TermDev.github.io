export const renderSections = () => {
  fetch('../data/content.json')
    .then(response => {
      if (!response.ok) throw new Error('Error cargando contenido');
      return response.json();
    })
    .then(data => {
      const main = document.getElementById('app');
      
      data.sections.forEach(section => {
        const sectionHTML = `
          <section id="${section.id}" class="main ${section.id === 'inicio' ? 'active' : ''}">
            <h2>${section.title}</h2>
            ${section.cards ? renderCards(section.cards) : ''}
            ${section.links ? renderLinks(section.links) : ''}
            ${section.content ? `
              <p>${section.content}</p>
              <a href="#proyectos" class="btn-neon neon-border">
                ${section.button} <span class="icon">⟶</span>
              </a>
            ` : ''}
          </section>
        `;
        main.insertAdjacentHTML('beforeend', sectionHTML);
      });
    })
    .catch(error => console.error('Error:', error));
};

const renderCards = (cards) => {
  return cards.map(card => `
    <div class="proyecto-card neon-border">
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <a href="${card.link}" class="btn-neon neon-border">
        Visitar GitHub <span class="icon">⟶</span>
      </a>
    </div>
  `).join('');
};

const renderLinks = (links) => {
  return links.map(link => `
    <a href="${link.link}" class="link-card neon-border">
      <span class="link-icon">${link.icon}</span>
      <h3>${link.title}</h3>
      <p>${link.description}</p>
    </a>
  `).join('');
};


