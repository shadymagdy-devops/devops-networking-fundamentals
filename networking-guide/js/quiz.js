let quizState = {
  current: 0,
  score: 0,
  answers: [],
  answered: false
};

function openQuiz() {
  quizState = { current: 0, score: 0, answers: [], answered: false };
  closeModal('completionModal');
  document.getElementById('quizModal').classList.add('open');
  renderQuestion();
}

function closeQuiz() {
  document.getElementById('quizModal').classList.remove('open');
}

function renderQuestion() {
  const card = document.getElementById('quizCard');
  const q = QUIZ[quizState.current];
  const pct = ((quizState.current) / QUIZ.length) * 100;
  const letters = ['A', 'B', 'C', 'D'];

  card.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-title">⚡ FINAL QUIZ</div>
      <button class="quiz-close" onclick="closeQuiz()">✕</button>
    </div>
    <div class="quiz-progress-wrap">
      <div class="quiz-progress-info">
        <span class="quiz-q-num">Question ${quizState.current + 1} of ${QUIZ.length}</span>
        <span>${quizState.score} correct so far</span>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${pct}%"></div>
      </div>
    </div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="quizOptions">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" onclick="selectAnswer(${i})">
          <span class="option-letter">${letters[i]}</span>
          ${opt}
        </button>
      `).join('')}
    </div>
    <div class="quiz-explanation" id="quizExplanation">💡 ${q.explanation}</div>
    <button class="quiz-next-btn" id="quizNextBtn" onclick="nextQuestion()">
      ${quizState.current + 1 < QUIZ.length ? 'NEXT QUESTION →' : 'SEE RESULTS →'}
    </button>
  `;
}

function selectAnswer(index) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = QUIZ[quizState.current];
  const options = document.querySelectorAll('.quiz-option');

  options.forEach(opt => opt.disabled = true);

  options[index].classList.add(index === q.answer ? 'correct' : 'wrong');
  if (index !== q.answer) {
    options[q.answer].classList.add('correct');
  }

  if (index === q.answer) quizState.score++;
  quizState.answers.push({ selected: index, correct: q.answer });

  document.getElementById('quizExplanation').classList.add('show');
  document.getElementById('quizNextBtn').classList.add('show');
}

function nextQuestion() {
  quizState.current++;
  quizState.answered = false;

  if (quizState.current >= QUIZ.length) {
    renderResult();
  } else {
    renderQuestion();
  }
}

function renderResult() {
  const card = document.getElementById('quizCard');
  const score = quizState.score;
  const total = QUIZ.length;
  const pct = Math.round((score / total) * 100);

  let grade, message, scoreClass;

  if (pct >= 87) {
    grade = 'EXCELLENT';
    message = 'You have genuinely mastered DevOps networking fundamentals.';
    scoreClass = 'excellent';
  } else if (pct >= 60) {
    grade = 'GOOD WORK';
    message = 'Solid understanding. Review the questions you missed and retry.';
    scoreClass = 'good';
  } else {
    grade = 'KEEP GOING';
    message = 'Go back through the days, then retake the quiz. You will get there.';
    scoreClass = 'needs-work';
  }

  const shareText = buildShareText(score, total, pct);

  card.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-title">⚡ RESULTS</div>
      <button class="quiz-close" onclick="closeQuiz()">✕</button>
    </div>
    <div class="quiz-result">
      <div class="result-score ${scoreClass}">${pct}%</div>
      <div class="result-label">${grade}</div>
      <div class="result-message">${message}</div>
      <div class="result-breakdown">
        <div class="breakdown-item">
          <span class="breakdown-num correct-num">${score}</span>
          <span class="breakdown-label">CORRECT</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-num wrong-num">${total - score}</span>
          <span class="breakdown-label">WRONG</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-num" style="color:var(--accent)">${total}</span>
          <span class="breakdown-label">TOTAL</span>
        </div>
      </div>
      <div class="share-section">
        <div class="share-card">
          <strong>${score}/${total} (${pct}%)</strong> on the DevOps Networking Quiz<br>
          7-day study plan by Shady Magdy<br>
          github.com/shadymagdy-devops/devops-networking-fundamentals
        </div>
        <button class="share-btn" onclick="copyShare()">
          📋 Copy Score to Share
        </button>
      </div>
      <div class="result-actions">
        <button class="btn-primary" onclick="retakeQuiz()">RETAKE QUIZ</button>
        <button class="btn-secondary" onclick="closeQuiz()">Back to Study</button>
      </div>
    </div>
  `;

  window._shareText = shareText;
}

function buildShareText(score, total, pct) {
  const stars = pct >= 87 ? '🏆' : pct >= 60 ? '✅' : '📚';
  return `${stars} I scored ${score}/${total} (${pct}%) on the DevOps Networking Fundamentals Quiz!\n\n7-day hands-on networking study plan covering IP, Subnetting, DNS, Firewalls, Load Balancers, TLS, and AWS VPC.\n\nStudy guide by Shady Magdy:\ngithub.com/shadymagdy-devops/devops-networking-fundamentals`;
}

function copyShare() {
  navigator.clipboard.writeText(window._shareText).then(() => {
    const btn = document.querySelector('.share-btn');
    btn.textContent = '✓ Copied!';
    btn.style.color = 'var(--accent3)';
    btn.style.borderColor = 'var(--accent3)';
    setTimeout(() => {
      btn.innerHTML = '📋 Copy Score to Share';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  });
}

function retakeQuiz() {
  quizState = { current: 0, score: 0, answers: [], answered: false };
  renderQuestion();
}
