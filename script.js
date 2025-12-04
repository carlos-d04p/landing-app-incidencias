document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
  const sections = document.querySelectorAll('.section');

  // Alternar menú móvil
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Cerrar menú al hacer clic en un enlace
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // Smooth scroll y active link
  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }

      // Quitar active de todos
      navItems.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Resaltar sección activa al hacer scroll
  const highlightActiveSection = () => {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => item.classList.remove('active'));
    if (currentId) {
      const activeLink = document.querySelector(`.nav-item[href="#${currentId}"], .mobile-nav-item[href="#${currentId}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  };

  window.addEventListener('scroll', highlightActiveSection);
  setTimeout(highlightActiveSection, 100);

  // Animación al hacer scroll (fade-in)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
});