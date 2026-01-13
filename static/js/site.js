// RoweTech Site JavaScript
(function() {
  'use strict';

  // ===========================================
  // Mobile Menu
  // ===========================================
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');

    if (!menuBtn || !mobileMenu) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close menu');

      // Animate hamburger to X
      const line1 = menuBtn.querySelector('.hamburger-line-1');
      const line2 = menuBtn.querySelector('.hamburger-line-2');
      const line3 = menuBtn.querySelector('.hamburger-line-3');

      if (line1) line1.classList.add('rotate-45', 'translate-y-[9px]');
      if (line2) line2.classList.add('opacity-0', 'scale-0');
      if (line3) line3.classList.add('-rotate-45', '-translate-y-[9px]');

      // Animate nav links with stagger
      const navLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
      navLinks.forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          link.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
          link.style.opacity = '1';
          link.style.transform = 'translateX(0)';
        }, 100 + (i * 50));
      });
    }

    function closeMenu() {
      isOpen = false;
      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');

      // Animate X back to hamburger
      const line1 = menuBtn.querySelector('.hamburger-line-1');
      const line2 = menuBtn.querySelector('.hamburger-line-2');
      const line3 = menuBtn.querySelector('.hamburger-line-3');

      if (line1) line1.classList.remove('rotate-45', 'translate-y-[9px]');
      if (line2) line2.classList.remove('opacity-0', 'scale-0');
      if (line3) line3.classList.remove('-rotate-45', '-translate-y-[9px]');
    }

    menuBtn.addEventListener('click', function() {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking nav links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMenu();
      }
    });
  }

  // ===========================================
  // Header Scroll Effect
  // ===========================================
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
      const currentScroll = window.scrollY;

      if (currentScroll > 20) {
        header.classList.add('bg-secondary-950/95', 'backdrop-blur-lg', 'border-b', 'border-primary-500/20');
        header.classList.remove('bg-secondary-950/80', 'backdrop-blur-md');
      } else {
        header.classList.remove('bg-secondary-950/95', 'backdrop-blur-lg', 'border-b', 'border-primary-500/20');
        header.classList.add('bg-secondary-950/80', 'backdrop-blur-md');
      }

      lastScroll = currentScroll;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===========================================
  // Scroll Animations
  // ===========================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale'
    );

    if (!animatedElements.length) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      animatedElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    // First, check which elements are already in view
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        el.classList.add('is-visible');
      }
      observer.observe(el);
    });

    // Add animate-ready class to body to enable animations
    // This ensures content is visible if JS fails to load
    requestAnimationFrame(() => {
      document.body.classList.add('animate-ready');
    });
  }

  // ===========================================
  // Image Lazy Loading with Reveal
  // ===========================================
  function initImageReveal() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(img => {
      img.classList.add('img-reveal');
      imageObserver.observe(img);
    });
  }

  // ===========================================
  // Gallery Filtering
  // ===========================================
  function initGalleryFilter() {
    const galleryFilters = document.getElementById('gallery-filters');
    const galleryGrid = document.getElementById('gallery-grid');

    if (!galleryFilters || !galleryGrid) return;

    galleryFilters.addEventListener('click', function(e) {
      const btn = e.target.closest('.gallery-filter');
      if (!btn) return;

      // Update active filter button
      galleryFilters.querySelectorAll('.gallery-filter').forEach(b => {
        b.classList.remove('active', 'bg-primary-500', 'text-white');
        b.classList.add('bg-secondary-800', 'text-secondary-300');
      });
      btn.classList.add('active', 'bg-primary-500', 'text-white');
      btn.classList.remove('bg-secondary-800', 'text-secondary-300');

      // Filter gallery items with animation
      const category = btn.dataset.category;
      const items = galleryGrid.querySelectorAll('.gallery-item');

      items.forEach((item, index) => {
        const shouldShow = category === 'all' || item.dataset.category === category;

        if (shouldShow) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  }

  // ===========================================
  // Smooth Scroll for Anchor Links
  // ===========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('header')?.offsetHeight || 80;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===========================================
  // Touch Feedback
  // ===========================================
  function initTouchFeedback() {
    // Add active state feedback for touch devices
    if (!('ontouchstart' in window)) return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .btn-secondary');
    buttons.forEach(btn => {
      btn.addEventListener('touchstart', () => btn.classList.add('touch-active'), { passive: true });
      btn.addEventListener('touchend', () => btn.classList.remove('touch-active'), { passive: true });
      btn.addEventListener('touchcancel', () => btn.classList.remove('touch-active'), { passive: true });
    });
  }

  // ===========================================
  // Page Transition
  // ===========================================
  function initPageTransition() {
    // Add page enter animation
    document.body.classList.add('page-enter');

    // Handle page navigation with smooth transition
    document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"])').forEach(link => {
      if (link.hostname === window.location.hostname) {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href && !href.startsWith('#')) {
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.2s ease-out';
            setTimeout(() => {
              window.location.href = href;
            }, 200);
          }
        });
      }
    });
  }

  // ===========================================
  // HTMX Integration
  // ===========================================
  function initHTMX() {
    // Re-initialize animations after HTMX swaps
    document.body.addEventListener('htmx:afterSwap', function(event) {
      initScrollAnimations();
      initImageReveal();
      initGalleryFilter();
    });

    // Show loading state
    document.body.addEventListener('htmx:beforeRequest', function(event) {
      event.target.classList.add('htmx-loading');
    });

    document.body.addEventListener('htmx:afterRequest', function(event) {
      event.target.classList.remove('htmx-loading');
    });
  }

  // ===========================================
  // Clerk Authentication
  // ===========================================
  function getClerkConfig() {
    const configEl = document.getElementById('clerk-config');
    if (!configEl) {
      return { enabled: false, publishableKey: '' };
    }

    return {
      enabled: configEl.dataset.clerkEnabled === 'true',
      publishableKey: configEl.dataset.clerkPublishableKey || ''
    };
  }

  function initClerk() {
    const config = getClerkConfig();
    if (!config.enabled) return;

    let attempts = 0;

    function mountClerk() {
      if (!window.Clerk || typeof window.Clerk.load !== 'function') {
        attempts += 1;
        if (attempts < 50) {
          setTimeout(mountClerk, 100);
        }
        return;
      }

      window.Clerk.load().then(() => {
        const signInEl = document.getElementById('clerk-sign-in');
        const signUpEl = document.getElementById('clerk-sign-up');
        const adminShell = document.getElementById('admin-shell');
        const adminLoading = document.getElementById('admin-auth-loading');
        const userButtonEl = document.getElementById('clerk-user-button');
        const userEmailEl = document.getElementById('clerk-user-email');

        if (signInEl && window.Clerk.user) {
          window.location.href = '/admin';
          return;
        }

        if (signInEl) {
          window.Clerk.mountSignIn(signInEl, {
            redirectUrl: '/admin',
            afterSignInUrl: '/admin'
          });
        }

        if (signUpEl) {
          window.Clerk.mountSignUp(signUpEl, {
            redirectUrl: '/admin',
            afterSignUpUrl: '/admin'
          });
        }

        if (userButtonEl && window.Clerk.user) {
          window.Clerk.mountUserButton(userButtonEl, {
            afterSignOutUrl: '/'
          });
        }

        if (userEmailEl && window.Clerk.user) {
          userEmailEl.textContent = window.Clerk.user.primaryEmailAddress?.emailAddress || 'Authenticated';
        }

        if (adminShell) {
          if (!window.Clerk.user) {
            window.location.href = '/sign-in';
            return;
          }
          adminShell.classList.remove('opacity-0');
          adminShell.classList.add('opacity-100');
          if (adminLoading) adminLoading.classList.add('hidden');
        }
      }).catch(() => {
        const adminLoading = document.getElementById('admin-auth-loading');
        if (adminLoading) {
          adminLoading.textContent = 'Unable to load authentication. Please refresh the page.';
        }
      });
    }

    mountClerk();
  }

  // ===========================================
  // Initialize Everything
  // ===========================================
  function init() {
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    initImageReveal();
    initGalleryFilter();
    initSmoothScroll();
    initTouchFeedback();
    initHTMX();
    initClerk();
    // Disabled page transition for now - can cause issues
    // initPageTransition();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
