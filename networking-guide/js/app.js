let currentDay = 'day1';

function buildSidebar() {
  const nav = document.getElementById('sidebarNav');

  DAYS.forEach(day => {
    const wrapper = document.createElement('div');

    const btn = document.createElement('button');
    btn.className = 'nav-day-btn' + (day.completed ? ' completed' : '') + (day.id === currentDay ? ' active' : '');
    btn.innerHTML = `
      <span class="nav-day-num">${day.num}</span>
      <div class="nav-day-info">
        <span class="nav-day-title">${day.title}</span>
        <span class="nav-day-sub">${day.sub}</span>
      </div>
      <div class="nav-status"></div>
    `;
    btn.addEventListener('click', () => showPage(day.id, btn));

    const links = document.createElement('div');
    links.className = 'nav-section-links';
    day.sections.forEach(sec => {
      const link = document.createElement('button');
      link.className = 'nav-section-link';
      link.textContent = sec.title;
      link.addEventListener('click', () => scrollToSection(sec.id));
      links.appendChild(link);
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(links);
    nav.appendChild(wrapper);
  });
}

function buildPages() {
  const main = document.getElementById('mainContent');

  DAYS.forEach(day => {
    const page = document.createElement('div');
    page.className = 'page' + (day.id === currentDay ? ' active' : '');
    page.id = day.id;

    const sectionsHtml = day.sections.map(sec => `
      <div class="section-block" id="${sec.id}">
        <div class="block-title ${sec.color}">${sec.title}</div>
        ${CONTENT[sec.content] || ''}
      </div>
    `).join('');

    page.innerHTML = `
      <div class="page-header">
        <span class="page-eyebrow">${day.eyebrow}</span>
        <h1 class="page-title">${day.heading}<br><em>${day.headingEm}</em></h1>
        <p class="page-desc">${day.desc}</p>
      </div>
      ${sectionsHtml}
      <div class="status-bar">
        <div class="status-item"><div class="status-dot"></div>ubuntu-server — 192.168.64.3</div>
        <div class="status-item">AWS eu-west-2</div>
        <div class="status-item">github.com/shadymagdy-devops</div>
      </div>
    `;

    main.appendChild(page);
  });
}

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-day-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  btn.classList.add('active');

  currentDay = id;

  const index = DAYS.findIndex(d => d.id === id);
  const pct = Math.round(((index + 1) / DAYS.length) * 100);
  document.getElementById('progFill').style.width = pct + '%';
  document.getElementById('progPct').textContent = pct + '%';

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  buildPages();

  document.getElementById('mobileToggle').addEventListener('click', toggleSidebar);
});
