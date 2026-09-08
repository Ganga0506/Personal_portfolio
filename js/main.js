(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.getAttribute('data-open') === 'true';
      navLinks.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight the nav link for the section currently in view
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.site-nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.setAttribute('aria-current', 'true');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();
