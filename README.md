# Anaïs Gaillot — Site vitrine Photographe

Site vitrine statique (HTML / CSS / JS, sans dépendances) pour Anaïs Gaillot, photographe.
Style pastel chaleureux (corail, lavande, sauge) avec touche de calligraphie, page d'accueil
épurée et portfolio dans sa propre page.

## Structure du projet

```
.
├── index.html          # Page d'accueil : hero (2 photos), forfaits, témoignages, contact
├── portfolio.html       # Page dédiée à la galerie complète
├── css/style.css        # Styles partagés entre les deux pages
├── js/main.js           # Comportements partagés (menu mobile, animations au scroll)
├── images/              # Photos du site
└── README.md
```

## Pages

- **Accueil (`index.html`)** : hero avec deux photos mises en avant + un titre, puis Forfaits,
  Témoignages et Contact. Volontairement épuré : pas de portfolio ni de longue présentation
  dès l'arrivée.
- **Portfolio (`portfolio.html`)** : galerie complète (7 photos) avec lightbox au clic,
  accessible depuis le lien "Portfolio" du menu ou le bouton "Voir le portfolio" du hero.

## Forfaits

- Formule 1 — 180 $ CAD / jusqu'à 45 min / 15 photos
- Formule 2 — 230 $ CAD / jusqu'à 1h15 / 30 photos coup de cœur
- Formule 3 — 300 $ CAD / jusqu'à 1h30 / 50+ photos

## ⚠️ À compléter avant la mise en ligne définitive

### 1. Photos

Les deux photos du hero (`images/hero-1.jpg`, `images/hero-2.jpg`) et les sept photos du
portfolio (`images/portfolio-1.jpg` à `portfolio-7.jpg`) sont déjà de vraies photos fournies.
Vous pouvez en ajouter d'autres dans `images/` et les référencer dans `portfolio.html`
(copiez un bloc `<div class="frame"><img src="..." alt="..."></div>`).

### 2. Coordonnées de contact

- Le courriel de contact est **a.plenard@yahoo.com**.
- Le **téléphone** et l'**Instagram** affichent « À compléter » dans la section Contact de
  `index.html` — remplacez ces valeurs par les vraies coordonnées.
- Vérifiez que la zone desservie (**Montréal & Longueuil**) et les mentions du forfait
  (paiement Interac, etc.) correspondent bien à la réalité avant publication.

### 3. Formulaire de contact

Le formulaire ouvre le client email du visiteur (lien `mailto:`) pré-rempli avec ses
informations — solution simple qui fonctionne sans backend, compatible avec l'hébergement
gratuit GitHub Pages. Pour un envoi plus fiable sur mobile, vous pouvez brancher un service
gratuit comme [Formspree](https://formspree.io/) ou [Web3Forms](https://web3forms.com/) et
modifier l'attribut `action` du `<form id="bookingForm">` dans `index.html`.

## Aperçu en local

Aucune installation n'est nécessaire : ouvrez `index.html` dans un navigateur, ou lancez un
petit serveur local, par exemple :

```bash
python -m http.server 8000
```

puis rendez-vous sur `http://localhost:8000`.

## Déploiement (GitHub Pages)

Ce site est prêt à être publié tel quel avec GitHub Pages (branche `main`, dossier racine `/`).
