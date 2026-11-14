const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const formMessage = document.getElementById('formMessage');

  const setFieldState = (field, isValid, message) => {
    const errorEl = document.getElementById(`${field.id}Error`);
    field.classList.toggle('invalid', !isValid);

    if (errorEl) {
      errorEl.textContent = message;
    }
  };

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    const fields = {
      name: contactForm.querySelector('#name'),
      email: contactForm.querySelector('#email'),
      company: contactForm.querySelector('#company'),
      message: contactForm.querySelector('#message')
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const [key, field] of Object.entries(fields)) {
      const value = field.value.trim();
      let message = '';

      if (field.id === 'name' && value.length < 2) {
        message = 'Please provide your full name.';
        isValid = false;
      }

      if (field.id === 'email' && !emailPattern.test(value)) {
        message = 'Please enter a valid email address.';
        isValid = false;
      }

      if (field.id === 'company' && value.length < 2) {
        message = 'Please include your company name.';
        isValid = false;
      }

      if (field.id === 'message' && value.length < 20) {
        message = 'Please share a few more details about your project.';
        isValid = false;
      }

      setFieldState(field, !message, message);
    }

    if (formMessage) {
      formMessage.textContent = isValid
        ? 'Thank you! Your inquiry has been received and we will be in touch shortly.'
        : 'Please correct the highlighted fields and try again.';
      formMessage.className = `form-message ${isValid ? 'success' : 'error'}`;
    }

    if (isValid) {
      contactForm.reset();
    }
  });
}
