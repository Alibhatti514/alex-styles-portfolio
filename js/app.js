'use strict';

const projects = [
  {
    title: 'Forma Studio',
    category: 'BRAND IDENTITY / 2025',
    description:
      'A flexible visual identity for a contemporary creative studio. The system combines expressive typography, a grounded natural palette, and a distinctive monogram to make the brand recognizable at every scale.',
    tags: ['Logo design', 'Brand strategy', 'Typography'],
  },
  {
    title: 'Solstice',
    category: 'PACKAGING & ART DIRECTION / 2025',
    description:
      'A warm, optimistic concept for a slow-living lifestyle brand. Sun-inspired geometry and a soft color palette create a distinctive identity across packaging and campaigns.',
    tags: ['Packaging', 'Art direction', 'Visual identity'],
  },
  {
    title: 'Offset Magazine',
    category: 'EDITORIAL DESIGN / 2024',
    description:
      'An independent creative journal celebrating emerging voices in art and culture. An unapologetic typographic system gives each story room to stand out.',
    tags: ['Editorial', 'Print design', 'Typography'],
  },
  {
    title: 'Morrow Digital',
    category: 'WEB EXPERIENCE / 2024',
    description:
      'A modern digital concept centered on clarity, accessibility, and considered interaction. The interface pairs an understated visual language with a responsive layout.',
    tags: ['Web design', 'UI/UX', 'Creative direction'],
  },
];

const dialog = document.querySelector('#project-dialog');
let lastTrigger = null;

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[Number(button.dataset.project)];
    if (!project) return;

    lastTrigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-description').textContent = project.description;
    document.querySelector('#dialog-tags').replaceChildren(
      ...project.tags.map((tag) => {
        const span = document.createElement('span');
        span.textContent = tag;
        return span;
      }),
    );
    dialog.showModal();
  });
});

function closeDialog() {
  dialog.close();
  lastTrigger?.focus();
}

document.querySelector('#close-dialog').addEventListener('click', closeDialog);
document.querySelector('#dialog-done').addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});

const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.textContent = open ? '✕' : '☰';
});

links.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    menu.textContent = '☰';
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector('#form-status');

  if (!form.reportValidity()) {
    status.textContent =
      'Please complete all fields with a valid email and a message of at least 10 characters.';
    return;
  }

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !email || message.length < 10) {
    status.textContent =
      'Please complete all fields with a message of at least 10 characters.';
    return;
  }

  const subject = encodeURIComponent('Portfolio inquiry from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  status.textContent =
    'Your email app should open with a prepared message. This demo does not send or store submissions.';
  window.location.href = `mailto:hello@alexstyles.example?subject=${subject}&body=${body}`;
});
