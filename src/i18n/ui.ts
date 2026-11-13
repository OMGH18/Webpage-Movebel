import type { Lang } from '../data/product'

// Textes partagés entre les pages (header, footer, boutons store).
export const ui = {
  fr: {
    skip: 'Aller au contenu',
    nav: { how: 'Comment ça marche', journeys: 'Voyages', challenges: 'Défis', pricing: 'Prix', download: 'Télécharger', support: 'Aide' },
    navLabel: 'Navigation principale',
    langSwitch: 'English',
    stores: {
      iosAlt: "Télécharger dans l'App Store",
      note: 'Gratuit · iPhone · Français et anglais',
    },
    footer: {
      app: "L'app",
      help: 'Aide',
      privacy: 'Confidentialité',
      terms: "Conditions d'utilisation",
      support: 'Assistance',
      contact: 'Contact',
      legal:
        "Movebel est une application indépendante éditée par Djabel Solutions. Les pas sont lus depuis Apple Santé avec ton autorisation.",
    },
    cta: {
      title: 'Ton pays t’attend au classement.',
      body: 'Télécharge Movebel gratuitement : choisis ton pays, connecte Apple Santé, et tes pas comptent dès aujourd’hui.',
    },
  },
  en: {
    skip: 'Skip to content',
    nav: { how: 'How it works', journeys: 'Journeys', challenges: 'Challenges', pricing: 'Pricing', download: 'Download', support: 'Help' },
    navLabel: 'Main navigation',
    langSwitch: 'Français',
    stores: {
      iosAlt: 'Download on the App Store',
      note: 'Free · iPhone · English and French',
    },
    footer: {
      app: 'The app',
      help: 'Help',
      privacy: 'Privacy',
      terms: 'Terms of use',
      support: 'Support',
      contact: 'Contact',
      legal:
        'Movebel is an independent app published by Djabel Solutions. Steps are read from Apple Health with your permission.',
    },
    cta: {
      title: 'Your country is waiting on the leaderboard.',
      body: 'Download Movebel for free: pick your country, connect Apple Health, and your steps count from today.',
    },
  },
} as const

export function t(lang: Lang) {
  return ui[lang]
}

/** Équivalences FR ⇄ EN des pages qui existent dans les deux langues. */
export const ROUTES = {
  home: { fr: '/', en: '/en/' },
  pricing: { fr: '/prix/', en: '/en/pricing/' },
  support: { fr: '/support/', en: '/en/support/' },
  privacy: { fr: '/privacy/', en: '/en/privacy/' },
  terms: { fr: '/terms/', en: '/en/terms/' },
} as const
