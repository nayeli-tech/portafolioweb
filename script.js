/* ============================================
   NAYELI VILCARIMA - Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------
  // NAVBAR: scroll effect + mobile toggle
  // ----------------------------------------
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ----------------------------------------
  // INTERSECTION OBSERVER: reveal animations
  // ----------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars when visible
        const bar = entry.target.querySelector('.skill-card__fill');
        if (bar) {
          const targetWidth = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = targetWidth + '%';
          }, 300);
        }
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ----------------------------------------
  // ACTIVE NAV LINK: highlight on scroll
  // ----------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = '#3b82f6';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  // ----------------------------------------
  // CONTACT FORM: validation + submit
  // ----------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="animation: spin 1s linear infinite;">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3"/>
          <path d="M12 3a9 9 0 019 9"/>
        </svg>
        Enviando...
      `;

      // Simulate sending (replace with actual backend call)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formSuccess.classList.add('show');
        contactForm.reset();

        // Hide success after 5s
        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      }, 1500);
    });

    // Real-time input validation style
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value.trim() && input.checkValidity()) {
          input.style.borderColor = '#22c55e';
        } else if (input.value.trim()) {
          input.style.borderColor = '#ef4444';
        }
      });
      input.addEventListener('focus', () => {
        input.style.borderColor = '#3b82f6';
      });
      input.addEventListener('input', () => {
        input.style.borderColor = '';
      });
    });
  }

  // ----------------------------------------
  // SMOOTH SCROLL for anchor links
  // ----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ----------------------------------------
  // HERO: stagger reveal on load
  // ----------------------------------------
  const heroElements = document.querySelectorAll('.hero .reveal');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });

  // ----------------------------------------
  // CSS animation for spinner (injected)
  // ----------------------------------------
  const style = document.createElement('style');
  style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);

});