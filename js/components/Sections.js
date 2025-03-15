export const renderSections = () => {
  fetch('../data/content.json')
    .then(response => response.json())
    .then(data => {
      const main = document.getElementById('app');
      
      data.sections.forEach(section => {
        const sectionHTML = `
          <section id="${section.id}" class="main ${section.id === 'inicio' ? 'active' : ''}">
            <h2>${section.title}</h2>
            ${section.cards ? renderCards(section.cards) : `
              <p>${section.content}</p>
              <a href="#proyectos" class="btn-neon neon-border">
                ${section.button} <span class="icon">⟶</span>
              </a>
            `}
          </section>
        `;
        main.insertAdjacentHTML('beforeend', sectionHTML);
      });
    });
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
