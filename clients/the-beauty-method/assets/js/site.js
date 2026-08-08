/* The Beauty Method — the only script on the site.
   Three small jobs: the mobile menu, the hairline that appears under the
   header once the page scrolls, and the fade-up on section entry. Everything
   here is progressive: with JS off the menu is still reachable and every
   .reveal element is shown by the no-js rule below. */

(function () {
  'use strict'

  // Sections start hidden only once we know we can un-hide them.
  document.documentElement.classList.add('js')

  /* ---- mobile menu ---- */
  var toggle = document.querySelector('.nav-toggle')
  var nav = document.getElementById('site-nav')

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true'
      toggle.setAttribute('aria-expanded', String(!open))
      nav.setAttribute('data-open', String(!open))
    })

    // Escape closes it, and focus goes back to the button that opened it.
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return
      if (toggle.getAttribute('aria-expanded') !== 'true') return
      toggle.setAttribute('aria-expanded', 'false')
      nav.setAttribute('data-open', 'false')
      toggle.focus()
    })

    // Reopening on resize would leave the desktop nav stuck in the open state.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) {
        toggle.setAttribute('aria-expanded', 'false')
        nav.setAttribute('data-open', 'false')
      }
    })
  }

  /* ---- header hairline ---- */
  var header = document.querySelector('.site-header')

  if (header) {
    var setStuck = function () {
      header.setAttribute('data-stuck', String(window.scrollY > 8))
    }
    setStuck()
    window.addEventListener('scroll', setStuck, { passive: true })
  }

  /* ---- reveal on scroll ---- */
  var targets = document.querySelectorAll('.reveal')

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.setAttribute('data-shown', 'true') })
    return
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-shown', 'true')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  )

  targets.forEach(function (el) { observer.observe(el) })
})()
