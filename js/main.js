document.getElementById('year').textContent = new Date().getFullYear();

/* Fermer le menu mobile après un clic sur un lien */
var navToggle = document.getElementById('nav-toggle');
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () { navToggle.checked = false; });
});

/* Animations au scroll */
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
