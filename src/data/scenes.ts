// Paysages des voyages : des affiches nature en couches (ciel, brume, crêtes,
// forêts) avec, à chaque fois, un sentier qui file vers l'horizon. Le monument
// ou le relief du voyage reste reconnaissable. viewBox 100×60, généré en SVG.

export interface Scene { sky: readonly [string, string, string]; body: string }

const f = (n: number) => +n.toFixed(2)

function rng(seed: number) {
  let a = seed * 2654435761 >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Crête douce : base (y moyen), amp (amplitude). */
function ridge(seed: number, base: number, amp: number, fill: string, opacity = 1, freq = 1) {
  const r = rng(seed)
  const p1 = r() * 6, p2 = r() * 6
  const pts: [number, number][] = []
  for (let x = -4; x <= 104; x += 4) {
    const y = base - amp * (0.55 * Math.sin(x * 0.055 * freq + p1) + 0.3 * Math.sin(x * 0.13 * freq + p2) + 0.15 * (r() - 0.5))
    pts.push([x, y])
  }
  let d = `M${pts[0][0]},${f(pts[0][1])}`
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2
    d += ` Q${pts[i][0]},${f(pts[i][1])} ${f(mx)},${f(my)}`
  }
  d += ` L104,62 L-4,62 Z`
  return `<path d="${d}" fill="${fill}" opacity="${opacity}"/>`
}

/** Montagne avec neige et face à l'ombre. */
function peak(px: number, py: number, w: number, fill: string, snow = true, base = 62) {
  const h = base - py
  const L: [number, number][] = [[px - w, base], [px - w * 0.5, py + h * 0.42], [px - w * 0.2, py + h * 0.14], [px, py], [px + w * 0.2, py + h * 0.17], [px + w * 0.55, py + h * 0.46], [px + w, base]]
  const poly = (a: [number, number][]) => a.map(([x, y]) => `${f(x)},${f(y)}`).join(' ')
  let out = `<polygon points="${poly(L)}" fill="${fill}"/>`
  out += `<polygon points="${poly([[px, py], L[4], L[5], L[6], [px + w * 0.06, base]])}" fill="#0b1a2a" opacity=".22"/>`
  if (snow) {
    const yS = py + h * 0.3
    const left = px - w * 0.2 - (yS - (py + h * 0.14)) * 0.55 * (w / h) * 0.9
    const right = px + w * 0.2 + (yS - (py + h * 0.17)) * (w / h) * 0.7
    out += `<polygon points="${f(px)},${f(py)} ${f(px + w * 0.2)},${f(py + h * 0.17)} ${f(right)},${f(yS)} ${f(px + w * 0.28)},${f(yS - h * 0.05)} ${f(px + w * 0.14)},${f(yS + h * 0.04)} ${f(px + w * 0.02)},${f(yS - h * 0.04)} ${f(px - w * 0.1)},${f(yS + h * 0.05)} ${f(left)},${f(yS)} ${f(px - w * 0.2)},${f(py + h * 0.14)}" fill="#f4f8fc"/>`
    out += `<polygon points="${f(px)},${f(py)} ${f(px + w * 0.2)},${f(py + h * 0.17)} ${f(right)},${f(yS)} ${f(px + w * 0.14)},${f(yS + h * 0.04)} ${f(px + w * 0.04)},${f(yS - h * 0.03)}" fill="#b9c9dc" opacity=".55"/>`
  }
  return out
}

function pine(x: number, y: number, h: number, fill: string) {
  const w = h * 0.42
  return `<path d="M${f(x)},${f(y - h)} L${f(x + w * 0.5)},${f(y - h * 0.58)} L${f(x + w * 0.26)},${f(y - h * 0.58)} L${f(x + w * 0.7)},${f(y - h * 0.22)} L${f(x + w * 0.3)},${f(y - h * 0.22)} L${f(x + w * 0.3)},${f(y)} L${f(x - w * 0.3)},${f(y)} L${f(x - w * 0.3)},${f(y - h * 0.22)} L${f(x - w * 0.7)},${f(y - h * 0.22)} L${f(x - w * 0.26)},${f(y - h * 0.58)} L${f(x - w * 0.5)},${f(y - h * 0.58)} Z" fill="${fill}"/>`
}

function round(x: number, y: number, h: number, fill: string, trunk = '#3b2a1e') {
  return `<rect x="${f(x - h * 0.045)}" y="${f(y - h * 0.4)}" width="${f(h * 0.09)}" height="${f(h * 0.4)}" fill="${trunk}"/><ellipse cx="${f(x)}" cy="${f(y - h * 0.62)}" rx="${f(h * 0.34)}" ry="${f(h * 0.4)}" fill="${fill}"/><ellipse cx="${f(x - h * 0.1)}" cy="${f(y - h * 0.7)}" rx="${f(h * 0.18)}" ry="${f(h * 0.22)}" fill="#fff" opacity=".08"/>`
}

function cypress(x: number, y: number, h: number, fill: string) {
  return `<ellipse cx="${f(x)}" cy="${f(y - h / 2)}" rx="${f(h * 0.11)}" ry="${f(h / 2)}" fill="${fill}"/>`
}

/** Sème des arbres le long d'une ligne de sol. */
function forest(seed: number, y: number, n: number, hmin: number, hmax: number, fills: string[], kind: 'pine' | 'round' | 'cypress' = 'pine', x0 = 0, x1 = 100) {
  const r = rng(seed)
  const items = Array.from({ length: n }, () => ({ x: x0 + r() * (x1 - x0), y: y + (r() - 0.5) * 3, h: hmin + r() * (hmax - hmin), c: fills[Math.floor(r() * fills.length)] }))
    .sort((a, b) => a.y - b.y)
  return items.map((t) => (kind === 'pine' ? pine(t.x, t.y, t.h, t.c) : kind === 'round' ? round(t.x, t.y, t.h, t.c) : cypress(t.x, t.y, t.h, t.c))).join('')
}

const mist = (y: number, h = 14, o = 0.55) => `<rect x="0" y="${y}" width="100" height="${h}" fill="url(#mistg)" opacity="${o}"/>`
const sun = (cx: number, cy: number, r: number, c = '#fff3d0') => `<circle cx="${cx}" cy="${cy}" r="${f(r * 2.6)}" fill="${c}" opacity=".16"/><circle cx="${cx}" cy="${cy}" r="${f(r * 1.6)}" fill="${c}" opacity=".22"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" opacity=".95"/>`
const stars = (n: number, seed: number) => { const r = rng(seed); return Array.from({ length: n }, () => `<circle cx="${f(r() * 98 + 1)}" cy="${f(r() * 24 + 2)}" r="${f(0.35 + r() * 0.5)}" fill="#fff" opacity="${f(0.35 + r() * 0.5)}"/>`).join('') }

/** Sentier au premier plan, qui file vers l'horizon. */
function trail(x0: number, hy: number, bend = 1, color = '#f1e3bd', op = 0.78) {
  const P = [[x0, 62], [x0 + 16 * bend, 54], [x0 - 8 * bend, 47], [x0 + 6 * bend, hy]] as const
  const L: string[] = [], R: string[] = []
  for (let i = 0; i <= 18; i++) {
    const t = i / 18, u = 1 - t
    const x = u ** 3 * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t ** 3 * P[3][0]
    const y = u ** 3 * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t ** 3 * P[3][1]
    const w = 0.35 + (1 - t) ** 1.6 * 5.5
    L.push(`${f(x - w)},${f(y)}`); R.push(`${f(x + w)},${f(y)}`)
  }
  return `<polygon points="${L.join(' ')} ${R.reverse().join(' ')}" fill="${color}" opacity="${op}"/>`
}

const grass = (seed: number, c: string, n = 26) => { const r = rng(seed); return Array.from({ length: n }, () => { const x = r() * 100, h = 1.6 + r() * 2.4; return `<path d="M${f(x)},61 q${f(-0.6)},${f(-h * 0.6)} ${f(-1)},${f(-h)} M${f(x)},61 q0,${f(-h * 0.8)} ${f(0.2)},${f(-h * 1.15)} M${f(x)},61 q${f(0.6)},${f(-h * 0.6)} ${f(1.1)},${f(-h)}" stroke="${c}" stroke-width=".45" fill="none" stroke-linecap="round"/>` }).join('') }

const flags = (y: number) => `<path d="M3,${y} Q50,${y + 8} 97,${y}" fill="none" stroke="#5b4636" stroke-width=".5"/>` + ['#d64545', '#3d7bd6', '#3dae6b', '#e3b23c', '#d64545', '#3d7bd6', '#3dae6b'].map((c, i) => { const x = 10 + i * 13, yy = y + 2.4 + Math.sin((x / 100) * Math.PI) * 3.2; return `<polygon points="${x},${f(yy - 1)} ${x + 4.6},${f(yy - 0.8)} ${f(x + 2.3)},${f(yy + 4)}" fill="${c}" opacity=".92"/>` }).join('')

const SCENES: Record<string, Scene> = {
  // Île imaginaire : lagon, forêt, phare
  lumiere: {
    sky: ['#9fdcd0', '#f4dfae', '#f2a77c'],
    body: [
      sun(74, 20, 6.5),
      ridge(2, 33, 4, '#86bfae', 0.8, 0.8),
      `<rect x="0" y="35" width="100" height="27" fill="#3a9094"/><path d="M0,40 H100 M6,45 H60 M30,50 H96" stroke="#bfeee4" stroke-width=".35" opacity=".5"/>`,
      `<rect x="14" y="19" width="5" height="17" fill="#f4efe3"/><rect x="14" y="24" width="5" height="2.6" fill="#d24b3e"/><rect x="14" y="29.5" width="5" height="2.6" fill="#d24b3e"/><polygon points="13,19 20,19 16.5,15" fill="#8a2e22"/><circle cx="16.5" cy="17" r="1.1" fill="#ffe38a"/>`,
      ridge(5, 44, 9, '#2c7a52'), forest(7, 44, 16, 5, 9, ['#1d5a3a', '#26704a', '#3a8a58'], 'round'),
      ridge(9, 54, 5, '#1b4d33'), forest(11, 55, 13, 7, 12, ['#123d28', '#18502f'], 'pine'),
      mist(36, 10, 0.5), trail(54, 38, 1), grass(3, '#7fd19a'),
    ].join(''),
  },
  // Tour de France : champs, villages et la tour Eiffel au loin
  'tour-de-france': {
    sky: ['#ffd9a8', '#f6a98a', '#7a5a86'],
    body: [
      sun(30, 22, 7, '#ffe9bf'),
      ridge(4, 33, 3.5, '#b58aa0', 0.85, 0.7),
      `<g fill="#4a3a5c" opacity=".92"><path d="M68,8 L69,18 L70.2,27 L72.4,33.5 L77.5,41 L72.8,41 L70.6,37.4 Q68,34.6 65.4,37.4 L63.2,41 L58.5,41 L63.6,33.5 L65.8,27 L67,18 Z"/><rect x="65.2" y="26.4" width="5.6" height="1.3"/><rect x="63.6" y="33" width="8.8" height="1.4"/><rect x="66.6" y="17.4" width="2.8" height=".9"/></g>`,
      mist(30, 10, 0.55),
      ridge(6, 42, 5, '#8fae6a'), ridge(8, 47, 4, '#6e9a52'),
      `<g opacity=".5" stroke="#d9c35a" stroke-width=".5"><path d="M0,44 L40,41 M0,48 L52,44 M10,52 L70,46"/></g>`,
      forest(12, 50, 18, 3.5, 6, ['#2f6b3f', '#3d7d49'], 'round'),
      ridge(14, 56, 3.5, '#4c8445'), forest(16, 57, 10, 5, 9, ['#1f5535', '#2a6a42'], 'round'),
      trail(46, 42, -1), grass(5, '#a6dc86'),
    ].join(''),
  },
  // Traversée des États-Unis : Golden Gate dans la brume, collines vertes
  'usa-coast-to-coast': {
    sky: ['#cfe8f4', '#a9d0e2', '#5d9bb6'],
    body: [
      sun(78, 15, 5.5),
      ridge(3, 36, 3, '#7fb0a6', 0.8),
      `<rect x="0" y="38" width="100" height="24" fill="#3f86a6"/><path d="M0,43 H100 M8,49 H70" stroke="#d9f1f7" stroke-width=".35" opacity=".5"/>`,
      `<g fill="#c1440e"><rect x="22" y="14" width="2.6" height="26"/><rect x="62" y="14" width="2.6" height="26"/><rect x="21" y="19" width="4.6" height="1.5"/><rect x="61" y="19" width="4.6" height="1.5"/><rect x="0" y="35" width="100" height="1.8"/></g><path d="M0,33 Q11,22 23,15 Q43,36 63,15 Q80,24 100,33" fill="none" stroke="#c1440e" stroke-width=".9"/><path d="M30,17 V35 M37,23 V35 M44,28 V35 M51,28 V35 M57,22 V35" stroke="#c1440e" stroke-width=".3" opacity=".8"/>`,
      mist(30, 14, 0.6),
      ridge(7, 49, 8, '#3f8a58'), forest(9, 49, 14, 5, 9, ['#1f5e3c', '#2c7447'], 'pine', 0, 55),
      ridge(11, 56, 4, '#2a6a44'), forest(13, 56, 12, 6, 11, ['#16452c', '#1f5a38'], 'pine'),
      trail(60, 40, -1), grass(6, '#8fd69a'),
    ].join(''),
  },
  // Land's End – John o' Groats : falaises vertes, phare, lande
  'uk-lejog': {
    sky: ['#d6e4ee', '#b7cddd', '#7da0b6'],
    body: [
      sun(24, 16, 5, '#fff6dd'),
      `<rect x="0" y="34" width="100" height="28" fill="#4d7f9a"/><path d="M0,40 H100 M10,46 H80" stroke="#e3f0f5" stroke-width=".35" opacity=".5"/>`,
      `<rect x="62" y="22" width="5" height="14" fill="#f4efe3"/><rect x="62" y="26" width="5" height="2.4" fill="#c0392b"/><rect x="62" y="30" width="5" height="2.4" fill="#c0392b"/><polygon points="61,22 68,22 64.5,18" fill="#7a2a20"/><circle cx="64.5" cy="20" r="1" fill="#ffe38a"/>`,
      ridge(3, 40, 5, '#5e8d62'), ridge(6, 46, 6, '#6f9e5a'),
      `<g fill="#8a5aa0" opacity=".45">${Array.from({ length: 22 }, (_, i) => `<circle cx="${(i * 4.7 + 3) % 98}" cy="${46 + ((i * 7) % 8)}" r="1"/>`).join('')}</g>`,
      ridge(9, 54, 4, '#4c8248'), forest(11, 53, 8, 4, 7, ['#2d6b3b'], 'round', 40, 100),
      mist(38, 10, 0.5), trail(38, 44, 1), grass(7, '#b9e08a'),
    ].join(''),
  },
  // Route du Pôle Nord : aurore, forêt de sapins sous la neige
  'pole-nord': {
    sky: ['#0b2a4f', '#12456b', '#0a2038'],
    body: [
      stars(26, 3),
      `<path d="M-4,26 Q22,6 48,20 T104,12 V32 Q80,24 52,34 T-4,40 Z" fill="#4fe0a6" opacity=".26"/><path d="M-4,30 Q28,14 58,26 T104,20" fill="none" stroke="#7cf0d4" stroke-width="2.4" opacity=".4"/><path d="M-4,20 Q30,4 62,16 T104,8" fill="none" stroke="#b08ce8" stroke-width="2" opacity=".35"/>`,
      sun(80, 14, 3.4, '#eaf3ff'),
      ridge(3, 42, 5, '#c9deee', 0.95, 0.9),
      forest(5, 46, 22, 5, 9, ['#16405a', '#1b4d66'], 'pine'),
      ridge(8, 52, 3.5, '#e4eff8'), forest(10, 56, 14, 7, 13, ['#0e3347', '#12405a', '#1b5a6f'], 'pine'),
      `<path d="M0,60 Q30,54 60,58 T100,56 V62 H0Z" fill="#f2f8fc"/>`,
      trail(52, 46, -1, '#dcecf8', 0.85),
    ].join(''),
  },
  // Sentier hanté : bois sombres, brume, lune
  'halloween-trail': {
    sky: ['#3f2a58', '#2a1a44', '#120a24'],
    body: [
      stars(14, 5), sun(70, 16, 8, '#efe6bb'),
      `<g fill="#120a1c"><rect x="14" y="26" width="9" height="16"/><polygon points="13,26 24,26 18.5,19"/><rect x="17" y="30" width="2.4" height="4" fill="#f4a73c"/></g><path d="M44,13 q2,-2 4,0 q2,-2 4,0 M54,19 q2,-2 4,0 q2,-2 4,0" stroke="#120a1c" stroke-width=".8" fill="none"/>`,
      ridge(3, 44, 5, '#241638'), mist(36, 12, 0.5),
      `<g stroke="#0e0716" stroke-width="1.1" fill="none" stroke-linecap="round"><path d="M10,56 V30 M10,40 L5,34 M10,36 L15,31 M10,46 L6,42"/><path d="M88,56 V28 M88,38 L93,32 M88,34 L83,29 M88,46 L92,42"/><path d="M32,56 V38 M32,44 L28,40 M32,42 L36,39"/></g>`,
      forest(7, 52, 12, 6, 11, ['#150c26', '#1c1032'], 'pine'),
      ridge(9, 57, 3, '#0e0716'), trail(54, 42, 1, '#8a7ab0', 0.5),
    ].join(''),
  },
  // Paris – Rome : collines toscanes, cyprès, Colisée au loin
  'paris-rome': {
    sky: ['#fbe0b4', '#f0b27a', '#a56a6a'],
    body: [
      sun(22, 20, 7, '#fff0cf'),
      ridge(2, 34, 3.5, '#c79a86', 0.85, 0.7),
      `<path d="M56,40 V31 Q56,27 61,27 L83,27 Q89,27 90,32 L91,40 Z" fill="#8a6350"/><path d="M80,27 L90,27 L91,32 L84,34 Z" fill="#6e4a3c"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${57.4 + i * 4}" y="34.4" width="2.2" height="5.6" rx="1.1" fill="#4a3028"/>`).join('')}${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${58.6 + i * 4}" y="29.6" width="2" height="3.8" rx="1" fill="#4a3028"/>`).join('')}<rect x="56" y="33.4" width="35" height=".7" fill="#6e4a3c"/>`,
      mist(30, 10, 0.55),
      ridge(5, 43, 5, '#bcab5a'), ridge(8, 49, 5, '#8fa24f'),
      `<g opacity=".35" stroke="#7a8a3a" stroke-width=".4"><path d="M0,47 L30,44 M0,51 L40,47 M20,54 L60,49"/></g>`,
      forest(10, 48, 9, 9, 14, ['#2c5a34', '#355f3a'], 'cypress'),
      ridge(13, 56, 4, '#5f8d46'), forest(15, 56, 8, 10, 16, ['#1f4a2c', '#2a5a35'], 'cypress'),
      trail(50, 40, -1), grass(8, '#c7e38a'),
    ].join(''),
  },
  // Route de la soie : dunes dorées, caravane, oasis
  'silk-road': {
    sky: ['#fde6b0', '#f4b070', '#a8625a'],
    body: [
      sun(60, 24, 9, '#ffdf94'),
      ridge(3, 40, 4, '#e8a566', 1, 0.7), ridge(5, 46, 6, '#d78a4f', 1, 0.6),
      `<g fill="#4a2e22"><path d="M18,43 q1.6,-3.4 3.2,-2.4 q.8,-3 2.4,-1.6 q.8,-3 2.4,-.8 q1.6,-.8 2.4,1.6 l.8,3.2 -1.6,0 -.4,-2.4 -.8,0 -.4,2.4 -4.8,0 -.4,-2.4 -.8,0 -.4,2.4 -1.6,0 z"/><rect x="18.2" y="43" width="1.1" height="3.2"/><rect x="21.6" y="43" width="1.1" height="3.2"/><rect x="24.4" y="43" width="1.1" height="3.2"/><rect x="27" y="43" width="1.1" height="3.2"/><path d="M34,45 q1.2,-2.6 2.4,-1.8 q.6,-2.2 1.8,-1.2 q.6,-2.2 1.8,-.6 q1.2,-.6 1.8,1.2 l.6,2.4 -1.2,0 -.3,-1.8 -.6,0 -.3,1.8 -3.6,0 -.3,-1.8 -.6,0 -.3,1.8 z"/></g>`,
      ridge(8, 53, 5, '#c0753d'),
      `<g>${[[84, 50, 9], [90, 51, 7], [79, 52, 6]].map(([x, y, h]) => `<rect x="${x - 0.35}" y="${y - h * 0.6}" width=".7" height="${h * 0.6}" fill="#5b3c28"/><path d="M${x},${y - h * 0.6} q-4,-1 -5,2 M${x},${y - h * 0.6} q4,-1 5,2 M${x},${y - h * 0.6} q-1,-3 -3,-3.4 M${x},${y - h * 0.6} q1,-3 3,-3.4" stroke="#3f7a44" stroke-width="1" fill="none" stroke-linecap="round"/>`).join('')}</g>`,
      trail(40, 46, 1, '#f6dca4', 0.7), mist(38, 8, 0.35),
    ].join(''),
  },
  // Route 66 : mesas, saguaro, ruban d'asphalte
  'route-66': {
    sky: ['#cfe4f5', '#f3cf96', '#d98a63'],
    body: [
      sun(26, 20, 7, '#ffe4a6'),
      `<polygon points="52,38 56,31 74,31 78,38" fill="#a85f3c"/><polygon points="76,38 79,34 92,34 96,38" fill="#b86a42"/><polygon points="52,38 56,31 58,31 56,38" fill="#7a4228" opacity=".4"/>`,
      ridge(3, 40, 2.4, '#d99869'), mist(34, 8, 0.5),
      `<rect x="0" y="38" width="100" height="24" fill="#d08a58"/>`,
      `<path d="M0,56 Q30,50 100,52 V62 H0Z" fill="#b87142"/>`,
      `<polygon points="30,62 70,62 52.6,38 47.4,38" fill="#4b4752"/><path d="M50,62 L50,54 M50,50 L50,45 M50,43 L50,40" stroke="#f6e8b8" stroke-width="1.2"/>`,
      `<g fill="#2f6b44"><rect x="12" y="44" width="3" height="14" rx="1.4"/><path d="M12,51 q-4,0 -4,4 l0,2.4 2,0 0,-2.4 q0,-2 2,-2z"/><path d="M15,48 q4,0 4,4 l0,3 -2,0 0,-3 q0,-2 -2,-2z"/></g>`,
      `<g fill="#4e7a3e">${[[88, 56], [80, 58], [24, 59], [6, 57]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="1.6"/>`).join('')}</g>`,
    ].join(''),
  },
  // Chemin de Compostelle : champs dorés, chemin de pèlerin, clocher
  camino: {
    sky: ['#f5e6c8', '#f2c48a', '#b98a8a'],
    body: [
      sun(72, 22, 7, '#fff0cc'),
      ridge(2, 34, 4, '#b89a9a', 0.8, 0.7),
      `<g fill="#6a5448"><rect x="28" y="26" width="9" height="10"/><rect x="29" y="18" width="3" height="10"/><polygon points="28.5,18 32.5,18 30.5,13"/><rect x="33.6" y="22" width="3" height="6"/><polygon points="33.2,22 37,22 35.1,18.4"/></g>`,
      mist(30, 10, 0.55),
      ridge(5, 42, 5, '#d1b95a'), ridge(8, 48, 5, '#b7a64a'),
      `<g opacity=".4" stroke="#8f7f30" stroke-width=".4"><path d="M0,46 L40,43 M0,50 L50,46 M30,54 L80,48"/></g>`,
      forest(11, 47, 8, 5, 8, ['#4d7a3c', '#5b8a44'], 'round', 55, 100),
      ridge(13, 56, 3.5, '#8aa04a'), grass(9, '#6e8a2e', 34),
      trail(46, 40, 1, '#f4e3bc', 0.8),
      `<g fill="#3b2a20"><circle cx="47.5" cy="45.5" r=".9"/><rect x="46.8" y="46.2" width="1.4" height="3.4" rx=".6"/></g>`,
    ].join(''),
  },
  // Tour du Mont-Blanc : alpage, sapins, sommet enneigé
  'mont-blanc': {
    sky: ['#cde8f6', '#9ccbe4', '#5c93b4'],
    body: [
      sun(20, 16, 5.5, '#fff7df'),
      peak(66, 11, 34, '#7b8fa3'), peak(30, 22, 24, '#8a9db0'),
      mist(34, 12, 0.6),
      ridge(4, 46, 5, '#4f8a58'), forest(6, 46, 20, 5, 9, ['#25593a', '#2e6a44'], 'pine'),
      ridge(8, 54, 4, '#5f9a4a'), forest(10, 55, 11, 8, 14, ['#16452c', '#1e5636'], 'pine'),
      `<g>${[[8, 57], [22, 58], [78, 57], [91, 58]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="1" fill="${['#f4d03f', '#fff', '#f08a5d', '#d98cf0'][i]}"/>`).join('')}</g>`,
      trail(52, 42, -1), grass(12, '#8ee08a'),
    ].join(''),
  },
  // Chemin de l'Inca : terrasses, jungle, pic brumeux
  'inca-trail': {
    sky: ['#d9efe4', '#a6cdb4', '#5a8a74'],
    body: [
      sun(78, 14, 5, '#f6fff0'),
      peak(66, 12, 30, '#5a7a68', false), peak(24, 24, 26, '#4f7260', false),
      `<g fill="#9bd08a" opacity=".85">${[0, 1, 2, 3, 4].map((i) => `<path d="M${46 + i * 1.2},${32 + i * 4.2} Q${58},${30 + i * 4.2} ${70 - i * 1.2},${32 + i * 4.2} L${72 - i * 1.4},${34.4 + i * 4.2} Q58,${32.4 + i * 4.2} ${44 + i * 1.4},${34.4 + i * 4.2} Z`).join('')}</g><g fill="#6e8a5a" opacity=".7">${[0, 1, 2, 3, 4].map((i) => `<rect x="${47 + i * 1.2}" y="${34 + i * 4.2}" width="${23 - i * 2.4}" height="1.1"/>`).join('')}</g>`,
      mist(30, 12, 0.6),
      ridge(5, 47, 6, '#3f7a52'), forest(7, 48, 22, 6, 11, ['#1f5a3a', '#2b7048', '#3b8a52'], 'round'),
      ridge(9, 55, 4, '#2a6a44'), forest(11, 56, 12, 8, 14, ['#14432a', '#1b5636'], 'round'),
      trail(46, 42, 1, '#e8dcb4', 0.75), grass(14, '#a6e89a'),
    ].join(''),
  },
  // Camp de base de l'Everest : géants de glace, drapeaux, genévriers
  'everest-bc': {
    sky: ['#cfe0f2', '#a7c0dc', '#6d7ea4'],
    body: [
      sun(18, 14, 4.8, '#fff8e4'),
      peak(70, 8, 40, '#8d9bb0'), peak(26, 20, 30, '#7a89a2'),
      flags(8), mist(36, 12, 0.55),
      ridge(6, 48, 5, '#7c8f78'), forest(8, 49, 12, 4, 7, ['#3a5a46', '#476a50'], 'pine', 0, 70),
      ridge(10, 55, 4, '#5f7a58'), forest(12, 56, 9, 6, 11, ['#2d4a3a', '#38594a'], 'pine'),
      `<g fill="#bcb4a4"><rect x="84" y="52" width="6" height="6" rx="1"/><rect x="87" y="49" width="4" height="4" rx="1"/></g>`,
      trail(48, 44, 1, '#efe3c4', 0.75), grass(15, '#9bc88a'),
    ].join(''),
  },
}

export function sceneFor(journeyId: string): Scene {
  return SCENES[journeyId] ?? SCENES.lumiere
}
