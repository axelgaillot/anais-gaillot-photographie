# Anaïs Gaillot — Site vitrine Photographe

Site vitrine statique (HTML / CSS / JS, sans dépendances) pour Anaïs Gaillot, photographe.
Style pastel doux (beige, rose pâle, bleu pâle) avec une touche de calligraphie.

## Structure du projet

```
.
├── index.html          # Page unique du site (toutes les sections)
├── css/style.css       # Styles (palette pastel, typographies, responsive)
├── js/script.js        # Filtres portfolio, lightbox, slider témoignages, formulaire
├── images/             # Visuels du site (voir ci-dessous)
└── README.md
```

## Sections du site

- **Accueil** : présentation, accroche, boutons vers le portfolio et le contact
- **À propos** : courte présentation d'Anaïs
- **Portfolio** : galerie filtrable (Portrait, Couple, Famille, Grossesse & Nouveau-né, Événement) avec lightbox
- **Forfaits** :
  - Formule 1 — 180 $ / 45 min / 15 photos
  - Formule 2 — 230 $ / 1h15 / 30 photos coup de cœur
  - Formule 3 — 300 $ / 1h30 / 50+ photos
- **Témoignages** : slider automatique de citations clients
- **Contact** : formulaire (nom, email, téléphone, formule, date souhaitée, message)

## ⚠️ À faire avant la mise en ligne définitive

### 1. Remplacer les photos de démonstration

Toutes les images du dossier `images/` (`portrait-1.svg`, `couple-1.svg`, `hero-bg.svg`, etc.) sont des
**illustrations pastel de démonstration**, générées pour montrer la mise en page — ce ne sont pas de vraies photos.

Pour les remplacer :
1. Ajoutez vos photos dans `images/` (formats `.jpg` ou `.webp` recommandés, idéalement compressées pour le web).
2. Dans `index.html`, remplacez chaque `src="images/xxx.svg"` par le nom de votre fichier
   (ex. `src="images/portrait-1.jpg"`).
3. Gardez un ratio proche de 4:5 (portrait) pour les photos de la galerie, et un format large (16:9 ou plus)
   pour l'image de fond de la section d'accueil (`hero-bg`).

### 2. Formulaire de contact

Le formulaire ouvre actuellement le client email du visiteur (via un lien `mailto:`) pré-rempli avec ses
informations, à destination de **a.plenard@yahoo.com**. C'est une solution simple qui fonctionne sans backend,
compatible avec l'hébergement gratuit GitHub Pages.

Pour changer l'adresse de réception, modifiez la constante `CONTACT_EMAIL` en haut du bloc formulaire dans
[`js/script.js`](js/script.js).

Si vous préférez un formulaire qui envoie directement l'email sans ouvrir le client mail du visiteur (plus
fiable sur mobile), vous pouvez brancher un service gratuit comme [Formspree](https://formspree.io/) ou
[Web3Forms](https://web3forms.com/) : il suffit de créer un compte, récupérer votre endpoint, et modifier
l'attribut `action` du `<form>` dans `index.html`.

### 3. Réseaux sociaux

Les liens Instagram / Facebook dans la section Contact et le footer pointent vers `#` par défaut :
remplacez les `href="#"` par vos vraies URLs dans `index.html`.

## Aperçu en local

Aucune installation n'est nécessaire : ouvrez simplement `index.html` dans un navigateur, ou lancez un petit
serveur local, par exemple :

```bash
python -m http.server 8000
```

puis rendez-vous sur `http://localhost:8000`.

## Déploiement (GitHub Pages)

Ce site est prêt à être publié tel quel avec GitHub Pages (branche `main`, dossier racine `/`).
Une fois en ligne, l'URL sera du type :

```
https://<votre-utilisateur-github>.github.io/<nom-du-repo>/
```
