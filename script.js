// ── SCROLL REVEAL ANIMATION ──
// Observes elements with the class "reveal" and adds "visible" when they enter the viewport

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger the reveal with a small delay per element
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));


// ── ACTIVE NAV LINK HIGHLIGHT ──
// Highlights the correct nav link based on the section currently in view

const sections = document.querySelectorAll('section[id], div[id="hero"]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active-nav'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-nav');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));


// ── CONTACT FORM SUBMISSION ──
// Shows a toast message on "Send Message" click

const sendBtn = document.getElementById('send-btn');

function showToast(message) {
  // Remove existing toast if any
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const nameInput = document.querySelector('.contact-form input[type="text"]');
    const emailInput = document.querySelector('.contact-form input[type="email"]');
    const message = document.querySelector('.contact-form textarea');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !message.value.trim()) {
      showToast('⚠️ Please fill in all fields before sending.');
      return;
    }

    showToast('✅ Message sent! Vaishali will get back to you soon.');

    // Clear the form
    nameInput.value = '';
    emailInput.value = '';
    document.querySelector('.contact-form input[placeholder="What\'s this about?"]').value = '';
    message.value = '';
  });
}


// ── SMOOTH SCROLL FOR NAV LINKS ──
// Ensures offset accounts for fixed navbar height

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
