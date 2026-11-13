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
  /** Départ → arrivée, tels que nommés dans l'app. */
  route: { fr: string; en: string }
  /** Nombre d'étapes sur la carte du voyage. */
  stops: number
  free?: boolean
  /** Fenêtre pendant laquelle le voyage peut être lancé (seasonalWindow). */
  season?: { fr: string; en: string }
}

/** Voyages de l'app (lib/journeys.ts), distance totale en km. */
export const JOURNEYS: readonly Journey[] = [
  { id: 'lumiere', fr: 'Lumière, l’île imaginaire', en: 'Lumière, the imaginary island', km: 24, route: { fr: 'De l’Aurore au phare de Sol', en: 'From Aurore to the Sol lighthouse' }, stops: 6, free: true },
  { id: 'inca-trail', fr: 'Chemin de l’Inca', en: 'Inca Trail', km: 43, route: { fr: 'Km 82 → Machu Picchu', en: 'Km 82 → Machu Picchu' }, stops: 6 },
  { id: 'halloween-trail', fr: 'Sentier hanté', en: 'Haunted Trail', km: 66, route: { fr: 'Le Portail → Château hanté', en: 'The Gate → Haunted Castle' }, stops: 5, season: { fr: '18 oct. – 2 nov.', en: 'Oct 18 – Nov 2' } },
  { id: 'everest-bc', fr: 'Camp de base de l’Everest', en: 'Everest Base Camp', km: 130, route: { fr: 'Lukla → Camp de base → Lukla', en: 'Lukla → Base Camp → Lukla' }, stops: 7 },
  { id: 'mont-blanc', fr: 'Tour du Mont-Blanc', en: 'Tour du Mont Blanc', km: 170, route: { fr: 'Chamonix → Courmayeur → Chamonix', en: 'Chamonix → Courmayeur → Chamonix' }, stops: 9 },
  { id: 'camino', fr: 'Chemin de Compostelle', en: 'Camino de Santiago', km: 775, route: { fr: 'Saint-Jean-Pied-de-Port → Santiago', en: 'Saint-Jean-Pied-de-Port → Santiago' }, stops: 9 },
  { id: 'pole-nord', fr: 'Route du Pôle Nord', en: 'North Pole Route', km: 900, route: { fr: 'Rovaniemi → Pôle Nord', en: 'Rovaniemi → North Pole' }, stops: 6, season: { fr: '1er déc. – 6 janv.', en: 'Dec 1 – Jan 6' } },
  { id: 'uk-lejog', fr: 'Land’s End – John o’ Groats', en: 'Land’s End to John o’ Groats', km: 1400, route: { fr: 'Les Cornouailles → le nord de l’Écosse', en: 'Cornwall → the far north of Scotland' }, stops: 9 },
  { id: 'paris-rome', fr: 'Paris – Rome', en: 'Paris to Rome', km: 1430, route: { fr: 'Paris → Turin → Florence → Rome', en: 'Paris → Turin → Florence → Rome' }, stops: 10 },
  { id: 'tour-de-france', fr: 'Tour de France', en: 'Tour de France', km: 2400, route: { fr: 'Paris → Lyon → Marseille → Paris', en: 'Paris → Lyon → Marseille → Paris' }, stops: 9 },
  { id: 'route-66', fr: 'Route 66', en: 'Route 66', km: 3940, route: { fr: 'Chicago → Santa Monica', en: 'Chicago → Santa Monica' }, stops: 11 },
  { id: 'usa-coast-to-coast', fr: 'Traversée des États-Unis', en: 'USA Coast to Coast', km: 4500, route: { fr: 'New York → Los Angeles', en: 'New York → Los Angeles' }, stops: 8 },
  { id: 'silk-road', fr: 'Route de la soie', en: 'Silk Road', km: 7000, route: { fr: 'Xi’an → Samarcande → Istanbul', en: 'Xi’an → Samarkand → Istanbul' }, stops: 6 },
]

/** Pas par kilomètre utilisés par l'app (lib/countries.ts, STEPS_PER_KM). */
export const STEPS_PER_KM = 1312
/** Rythme de référence pour les estimations de durée. */
export const REF_STEPS_PER_DAY = 10000

/** Jours pour finir un voyage à 10 000 pas par jour (même calcul que l'app). */
export function journeyDays(km: number): number {
  return Math.max(1, Math.ceil((km * STEPS_PER_KM) / REF_STEPS_PER_DAY))
}

/** Durée lisible : « 6 jours », « ≈ 10 mois », « ≈ 2,5 ans ». */
export function formatDuration(days: number, lang: Lang, prose = false): string {
  const fr = lang === 'fr'
  if (days < 45) return fr ? `${days} jours` : `${days} days`
  const about = prose ? (fr ? 'environ ' : 'about ') : '≈ '
  const months = Math.round(days / 30.4)
  if (months <= 24) return fr ? `${about}${months} mois` : `${about}${months} months`
  const years = Math.round((days / 365) * 2) / 2
  return fr ? `${about}${String(years).replace('.', ',')} ans` : `${about}${years} years`
}

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
