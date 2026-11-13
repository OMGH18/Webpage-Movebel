// Source de vérité du site Movebel : chaque fait public (pages, JSON-LD,
// llms.txt) vient d'ici. Si un chiffre change dans l'app, on le change ici.
// Sources : dépôt movebel-app (lib/premium.ts, lib/journeys.ts, lib/countries.ts,
// docs/premium-offer-audit.md, legal/store-listings.md).

export const SITE = 'https://movebel.djabelsolutions.fr'

export const APP_STORE_ID = '6759389159'

export const STORES = {
  iosFr: `https://apps.apple.com/fr/app/movebel-marche-pour-ton-pays/id${APP_STORE_ID}`,
  ios: `https://apps.apple.com/app/id${APP_STORE_ID}`,
} as const

export function iosLink(lang: Lang): string {
  return lang === 'fr' ? STORES.iosFr : STORES.ios
}

/** Comptes officiels. Vide tant qu'aucun compte n'est confirmé. */
export const SOCIALS: { label: string; url: string }[] = []

export const PUBLISHER = {
  name: 'Djabel Solutions',
  email: 'support@djabelsolutions.fr',
  country: 'FR',
} as const

/** Prix de référence en France (lib/premium.ts). Le store affiche le prix exact. */
export const PRICES = {
  monthly: 3.99,
  yearly: 34.99,
  yearlyPerMonth: 2.92,
} as const

export const FACTS = {
  /** Pays sélectionnables (lib/countries.ts). */
  countries: 131,
  /** Voyage gratuit « Lumière » (lib/journeys.ts). */
  freeJourneyKm: 24,
  /** Voyages Movebel+ (hors Lumière). */
  premiumJourneys: 12,
  /** Défis : créateur gratuit 1 défi actif / 5 membres ; Movebel+ 10 / 50. */
  challengeFree: { active: 1, members: 5 },
  challengePremium: { active: 10, members: 50 },
  /** Modèle de défi proposé par défaut (docs/product-experience.md). */
  challengeTemplate: { days: 7, steps: 35000 },
  referralBonusSteps: 1000,
} as const

export type Lang = 'fr' | 'en'

export interface Journey {
  id: string
  fr: string
  en: string
  km: number
  free?: boolean
  seasonal?: boolean
}

/** Voyages de l'app (lib/journeys.ts), distance totale en km. */
export const JOURNEYS: readonly Journey[] = [
  { id: 'lumiere', fr: 'Lumière, l’île imaginaire', en: 'Lumière, the imaginary island', km: 24, free: true },
  { id: 'inca-trail', fr: 'Chemin de l’Inca', en: 'Inca Trail', km: 43 },
  { id: 'halloween-trail', fr: 'Sentier d’Halloween', en: 'Halloween Trail', km: 66, seasonal: true },
  { id: 'everest-bc', fr: 'Camp de base de l’Everest', en: 'Everest Base Camp', km: 130 },
  { id: 'mont-blanc', fr: 'Tour du Mont-Blanc', en: 'Tour du Mont Blanc', km: 170 },
  { id: 'camino', fr: 'Chemin de Compostelle', en: 'Camino de Santiago', km: 775 },
  { id: 'pole-nord', fr: 'Expédition Pôle Nord', en: 'North Pole Expedition', km: 900, seasonal: true },
  { id: 'uk-lejog', fr: 'Land’s End – John o’ Groats', en: 'Land’s End to John o’ Groats', km: 1400 },
  { id: 'paris-rome', fr: 'Paris – Rome', en: 'Paris to Rome', km: 1430 },
  { id: 'tour-de-france', fr: 'Tour de France', en: 'Tour de France', km: 2400 },
  { id: 'route-66', fr: 'Route 66', en: 'Route 66', km: 3940 },
  { id: 'usa-coast-to-coast', fr: 'Traversée des États-Unis', en: 'USA Coast to Coast', km: 4500 },
  { id: 'silk-road', fr: 'Route de la soie', en: 'Silk Road', km: 7000 },
]

export function formatPrice(value: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)
}

export function formatNumber(value: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(value)
}
