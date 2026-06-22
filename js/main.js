/**
 * Salon Bendella – Main JavaScript
 * Features: scroll-nav, reveal animations, language toggle, mobile menu
 */

(function () {
  'use strict';

  /* ── State ── */
  let currentLang = localStorage.getItem('sb_lang') || 'de';

  /* ── DOM Ready ── */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHamburger();
    initReveal();
    initLangToggle();
    applyLang(currentLang);
    initHeroReveal();
  });

  /* ── Navbar scroll ── */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile hamburger ── */
  function initHamburger() {
    const btn = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;
    btn.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal ── */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(el => observer.observe(el));
  }

  /* ── Hero immediate reveal ── */
  function initHeroReveal() {
    const heroItems = document.querySelectorAll('.hero-content .reveal');
    heroItems.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 200);
    });
    const uspItems = document.querySelectorAll('.usp-strip .reveal');
    setTimeout(() => {
      uspItems.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 100);
      });
    }, 600);
  }

  /* ── Language Toggle ── */
  function initLangToggle() {
    const btn = document.getElementById('langToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'de' ? 'en' : 'de';
      localStorage.setItem('sb_lang', currentLang);
      applyLang(currentLang);
      btn.textContent = currentLang === 'de' ? 'DE | EN' : 'EN | DE';
    });
    btn.textContent = currentLang === 'de' ? 'DE | EN' : 'EN | DE';
  }

  function applyLang(lang) {
    const attr = 'data-' + lang;
    document.querySelectorAll('[data-de]').forEach(el => {
      const val = el.getAttribute(attr);
      if (val !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });
    document.documentElement.lang = lang;
  }

  /* ── Active nav link ── */
  (function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  })();

})();
