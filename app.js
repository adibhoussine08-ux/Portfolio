// Persistance du thème
(function themePersistence() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') {
    toggle.checked = true;
  }
  toggle.addEventListener('change', () => {
    localStorage.setItem('theme', toggle.checked ? 'light' : 'dark');
  });
})();

// Carrousel
(function carousel() {
  const track = document.querySelector('.carousel-track');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  const scrollAmount = () => track.clientWidth * 0.85;

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
})();

// Filtrage des projets
(function filtering() {
  const radios = document.querySelectorAll('.filters input[type="radio"]');
  const cards = document.querySelectorAll('.project-card');
  function applyFilter() {
    const checked = document.querySelector('.filters input[type="radio"]:checked');
    const cat = checked.id.replace('filter-', ''); // all, web, java, python, go, ia
    cards.forEach(card => {
      const c = card.getAttribute('data-cat');
      const show = cat === 'all' || c === cat;
      card.style.display = show ? '' : 'none';
    });
  }
  radios.forEach(r => r.addEventListener('change', applyFilter));
  applyFilter();
})();

// Validation en temps réel
(function validation() {
  const form = document.getElementById('contact-form');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const errName = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const errMessage = document.getElementById('err-message');
  const status = document.getElementById('form-status');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validateName() {
    if (!name.value.trim()) { errName.textContent = "Le nom est requis."; return false; }
    errName.textContent = ""; return true;
  }
  function validateEmail() {
    if (!email.value.trim()) { errEmail.textContent = "L'email est requis."; return false; }
    if (!emailRegex.test(email.value.trim())) { errEmail.textContent = "Format d'email invalide."; return false; }
    errEmail.textContent = ""; return true;
  }
  function validateMessage() {
    const v = message.value.trim();
    if (!v) { errMessage.textContent = "Le message est requis."; return false; }
    if (v.length < 10) { errMessage.textContent = "Le message doit contenir au moins 10 caractères."; return false; }
    errMessage.textContent = ""; return true;
  }

  name.addEventListener('input', validateName);
  email.addEventListener('input', validateEmail);
  message.addEventListener('input', validateMessage);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = [validateName(), validateEmail(), validateMessage()].every(Boolean);
    if (!ok) {
      status.textContent = "Merci de corriger les erreurs.";
      status.style.color = "var(--danger)";
      return;
    }
    status.textContent = "Envoi en cours…";
    status.style.color = "inherit";

    // Simulation d'envoi (vous pouvez intégrer EmailJS ou un backend plus tard)
    setTimeout(() => {
      status.textContent = "Message envoyé avec succès. Merci pour votre contact !";
      status.style.color = "var(--success)";
      form.reset();
    }, 900);
  });
})();

// Compteur de visites
(function visitsCounter() {
  const key = 'visit-count';
  const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
  localStorage.setItem(key, count.toString());
  const el = document.getElementById('visit-counter');
  el.textContent = `Visites sur ce site : ${count}`;
})();

// Animations d'entrée via IntersectionObserver
(function inViewAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .section').forEach(el => observer.observe(el));
})();

// Styles pour .in-view (ajout dynamique)
(function injectInViewStyle() {
  const css = `
    .in-view { animation: fadeUp .5s ease forwards; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();
