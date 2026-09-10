const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const year = document.querySelector('#year');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

year.textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const bookingForm = document.querySelector('#booking-form');
const bookingDate = document.querySelector('#booking-date');

if (bookingDate) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  bookingDate.min = localDate;
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);
    const value = (key) => String(data.get(key) || '').trim();
    const requests = value('requests') || 'None';

    const subject = `Booking Request — ${value('experience')} — ${value('date')}`;
    const body = [
      'Hi Hawaii Ocean Travel,',
      '',
      'I would like to request availability for:',
      '',
      `Experience: ${value('experience')}`,
      `Preferred date: ${value('date')}`,
      `Preferred time: ${value('time')}`,
      `Number of guests: ${value('guests')}`,
      '',
      `Name: ${value('name')}`,
      `Phone: ${value('phone')}`,
      `Email: ${value('email')}`,
      '',
      `Special requests: ${requests}`,
      '',
      'Thank you.'
    ].join('\n');

    window.location.href = `mailto:hawaiioceantravel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
