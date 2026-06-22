(function(){
  'use strict';
  let lang = localStorage.getItem('sb_lang') || 'de';

  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHamburger();
    initReveal();
    initLangToggle();
    applyLang(lang);
    initHeroReveal();
    initStickyBar();
    setActiveNav();
  });

  function initNavbar(){
    const nav = document.getElementById('navbar');
    if(!nav) return;
    const tick = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', tick, {passive:true});
    tick();
  }

  function initHamburger(){
    const btn = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if(!btn||!links) return;
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  function initReveal(){
    const els = document.querySelectorAll('.reveal');
    if(!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, {threshold:0.12});
    els.forEach(el => obs.observe(el));
  }

  function initHeroReveal(){
    document.querySelectorAll('.hero-content .reveal').forEach((el,i) => {
      setTimeout(() => el.classList.add('visible'), 150 + i*180);
    });
    setTimeout(() => {
      document.querySelectorAll('.usp-strip .reveal').forEach((el,i) => {
        setTimeout(() => el.classList.add('visible'), i*80);
      });
    }, 500);
  }

  function initStickyBar(){
    const bar = document.getElementById('stickyBar');
    if(!bar) return;
    const obs = new IntersectionObserver(entries => {
      bar.classList.toggle('visible', !entries[0].isIntersecting);
    }, {threshold:0});
    const hero = document.getElementById('hero');
    if(hero) obs.observe(hero);
  }

  function initLangToggle(){
    const btn = document.getElementById('langToggle');
    if(!btn) return;
    btn.textContent = lang === 'de' ? 'DE | EN' : 'EN | DE';
    btn.addEventListener('click', () => {
      lang = lang === 'de' ? 'en' : 'de';
      localStorage.setItem('sb_lang', lang);
      applyLang(lang);
      btn.textContent = lang === 'de' ? 'DE | EN' : 'EN | DE';
      document.documentElement.lang = lang;
    });
  }

  function applyLang(l){
    const attr = 'data-' + l;
    document.querySelectorAll('[data-de]').forEach(el => {
      const val = el.getAttribute(attr);
      if(val !== null){
        if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') el.placeholder = val;
        else el.textContent = val;
      }
    });
    document.documentElement.lang = l;
  }

  function setActiveNav(){
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      if(a.getAttribute('href') === path) a.classList.add('active');
    });
  }
})();
