document.getElementById('year').textContent = new Date().getFullYear();

/* Fermer le menu mobile après un clic sur un lien */
var navToggle = document.getElementById('nav-toggle');
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () { navToggle.checked = false; });
});

/* Animations au scroll (apparition des sections) */
var revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(function (el) { io.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('in-view'); });
}

/* Hero qui s'agrandit au scroll : la photo passe d'un format encadré au plein écran. */
var heroExpand = document.getElementById('heroExpand');
if (heroExpand) {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroExpand.style.setProperty('--p', 1);
  } else {
    var ticking = false;
    var updateHeroProgress = function () {
      var viewportHeight = document.documentElement.clientHeight;
      var rect = heroExpand.getBoundingClientRect();
      var total = heroExpand.offsetHeight - viewportHeight;
      var scrolled = -rect.top;
      var p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 1;
      heroExpand.style.setProperty('--p', p.toFixed(4));
      ticking = false;
    };
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateHeroProgress);
    };
    updateHeroProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }
}
