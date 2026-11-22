// Mobile menu
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Estimate form
// On Netlify, submissions are collected automatically (see README).
// When running locally there is no form service, so we only show what would happen.
const form = document.getElementById('quoteForm');
const status = document.getElementById('formStatus');

function showStatus(text, kind) {
  status.textContent = text;
  status.className = 'form-status ' + kind;
  status.hidden = false;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let firstBad = null;
  for (const id of ['f-name', 'f-phone']) {
    const el = document.getElementById(id);
    const bad = !el.value.trim();
    el.setAttribute('aria-invalid', String(bad));
    if (bad && !firstBad) firstBad = el;
  }
  const email = document.getElementById('f-email');
  if (email.value && !email.checkValidity()) {
    email.setAttribute('aria-invalid', 'true');
    firstBad = firstBad || email;
  } else {
    email.removeAttribute('aria-invalid');
  }
  if (firstBad) {
    showStatus('Please add your name and phone number so we can reach you.', 'err');
    firstBad.focus();
    return;
  }

  const button = form.querySelector('button[type=submit]');
  button.disabled = true;
  button.textContent = 'Sending…';

  if (import.meta.env.DEV) {
    await new Promise((r) => setTimeout(r, 500));
    showStatus('Form works. Requests are delivered for real once the site is published on Netlify.', 'ok');
    button.disabled = false;
    button.textContent = 'Request my free estimate';
    return;
  }

  try {
    const body = new URLSearchParams(new FormData(form)).toString();
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    showStatus('Thanks! We got your request and will call you within one business day.', 'ok');
  } catch {
    showStatus("Sorry, that didn't send. Please call us at (555) 012-3456.", 'err');
  } finally {
    button.disabled = false;
    button.textContent = 'Request my free estimate';
  }
});
