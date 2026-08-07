/* =====================================================================
   simpli cafe — progressive enhancement only.
   Everything on this site reads and works with JavaScript switched off;
   this file adds the polish on top. No dependencies, no build step.
   ===================================================================== */

(function () {
  'use strict';

  // Marks the document so CSS can hide the reveal elements. Done here, not
  // in the stylesheet, so a visitor without JS never gets invisible content.
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Opening hours ------------------------------------------------
     PLACEHOLDER — replace with the café's real hours, and keep this in
     step with the tables in the markup. Times are 24h, in Athens time,
     and a day with no entry is a closed day: ['09:00', '17:00'].       */
  var HOURS = {
    1: ['07:00', '20:00'], // Monday
    2: ['07:00', '20:00'],
    3: ['07:00', '20:00'],
    4: ['07:00', '20:00'],
    5: ['07:00', '21:00'], // Friday
    6: ['08:00', '21:00'], // Saturday
    0: ['08:00', '18:00'], // Sunday
  };

  var TZ = 'Europe/Athens';

  // The café's own wall clock, whatever clock the visitor is reading from.
  function athensNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: TZ,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(new Date());

      var lookup = {};
      parts.forEach(function (p) {
        lookup[p.type] = p.value;
      });

      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return {
        day: days[lookup.weekday],
        minutes: parseInt(lookup.hour, 10) * 60 + parseInt(lookup.minute, 10),
      };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function toMinutes(hhmm) {
    var bits = hhmm.split(':');
    return parseInt(bits[0], 10) * 60 + parseInt(bits[1], 10);
  }

  function status() {
    var now = athensNow();
    var today = HOURS[now.day];

    if (today) {
      var open = toMinutes(today[0]);
      var close = toMinutes(today[1]);

      if (now.minutes < open) {
        return { open: false, label: 'Opens today at ' + today[0] };
      }
      if (now.minutes < close) {
        return { open: true, label: 'Open now until ' + today[1] };
      }
    }

    // Closed for the day — find the next day we are open.
    for (var i = 1; i <= 7; i++) {
      var next = HOURS[(now.day + i) % 7];
      if (next) {
        var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var when = i === 1 ? 'tomorrow' : names[(now.day + i) % 7];
        return { open: false, label: 'Opens ' + when + ' at ' + next[0] };
      }
    }
    return null;
  }

  function paintStatus() {
    var targets = document.querySelectorAll('[data-open-now]');
    if (!targets.length) return;

    var state = status();
    if (!state) return;

    targets.forEach(function (el) {
      el.textContent = state.label;
      el.setAttribute('data-state', state.open ? 'open' : 'closed');
      el.style.color = state.open ? 'var(--knot)' : '';
    });
  }

  // Highlight today's row in an hours table (<tr data-day="1">).
  function paintToday() {
    var day = athensNow().day;
    document.querySelectorAll('tr[data-day]').forEach(function (row) {
      var days = row.getAttribute('data-day').split(',');
      if (days.indexOf(String(day)) !== -1) row.setAttribute('data-today', 'true');
    });
  }

  /* --- Header shadow once the page has scrolled --------------------- */
  function stickyHeader() {
    var header = document.querySelector('.header');
    if (!header) return;

    var apply = function () {
      header.setAttribute('data-stuck', window.scrollY > 8 ? 'true' : 'false');
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
  }

  /* --- Reveal on scroll --------------------------------------------- */
  function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-in');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          // A small stagger keeps a row of cards from arriving as one slab.
          var delay = parseFloat(entry.target.getAttribute('data-delay') || '0');
          entry.target.style.transitionDelay = delay + 'ms';
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Contact form -------------------------------------------------
     There is no backend behind a static site, so a valid submission is
     handed to the visitor's mail client, pre-filled. Swap the handler
     for a Formspree / Netlify Forms endpoint when one exists — see the
     README. The <form action="mailto:…"> in the markup is the no-JS
     fallback and does the same thing, less tidily.                     */
  function contactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;

    var statusBox = form.querySelector('.form__status');

    var setError = function (field, message) {
      var wrap = field.closest('.field');
      var box = wrap.querySelector('.field__error');
      wrap.setAttribute('data-invalid', message ? 'true' : 'false');
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (box) box.textContent = message || '';
      return !message;
    };

    var validate = function () {
      var ok = true;
      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;

      ok = setError(name, name.value.trim() ? '' : 'Please tell us your name.') && ok;
      ok =
        setError(
          email,
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())
            ? ''
            : 'Please enter an email we can reply to.',
        ) && ok;
      ok = setError(message, message.value.trim().length > 4 ? '' : 'Please add a short message.') && ok;
      return ok;
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Honeypot: a real person never fills this in.
      if (form.elements.company && form.elements.company.value) return;

      if (!validate()) {
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      var to = (form.getAttribute('action') || '').replace('mailto:', '');
      var subject = 'Message from the simpli cafe website';
      var body =
        'Name: ' +
        form.elements.name.value.trim() +
        '\nEmail: ' +
        form.elements.email.value.trim() +
        '\n\n' +
        form.elements.message.value.trim();

      window.location.href =
        'mailto:' +
        to +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body);

      if (statusBox) {
        statusBox.textContent =
          'Thanks — your email app should be opening with the message ready to send.';
        statusBox.hidden = false;
      }
    });

    // Clear an error as soon as the visitor starts fixing it.
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        var wrap = field.closest('.field');
        if (wrap && wrap.getAttribute('data-invalid') === 'true') setError(field, '');
      });
    });
  }

  /* --- Year in the footer ------------------------------------------- */
  function year() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  paintStatus();
  paintToday();
  stickyHeader();
  reveal();
  contactForm();
  year();
})();
