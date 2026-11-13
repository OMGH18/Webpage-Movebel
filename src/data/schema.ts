// Données structurées (JSON-LD) partagées. Les @id permettent aux pages de
// référencer l'organisation et l'app sans tout redéclarer.
import { FACTS, JOURNEYS, PRICES, PUBLISHER, SITE, SOCIALS, STORES, type Lang } from './product'

export const ORG_ID = `${SITE}/#org`
export const APP_ID = `${SITE}/#app`
export const WEBSITE_ID = `${SITE}/#website`

export function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: PUBLISHER.name,
    url: `${SITE}/`,
    logo: `${SITE}/assets/icon-512.png`,
    email: PUBLISHER.email,
    ...(SOCIALS.length ? { sameAs: SOCIALS.map((s) => s.url) } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: PUBLISHER.email,
      availableLanguage: ['fr', 'en'],
    },
  }
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Movebel',
    url: `${SITE}/`,
    inLanguage: ['fr', 'en'],
    publisher: { '@id': ORG_ID },
  }
}

export function app(lang: Lang) {
  const fr = lang === 'fr'
  const pricing = `${SITE}${fr ? '/prix/' : '/en/pricing/'}`
  return {
    '@type': 'MobileApplication',
    '@id': APP_ID,
    name: 'Movebel',
    alternateName: fr ? 'Movebel - Marche pour ton pays' : 'Movebel - Step up for your country',
    description: fr
      ? `App iPhone gratuite qui transforme tes pas en points pour ton pays : classement mondial entre ${FACTS.countries} pays, séries, badges, défis entre amis et voyages virtuels à pied (${JOURNEYS.length} parcours, de ${JOURNEYS[0].km} à ${JOURNEYS[JOURNEYS.length - 1].km} km). Pas synchronisés depuis Apple Santé.`
      : `Free iPhone app that turns your steps into points for your country: a global leaderboard across ${FACTS.countries} countries, streaks, badges, challenges with friends and virtual walking journeys (${JOURNEYS.length} routes, from ${JOURNEYS[0].km} to ${JOURNEYS[JOURNEYS.length - 1].km} km). Steps sync from Apple Health.`,
    url: `${SITE}/`,
    image: `${SITE}/assets/icon-512.png`,
    operatingSystem: 'iOS',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: fr ? 'Podomètre, marche' : 'Pedometer, walking',
    inLanguage: ['fr', 'en'],
    isAccessibleForFree: true,
    offers: [
      { '@type': 'Offer', name: fr ? 'Gratuit' : 'Free', price: '0', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Movebel+ ' + (fr ? 'mensuel' : 'monthly'), price: PRICES.monthly.toFixed(2), priceCurrency: 'EUR', url: pricing },
      { '@type': 'Offer', name: 'Movebel+ ' + (fr ? 'annuel' : 'yearly'), price: PRICES.yearly.toFixed(2), priceCurrency: 'EUR', url: pricing },
    ],
    downloadUrl: STORES.ios,
    sameAs: [STORES.ios],
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
  }
}

export function faqPage(id: string, items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  }
}

export function webPage(path: string, name: string, lang: Lang) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE}${path}#webpage`,
    url: `${SITE}${path}`,
    name,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': APP_ID },
  }
}
