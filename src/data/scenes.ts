// Illustrations « carte postale » des voyages, reprises de l'app
// (movebel-app : components/headquarters/JourneyCover.tsx). viewBox 100×60,
// un dégradé de ciel + des formes simples par voyage.

export interface Scene { sky: readonly [string, string, string]; body: string }

const stars = (n: number, seed = 1) =>
  Array.from({ length: n }, (_, i) => {
    const x = ((i * 37 + seed * 13) % 96) + 2
    const y = ((i * 19 + seed * 7) % 22) + 3
    return `<circle cx="${x}" cy="${y}" r="${i % 2 ? 0.7 : 1}" fill="#fff" opacity=".5"/>`
  }).join('')

const SCENES: Record<string, Scene> = {
  eiffel: {
    sky: ['#FBD3A6', '#EE9E7C', '#584A7C'],
    body: `<circle cx="50" cy="19" r="8" fill="#FFE9C6" opacity=".85"/><rect x="0" y="52" width="100" height="8" fill="#3A3254"/><g fill="#2C2842"><polygon points="50,6 51.6,20 54,34 59,52 54.5,52 50.6,40 49.4,40 45.5,52 41,52 46,34 48.4,20"/><rect x="45.5" y="33.4" width="9" height="1.7"/><rect x="47.4" y="21.5" width="5.2" height="1.2"/></g><path d="M45.5,52 Q50,43 54.5,52" fill="none" stroke="#2C2842" stroke-width="1"/>`,
  },
  bridge: {
    sky: ['#CDE7F5', '#8FBAD8', '#3E6E92'],
    body: `<circle cx="80" cy="16" r="6" fill="#FFF0D0" opacity=".7"/><rect x="0" y="44" width="100" height="16" fill="#2E6B94"/><path d="M2,34 Q26,15 26,16 Q26,15 50,30 Q74,15 74,16 Q74,15 98,34" fill="none" stroke="#C1440E" stroke-width="1.4"/><rect x="24.5" y="12" width="3.5" height="30" fill="#C1440E"/><rect x="72" y="12" width="3.5" height="30" fill="#C1440E"/><rect x="23" y="17" width="6.5" height="2" fill="#C1440E"/><rect x="70.5" y="17" width="6.5" height="2" fill="#C1440E"/><rect x="0" y="40" width="100" height="2.4" fill="#9A3610"/>`,
  },
  cliffs: {
    sky: ['#CFE9F4', '#94C2DA', '#43708E'],
    body: `<circle cx="72" cy="16" r="6" fill="#FFF3D6" opacity=".7"/><rect x="0" y="46" width="100" height="14" fill="#3E6E8C"/><polygon points="0,60 0,30 22,33 28,60" fill="#4B5A46"/><polygon points="0,30 22,33 22,37 0,35" fill="#6E8A54"/><polygon points="72,60 78,36 96,34 100,60" fill="#43503F"/><rect x="12" y="20" width="5" height="13" fill="#EDE7DA"/><rect x="12" y="24" width="5" height="2.4" fill="#C0392B"/><rect x="12" y="28.5" width="5" height="2.4" fill="#C0392B"/><polygon points="11,20 18,20 14.5,16" fill="#8A2E22"/><circle cx="14.5" cy="18" r="1" fill="#FFE38A"/>`,
  },
  aurora: {
    sky: ['#0E3157', '#123A5E', '#071A30'],
    body: `${stars(7, 2)}<circle cx="78" cy="13" r="5" fill="#EAF2FF" opacity=".85"/><path d="M0,22 Q28,8 54,20 T100,15" fill="none" stroke="#4FE0A6" stroke-width="4" opacity=".35" stroke-linecap="round"/><path d="M0,28 Q30,14 58,26 T100,22" fill="none" stroke="#7CE0F0" stroke-width="3" opacity=".3" stroke-linecap="round"/><path d="M0,18 Q34,6 62,16 T100,12" fill="none" stroke="#B08CE8" stroke-width="2.5" opacity=".28" stroke-linecap="round"/><path d="M0,60 L0,48 Q26,42 52,48 T100,46 L100,60 Z" fill="#DCE9F5" opacity=".9"/><path d="M0,60 L0,53 Q34,49 66,54 T100,52 L100,60 Z" fill="#B9CEE0"/>`,
  },
  spooky: {
    sky: ['#3E2C50', '#271840', '#0F0A22'],
    body: `${stars(5, 4)}<circle cx="72" cy="15" r="10" fill="#E9E2BE" opacity=".9"/><circle cx="69" cy="13" r="2.4" fill="#3E2C50" opacity=".4"/><path d="M12,52 L12,26 M12,34 L7,29 M12,34 L17,30 M12,40 L8,37 M12,40 L16,37" stroke="#120A1C" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M30,52 L30,32 M30,38 L26,34 M30,38 L34,35" stroke="#120A1C" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M40,15 q2,-2 4,0 q2,-2 4,0" stroke="#120A1C" stroke-width=".9" fill="none"/><path d="M52,20 q2,-2 4,0 q2,-2 4,0" stroke="#120A1C" stroke-width=".9" fill="none"/><path d="M0,60 L0,50 Q30,44 60,50 T100,48 L100,60 Z" fill="#1B1230"/>`,
  },
  colosseum: {
    sky: ['#F4DBB2', '#E3A870', '#6E4A58'],
    body: `<circle cx="24" cy="18" r="7" fill="#FFEAC4" opacity=".75"/><rect x="0" y="50" width="100" height="10" fill="#5A4636"/><g fill="#4A3A2C"><path d="M30,50 Q30,26 56,25 Q84,26 84,50 L78,50 Q78,32 56,31 Q40,31 38,50 Z"/><rect x="30" y="38" width="54" height="2"/></g><g fill="#6B5540">${[34, 42, 50, 58, 66, 74].map((x) => `<rect x="${x}" y="41" width="3" height="9"/>`).join('')}${[40, 48, 56, 64, 72].map((x) => `<rect x="${x}" y="31" width="2.4" height="7"/>`).join('')}</g>`,
  },
  desert: {
    sky: ['#FCE4AC', '#F1AC64', '#8E5E58'],
    body: `<circle cx="62" cy="22" r="10" fill="#FFD98A" opacity=".9"/><path d="M0,60 L0,44 Q30,36 60,44 T100,42 L100,60 Z" fill="#E0965A"/><path d="M0,60 L0,52 Q34,46 68,52 T100,50 L100,60 Z" fill="#C9793F"/><g fill="#4A2E22"><path d="M30,48 q2,-4 4,-3 q1,-4 3,-2 q1,-4 3,-1 q2,-1 3,2 l1,4 -2,0 -.5,-3 -1,0 -.5,3 -6,0 -.5,-3 -1,0 -.5,3 -2,0 z"/><rect x="30" y="49" width="1.4" height="4"/><rect x="35" y="49" width="1.4" height="4"/><rect x="41" y="49" width="1.4" height="4"/><rect x="44" y="49" width="1.4" height="4"/></g>`,
  },
  route66: {
    sky: ['#CFE4F5', '#F2CE92', '#C87B58'],
    body: `<circle cx="26" cy="20" r="7" fill="#FFE4A6" opacity=".85"/><rect x="0" y="34" width="100" height="26" fill="#C98A5A"/><polygon points="60,34 84,34 80,42 66,42" fill="#9A5E38"/><polygon points="34,60 66,60 53,34 47,34" fill="#5A5560"/><path d="M50,60 L50,52 M50,48 L50,42 M50,39 L50,35" stroke="#F4E9C0" stroke-width="1.4"/><g fill="#2F6B44"><rect x="16" y="38" width="3.2" height="16" rx="1.4"/><path d="M16,45 q-4,0 -4,4 l0,3 2,0 0,-3 q0,-2 2,-2 z"/><path d="M19.2,42 q4,0 4,4 l0,4 -2,0 0,-4 q0,-2 -2,-2 z"/></g>`,
  },
  cathedral: {
    sky: ['#EAD9F2', '#B99CD2', '#5E4A7E'],
    body: `${stars(4, 6)}<circle cx="50" cy="16" r="6" fill="#F6ECFF" opacity=".6"/><rect x="0" y="52" width="100" height="8" fill="#3E3352"/><g fill="#2E2742"><rect x="30" y="30" width="40" height="22"/><rect x="32" y="16" width="7" height="36"/><polygon points="32,16 39,16 35.5,9"/><rect x="61" y="16" width="7" height="36"/><polygon points="61,16 68,16 64.5,9"/><polygon points="44,30 56,30 50,20"/></g><circle cx="50" cy="40" r="3.4" fill="#7A5FA0"/>`,
  },
  alps: {
    sky: ['#D2EAF6', '#93BFDC', '#4E7EA0'],
    body: `<circle cx="22" cy="16" r="6" fill="#FFF6DE" opacity=".75"/><polygon points="0,60 24,26 44,60" fill="#6E7E8E"/><polygon points="30,60 58,18 88,60" fill="#8496A6"/><polygon points="58,18 66,30 60,31 58,26 55,31 50,30" fill="#F2F7FF"/><polygon points="24,26 30,35 26,35 24,31 22,35 18,34" fill="#F2F7FF"/><g fill="#2E5540"><polygon points="12,60 8,60 10,50"/><polygon points="18,60 14,60 16,52"/><polygon points="84,60 80,60 82,51"/></g>`,
  },
  machu: {
    sky: ['#D6EAE2', '#93B89E', '#4E6E5C'],
    body: `<circle cx="74" cy="16" r="6" fill="#F2FFF6" opacity=".55"/><polygon points="52,60 76,10 96,60" fill="#5E7466"/><polygon points="76,10 82,22 78,22 76,17 73,22 70,21" fill="#DCEEE2" opacity=".85"/><polygon points="0,60 20,30 44,60" fill="#4E6E5A"/><g stroke="#3B5646" stroke-width="1.2"><line x1="6" y1="46" x2="38" y2="46"/><line x1="9" y1="50" x2="35" y2="50"/><line x1="12" y1="54" x2="32" y2="54"/></g>`,
  },
  everest: {
    sky: ['#D2E2F2', '#9EBAD8', '#5E6E90'],
    body: `<path d="M4,8 Q50,16 96,8" fill="none" stroke="#6B5540" stroke-width=".6"/>${['#D64545', '#3D7BD6', '#3DAE6B', '#E3B23C', '#D64545', '#3D7BD6'].map((c, i) => { const s = Math.sin(i) * 0.6; return `<polygon points="${12 + i * 14},${(9.5 + s).toFixed(2)} ${18 + i * 14},${(9.8 + s).toFixed(2)} ${15 + i * 14},${(16 + s).toFixed(2)}" fill="${c}" opacity=".9"/>` }).join('')}<polygon points="0,60 30,28 52,60" fill="#7E8EA0"/><polygon points="40,60 70,16 100,60" fill="#9CAAB8"/><polygon points="70,16 80,32 74,32 70,24 65,32 58,31" fill="#F4F9FF"/><polygon points="30,28 38,40 33,40 30,34 26,40 20,39" fill="#F4F9FF"/>`,
  },
}

const SCENE_BY_JOURNEY: Record<string, keyof typeof SCENES> = {
  lumiere: 'cliffs',
  'tour-de-france': 'eiffel',
  'usa-coast-to-coast': 'bridge',
  'uk-lejog': 'cliffs',
  'pole-nord': 'aurora',
  'halloween-trail': 'spooky',
  'paris-rome': 'colosseum',
  'silk-road': 'desert',
  'route-66': 'route66',
  camino: 'cathedral',
  'mont-blanc': 'alps',
  'inca-trail': 'machu',
  'everest-bc': 'everest',
}

export function sceneFor(journeyId: string): Scene {
  return SCENES[SCENE_BY_JOURNEY[journeyId] ?? 'cliffs']
}
