/* =====================================================================
   simpli cafe — progressive enhancement only.
   Every page reads and works with JavaScript switched off; this file
   adds the live bits on top. No dependencies, no build step.
   ===================================================================== */

(function () {
  'use strict';

  // Marks the document so CSS can hide the reveal elements. Done here, not
  // in the stylesheet, so a visitor without JS never gets invisible content.
  document.documentElement.classList.add('js');

  var LANG = document.documentElement.lang === 'el' ? 'el' : 'en';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Opening hours ------------------------------------------------
     PLACEHOLDER — replace with the café's real hours, and keep them in
     step with the table on the contact page and the JSON-LD on the home
     pages. Times are 24h in Athens time; a day with no entry is closed. */
  var HOURS = {
    1: ['07:00', '20:00'], // Monday
    2: ['07:00', '20:00'],
    3: ['07:00', '20:00'],
    4: ['07:00', '20:00'],
    5: ['07:00', '21:00'], // Friday
    6: ['08:00', '21:00'], // Saturday
    // Sunday has no entry: closed.
  };

  var TZ = 'Europe/Athens';

  var STRINGS = {
    el: {
      openUntil: 'Ανοιχτά τώρα μέχρι τις ',
      opensToday: 'Ανοίγουμε σήμερα στις ',
      opensTomorrow: 'Ανοίγουμε αύριο στις ',
      opensOn: 'Ανοίγουμε ',
      at: ' στις ',
      days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
    },
    en: {
      openUntil: 'Open now until ',
      opensToday: 'Opens today at ',
      opensTomorrow: 'Opens tomorrow at ',
      opensOn: 'Opens ',
      at: ' at ',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
  };

  var t = STRINGS[LANG];

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
      if (now.minutes < toMinutes(today[0])) {
        return { open: false, label: t.opensToday + today[0] };
      }
      if (now.minutes < toMinutes(today[1])) {
        return { open: true, label: t.openUntil + today[1] };
      }
    }

    // Closed for the day — find the next day we open.
    for (var i = 1; i <= 7; i++) {
      var index = (now.day + i) % 7;
      var next = HOURS[index];
      if (next) {
        var label =
          i === 1 ? t.opensTomorrow + next[0] : t.opensOn + t.days[index] + t.at + next[0];
        return { open: false, label: label };
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
    });
  }

  // Highlight today's row in the hours table (<tr data-day="1,2,3,4">).
  function paintToday() {
    var day = String(athensNow().day);
    document.querySelectorAll('tr[data-day]').forEach(function (row) {
      if (row.getAttribute('data-day').split(',').indexOf(day) !== -1) {
        row.setAttribute('data-today', 'true');
      }
    });
  }

  /* --- Header lifts off the page once it has scrolled --------------- */
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
  year();
})();
