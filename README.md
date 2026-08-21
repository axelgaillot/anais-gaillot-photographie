# Anaïs Gaillot — Site vitrine Photographe

Site vitrine statique, un seul fichier `index.html` (HTML/CSS/JS inline, sans dépendance de build),
pour Anaïs Gaillot, photographe. Style pastel chaleureux (corail, lavande, sauge) avec touches de
calligraphie, arches photo et animations douces au défilement.

## Sections du site

- **En-tête / Hero** : présentation, accroche, informations techniques (appareil, objectif, zone desservie)
- **L'approche** : quelques chiffres clés
- **Portfolio** : galerie filtrable par catégorie (Portrait, Couple, Mariage, Lifestyle, Événement) avec lightbox
- **Forfaits** :
  - Formule 1 — 180 $ CAD / jusqu'à 45 min / 15 photos
  - Formule 2 — 230 $ CAD / jusqu'à 1h15 / 30 photos coup de cœur
  - Formule 3 — 300 $ CAD / jusqu'à 1h30 / 50+ photos
- **Témoignages** : trois citations clients
- **Contact** : formulaire (nom, courriel, type de séance, date, message)

## ⚠️ À compléter avant la mise en ligne définitive

### 1. Photos du portfolio et de l'en-tête

Les emplacements du portfolio et l'illustration de l'en-tête sont actuellement des **dégradés de
couleur générés en JavaScript** (voir la fonction qui remplit `#frameGrid` dans le `<script>` en bas
de `index.html`), pas de vraies photos. Remplacez-les par de vrais fichiers image (`<img>` ou
`background-image`) avant la mise en ligne définitive.

### 2. Coordonnées de contact

- Le courriel de contact est **a.plenard@yahoo.com** (utilisé à la fois dans le formulaire et affiché
  dans la section Contact).
- Le **téléphone** et l'**Instagram** affichent actuellement « À compléter » — remplacez ces valeurs
  par les vraies coordonnées dans la section `#contact` de `index.html`.
- Vérifiez que les mentions **« Fujifilm X-T50 »**, **« 56 mm f/1.2 »**, et la zone desservie
  (**Montréal & Longueuil**) correspondent bien à la réalité avant publication.

### 3. Formulaire de contact

Le formulaire ouvre le client email du visiteur (lien `mailto:`) pré-rempli avec ses informations —
solution simple qui fonctionne sans backend, compatible avec l'hébergement gratuit GitHub Pages.
Pour un envoi plus fiable sur mobile (sans ouvrir le client mail du visiteur), vous pouvez brancher un
service gratuit comme [Formspree](https://formspree.io/) ou [Web3Forms](https://web3forms.com/) :
créez un compte, récupérez votre endpoint, et modifiez l'attribut `action` du `<form id="bookingForm">`.

## Aperçu en local

Aucune installation n'est nécessaire : ouvrez `index.html` dans un navigateur, ou lancez un petit
serveur local, par exemple :

```bash
python -m http.server 8000
```

puis rendez-vous sur `http://localhost:8000`.

## Déploiement (GitHub Pages)

Ce site est prêt à être publié tel quel avec GitHub Pages (branche `main`, dossier racine `/`).
