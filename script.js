/**
 * Tribute Page: Dr. A.P.J. Abdul Kalam – The Missile Man of India
 * JavaScript (ES6)
 * Handles mobile menu toggle, scroll spy for active navigation, and back-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileNavToggle.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileNavToggle.classList.remove('open');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 2. Header Scroll Effect & Back-to-Top Button
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header styling on scroll
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Scroll Spy for Active Navigation Link
  const sections = document.querySelectorAll('section[id], header[id]');

  function updateActiveNav() {
    const scrollPosition = (window.scrollY || window.pageYOffset) + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // 4. Portrait Image Load Verification / Fallback
  const portraitImg = document.getElementById('kalamPortrait');
  if (portraitImg) {
    portraitImg.addEventListener('error', function () {
      console.warn('Primary portrait image failed to load. Falling back to high-res Wikimedia mirror.');
      // Backup reliable Wikimedia Commons mirror
      this.src = 'https://upload.wikimedia.org/wikipedia/commons/b/b0/A._P._J._Abdul_Kalam_in_2008.jpg';
    });
  }

  console.log('Tribute Page: Dr. A.P.J. Abdul Kalam loaded successfully.');
});
