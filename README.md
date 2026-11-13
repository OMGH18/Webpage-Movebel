# Site Movebel

Site vitrine de l'app Movebel : https://movebel.djabelsolutions.fr
Même base technique que le site Shobukan (Astro, statique, GitHub Pages).

## Modifier le site

- Faits publics (prix, nombre de pays, voyages, limites des défis) : `src/data/product.ts`.
  Ils viennent du dépôt `movebel-app` (`lib/premium.ts`, `lib/journeys.ts`, `lib/countries.ts`).
- Textes de l'accueil : `src/components/HomePage.astro` (FR et EN dans le même fichier).
- Prix : `src/components/PricingPanel.astro` et `PricingPage.astro`.
- Aide : `src/components/SupportPage.astro`.
- Textes légaux : `src/content/legal/*.html`, repris tels quels de l'app (`legal/`).
- Couleurs et polices : `src/styles/global.css`.

## Développer

```bash
npm ci
npm run dev
```

## Publier

Chaque push sur `main` construit et publie le site (GitHub Actions), puis
prévient Bing via IndexNow. Prérequis, une seule fois : Settings → Pages →
Build and deployment → Source = « GitHub Actions ».
