document.addEventListener('DOMContentLoaded', function () {
  /* Année dans le footer */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Fermer le menu mobile après un clic sur un lien */
  var navToggle = document.getElementById('nav-toggle');
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navToggle) navToggle.checked = false;
    });
  });

  /* Filtres du portfolio */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var show = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  /* Lightbox */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  function closeLightbox() { lightbox.classList.remove('active'); lightboxImg.src = ''; }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* Pré-remplir le formulaire depuis les boutons "Choisir cette formule" */
  var formuleSelect = document.getElementById('formule');
  document.querySelectorAll('[data-formule]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var value = btn.getAttribute('data-formule');
      if (formuleSelect) {
        var matched = Array.from(formuleSelect.options).some(function (opt) {
          if (opt.value === value) { formuleSelect.value = value; return true; }
          return false;
        });
        if (!matched) formuleSelect.value = value;
      }
    });
  });

  /* Slider de témoignages */
  var track = document.querySelector('.testimonial-track');
  var slides = document.querySelectorAll('.testimonial-card');
  var dotsContainer = document.querySelector('.slider-dots');
  var currentSlide = 0;
  var autoplayTimer;

  if (track && slides.length && dotsContainer) {
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Voir le témoignage ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goToSlide(i); });
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dotsContainer.querySelectorAll('button').forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function startAutoplay() {
      autoplayTimer = setInterval(function () { goToSlide(currentSlide + 1); }, 6000);
    }
    function stopAutoplay() { clearInterval(autoplayTimer); }

    startAutoplay();
    var sliderWrap = document.querySelector('.testimonial-slider');
    if (sliderWrap) {
      sliderWrap.addEventListener('mouseenter', stopAutoplay);
      sliderWrap.addEventListener('mouseleave', startAutoplay);
    }
  }

  /* Formulaire de contact : ouvre le client email de l'utilisateur avec le message pré-rempli.
     (Site statique hébergé sur GitHub Pages, sans serveur de traitement de formulaire.) */
  var CONTACT_EMAIL = 'a.plenard@yahoo.com';
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nom = form.nom.value.trim();
      var email = form.email.value.trim();
      var telephone = form.telephone.value.trim();
      var formule = form.formule.value;
      var date = form.date.value;
      var message = form.message.value.trim();

      if (!nom || !email || !message) {
        status.textContent = 'Merci de remplir les champs obligatoires (*).';
        status.className = 'form-status error';
        return;
      }

      var subject = 'Demande de contact — ' + nom;
      var bodyLines = [
        'Nom : ' + nom,
        'Email : ' + email,
        telephone ? 'Téléphone : ' + telephone : null,
        formule ? 'Formule souhaitée : ' + formule : null,
        date ? 'Date souhaitée : ' + date : null,
        '',
        'Message :',
        message
      ].filter(Boolean);

      var mailtoLink = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailtoLink;

      status.textContent = 'Votre client email va s\'ouvrir pour envoyer votre demande. Merci !';
      status.className = 'form-status success';
      form.reset();
    });
  }
});
