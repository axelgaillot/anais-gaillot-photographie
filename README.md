# Anaïs Gaillot — Site vitrine Photographe

Site vitrine pour Anaïs Gaillot, photographe, construit avec **Next.js, React, TypeScript et
Tailwind CSS** (structure shadcn), exporté en site statique. Palette chaude à accent vert pin,
hero en plein écran qui s'agrandit au scroll (molette/tactile), portfolio dans sa propre page.

## Stack

- [Next.js](https://nextjs.org/) (App Router) avec export statique (`output: 'export'`)
- React + TypeScript
- Tailwind CSS (+ structure de composants façon [shadcn/ui](https://ui.shadcn.com/), voir `components.json`)
- [Framer Motion](https://www.framer.com/motion/) pour l'animation du hero

## Structure du projet

```
.
├── app/
│   ├── layout.tsx        # Layout racine : polices, nav, footer
│   ├── page.tsx           # Page d'accueil : hero, aperçu, forfaits, témoignages, contact
│   ├── globals.css        # Styles globaux (variables de couleur, mise en page)
│   ├── icon.svg            # Favicon
│   └── portfolio/page.tsx # Page dédiée à la galerie complète
├── components/
│   ├── ui/scroll-expansion-hero.tsx  # Hero animé (photo qui s'agrandit au scroll)
│   ├── site-nav.tsx, site-footer.tsx
│   ├── contact-form.tsx   # Formulaire (ouvre le client email du visiteur)
│   ├── plan-cta.tsx       # Boutons "Choisir cette formule"
│   ├── portfolio-gallery.tsx  # Galerie + lightbox
│   └── reveal.tsx          # Animation d'apparition au scroll
├── lib/utils.ts            # Utilitaire cn() (clsx + tailwind-merge)
├── public/images/          # Photos du site
└── README.md
```

## Pages

- **Accueil (`/`)** : hero plein écran (photo qui s'agrandit au scroll de la molette/au tactile),
  bande d'aperçu de 4 photos, Forfaits, Témoignages et Contact.
- **Portfolio (`/portfolio`)** : galerie complète (7 photos) avec lightbox au clic.

## Forfaits

- Formule 1 — 180 $ CAD / jusqu'à 45 min / 15 photos
- Formule 2 — 230 $ CAD / jusqu'à 1h15 / 30 photos coup de cœur
- Formule 3 — 300 $ CAD / jusqu'à 1h30 / 50+ photos

## ⚠️ À compléter avant la mise en ligne définitive

### 1. Coordonnées de contact

- Le courriel de contact est **a.plenard@yahoo.com**.
- Le **téléphone** et l'**Instagram** affichent « À compléter » dans la section Contact de
  `app/page.tsx` — remplacez ces valeurs par les vraies coordonnées.
- Vérifiez que la zone desservie (**Montréal & Longueuil**) et les mentions du forfait
  (paiement Interac, etc.) correspondent bien à la réalité avant publication.

### 2. Formulaire de contact

Le formulaire ouvre le client email du visiteur (lien `mailto:`) pré-rempli avec ses
informations — solution simple qui fonctionne sans backend, compatible avec l'hébergement
gratuit GitHub Pages. Pour un envoi plus fiable sur mobile, vous pouvez brancher un service
gratuit comme [Formspree](https://formspree.io/) ou [Web3Forms](https://web3forms.com/) dans
`components/contact-form.tsx`.

## Développement local

```bash
npm install
npm run dev
```

puis rendez-vous sur `http://localhost:3000`.

## Build / export statique

```bash
npm run build
```

Génère un site statique dans `out/`, prêt à héberger sur GitHub Pages (ou tout hébergeur statique).

## Déploiement (GitHub Pages)

Publiez le contenu du dossier `out/` (généré par `npm run build`) sur la branche `gh-pages` ou
configurez une action GitHub qui lance `npm run build` puis déploie `out/`.
