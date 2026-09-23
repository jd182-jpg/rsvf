/* =========================================================================
   RSVF site behaviour
   Dependency free. Everything renders from assets/js/data.js
   ========================================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------------------------------------------------------------------
     Year
     --------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Nav: stuck state, mobile drawer, active link
     --------------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var navLinks = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');
  var progress = document.getElementById('scrollProgress');

  function closeNav() {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('is-stuck', y > 40);

    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* rAF is suspended while the tab is hidden, so resync when it comes back */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { ticking = false; onScroll(); }
  });

  onScroll();

  /* Active section highlight */
  var sectionIds = ['fund', 'portfolio', 'team', 'story', 'contact'];
  var linkFor = {};
  sectionIds.forEach(function (id) {
    var a = navLinks.querySelector('a[href="#' + id + '"]');
    if (a) linkFor[id] = a;
  });

  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = linkFor[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          Object.keys(linkFor).forEach(function (k) { linkFor[k].classList.remove('is-active'); });
          a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionIds.forEach(function (id) {
      var s = document.getElementById(id);
      if (s) navObs.observe(s);
    });
  }

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */
  function bindReveal(root) {
    var items = (root || document).querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window) || reduced) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); o.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Metric count up
     --------------------------------------------------------------------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target) || reduced) return;

    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var dec = parseInt(el.dataset.dec || '0', 10);
    var raw = el.dataset.raw === '1';
    var dur = 1500;
    var start = null;

    function fmt(v) {
      var n = dec ? v.toFixed(dec) : Math.round(v).toString();
      if (!raw && !dec) n = Number(n).toLocaleString('en-US');
      return prefix + n + suffix;
    }

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    el.textContent = fmt(0);
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var mObs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); o.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.metric__val').forEach(function (el) { mObs.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Portfolio
     --------------------------------------------------------------------- */
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6"/></svg>';

  var LINKEDIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';

  function logoMarkup(c, cls) {
    if (!c.logo) return '<span class="wordmark">' + esc(c.name) + '</span>';
    return '<img src="' + esc(c.logo) + '" alt="' + esc(c.name) + '"' +
           (cls ? ' class="' + cls + '"' : '') + ' loading="lazy" decoding="async"' +
           ' onerror="this.outerHTML=\'<span class=&quot;wordmark&quot;>' + esc(c.name) + '</span>\'">';
  }

  var grid = document.getElementById('portfolioGrid');
  var empty = document.getElementById('portfolioEmpty');

  if (grid && typeof PORTFOLIO !== 'undefined') {
    grid.innerHTML = PORTFOLIO.map(function (c, i) {
      return '' +
        '<a class="pcard reveal" href="' + esc(c.url) + '" target="_blank" rel="noopener"' +
        ' data-sector="' + esc(c.sector) + '" style="--d:' + (i * 0.06).toFixed(2) + 's">' +
          '<div class="pcard__logo">' + logoMarkup(c) + '</div>' +
          '<div class="pcard__meta">' +
            '<span class="tag">' + esc(c.sector) + '</span>' +
            (c.stage ? '<span class="tag tag--stage">' + esc(c.stage) + '</span>' : '') +
          '</div>' +
          '<h3>' + esc(c.name) + '</h3>' +
          '<p>' + esc(c.blurb) + '</p>' +
          '<div class="pcard__foot">' +
            '<span class="pcard__loc">' + esc(c.location || '') + '</span>' +
            '<span class="pcard__link">Visit site' + ARROW + '</span>' +
          '</div>' +
        '</a>';
    }).join('');
  }

  var filters = document.querySelectorAll('.filter');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var want = btn.dataset.filter;
      var shown = 0;
      grid.querySelectorAll('.pcard').forEach(function (card) {
        var match = want === 'all' || card.dataset.sector === want;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* Portfolio marquee (list duplicated so the loop is seamless) */
  var track = document.getElementById('marqueeTrack');
  if (track && typeof PORTFOLIO !== 'undefined' && PORTFOLIO.length) {
    var one = PORTFOLIO.map(function (c) {
      return '<a class="marquee__item" href="' + esc(c.url) + '" target="_blank" rel="noopener"' +
             ' aria-label="' + esc(c.name) + '">' + logoMarkup(c) + '</a>';
    }).join('');
    /* repeat enough times to overflow wide screens, then duplicate for the loop */
    var reps = Math.max(2, Math.ceil(10 / PORTFOLIO.length));
    var half = new Array(reps).fill(one).join('');
    track.innerHTML = half + half;
  }

  /* ---------------------------------------------------------------------
     Team
     --------------------------------------------------------------------- */
  function initials(name) {
    var parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  var teamWrap = document.getElementById('teamGroups');
  if (teamWrap && typeof TEAM !== 'undefined') {
    teamWrap.innerHTML = TEAM.map(function (g) {
      var cards = g.people.map(function (p, i) {
        var tba = p.tba || !p.name;
        var photo = p.photo
          ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">'
          : '<span class="person__mono">' + (tba ? 'Open seat' : esc(initials(p.name))) + '</span>' +
            (tba ? '' : '<img class="person__owl" src="assets/img/logos/owl-white-256.png" alt="" aria-hidden="true">');

        var inner =
          '<div class="person__photo">' + photo +
            (p.linkedin ? '<span class="person__badge">' + LINKEDIN + '</span>' : '') +
          '</div>' +
          '<h4>' + (tba ? 'Recruiting' : esc(p.name)) + '</h4>' +
          '<p class="person__role">' + esc(p.role) + '</p>' +
          (p.sector ? '<span class="person__sector">' + esc(p.sector) + '</span>' : '');

        /* the whole card is the link when we have a profile, so the tap target is generous */
        var body = p.linkedin
          ? '<a class="person__link" href="' + esc(p.linkedin) + '" target="_blank" rel="noopener"' +
            ' aria-label="' + esc(p.name) + ' on LinkedIn">' + inner + '</a>'
          : inner;

        return '' +
          '<article class="person reveal' + (tba ? ' person--tba' : '') + '" style="--d:' + (i * 0.05).toFixed(2) + 's">' +
            body +
          '</article>';
      }).join('');

      return '' +
        '<div class="tgroup">' +
          '<div class="tgroup__head reveal">' +
            '<h3>' + esc(g.group) + '</h3>' +
            (g.caption ? '<p>' + esc(g.caption) + '</p>' : '') +
          '</div>' +
          '<div class="tgrid">' + cards + '</div>' +
        '</div>';
    }).join('');
  }

  /* ---------------------------------------------------------------------
     Contact form: compose a mailto
     --------------------------------------------------------------------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var d = new FormData(form);
      var name = (d.get('first') + ' ' + d.get('last')).trim();
      var company = (d.get('company') || '').trim();

      var subject = 'RSVF inquiry from ' + name + (company ? ' (' + company + ')' : '');
      var body = [
        'Name: ' + name,
        'Email: ' + d.get('email'),
        company ? 'Company: ' + company : null,
        'Reaching out as: ' + d.get('role'),
        '',
        d.get('message')
      ].filter(function (l) { return l !== null; }).join('\n');

      window.location.href = 'mailto:riceventurefund@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------------------------------------------------------------------
     Hero starfield
     --------------------------------------------------------------------- */
  var canvas = document.getElementById('stars');
  if (canvas && !reduced) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, raf = null;

    function size() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(150, Math.round((w * h) / 11000));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.25,
          a: Math.random() * 0.5 + 0.12,
          tw: Math.random() * 0.012 + 0.003,
          dir: Math.random() > 0.5 ? 1 : -1,
          drift: (Math.random() - 0.5) * 0.045
        });
      }
    }

    var last = 0;
    var FRAME = 1000 / 30;           /* 30fps is plenty for a slow twinkle, and halves the battery cost */

    function draw(ts) {
      raf = requestAnimationFrame(draw);
      if (ts && ts - last < FRAME) return;
      last = ts || 0;

      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.a += s.tw * s.dir;
        if (s.a > 0.68) { s.a = 0.68; s.dir = -1; }
        if (s.a < 0.08) { s.a = 0.08; s.dir = 1; }

        s.x += s.drift;
        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,212,227,' + s.a.toFixed(3) + ')';
        ctx.fill();
      }
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(size, 180);
    });

    /* pause the loop when the hero scrolls out of view */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && raf === null) { raf = requestAnimationFrame(draw); }
          else if (!en.isIntersecting && raf !== null) { cancelAnimationFrame(raf); raf = null; }
        });
      }).observe(canvas);
    }

    size();
    draw();
  }

  /* ---------------------------------------------------------------------
     Kick off reveals last, after all rendering
     --------------------------------------------------------------------- */
  bindReveal();
})();
