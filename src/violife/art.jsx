/**
 * Product and dish artwork, drawn as vectors.
 *
 * Where a real photograph was supplied, the site uses it. This file
 * covers the rest of the range, drawn in the same livery as the photographed
 * packs — charcoal, cyan, cream — so a grid mixing the two still reads as
 * one shelf rather than two different projects.
 *
 * Packs are three-quarter with a fixed light source at top-left. Dishes are
 * flat top-down, so a recipe card never competes with a product card for the
 * same kind of attention.
 */

import { useId } from 'react'

/* -------------------------------------------------------------------
   Tone sets

   These colour the product itself — the slices, the shreds, the window
   on the pack — not the packaging, which is charcoal across the range.
   One warm family: butter, cream, wheat, a little clay.
------------------------------------------------------------------- */
export const TONES = {
  cheddar: { light: '#F5D68C', base: '#EDC168', dark: '#D7A244', deep: '#B07E2C' },
  mozzarella: { light: '#FBF2DE', base: '#F3E4C4', dark: '#E0CBA1', deep: '#BFA97F' },
  smoked: { light: '#F0BE86', base: '#E2A567', dark: '#C8884B', deep: '#A26834' },
  greek: { light: '#FDFBF6', base: '#F4EFE4', dark: '#DED7C6', deep: '#B9B1A0' },
  oat: { light: '#FAF3E6', base: '#EFE4CF', dark: '#D8CBB2', deep: '#B2A48B' },
  herb: { light: '#E8E9D0', base: '#D5D8B3', dark: '#B9BD93', deep: '#959B72' },
}

/* Shared ground shadow. Soft, tight to the object, never a hard ellipse. */
function Ground({ id, cy = 206, rx = 84, ry = 15, opacity = 0.3 }) {
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor="#22272A" stopOpacity={opacity} />
          <stop offset="58%" stopColor="#22272A" stopOpacity={opacity * 0.4} />
          <stop offset="100%" stopColor="#22272A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} />
    </>
  )
}

/* -------------------------------------------------------------------
   Packs

   Redrawn against the real packaging: a charcoal pack, a white wordmark,
   a cyan "100% vegan" line, the flavour name in cream, and the cyan
   free-from lozenge. Getting that architecture right is what lets a
   drawn pack sit in the same grid as a photographed one without the
   grid falling apart.

   The wordmark on these drawn packs is set in the site's own typeface —
   they are placeholders, not replicas. The real script logotype does
   appear on the site, lifted from a supplied photograph, but only in the
   language picker and inside the photographs themselves.
------------------------------------------------------------------- */

const PACK = { face: '#474B4F', shade: '#3A3E42', lit: '#565B60', edge: '#61666B' }
const CYAN = '#42C6D2'
const CREAM = '#F6DFA5'

/** The label furniture, shared by every silhouette. `s` scales it to fit. */
function Label({ x, y, w, name, s = 1, window: win, tone }) {
  const c = x + w / 2
  return (
    <g>
      <text
        x={c}
        y={y}
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Inter, sans-serif"
        fontSize={15 * s}
        fontWeight="700"
        letterSpacing={-0.6 * s}
      >
        violife
      </text>
      <text
        x={c}
        y={y + 11 * s}
        textAnchor="middle"
        fill={CYAN}
        fontFamily="Inter, sans-serif"
        fontSize={7 * s}
        fontWeight="600"
      >
        100% VEGAN
      </text>

      <text
        x={c}
        y={y + 30 * s}
        textAnchor="middle"
        fill={CREAM}
        fontFamily="Inter, sans-serif"
        fontSize={11.5 * s}
        fontWeight="700"
        letterSpacing={0.4 * s}
      >
        {name}
      </text>

      {/* The free-from lozenge. At card size it reads as a shape; at sheet
          size the words resolve. */}
      <rect x={c - 27 * s} y={y + 38 * s} width={54 * s} height={12 * s} rx={6 * s} fill={CYAN} />
      <text
        x={c}
        y={y + 46.5 * s}
        textAnchor="middle"
        fill="#20343A"
        fontFamily="Inter, sans-serif"
        fontSize={6 * s}
        fontWeight="700"
        letterSpacing={0.3 * s}
      >
        FREE FROM
      </text>

      {/* A window onto the product itself, the way the packs carry a
          serving photo. */}
      {win && <ellipse cx={c} cy={y + 66 * s} rx={22 * s} ry={13 * s} fill={tone.base} />}
      {win && <ellipse cx={c} cy={y + 63 * s} rx={22 * s} ry={13 * s} fill={tone.light} />}
    </g>
  )
}

function Pouch({ t, uid, name }) {
  /* Stand-up pouch — the grated format. Tallest silhouette in the range. */
  return (
    <>
      <Ground id={`${uid}-g`} rx={62} cy={214} ry={11} />
      <path
        d="M64 44 Q64 34 74 34 L166 34 Q176 34 176 44 L176 196 Q176 208 164 208 L76 208 Q64 208 64 196 Z"
        fill={PACK.face}
      />
      {/* the gusset catches light down the left, shadow down the right */}
      <path d="M64 44 Q64 34 74 34 L92 34 L92 208 L76 208 Q64 208 64 196 Z" fill={PACK.lit} opacity="0.5" />
      <path d="M152 34 L166 34 Q176 34 176 44 L176 196 Q176 208 164 208 L152 208 Z" fill={PACK.shade} opacity="0.75" />
      {/* resealable seal */}
      <rect x="72" y="44" width="96" height="5" rx="2.5" fill={PACK.edge} opacity="0.7" />
      <Label x={64} y={80} w={112} name={name} s={1} window tone={t} />
    </>
  )
}

function Tray({ t, uid, name }) {
  /* Flow-wrapped tray — the slices format. Label on top, product showing
     through the lower third. */
  return (
    <>
      <Ground id={`${uid}-g`} rx={72} cy={212} ry={10} />
      <rect x="52" y="34" width="136" height="176" rx="12" fill="#F2F1EE" />
      <rect x="52" y="34" width="136" height="122" rx="12" fill={PACK.face} />
      <rect x="52" y="140" width="136" height="16" fill={PACK.face} />
      <path d="M52 46 Q52 34 64 34 L78 34 L78 156 L52 156 Z" fill={PACK.lit} opacity="0.42" />
      {/* the slices themselves, fanned below the label */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={62 + i * 2} y={160 + i * 9} width={116 - i * 4} height="8" rx="3" fill={i % 2 ? t.base : t.light} />
      ))}
      {/* corner flash, as on the real packs */}
      <path d="M188 34 L188 62 L160 34 Z" fill={CYAN} />
      <Label x={52} y={70} w={136} name={name} s={0.95} />
    </>
  )
}

function Brick({ t, uid, name }) {
  /* The block format: a wrapped brick, seen slightly from above. */
  return (
    <>
      <Ground id={`${uid}-g`} rx={84} cy={196} ry={12} />
      <path d="M46 92 L74 68 L196 68 L168 92 Z" fill={PACK.lit} />
      <path d="M168 92 L196 68 L196 158 L168 182 Z" fill={PACK.shade} />
      <path d="M46 102 Q46 92 56 92 L168 92 L168 172 Q168 182 158 182 L56 182 Q46 182 46 172 Z" fill={PACK.face} />
      <path d="M46 92 L168 92" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1.6" />
      <Label x={46} y={116} w={122} name={name} s={0.88} />
    </>
  )
}

function Tub({ t, uid, name }) {
  /* Spreadable tub — oval lid, tapered body, label wrapping the side. */
  return (
    <>
      <Ground id={`${uid}-g`} rx={74} cy={200} ry={12} />
      <path d="M58 118 L70 176 Q73 190 88 190 L152 190 Q167 190 170 176 L182 118 Z" fill={PACK.face} />
      <path d="M128 118 L170 118 L158 176 Q155 190 140 190 L120 190 Z" fill={PACK.shade} opacity="0.7" />
      <path d="M72 124 L84 180" stroke={PACK.lit} strokeWidth="9" strokeLinecap="round" opacity="0.6" />
      {/* lid */}
      <ellipse cx="120" cy="118" rx="62" ry="17" fill={PACK.lit} />
      <ellipse cx="120" cy="114" rx="62" ry="17" fill={PACK.face} />
      <ellipse cx="120" cy="114" rx="47" ry="12" fill={PACK.shade} opacity="0.45" />
      <path d="M62 106 Q120 94 178 106" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2" fill="none" />
      {/* the label sits on the side wall, so it is compressed */}
      <text
        x="120"
        y="146"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        violife
      </text>
      <text x="120" y="157" textAnchor="middle" fill={CYAN} fontFamily="Inter, sans-serif" fontSize="6.5" fontWeight="600">
        100% VEGAN
      </text>
      <text
        x="120"
        y="174"
        textAnchor="middle"
        fill={CREAM}
        fontFamily="Inter, sans-serif"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="0.4"
      >
        {name}
      </text>
    </>
  )
}

function Pot({ t, uid, name }) {
  /* Dips: shallower and wider than the spread tub, foil lid part-peeled. */
  return (
    <>
      <Ground id={`${uid}-g`} rx={72} cy={192} ry={11} />
      <path d="M62 134 L72 172 Q75 184 90 184 L150 184 Q165 184 168 172 L178 134 Z" fill={PACK.face} />
      <path d="M126 134 L168 134 L158 172 Q155 184 140 184 L118 184 Z" fill={PACK.shade} opacity="0.7" />
      <ellipse cx="120" cy="134" rx="58" ry="16" fill={PACK.lit} />
      <ellipse cx="120" cy="134" rx="49" ry="12" fill={t.base} />
      {/* foil, caught mid-peel */}
      <path d="M62 130 A58 16 0 0 1 178 130 L178 134 A58 16 0 0 1 62 134 Z" fill="#E8E9EA" />
      <path d="M156 124 Q188 108 196 82 Q176 100 152 116 Z" fill="#EDEEEF" />
      <path d="M156 124 Q182 110 192 90" stroke="#22272A" strokeOpacity="0.09" strokeWidth="2" fill="none" />
      <text
        x="120"
        y="160"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Inter, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        violife
      </text>
      <text
        x="120"
        y="174"
        textAnchor="middle"
        fill={CREAM}
        fontFamily="Inter, sans-serif"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="0.3"
      >
        {name}
      </text>
    </>
  )
}

function Carton({ t, uid, name }) {
  /* Creamer carton — gable shoulder and a cyan cap. */
  return (
    <>
      <Ground id={`${uid}-g`} rx={58} cy={206} ry={11} />
      <path d="M78 96 Q78 88 86 88 L154 88 Q162 88 162 96 L162 188 Q162 198 152 198 L88 198 Q78 198 78 188 Z" fill={PACK.face} />
      <path d="M92 88 L100 58 L140 58 L148 88 Z" fill={PACK.lit} />
      <path d="M120 58 L140 58 L148 88 L120 88 Z" fill={PACK.shade} />
      <path d="M130 88 L162 88 L162 188 Q162 198 152 198 L130 198 Z" fill={PACK.shade} opacity="0.6" />
      <path d="M88 96 L88 190" stroke={PACK.lit} strokeWidth="7" strokeLinecap="round" opacity="0.55" />
      <rect x="100" y="44" width="40" height="20" rx="6" fill={CYAN} />
      <rect x="104" y="47" width="32" height="4" rx="2" fill="#FFFFFF" opacity="0.35" />
      <Label x={78} y={124} w={84} name={name} s={0.72} />
    </>
  )
}

const PACKS = { block: Brick, slices: Tray, shreds: Pouch, tub: Tub, creamer: Carton, pot: Pot }

/**
 * `kind` picks the pack format, `tone` the colourway, `name` the flavour
 * printed on the label. Sized by the caller — the viewBox is square and
 * the art is centred.
 */
export function ProductArt({ kind = 'block', tone = 'cheddar', name = 'ORIGINAL', className = '', ...rest }) {
  const uid = useId().replace(/:/g, '')
  const Pack = PACKS[kind] ?? Brick
  const t = TONES[tone] ?? TONES.cheddar
  return (
    <svg viewBox="0 0 240 240" className={className} role="presentation" focusable="false" {...rest}>
      <Pack t={t} uid={uid} name={name} />
    </svg>
  )
}

/* -------------------------------------------------------------------
   Dishes — flat top-down, one plate, no perspective
------------------------------------------------------------------- */

const PLATE = '#FBF9F4'
const PLATE_EDGE = '#E6E0D2'

function Plate({ children, uid, r = 88 }) {
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-p`}>
          <stop offset="76%" stopColor="#101E18" stopOpacity="0" />
          <stop offset="100%" stopColor="#101E18" stopOpacity="0.16" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r={r} fill={PLATE} />
      <circle cx="120" cy="120" r={r} fill={`url(#${uid}-p)`} />
      <circle cx="120" cy="120" r={r - 9} fill="none" stroke={PLATE_EDGE} strokeWidth="1.5" />
      {children}
    </>
  )
}

function Pizza({ uid }) {
  return (
    <Plate uid={uid}>
      <circle cx="120" cy="120" r="70" fill="#E8C98E" />
      <circle cx="120" cy="120" r="61" fill="#C4553D" />
      <circle cx="120" cy="120" r="58" fill="#EDC168" opacity="0.94" />
      {[
        [96, 100, 11],
        [146, 106, 9],
        [110, 146, 10],
        [152, 144, 8],
        [88, 130, 7],
        [126, 84, 7],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#F5D68C" opacity="0.85" />
      ))}
      {[
        [104, 118, -20],
        [140, 128, 26],
        [118, 100, 8],
      ].map(([x, y, a], i) => (
        <ellipse key={i} cx={x} cy={y} rx="11" ry="7" fill="#3E7A44" transform={`rotate(${a} ${x} ${y})`} />
      ))}
    </Plate>
  )
}

function Mac({ uid }) {
  /* Elbows drawn as stroked arcs. A filled capsule reads as a blob at card
     size; the hole down the middle is the whole silhouette. */
  const elbows = [
    [96, 98, -20],
    [130, 94, 30],
    [84, 128, 6],
    [118, 124, -34],
    [150, 120, 18],
    [100, 152, 26],
    [136, 150, -14],
    [74, 106, 48],
    [156, 148, 40],
  ]
  return (
    <Plate uid={uid}>
      <circle cx="120" cy="120" r="64" fill="#E4E0D2" />
      <circle cx="120" cy="120" r="58" fill="#EDC168" />
      {elbows.map(([x, y, a], i) => (
        <g key={i} transform={`rotate(${a} ${x} ${y})`}>
          <path
            d={`M${x - 9} ${y + 7} A 10 10 0 1 1 ${x + 9} ${y + 7}`}
            fill="none"
            stroke="#F7DC9C"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          <path
            d={`M${x - 9} ${y + 7} A 10 10 0 1 1 ${x + 9} ${y + 7}`}
            fill="none"
            stroke="#D7A244"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      ))}
    </Plate>
  )
}

function Burger({ uid }) {
  /* Seen from directly above: a ring of fillings all the way round the bun.
     Showing them as an arc across the lower half turns the whole thing into
     a smiling face, which is very hard to un-see once you have seen it. */
  return (
    <Plate uid={uid}>
      <circle cx="120" cy="120" r="72" fill="#3E7A44" />
      <circle cx="120" cy="120" r="67" fill="#EDC168" />
      <circle cx="120" cy="120" r="62" fill="#C4553D" />
      {/* the bun, sitting proud of the stack */}
      <circle cx="120" cy="118" r="57" fill="#E8B871" />
      <circle cx="120" cy="116" r="55" fill="#EFC585" />
      {[
        [104, 92],
        [140, 104],
        [112, 122],
        [148, 136],
        [88, 124],
        [122, 152],
        [96, 150],
        [132, 78],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5.2" ry="3.4" fill="#FDF6E6" transform={`rotate(${i * 31} ${x} ${y})`} />
      ))}
    </Plate>
  )
}

function Toastie({ uid }) {
  return (
    <Plate uid={uid}>
      {[
        { p: 'M62 148 L106 66 L150 148 Z', f: '#E8B871' },
        { p: 'M92 156 L136 74 L180 156 Z', f: '#EFC585' },
      ].map((s, i) => (
        <g key={i}>
          <path d={s.p} fill={s.f} />
        </g>
      ))}
      {/* the pull — the whole point of the dish */}
      <path
        d="M120 112 Q132 128 124 146 Q118 156 128 164"
        stroke="#F5D68C"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M136 74 L180 156 L150 156 L120 100 Z" fill="#D9A25C" opacity="0.28" />
    </Plate>
  )
}

function Pasta({ uid }) {
  return (
    <Plate uid={uid}>
      <circle cx="120" cy="120" r="62" fill="#E4E0D2" />
      {[54, 44, 34, 24].map((r, i) => (
        <circle
          key={r}
          cx="120"
          cy="120"
          r={r}
          fill="none"
          stroke={i % 2 ? '#EDC168' : '#F5D68C'}
          strokeWidth="9"
          strokeDasharray={`${r * 2.2} ${r * 0.5}`}
          transform={`rotate(${i * 47} 120 120)`}
        />
      ))}
      {[
        [96, 96],
        [148, 112],
        [112, 152],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="10" ry="6.5" fill="#3E7A44" transform={`rotate(${i * 40 - 20} ${x} ${y})`} />
      ))}
    </Plate>
  )
}

function Nachos({ uid }) {
  return (
    <Plate uid={uid}>
      <circle cx="120" cy="122" r="62" fill="#E4E0D2" opacity="0.7" />
      {[
        [96, 96, -24],
        [140, 92, 18],
        [82, 132, 12],
        [120, 124, -8],
        [156, 130, 30],
        [104, 158, 22],
        [142, 158, -16],
      ].map(([x, y, a], i) => (
        <g key={i} transform={`rotate(${a} ${x} ${y})`}>
          <path d={`M${x - 22} ${y + 15} L${x} ${y - 19} L${x + 22} ${y + 15} Z`} fill="#EFC585" />
          <path d={`M${x - 22} ${y + 15} L${x} ${y - 19} L${x + 4} ${y + 15} Z`} fill="#F5D68C" opacity="0.6" />
        </g>
      ))}
      <path
        d="M74 116 Q104 100 126 116 Q150 132 172 114"
        stroke="#EDC168"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {[
        [110, 106],
        [150, 140],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="9" ry="6" fill="#3E7A44" />
      ))}
    </Plate>
  )
}

const DISHES = { pizza: Pizza, mac: Mac, burger: Burger, toastie: Toastie, pasta: Pasta, nachos: Nachos }

export function DishArt({ kind = 'pizza', className = '', ...rest }) {
  const uid = useId().replace(/:/g, '')
  const Dish = DISHES[kind] ?? Pizza
  return (
    <svg viewBox="0 0 240 240" className={className} role="presentation" focusable="false" {...rest}>
      <Dish uid={uid} />
    </svg>
  )
}

/* -------------------------------------------------------------------
   Icons — one 24px grid, 1.6 stroke, round caps throughout
------------------------------------------------------------------- */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Icon({ children, className = '', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...rest}>
      <g {...S}>{children}</g>
    </svg>
  )
}

export const IconHome = (p) => (
  <Icon {...p}>
    <path d="M3.5 10.4 12 3.6l8.5 6.8V20a1 1 0 0 1-1 1h-4.6v-6.2H9.1V21H4.5a1 1 0 0 1-1-1Z" />
  </Icon>
)

export const IconPack = (p) => (
  <Icon {...p}>
    <path d="M12 2.9 20.4 7v10L12 21.1 3.6 17V7Z" />
    <path d="M3.6 7 12 11.1 20.4 7M12 11.1v10" />
  </Icon>
)

export const IconRecipe = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <circle cx="12" cy="12" r="3.4" />
  </Icon>
)

export const IconLeaf = (p) => (
  <Icon {...p}>
    <path d="M20 4c0 8.5-4.4 12.6-9.6 12.6A5.4 5.4 0 0 1 5 11.2C5 6.3 10.3 4 20 4Z" />
    <path d="M15.6 8.4 4.4 20" />
  </Icon>
)

export const IconPin = (p) => (
  <Icon {...p}>
    <path d="M12 21.2s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </Icon>
)

export const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="10.8" cy="10.8" r="6.6" />
    <path d="m15.6 15.6 4.2 4.2" />
  </Icon>
)

export const IconArrow = (p) => (
  <Icon {...p}>
    <path d="M4.8 12h14.4M13.4 6.2 19.2 12l-5.8 5.8" />
  </Icon>
)

export const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 1.9" />
  </Icon>
)

export const IconMelt = (p) => (
  <Icon {...p}>
    <path d="M5 6.5h14v5.2c0 1.4-1.1 2.1-2.2 1.4-1.1-.7-2.2 0-2.2 1.4v2.6c0 1.4-1.1 2.1-2.2 1.4-1.1-.7-2.2 0-2.2 1.4M5 6.5v4.2" />
  </Icon>
)

export const IconStretch = (p) => (
  <Icon {...p}>
    <path d="M4.4 5.4h15.2M4.4 18.6h15.2" />
    <path d="M9 5.4c0 4 6 5 6 8.6M15 5.4c0 4-6 5-6 8.6" />
  </Icon>
)

export const IconGrate = (p) => (
  <Icon {...p}>
    <path d="M6.6 3.6h10.8l2.2 6.8H4.4Z" />
    <path d="M8.4 14.6h.02M13 15.8h.02M17 14.2h.02M10.6 19h.02M15 19.4h.02" strokeWidth="2.4" />
  </Icon>
)

export const IconCheck = (p) => (
  <Icon {...p}>
    <path d="m5 12.6 4.6 4.4L19 6.6" />
  </Icon>
)

export const IconClose = (p) => (
  <Icon {...p}>
    <path d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8" />
  </Icon>
)
