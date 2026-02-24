let currentDay = 'day1';
let completedDays = new Set();
let dayChecks = {};

function initChecks() {
  DAYS.forEach(day => {
    dayChecks[day.id] = new Array(day.checks.length).fill(false);
  });
}

function buildParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 2 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 20 + 15) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    p.style.opacity = Math.random() * 0.5;
    if (Math.random() > 0.5) p.style.background = 'var(--accent3)';
    container.appendChild(p);
  }
}

function buildSidebar() {
  const nav = document.getElementById('sidebarNav');
  const dots = document.getElementById('progressDots');

  DAYS.forEach(day => {
    const dot = document.createElement('div');
    dot.className = 'progress-day-dot';
    dot.id = 'dot-' + day.id;
    dots.appendChild(dot);

    const wrap = document.createElement('div');
    wrap.className = 'nav-item-wrap';

    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (day.id === currentDay ? ' active' : '');
    btn.id = 'nav-' + day.id;
    btn.innerHTML = `
      <span class="nav-num">${day.num}</span>
      <div class="nav-info">
        <span class="nav-title">${day.title}</span>
        <span class="nav-sub">${day.sub}</span>
      </div>
      <div class="nav-check" id="navcheck-${day.id}"></div>
    `;
    btn.addEventListener('click', () => showPage(day.id));

    const subLinks = document.createElement('div');
    subLinks.className = 'nav-sub-links';
    day.sections.forEach(sec => {
      const link = document.createElement('button');
      link.className = 'nav-sub-link';
      link.textContent = sec.title;
      link.addEventListener('click', () => {
        const el = document.getElementById(sec.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      subLinks.appendChild(link);
    });

    wrap.appendChild(btn);
    wrap.appendChild(subLinks);
    nav.appendChild(wrap);
  });
}

function buildPages() {
  const main = document.getElementById('mainContent');

  DAYS.forEach(day => {
    const page = document.createElement('div');
    page.className = 'page' + (day.id === currentDay ? ' active' : '');
    page.id = day.id;

    const sections = day.sections.map(sec => `
      <div class="section-block" id="${sec.id}">
        <div class="block-title ${sec.color}">${sec.title}</div>
        ${CONTENT[sec.content] || ''}
      </div>
    `).join('');

    const checkItems = day.checks.map((text, i) => `
      <div class="check-item" id="check-${day.id}-${i}" onclick="toggleCheck('${day.id}', ${i})">
        <div class="check-box-ui" id="checkui-${day.id}-${i}"></div>
        <span class="check-item-text">${text}</span>
      </div>
    `).join('');

    page.innerHTML = `
      <div class="page-header">
        <span class="page-eyebrow">${day.eyebrow}</span>
        <h1 class="page-title">${day.heading}<br><em>${day.headingEm}</em></h1>
        <p class="page-desc">${day.desc}</p>
      </div>
      ${sections}
      <div class="day-checklist">
        <div class="checklist-title">Day ${day.num} — Knowledge Checklist</div>
        <div class="checklist-items">${checkItems}</div>
        <button class="day-complete-btn" id="completebtn-${day.id}" onclick="markDayComplete('${day.id}')">
          <span>Mark Day ${day.num} Complete</span>
          <span>→</span>
        </button>
      </div>
    `;

    main.appendChild(page);
  });
}

function toggleCheck(dayId, index) {
  dayChecks[dayId][index] = !dayChecks[dayId][index];

  const item = document.getElementById(`check-${dayId}-${index}`);
  const box = document.getElementById(`checkui-${dayId}-${index}`);

  if (dayChecks[dayId][index]) {
    item.classList.add('checked');
    box.textContent = '✓';
  } else {
    item.classList.remove('checked');
    box.textContent = '';
  }

  const allChecked = dayChecks[dayId].every(v => v);
  const btn = document.getElementById(`completebtn-${dayId}`);
  if (allChecked) {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
  }
}

function markDayComplete(dayId) {
  completedDays.add(dayId);

  const btn = document.getElementById(`completebtn-${dayId}`);
  btn.classList.add('completed', 'celebrating');
  btn.innerHTML = '<span>✓ Day Complete!</span><span>🎉</span>';
  setTimeout(() => btn.classList.remove('celebrating'), 500);

  const navBtn = document.getElementById('nav-' + dayId);
  navBtn.classList.add('done');

  const navCheck = document.getElementById('navcheck-' + dayId);
  navCheck.textContent = '✓';

  const dot = document.getElementById('dot-' + dayId);
  dot.classList.add('done');

  updateOverallProgress();

  if (completedDays.size === DAYS.length) {
    setTimeout(() => showCompletionModal(), 600);
  }
}

function updateOverallProgress() {
  const pct = Math.round((completedDays.size / DAYS.length) * 100);
  document.getElementById('overallFill').style.width = pct + '%';
  document.getElementById('overallPct').textContent = pct + '%';
}

function showCompletionModal() {
  const modal = document.getElementById('completionModal');
  const stats = document.getElementById('completionStats');

  stats.innerHTML = `
    <div class="completion-stat">
      <span class="completion-stat-num">7</span>
      <span class="completion-stat-label">DAYS</span>
    </div>
    <div class="completion-stat">
      <span class="completion-stat-num">${DAYS.reduce((a,d) => a + d.checks.length, 0)}</span>
      <span class="completion-stat-label">SKILLS</span>
    </div>
    <div class="completion-stat">
      <span class="completion-stat-num">15</span>
      <span class="completion-stat-label">QUIZ Qs</span>
    </div>
  `;

  launchFireworks();
  modal.classList.add('open');
}

function launchFireworks() {
  const container = document.getElementById('fireworks');
  const colors = ['#00e5ff', '#00ff88', '#ffaa00', '#7c3aed', '#ff4060'];

  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const f = document.createElement('div');
      f.className = 'firework';
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = 60 + Math.random() * 80;
      f.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      f.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
      f.style.background = colors[Math.floor(Math.random() * colors.length)];
      f.style.left = '50%';
      f.style.top = '30%';
      f.style.width = f.style.height = (3 + Math.random() * 4) + 'px';
      container.appendChild(f);
      setTimeout(() => f.remove(), 1000);
    }, i * 40);
  }
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  document.getElementById('nav-' + id).classList.add('active');

  const dot = document.getElementById('dot-' + id);
  document.querySelectorAll('.progress-day-dot').forEach(d => d.classList.remove('active'));
  if (!completedDays.has(id)) dot.classList.add('active');

  currentDay = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  initChecks();
  buildParticles();
  buildSidebar();
  buildPages();

  document.getElementById('mobileToggle').addEventListener('click', toggleSidebar);

  document.getElementById('dot-' + currentDay).classList.add('active');
});
