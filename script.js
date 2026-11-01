/* Coastra: small enhancements. The page still works without this file. */
(function () {
  'use strict';

  var root = document.documentElement;
  var forEach = function (list, fn) { Array.prototype.forEach.call(list, fn); };
  root.classList.add('js');

  /* ---------- mobile menu ---------- */

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function setOpen(open, returnFocus) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
    if (!open && returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !isOpen();
      setOpen(open);
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus();
      }
    });

    // close after choosing a section
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && isOpen()) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) setOpen(false, true);
    });

    document.addEventListener('click', function (event) {
      if (isOpen() && !event.target.closest('.site-header')) setOpen(false);
    });

    var desktop = window.matchMedia('(min-width: 960px)');
    var closeOnDesktop = function (mq) {
      if (mq.matches && isOpen()) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', closeOnDesktop);
    else if (desktop.addListener) desktop.addListener(closeOnDesktop);
  }

  /* ---------- filter the collection by shape ---------- */

  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.product');
  var groups = document.querySelectorAll('.colourway');
  var status = document.getElementById('filter-status');

  function applyFilter(shape) {
    var shown = 0;

    forEach(cards, function (card) {
      var match = shape === 'all' || card.getAttribute('data-shape') === shape;
      card.hidden = !match;
      if (match) shown += 1;
    });

    // hide a colourway when none of its designs match
    forEach(groups, function (group) {
      group.hidden = !group.querySelector('.product:not([hidden])');
    });

    forEach(chips, function (chip) {
      chip.setAttribute('aria-pressed', chip.getAttribute('data-filter') === shape ? 'true' : 'false');
    });

    if (status) {
      status.textContent = shape === 'all'
        ? 'Showing all ' + shown + ' designs'
        : 'Showing ' + shown + ' ' + shape + ' design' + (shown === 1 ? '' : 's');
    }
  }

  forEach(chips, function (chip) {
    chip.addEventListener('click', function () {
      applyFilter(chip.getAttribute('data-filter'));
    });
  });

  /* ---------- cards are "placed" on the mat as they scroll in ---------- */

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealables = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && !reduceMotion && revealables.length) {
    root.classList.add('reveal-ready');

    var revealer = new IntersectionObserver(function (entries) {
      var order = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = order * 80;
        order += 1;
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-in');
        revealer.unobserve(el);
        // drop the stagger afterwards so hover-straightening isn't delayed
        window.setTimeout(function () { el.style.transitionDelay = ''; }, delay + 700);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    forEach(revealables, function (el) { revealer.observe(el); });
  }

  /* ---------- highlight the section you're in ---------- */

  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if ('IntersectionObserver' in window && navLinks.length) {
    var linkFor = {};
    forEach(navLinks, function (link) {
      linkFor[link.getAttribute('href').slice(1)] = link;
    });

    var markCurrent = function (id) {
      forEach(navLinks, function (link) { link.removeAttribute('aria-current'); });
      if (linkFor[id]) linkFor[id].setAttribute('aria-current', 'location');
    };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markCurrent(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    forEach(document.querySelectorAll('main > section[id]'), function (section) {
      spy.observe(section);
    });

    // the footer is too short to reach the middle of the screen, so check for the page end
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        var atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atEnd) markCurrent('contact');
      });
    }, { passive: true });
  }
})();
