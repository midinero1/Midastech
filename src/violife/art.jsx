/**
 * Product and dish artwork, drawn as vectors.
 *
 * A real build of this site would run on photography. Drawing the range
 * instead keeps the concept honest — nothing here pretends to be a
 * photograph of a product that exists — and it happens to be the right
 * call for the medium anyway: the whole range weighs a few kilobytes,
 * stays sharp on any display, and recolours from a token.
 *
 * Two styles, deliberately contrasted. Packs are rendered three-quarter
 * with a fixed light source at top-left, so the range reads as one shelf.
 * Dishes are rendered flat top-down, so a recipe card never competes with
 * a product card for the same kind of attention.
 */

import { useId } from 'react'

/* -------------------------------------------------------------------
   Tone sets

   One warm family across the range — butter, cream, wheat, a little
   clay. Restraint here is what stops a grid of twelve products turning
   into a colour chart.
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
          <stop offset="0%" stopColor="#101E18" stopOpacity={opacity} />
          <stop offset="58%" stopColor="#101E18" stopOpacity={opacity * 0.4} />
          <stop offset="100%" stopColor="#101E18" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} />
    </>
  )
}

/* -------------------------------------------------------------------
   Packs
------------------------------------------------------------------- */

function Block({ t, uid }) {
  /* A wrapped brick rather than a bare slab. The band across the middle is
     what stops it reading as a cardboard box at card size — it is the one
     detail that says "this is a pack on a shelf". */
  return (
    <>
      <Ground id={`${uid}-g`} rx={86} cy={202} />
      {/* right face — furthest from the light */}
      <path d="M170 106 L204 82 L204 146 Q204 152 199 156 L170 176 Z" fill={t.deep} />
      {/* top face — catches it directly */}
      <path d="M58 106 L92 82 L204 82 L170 106 Z" fill={t.light} />
      {/* front face */}
      <path d="M50 116 Q50 106 60 106 L170 106 L170 166 Q170 176 160 176 L60 176 Q50 176 50 166 Z" fill={t.base} />
      {/* falls off towards the base */}
      <path d="M50 148 L170 148 L170 166 Q170 176 160 176 L60 176 Q50 176 50 166 Z" fill={t.dark} opacity="0.38" />
      {/* wrapper band */}
      <path d="M50 122 L170 122 L170 142 L50 142 Z" fill="#FDFCF8" opacity="0.92" />
      <path d="M170 122 L204 98 L204 118 L170 142 Z" fill="#FDFCF8" opacity="0.55" />
      <circle cx="72" cy="132" r="5.5" fill="#1B5A3F" opacity="0.85" />
      <rect x="86" y="129" width="46" height="5" rx="2.5" fill="#1B5A3F" opacity="0.28" />
      {/* specular along the two lit edges */}
      <path d="M60 106 L170 106" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M170 106 L204 82" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="1.5" />
    </>
  )
}

function Slices({ t, uid }) {
  /* Fanned rather than square-stacked: the eye reads four distinct
     slices instantly, where a square stack reads as one thick object. */
  const layers = [
    { a: -9, x: -20, y: 6, fill: t.deep },
    { a: -4, x: -10, y: 2, fill: t.dark },
    { a: 1, x: 2, y: -1, fill: t.base },
    { a: 6, x: 14, y: -4, fill: t.light },
  ]
  return (
    <>
      <Ground id={`${uid}-g`} rx={86} cy={200} />
      {layers.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a} 120 130)`}>
          <rect x="62" y="72" width="116" height="116" rx="16" fill={l.fill} />
          {/* each slice picks up a sheen on its upper-left corner */}
          <path
            d="M78 72 H162 A16 16 0 0 1 178 88 V104 Z"
            fill="#FFFFFF"
            opacity={i === layers.length - 1 ? 0.34 : 0.12}
          />
        </g>
      ))}
    </>
  )
}

function Shreds({ t, uid }) {
  /* Hand-placed rather than generated — a random scatter always leaves
     a hole or a collision somewhere, and this reads as a poured mound. */
  const strands = [
    [58, 150, 74, -8, t.dark],
    [104, 156, 66, 6, t.deep],
    [148, 148, 58, -14, t.dark],
    [66, 134, 62, 12, t.base],
    [118, 138, 70, -5, t.base],
    [86, 122, 76, -3, t.base],
    [140, 126, 54, 16, t.dark],
    [72, 110, 58, 9, t.light],
    [124, 112, 64, -11, t.light],
    [96, 98, 68, 4, t.light],
    [148, 104, 44, -6, t.base],
    [60, 96, 42, -13, t.base],
    [110, 86, 52, 11, t.light],
    [84, 78, 40, -7, t.light],
  ]
  return (
    <>
      <Ground id={`${uid}-g`} rx={80} cy={176} ry={12} />
      {strands.map(([x, y, w, a, fill], i) => (
        <g key={i} transform={`rotate(${a} ${x + w / 2} ${y + 5})`}>
          <rect x={x} y={y} width={w} height="11" rx="5.5" fill={fill} />
          <rect x={x + 3} y={y + 1.5} width={w - 6} height="3" rx="1.5" fill="#FFFFFF" opacity="0.3" />
        </g>
      ))}
    </>
  )
}

function Tub({ t, uid }) {
  return (
    <>
      <Ground id={`${uid}-g`} rx={72} cy={198} ry={13} />
      {/* body, tapered towards the base */}
      <path d={`M70 116 L80 182 Q82 192 92 192 L148 192 Q158 192 160 182 L170 116 Z`} fill={t.base} />
      {/* shaded right flank */}
      <path d={`M128 116 L160 116 L150 182 Q148 192 138 192 L120 192 Z`} fill={t.dark} opacity="0.42" />
      {/* highlight down the left flank */}
      <path d={`M82 122 L92 178`} stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="7" strokeLinecap="round" />
      {/* lid, sitting slightly proud of the body */}
      <ellipse cx="120" cy="116" rx="54" ry="15" fill={t.light} />
      <ellipse cx="120" cy="113" rx="54" ry="15" fill="#FFFFFF" opacity="0.55" />
      <ellipse cx="120" cy="113" rx="41" ry="10" fill={t.light} />
      <path d="M84 108 Q120 98 156 108" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="2.5" fill="none" />
    </>
  )
}

function Creamer({ t, uid }) {
  return (
    <>
      <Ground id={`${uid}-g`} rx={62} cy={202} ry={12} />
      {/* carton body */}
      <path d={`M78 108 Q78 100 86 100 L154 100 Q162 100 162 108 L162 180 Q162 190 152 190 L88 190 Q78 190 78 180 Z`} fill={t.base} />
      {/* shoulder tapering to the neck */}
      <path d={`M92 100 L100 70 L140 70 L148 100 Z`} fill={t.dark} />
      <path d={`M120 70 L140 70 L148 100 L120 100 Z`} fill={t.deep} opacity="0.5" />
      {/* shaded flank */}
      <path d={`M126 100 L162 100 L162 180 Q162 190 152 190 L126 190 Z`} fill={t.dark} opacity="0.4" />
      {/* cap — the one place brand green appears in the artwork */}
      <rect x="98" y="52" width="44" height="22" rx="7" fill="#1B5A3F" />
      <rect x="102" y="55" width="36" height="5" rx="2.5" fill="#FFFFFF" opacity="0.3" />
      {/* label panel */}
      <rect x="90" y="124" width="60" height="42" rx="8" fill="#FFFFFF" opacity="0.62" />
      <path d={`M88 110 L88 178`} stroke="#FFFFFF" strokeOpacity="0.42" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function Pot({ t, uid }) {
  return (
    <>
      <Ground id={`${uid}-g`} rx={74} cy={190} ry={12} />
      {/* shallow, wide pot */}
      <path d={`M64 130 L72 172 Q74 182 84 182 L156 182 Q166 182 168 172 L176 130 Z`} fill={t.base} />
      <path d={`M124 130 L168 130 L158 172 Q156 182 146 182 L118 182 Z`} fill={t.dark} opacity="0.4" />
      {/* rim */}
      <ellipse cx="120" cy="130" rx="58" ry="16" fill={t.light} />
      <ellipse cx="120" cy="130" rx="49" ry="12" fill={t.deep} opacity="0.35" />
      {/* foil lid, caught mid-peel */}
      <path d={`M71 126 A58 16 0 0 1 169 126 L169 130 A58 16 0 0 1 71 130 Z`} fill="#FFFFFF" opacity="0.9" />
      <path d={`M152 120 Q182 104 190 78 Q172 96 148 112 Z`} fill="#FFFFFF" opacity="0.82" />
      <path d={`M152 120 Q176 106 186 86`} stroke="#101E18" strokeOpacity="0.1" strokeWidth="2" fill="none" />
      <path d="M78 122 Q120 110 162 122" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2.5" fill="none" />
    </>
  )
}

const PACKS = { block: Block, slices: Slices, shreds: Shreds, tub: Tub, creamer: Creamer, pot: Pot }

/**
 * `kind` picks the pack format, `tone` picks the colourway.
 * Sized by the caller — the viewBox is square and the art is centred.
 */
export function ProductArt({ kind = 'block', tone = 'cheddar', className = '', ...rest }) {
  const uid = useId().replace(/:/g, '')
  const Pack = PACKS[kind] ?? Block
  const t = TONES[tone] ?? TONES.cheddar
  return (
    <svg viewBox="0 0 240 240" className={className} role="presentation" focusable="false" {...rest}>
      <Pack t={t} uid={uid} />
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
