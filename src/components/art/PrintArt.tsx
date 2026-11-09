import { useId } from 'react'
import type { ReactNode } from 'react'
import type { ArtKey, ArtVariant } from '../../content/art'

const C = {
  paper: '#F4EEE4',
  light: '#FBF7F0',
  deep: '#E7DCCB',
  ink: '#0B0C0E',
  navy: '#1C2D4B',
  navyDeep: '#111D33',
  red: '#DE1F26',
  kraft: '#C9A876',
  kraftLight: '#DCC29B',
  kraftDark: '#A97F4F',
  muted: '#6E675C',
  sand: '#EAE1D3',
}

const serif = { fontFamily: '"Fraunces Variable", Fraunces, Georgia, serif' }
const sans = { fontFamily: '"Manrope Variable", Manrope, sans-serif' }

function Art({
  viewBox,
  label,
  children,
  className,
}: {
  viewBox: string
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className ?? ''}`}
    >
      <title>{label}</title>
      {children}
    </svg>
  )
}

function Photo({
  src,
  x = 0,
  y = 0,
  w = 800,
  h = 1000,
}: {
  src: string
  x?: number
  y?: number
  w?: number
  h?: number
}) {
  return (
    <image href={src} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
  )
}

const shadow = { filter: 'drop-shadow(0 22px 28px rgba(17, 29, 51, 0.22))' }
const softShadow = { filter: 'drop-shadow(0 10px 18px rgba(17, 29, 51, 0.16))' }

/* ────────────────────────────── PRESS ────────────────────────────── */

function PressArt({ variant, label }: { variant: ArtVariant; label: string }) {
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <Photo src="/assets/photos/hero-press.webp" />
      <rect width="800" height="1000" fill={C.navyDeep} opacity="0.28" />
      <rect width="800" height="1000" fill="url(#press-shade)" />
      <defs>
        <linearGradient id="press-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navyDeep} stopOpacity="0.1" />
          <stop offset="0.55" stopColor={C.navyDeep} stopOpacity="0" />
          <stop offset="1" stopColor={C.navyDeep} stopOpacity="0.92" />
        </linearGradient>
      </defs>
      <g fill={C.paper} style={sans}>
        <text x="56" y="78" fontSize="11" letterSpacing="3.4" opacity="0.72">
          PROCESS / 01
        </text>
        <text x="56" y="860" fontSize="13" letterSpacing="2.4" opacity="0.7">
          CMYK · PANTONE · MACHINE PROOF
        </text>
        <text x="56" y="912" fontSize="58" style={serif} letterSpacing="-1.5">
          Ink on paper.
        </text>
        <rect x="56" y="936" width="90" height="3" fill={variant === 'red' ? C.red : C.paper} />
      </g>
    </Art>
  )
}

/* ───────────────────────────── SWATCHES ──────────────────────────── */

function SwatchesArt({ label }: { label: string }) {
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <Photo src="/assets/photos/swatches.webp" />
      <rect width="800" height="1000" fill={C.navyDeep} opacity="0.18" />
      <g style={softShadow}>
        <rect x="48" y="806" width="380" height="138" fill={C.paper} />
        <rect x="48" y="806" width="8" height="138" fill={C.red} />
      </g>
      <g fill={C.ink} style={sans}>
        <text x="78" y="846" fontSize="10" letterSpacing="3" fill={C.red}>
          COLOUR
        </text>
        <text x="78" y="886" fontSize="26" style={serif}>
          Matched by eye,
        </text>
        <text x="78" y="918" fontSize="26" style={serif} fontStyle="italic">
          checked by proof.
        </text>
      </g>
    </Art>
  )
}

/* ─────────────────────────────── CARDS ───────────────────────────── */

function CardsArt({ variant, label }: { variant: ArtVariant; label: string }) {
  const front = variant === 'red' ? C.red : C.navy
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={C.deep} />
      <g stroke={C.ink} strokeWidth="1" opacity="0.08">
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="1000" />
        ))}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} />
        ))}
      </g>
      <circle cx="640" cy="210" r="150" fill={C.red} opacity="0.92" />
      <g transform="rotate(-7 400 420)" style={shadow}>
        <rect x="100" y="250" width="600" height="340" fill={C.light} />
        <rect x="100" y="250" width="14" height="340" fill={C.red} />
        <g style={sans}>
          <text x="150" y="305" fontSize="22" style={serif} fill={C.navy}>
            SK
          </text>
          <text x="192" y="302" fontSize="9" letterSpacing="3.4" fill={C.muted}>
            PRINT HOUSE
          </text>
          <text x="150" y="400" fontSize="40" style={serif} fill={C.navy} letterSpacing="-1">
            Your Complete
          </text>
          <text x="150" y="446" fontSize="40" style={serif} fontStyle="italic" fill={C.red} letterSpacing="-1">
            Printing Solution
          </text>
          <line x1="150" y1="492" x2="240" y2="492" stroke={C.ink} strokeWidth="1" opacity="0.3" />
          <text x="150" y="530" fontSize="11" fill={C.muted} letterSpacing="0.6">
            +91 96436 62299
          </text>
          <text x="150" y="552" fontSize="11" fill={C.muted} letterSpacing="0.6">
            skprinthouse@gmail.com
          </text>
        </g>
      </g>
      <g transform="rotate(6 430 690)" style={shadow}>
        <rect x="180" y="560" width="520" height="300" fill={front} />
        <g fill={C.paper} style={sans}>
          <text x="222" y="668" fontSize="92" style={serif} letterSpacing="-3">
            SK
          </text>
          <circle cx="392" cy="642" r="9" fill={C.red} />
          <text x="222" y="708" fontSize="11" letterSpacing="4.4" opacity="0.75">
            PRINT HOUSE
          </text>
          <line x1="222" y1="742" x2="310" y2="742" stroke={C.red} strokeWidth="3" />
          <text x="222" y="784" fontSize="12" opacity="0.82">
            Your Complete Printing Solution
          </text>
          <text x="222" y="824" fontSize="9" letterSpacing="1.8" opacity="0.55">
            PRINT · DESIGN · DELIVER
          </text>
        </g>
      </g>
      <g style={sans} fill={C.ink} opacity="0.45">
        <text x="56" y="70" fontSize="10" letterSpacing="3.2">
          IDENTITY / SPECIMEN 01
        </text>
        <text x="744" y="946" fontSize="10" letterSpacing="2.4" textAnchor="end">
          90 × 54 MM
        </text>
      </g>
    </Art>
  )
}

/* ────────────────────────────── INVITE ───────────────────────────── */

function InviteArt({ variant, label }: { variant: ArtVariant; label: string }) {
  const dark = variant === 'navy'
  const card = dark ? C.navy : C.light
  const text = dark ? C.paper : C.ink
  const quiet = dark ? 'rgba(244,238,228,0.62)' : C.muted
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={dark ? C.navyDeep : C.deep} />
      <g opacity={dark ? 0.12 : 0.16} stroke={dark ? C.paper : C.ink} fill="none">
        <circle cx="400" cy="500" r="330" />
        <circle cx="400" cy="500" r="300" />
      </g>
      <g style={shadow}>
        <rect x="112" y="88" width="576" height="824" fill={card} />
        <rect
          x="138"
          y="114"
          width="524"
          height="772"
          fill="none"
          stroke={dark ? C.red : C.red}
          strokeWidth="1.4"
          opacity="0.9"
        />
      </g>
      <g style={sans} textAnchor="middle" fill={text}>
        <text x="400" y="188" fontSize="10" letterSpacing="4.4" fill={quiet}>
          TOGETHER WITH THEIR FAMILIES
        </text>
        <text x="400" y="326" fontSize="104" style={serif} letterSpacing="-3">
          S <tspan fontStyle="italic" fill={C.red}>&amp;</tspan> K
        </text>
        <line x1="330" y1="356" x2="470" y2="356" stroke={C.red} strokeWidth="1.5" />
        <text x="400" y="414" fontSize="10" letterSpacing="3.6" fill={quiet}>
          REQUEST THE PLEASURE OF YOUR COMPANY
        </text>
        <text x="400" y="438" fontSize="10" letterSpacing="3.6" fill={quiet}>
          AT THE CELEBRATION OF THEIR WEDDING
        </text>
        <text x="400" y="546" fontSize="13" letterSpacing="5" fill={quiet}>
          SAVE THE DATE
        </text>
        <text x="400" y="612" fontSize="54" style={serif} letterSpacing="2">
          MMXXVI
        </text>
        <text x="400" y="672" fontSize="10" letterSpacing="3.4" fill={quiet}>
          A DAY TO REMEMBER
        </text>
        <line x1="360" y1="720" x2="440" y2="720" stroke={text} strokeWidth="1" opacity="0.25" />
        <text x="400" y="762" fontSize="9" letterSpacing="3" fill={quiet}>
          DINNER &amp; DANCING TO FOLLOW
        </text>
      </g>
      <g style={softShadow}>
        <circle cx="596" cy="800" r="54" fill={C.red} />
        <circle cx="596" cy="800" r="43" fill="none" stroke={C.paper} strokeWidth="1" opacity="0.5" />
        <text
          x="596"
          y="810"
          fontSize="24"
          style={serif}
          fill={C.paper}
          textAnchor="middle"
          letterSpacing="1"
        >
          SK
        </text>
      </g>
      <g style={sans} fill={quiet}>
        <text x="56" y="60" fontSize="9" letterSpacing="3">
          INVITATION / SPECIMEN 03
        </text>
        <text x="744" y="960" fontSize="9" letterSpacing="2.4" textAnchor="end">
          LETTERPRESS STUDY
        </text>
      </g>
    </Art>
  )
}

/* ─────────────────────────────── POSTER ──────────────────────────── */

function PosterArt({ variant, label }: { variant: ArtVariant; label: string }) {
  const bg = variant === 'red' ? C.red : C.paper
  const fg = variant === 'red' ? C.paper : C.ink
  const band = variant === 'red' ? C.navy : C.red
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={bg} />
      <g opacity="0.16">
        {Array.from({ length: 12 }).map((_, row) =>
          Array.from({ length: 9 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={620 + col * 18} cy={120 + row * 18} r="2.4" fill={fg} />
          )),
        )}
      </g>
      <g style={sans} fill={fg}>
        <text x="52" y="68" fontSize="10" letterSpacing="3.4">
          SK PRINT HOUSE / POSTER STUDY 01
        </text>
        <text x="52" y="286" fontSize="238" style={serif} letterSpacing="-12">
          INK
        </text>
      </g>
      <rect y="336" width="800" height="164" fill={band} />
      <text
        x="52"
        y="452"
        fontSize="104"
        style={serif}
        fontStyle="italic"
        fill={C.paper}
        letterSpacing="-3"
      >
        on paper.
      </text>
      <text
        x="52"
        y="668"
        fontSize="184"
        style={serif}
        fill="none"
        stroke={fg}
        strokeWidth="1.6"
        opacity="0.55"
        letterSpacing="-6"
      >
        STUDY
      </text>
      <g style={sans} fill={fg}>
        <text x="52" y="760" fontSize="12" letterSpacing="0.4" opacity="0.75">
          A study in weight, margin and the space between letters.
        </text>
        <line x1="52" y1="800" x2="748" y2="800" stroke={fg} strokeWidth="1" opacity="0.25" />
        <text x="52" y="836" fontSize="9" letterSpacing="3" opacity="0.7">
          OFFSET / UNCOATED 300 GSM
        </text>
        <text x="748" y="836" fontSize="9" letterSpacing="3" textAnchor="end" opacity="0.7">
          EDITION OF 50
        </text>
        <text x="52" y="936" fontSize="10" letterSpacing="2" opacity="0.6">
          YOUR COMPLETE PRINTING SOLUTION
        </text>
        <text x="748" y="936" fontSize="10" letterSpacing="2" textAnchor="end" opacity="0.6">
          01 / 19
        </text>
      </g>
    </Art>
  )
}

/* ────────────────────────────── BROCHURE ─────────────────────────── */

function BrochureArt({ label }: { label: string }) {
  const uid = useId().replace(/:/g, '')
  return (
    <Art viewBox="0 0 800 600" label={label}>
      <rect width="800" height="600" fill={C.deep} />
      <g style={shadow}>
        <rect x="70" y="70" width="330" height="460" fill={C.light} />
        <rect x="400" y="70" width="330" height="460" fill={C.light} />
        <rect x="395" y="70" width="10" height="460" fill={C.ink} opacity="0.06" />
      </g>
      <g style={sans} fill={C.ink}>
        <text x="100" y="118" fontSize="9" letterSpacing="3" fill={C.red}>
          THE QUIET ISSUE / 01
        </text>
        <text x="100" y="190" fontSize="44" style={serif} letterSpacing="-1.4">
          Made
        </text>
        <text x="100" y="236" fontSize="44" style={serif} letterSpacing="-1.4">
          to be
        </text>
        <text x="100" y="282" fontSize="44" style={serif} fontStyle="italic" fill={C.red} letterSpacing="-1.4">
          held.
        </text>
        <text x="100" y="340" fontSize="10.5" fill={C.muted} letterSpacing="0.2">
          A study in paper, ink and the quiet
        </text>
        <text x="100" y="358" fontSize="10.5" fill={C.muted} letterSpacing="0.2">
          pleasure of a well-made object.
        </text>
        <line x1="100" y1="392" x2="370" y2="392" stroke={C.ink} opacity="0.15" />
        <text x="100" y="418" fontSize="8.5" letterSpacing="2.2" fill={C.muted}>
          SK PRINT HOUSE · STUDIO NOTES
        </text>
        <text x="100" y="500" fontSize="9" letterSpacing="2" fill={C.muted}>
          01
        </text>
      </g>
      <defs>
        <clipPath id={`${uid}-brochure`}>
          <rect x="432" y="100" width="266" height="286" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-brochure)`}>
        <Photo src="/assets/photos/paper-cut.webp" x={432} y={100} w={266} h={286} />
      </g>
      <g style={sans} fill={C.ink}>
        <text x="432" y="416" fontSize="9" letterSpacing="2.4" fill={C.red}>
          CRAFT / PROCESS
        </text>
        <text x="432" y="444" fontSize="12" fill={C.muted}>
          Cut, fold, check, repeat.
        </text>
        <line x1="432" y1="470" x2="698" y2="470" stroke={C.ink} opacity="0.15" />
        <text x="432" y="500" fontSize="9" letterSpacing="2" fill={C.muted}>
          02
        </text>
      </g>
      <g style={sans} fill={C.ink} opacity="0.5">
        <text x="70" y="558" fontSize="8" letterSpacing="2.6">
          EDITORIAL / SPECIMEN 04
        </text>
        <text x="730" y="558" fontSize="8" letterSpacing="2.6" textAnchor="end">
          A4 · SADDLE STITCH
        </text>
      </g>
    </Art>
  )
}

/* ─────────────────────────────── FLYER ───────────────────────────── */

function FlyerArt({ variant, label }: { variant: ArtVariant; label: string }) {
  const top = variant === 'ivory' ? C.light : C.paper
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={C.deep} />
      <g transform="rotate(-7 400 500)" style={softShadow}>
        <rect x="120" y="160" width="540" height="720" fill={C.red} />
      </g>
      <g transform="rotate(4 400 520)" style={softShadow}>
        <rect x="140" y="170" width="540" height="720" fill={C.navy} />
      </g>
      <g transform="rotate(-2 400 500)" style={shadow}>
        <rect x="120" y="150" width="560" height="740" fill={top} />
        <g style={sans} fill={C.ink}>
          <text x="164" y="206" fontSize="10" letterSpacing="3.2" fill={C.red}>
            SK PRINT HOUSE / FLYER 01
          </text>
          <text x="164" y="330" fontSize="92" style={serif} letterSpacing="-4">
            MAKE
          </text>
          <text x="164" y="420" fontSize="92" style={serif} letterSpacing="-4">
            IT
          </text>
          <text x="164" y="510" fontSize="92" style={serif} fontStyle="italic" fill={C.red} letterSpacing="-4">
            print.
          </text>
          <line x1="164" y1="552" x2="636" y2="552" stroke={C.ink} opacity="0.18" />
          <text x="164" y="594" fontSize="12" fill={C.muted}>
            From a single sheet to a full campaign,
          </text>
          <text x="164" y="614" fontSize="12" fill={C.muted}>
            we make the message worth keeping.
          </text>
          <g transform="translate(164 690)">
            <rect width="200" height="52" fill={C.navy} />
            <text x="100" y="32" fontSize="10" letterSpacing="2.6" fill={C.paper} textAnchor="middle">
              GET A QUOTE
            </text>
          </g>
          <text x="164" y="820" fontSize="9" letterSpacing="2.4" fill={C.muted}>
            DIGITAL / OFFSET · A5 · 130 GSM
          </text>
          <circle cx="640" cy="790" r="52" fill={C.red} />
          <text x="640" y="798" fontSize="18" style={serif} fill={C.paper} textAnchor="middle">
            19
          </text>
          <text x="640" y="816" fontSize="7" letterSpacing="1.6" fill={C.paper} textAnchor="middle">
            SERVICES
          </text>
        </g>
      </g>
      <text
        x="56"
        y="72"
        fontSize="10"
        letterSpacing="3"
        fill={C.ink}
        opacity="0.5"
        style={sans}
      >
        PROMOTIONAL / SPECIMEN 05
      </text>
    </Art>
  )
}

/* ────────────────────────────── STICKER ──────────────────────────── */

function StickerArt({ label }: { label: string }) {
  const cells = [
    { x: 170, y: 220, kind: 'sk', fill: C.light, ink: C.navy },
    { x: 400, y: 220, kind: 'p', fill: C.red, ink: C.paper },
    { x: 630, y: 220, kind: 'no', fill: C.navy, ink: C.paper },
    { x: 170, y: 520, kind: 'star', fill: C.paper, ink: C.red },
    { x: 400, y: 520, kind: 'outline', fill: C.paper, ink: C.navy },
    { x: 630, y: 520, kind: 'ink', fill: C.light, ink: C.ink },
    { x: 170, y: 820, kind: 'stripes', fill: C.navy, ink: C.paper },
    { x: 400, y: 820, kind: 's', fill: C.red, ink: C.paper },
    { x: 630, y: 820, kind: 'house', fill: C.paper, ink: C.navy },
  ]
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={C.kraft} />
      <g opacity="0.18" fill={C.kraftDark}>
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={40 + col * 100} cy={40 + row * 100} r="1.8" />
          )),
        )}
      </g>
      {cells.map((cell) => (
        <g key={`${cell.x}-${cell.y}`} style={softShadow}>
          <circle cx={cell.x} cy={cell.y} r="96" fill={C.paper} />
          <circle cx={cell.x} cy={cell.y} r="88" fill={cell.fill} />
          {cell.kind === 'sk' && (
            <text x={cell.x} y={cell.y + 24} fontSize="72" style={serif} fill={cell.ink} textAnchor="middle">
              SK
            </text>
          )}
          {cell.kind === 'p' && (
            <text x={cell.x} y={cell.y + 28} fontSize="84" style={serif} fill={cell.ink} textAnchor="middle">
              P
            </text>
          )}
          {cell.kind === 'no' && (
            <g fill={cell.ink} style={sans} textAnchor="middle">
              <text x={cell.x} y={cell.y - 2} fontSize="42" style={serif}>
                19
              </text>
              <text x={cell.x} y={cell.y + 24} fontSize="8" letterSpacing="2">
                SERVICES
              </text>
            </g>
          )}
          {cell.kind === 'star' && (
            <text x={cell.x} y={cell.y + 30} fontSize="96" style={serif} fill={cell.ink} textAnchor="middle">
              *
            </text>
          )}
          {cell.kind === 'outline' && (
            <text
              x={cell.x}
              y={cell.y + 24}
              fontSize="70"
              style={serif}
              fill="none"
              stroke={cell.ink}
              strokeWidth="1.4"
              textAnchor="middle"
            >
              SK
            </text>
          )}
          {cell.kind === 'ink' && (
            <text x={cell.x} y={cell.y + 20} fontSize="46" style={serif} fill={cell.ink} textAnchor="middle">
              INK
            </text>
          )}
          {cell.kind === 'stripes' && (
            <g fill={cell.ink} opacity="0.85">
              {[-30, 0, 30].map((offset) => (
                <rect key={offset} x={cell.x - 58} y={cell.y + offset - 6} width="116" height="10" />
              ))}
            </g>
          )}
          {cell.kind === 's' && (
            <text x={cell.x} y={cell.y + 28} fontSize="84" style={serif} fill={cell.ink} textAnchor="middle">
              S
            </text>
          )}
          {cell.kind === 'house' && (
            <g fill={cell.ink} style={sans} textAnchor="middle">
              <text x={cell.x} y={cell.y - 4} fontSize="22" style={serif}>
                SK
              </text>
              <text x={cell.x} y={cell.y + 18} fontSize="7" letterSpacing="1.8">
                PRINT HOUSE
              </text>
              <line x1={cell.x - 28} y1={cell.y + 32} x2={cell.x + 28} y2={cell.y + 32} stroke={C.red} strokeWidth="2" />
            </g>
          )}
        </g>
      ))}
      <g style={sans} fill={C.paper}>
        <text x="56" y="60" fontSize="9" letterSpacing="3">
          STICKER SHEET / SPECIMEN 06
        </text>
        <text x="744" y="958" fontSize="9" letterSpacing="2.4" textAnchor="end">
          DIE-CUT · VINYL
        </text>
      </g>
    </Art>
  )
}

/* ─────────────────────────────── LABEL ───────────────────────────── */

function LabelArt({ label }: { label: string }) {
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <Photo src="/assets/photos/amber.webp" />
      <rect width="800" height="1000" fill="url(#label-fade)" />
      <defs>
        <linearGradient id="label-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.ink} stopOpacity="0.06" />
          <stop offset="0.52" stopColor={C.ink} stopOpacity="0" />
          <stop offset="1" stopColor={C.ink} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g style={shadow}>
        <rect y="618" width="800" height="382" fill={C.light} />
        <rect y="618" width="800" height="5" fill={C.red} />
      </g>
      <g style={sans} fill={C.ink}>
        <text x="56" y="676" fontSize="10" letterSpacing="3.2" fill={C.red}>
          LABEL / SPECIMEN 02
        </text>
        <text x="56" y="742" fontSize="54" style={serif} letterSpacing="-1.6">
          Object No. 2
        </text>
        <text x="56" y="784" fontSize="12" fill={C.muted}>
          Amber glass. Uncoated label. One red rule.
        </text>
        <line x1="56" y1="824" x2="744" y2="824" stroke={C.ink} opacity="0.15" />
        <text x="56" y="858" fontSize="8.5" letterSpacing="2.4" fill={C.muted}>
          MATERIAL
        </text>
        <text x="56" y="880" fontSize="11">Uncoated paper</text>
        <text x="300" y="858" fontSize="8.5" letterSpacing="2.4" fill={C.muted}>
          FINISH
        </text>
        <text x="300" y="880" fontSize="11">Matte, water-resistant</text>
        <text x="560" y="858" fontSize="8.5" letterSpacing="2.4" fill={C.muted}>
          SUPPLY
        </text>
        <text x="560" y="880" fontSize="11">Roll or sheet</text>
        <text x="56" y="938" fontSize="9" letterSpacing="2.6" fill={C.muted}>
          YOUR COMPLETE PRINTING SOLUTION
        </text>
      </g>
    </Art>
  )
}

/* ───────────────────────────── PACKAGING ─────────────────────────── */

function PackagingArt({ label }: { label: string }) {
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={C.sand} />
      <g stroke={C.ink} strokeWidth="1" opacity="0.06">
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="1000" />
        ))}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} />
        ))}
      </g>
      <g style={sans} fill={C.ink}>
        <text x="56" y="70" fontSize="10" letterSpacing="3.2" opacity="0.55">
          PACKAGING / SPECIMEN 04
        </text>
      </g>
      <ellipse cx="420" cy="850" rx="270" ry="34" fill={C.ink} opacity="0.14" />
      <g style={shadow}>
        <polygon points="180,410 300,306 660,306 540,410" fill={C.kraftLight} />
        <polygon points="540,410 660,306 660,704 540,808" fill={C.kraftDark} />
        <rect x="180" y="410" width="360" height="398" fill={C.kraft} />
        <polygon points="180,410 300,306 660,306 540,410" fill={C.paper} opacity="0.06" />
      </g>
      <g>
        <rect x="248" y="500" width="224" height="200" fill={C.navy} />
        <g style={sans} fill={C.paper}>
          <text x="272" y="548" fontSize="34" style={serif}>
            SK
          </text>
          <text x="272" y="576" fontSize="8" letterSpacing="2.8" opacity="0.7">
            PRINT HOUSE
          </text>
          <line x1="272" y1="598" x2="330" y2="598" stroke={C.red} strokeWidth="2.5" />
          <text x="272" y="632" fontSize="8.5" letterSpacing="2.2" opacity="0.7">
            BATCH
          </text>
          <text x="272" y="656" fontSize="22" style={serif}>
            No. 04
          </text>
          <text x="272" y="682" fontSize="7.5" letterSpacing="1.6" opacity="0.55">
            HAND FINISHED
          </text>
        </g>
      </g>
      <g transform="rotate(7 610 700)" style={softShadow}>
        <rect x="540" y="620" width="180" height="220" fill={C.light} />
        <g style={sans} fill={C.ink}>
          <text x="562" y="670" fontSize="8" letterSpacing="2.4" fill={C.red}>
            WITH CARE
          </text>
          <text x="562" y="720" fontSize="30" style={serif}>
            Thank
          </text>
          <text x="562" y="754" fontSize="30" style={serif} fontStyle="italic">
            you.
          </text>
          <line x1="562" y1="786" x2="622" y2="786" stroke={C.ink} opacity="0.2" />
          <text x="562" y="812" fontSize="7" letterSpacing="1.6" fill={C.muted}>
            SK PRINT HOUSE
          </text>
        </g>
      </g>
      <g style={sans} fill={C.ink} opacity="0.55">
        <text x="56" y="920" fontSize="9" letterSpacing="2.6">
          KRAFT BOARD · TWO-SPOT COLOUR
        </text>
        <text x="744" y="920" fontSize="9" letterSpacing="2.6" textAnchor="end">
          STRUCTURAL STUDY
        </text>
      </g>
    </Art>
  )
}

/* ────────────────────────────── APPAREL ──────────────────────────── */

function ApparelArt({ variant, label }: { variant: ArtVariant; label: string }) {
  const ink = variant === 'red' ? C.red : C.navy
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <Photo src="/assets/photos/tee-white.webp" />
      <rect width="800" height="1000" fill={C.navyDeep} opacity="0.06" />
      <g style={softShadow}>
        <circle cx="400" cy="430" r="82" fill={ink} opacity="0.96" />
        <text x="400" y="446" fontSize="54" style={serif} fill={C.paper} textAnchor="middle" letterSpacing="-1">
          SK
        </text>
        <line x1="372" y1="462" x2="428" y2="462" stroke={C.red} strokeWidth="3" />
      </g>
      <g style={sans} fill={C.ink}>
        <rect x="42" y="42" width="212" height="52" fill={C.paper} opacity="0.92" />
        <text x="62" y="64" fontSize="8" letterSpacing="2.4" fill={C.muted}>
          APPAREL / 01
        </text>
        <text x="62" y="82" fontSize="12" style={serif}>
          One-colour print
        </text>
      </g>
      <g style={sans}>
        <rect x="0" y="848" width="800" height="152" fill={C.navy} />
        <text x="56" y="900" fontSize="10" letterSpacing="3" fill={C.paper} opacity="0.6">
          HEAVYWEIGHT COTTON / S–3XL
        </text>
        <text x="56" y="946" fontSize="30" style={serif} fill={C.paper}>
          Wear the mark.
        </text>
        <circle cx="710" cy="920" r="34" fill={C.red} />
        <text x="710" y="926" fontSize="12" style={serif} fill={C.paper} textAnchor="middle">
          SK
        </text>
      </g>
    </Art>
  )
}

/* ──────────────────────────────── MUG ────────────────────────────── */

function MugArt({ label }: { label: string }) {
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <Photo src="/assets/photos/mug.webp" />
      <rect width="800" height="1000" fill={C.navyDeep} opacity="0.03" />
      <g style={sans}>
        <rect x="56" y="56" width="240" height="60" fill={C.paper} opacity="0.9" />
        <text x="76" y="80" fontSize="8" letterSpacing="2.6" fill={C.muted}>
          EVERYDAY OBJECT
        </text>
        <text x="76" y="100" fontSize="14" style={serif} fill={C.ink}>
          Mug / 325 ml
        </text>
      </g>
      <circle cx="672" cy="120" r="46" fill={C.red} />
      <text x="672" y="128" fontSize="16" style={serif} fill={C.paper} textAnchor="middle">
        01
      </text>
      <g style={sans}>
        <rect x="56" y="780" width="688" height="164" fill={C.navy} />
        <text x="88" y="830" fontSize="9" letterSpacing="3" fill={C.paper} opacity="0.6">
          FULL-COLOUR WRAP / CERAMIC
        </text>
        <text x="88" y="882" fontSize="40" style={serif} fill={C.paper} letterSpacing="-1">
          A daily reminder.
        </text>
        <text x="88" y="916" fontSize="9" letterSpacing="2.2" fill={C.paper} opacity="0.6">
          YOUR COMPLETE PRINTING SOLUTION
        </text>
      </g>
    </Art>
  )
}

/* ─────────────────────────────── PHOTO ───────────────────────────── */

function PhotoArt({ label }: { label: string }) {
  const uid = useId().replace(/:/g, '')
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={C.sand} />
      <g style={shadow}>
        <rect x="106" y="86" width="588" height="730" fill={C.ink} />
        <rect x="136" y="116" width="528" height="670" fill={C.light} />
      </g>
      <defs>
        <clipPath id={`${uid}-photo`}>
          <rect x="176" y="156" width="448" height="580" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-photo)`}>
        <Photo src="/assets/photos/dried-flowers.webp" x={176} y={156} w={448} h={580} />
      </g>
      <polygon points="176,156 624,156 460,736 176,736" fill={C.paper} opacity="0.06" />
      <g style={sans} fill={C.ink}>
        <text x="400" y="790" fontSize="8.5" letterSpacing="3" textAnchor="middle" fill={C.muted}>
          STILL LIFE / STUDY NO. 07
        </text>
        <text x="400" y="858" fontSize="26" style={serif} textAnchor="middle">
          Printed to be kept.
        </text>
        <line x1="340" y1="884" x2="460" y2="884" stroke={C.red} strokeWidth="1.4" />
        <text x="400" y="922" fontSize="8.5" letterSpacing="2.4" textAnchor="middle" fill={C.muted}>
          ARCHIVAL MATTE · CUSTOM FRAME
        </text>
      </g>
    </Art>
  )
}

/* ───────────────────────────── CORPORATE ─────────────────────────── */

function CorporateArt({ label }: { label: string }) {
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={C.deep} />
      <g style={sans} fill={C.ink}>
        <text x="56" y="66" fontSize="10" letterSpacing="3.2" opacity="0.5">
          CORPORATE / SET 01
        </text>
      </g>
      <g transform="rotate(-3 320 380)" style={shadow}>
        <rect x="90" y="120" width="410" height="560" fill={C.light} />
        <g style={sans} fill={C.ink}>
          <text x="126" y="172" fontSize="18" style={serif}>
            SK
          </text>
          <text x="162" y="170" fontSize="7.5" letterSpacing="2.4" fill={C.muted}>
            PRINT HOUSE
          </text>
          <line x1="126" y1="190" x2="466" y2="190" stroke={C.red} strokeWidth="2" />
          <text x="126" y="236" fontSize="7" letterSpacing="2" fill={C.muted}>
            LETTERHEAD / A4
          </text>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x="126" y={270 + i * 18} width={i % 3 === 2 ? 210 : 330} height="3" fill={C.ink} opacity="0.14" />
          ))}
          <line x1="126" y1="610" x2="466" y2="610" stroke={C.ink} opacity="0.14" />
          <text x="126" y="640" fontSize="8" fill={C.muted}>
            +91 96436 62299
          </text>
          <text x="126" y="656" fontSize="8" fill={C.muted}>
            skprinthouse@gmail.com
          </text>
        </g>
      </g>
      <g transform="rotate(7 560 640)" style={shadow}>
        <rect x="430" y="560" width="280" height="180" fill={C.sand} />
        <path d="M430 560 L570 650 L710 560" fill="none" stroke={C.ink} strokeWidth="1" opacity="0.2" />
        <text x="458" y="608" fontSize="7.5" letterSpacing="2.4" fill={C.muted} style={sans}>
          ENVELOPE / DL
        </text>
      </g>
      <g transform="rotate(4 570 800)" style={shadow}>
        <rect x="440" y="730" width="280" height="180" fill={C.navy} />
        <text x="470" y="806" fontSize="42" style={serif} fill={C.paper}>
          SK
        </text>
        <line x1="470" y1="824" x2="520" y2="824" stroke={C.red} strokeWidth="2.5" />
        <text x="470" y="858" fontSize="7" letterSpacing="2.2" fill={C.paper} opacity="0.6" style={sans}>
          YOUR COMPLETE PRINTING SOLUTION
        </text>
      </g>
      <g style={sans} fill={C.ink} opacity="0.5">
        <text x="56" y="940" fontSize="9" letterSpacing="2.4">
          STATIONERY · ENVELOPE · CARD
        </text>
        <text x="744" y="940" fontSize="9" letterSpacing="2.4" textAnchor="end">
          ONE BRAND SYSTEM
        </text>
      </g>
    </Art>
  )
}

/* ─────────────────────────────── GIFT ────────────────────────────── */

function GiftArt({ label }: { label: string }) {
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <Photo src="/assets/photos/gift.webp" />
      <rect width="800" height="1000" fill={C.navyDeep} opacity="0.18" />
      <g transform="rotate(-8 560 470)" style={softShadow}>
        <rect x="480" y="420" width="170" height="108" fill={C.light} />
        <circle cx="565" cy="438" r="5" fill={C.deep} />
        <g style={sans} fill={C.ink}>
          <text x="500" y="466" fontSize="7.5" letterSpacing="2" fill={C.red}>
            FOR YOU
          </text>
          <text x="500" y="492" fontSize="22" style={serif}>
            With care
          </text>
          <text x="500" y="512" fontSize="7" letterSpacing="1.6" fill={C.muted}>
            SK PRINT HOUSE
          </text>
        </g>
      </g>
      <g style={sans}>
        <rect x="0" y="838" width="800" height="162" fill={C.navy} />
        <text x="56" y="888" fontSize="9" letterSpacing="3" fill={C.paper} opacity="0.6">
          PERSONALISED GIFTING / WRAPPED
        </text>
        <text x="56" y="936" fontSize="34" style={serif} fill={C.paper}>
          Made personal.
        </text>
        <circle cx="706" cy="910" r="34" fill={C.red} />
        <text x="706" y="917" fontSize="11" style={serif} fill={C.paper} textAnchor="middle">
          SK
        </text>
      </g>
    </Art>
  )
}

/* ───────────────────────────── BILLBOARD ─────────────────────────── */

function BillboardArt({ variant, label }: { variant: ArtVariant; label: string }) {
  const band = variant === 'navy' ? C.navy : C.red
  return (
    <Art viewBox="0 0 800 600" label={label}>
      <Photo src="/assets/photos/street.webp" />
      <rect width="800" height="600" fill={C.navyDeep} opacity="0.5" />
      <g style={sans} fill={C.paper}>
        <rect x="42" y="42" width="204" height="44" fill={C.paper} opacity="0.92" />
        <text x="62" y="62" fontSize="7.5" letterSpacing="2.2" fill={C.muted}>
          OUT OF HOME
        </text>
        <text x="62" y="77" fontSize="10" style={serif} fill={C.ink}>
          Large format / 01
        </text>
      </g>
      <g style={shadow}>
        <rect x="76" y="300" width="648" height="228" fill={band} />
        <rect x="76" y="300" width="10" height="228" fill={C.paper} opacity="0.9" />
      </g>
      <g style={sans} fill={C.paper}>
        <text x="118" y="348" fontSize="9" letterSpacing="3.2" opacity="0.65">
          YOUR BRAND
        </text>
        <text x="118" y="418" fontSize="62" style={serif} letterSpacing="-2">
          At street scale.
        </text>
        <line x1="118" y1="448" x2="680" y2="448" stroke={C.paper} opacity="0.28" />
        <text x="118" y="484" fontSize="9" letterSpacing="2.6" opacity="0.65">
          FLEX · VINYL · INSTALLATION-READY
        </text>
        <text x="688" y="484" fontSize="9" letterSpacing="2.6" textAnchor="end" opacity="0.65">
          SK PRINT HOUSE
        </text>
      </g>
      <text x="42" y="566" fontSize="8.5" letterSpacing="2.4" fill={C.paper} opacity="0.7" style={sans}>
        LARGE FORMAT / SPECIMEN 08
      </text>
    </Art>
  )
}

/* ──────────────────────────────── MENU ───────────────────────────── */

function MenuArt({ label }: { label: string }) {
  const rows = [
    ['Invitations', '01'],
    ['Identity', '02'],
    ['Packaging', '03'],
    ['Editorial', '04'],
    ['Signage', '05'],
    ['Merchandise', '06'],
  ]
  return (
    <Art viewBox="0 0 800 1000" label={label}>
      <rect width="800" height="1000" fill={C.deep} />
      <g style={shadow}>
        <rect x="90" y="72" width="620" height="856" fill={C.light} />
        <rect x="112" y="94" width="576" height="812" fill="none" stroke={C.ink} strokeWidth="1" opacity="0.14" />
      </g>
      <g style={sans} fill={C.ink} textAnchor="middle">
        <text x="400" y="158" fontSize="24" style={serif}>
          SK
        </text>
        <text x="400" y="180" fontSize="8" letterSpacing="3.4" fill={C.muted}>
          PRINT HOUSE
        </text>
        <text x="400" y="264" fontSize="64" style={serif} letterSpacing="-2">
          The House
        </text>
        <text x="400" y="320" fontSize="64" style={serif} fontStyle="italic" fill={C.red} letterSpacing="-2">
          Menu
        </text>
        <text x="400" y="364" fontSize="8.5" letterSpacing="3" fill={C.muted}>
          YOUR COMPLETE PRINTING SOLUTION
        </text>
        <line x1="340" y1="396" x2="460" y2="396" stroke={C.red} strokeWidth="1.2" />
      </g>
      <g style={sans} fill={C.ink}>
        {rows.map(([name, index], i) => (
          <g key={name}>
            <text x="150" y={470 + i * 62} fontSize="18" style={serif}>
              {name}
            </text>
            <line
              x1="330"
              y1={464 + i * 62}
              x2="600"
              y2={464 + i * 62}
              stroke={C.ink}
              strokeWidth="1"
              strokeDasharray="1 5"
              opacity="0.35"
            />
            <text x="630" y={470 + i * 62} fontSize="13" textAnchor="end" fill={C.red}>
              {index}
            </text>
          </g>
        ))}
        <line x1="150" y1="840" x2="650" y2="840" stroke={C.ink} opacity="0.15" />
        <text x="150" y="874" fontSize="8.5" letterSpacing="2.4" fill={C.muted}>
          ASK FOR THE FULL LIST
        </text>
        <text x="650" y="874" fontSize="8.5" letterSpacing="2.4" textAnchor="end" fill={C.muted}>
          19 SERVICES
        </text>
      </g>
      <g style={sans} fill={C.muted}>
        <text x="56" y="60" fontSize="8.5" letterSpacing="2.8">
          MENU / SPECIMEN 09
        </text>
        <text x="744" y="960" fontSize="8.5" letterSpacing="2.4" textAnchor="end">
          A5 · UNCOATED
        </text>
      </g>
    </Art>
  )
}

/* ────────────────────────────── NOTEBOOK ─────────────────────────── */

function NotebookArt({ label }: { label: string }) {
  return (
    <Art viewBox="0 0 800 600" label={label}>
      <Photo src="/assets/photos/notebook.webp" />
      <rect width="800" height="600" fill={C.navyDeep} opacity="0.1" />
      <g style={sans}>
        <rect x="42" y="42" width="212" height="52" fill={C.paper} opacity="0.92" />
        <text x="62" y="62" fontSize="8" letterSpacing="2.4" fill={C.muted}>
          STATIONERY / 01
        </text>
        <text x="62" y="82" fontSize="12" style={serif} fill={C.ink}>
          Field notes
        </text>
      </g>
      <g style={softShadow}>
        <rect x="42" y="466" width="330" height="94" fill={C.paper} />
        <rect x="42" y="466" width="7" height="94" fill={C.red} />
      </g>
      <g style={sans} fill={C.ink}>
        <text x="70" y="500" fontSize="8" letterSpacing="2.4" fill={C.red}>
          EVERYDAY PRINT
        </text>
        <text x="70" y="532" fontSize="24" style={serif}>
          A good pen. Good paper.
        </text>
        <text x="70" y="550" fontSize="7.5" letterSpacing="1.6" fill={C.muted}>
          SK PRINT HOUSE · STUDIO
        </text>
      </g>
    </Art>
  )
}

/* ─────────────────────────────── EXPORT ──────────────────────────── */

export interface PrintArtProps {
  art: ArtKey
  variant?: ArtVariant
  className?: string
  title?: string
}

export function PrintArt({ art, variant = 'ivory', title }: PrintArtProps) {
  const label = title ?? `${art} print study`
  switch (art) {
    case 'press':
      return <PressArt variant={variant} label={label} />
    case 'swatches':
      return <SwatchesArt label={label} />
    case 'cards':
      return <CardsArt variant={variant} label={label} />
    case 'invite':
      return <InviteArt variant={variant} label={label} />
    case 'poster':
      return <PosterArt variant={variant} label={label} />
    case 'brochure':
      return <BrochureArt label={label} />
    case 'flyer':
      return <FlyerArt variant={variant} label={label} />
    case 'sticker':
      return <StickerArt label={label} />
    case 'label':
      return <LabelArt label={label} />
    case 'packaging':
      return <PackagingArt label={label} />
    case 'apparel':
      return <ApparelArt variant={variant} label={label} />
    case 'mug':
      return <MugArt label={label} />
    case 'photo':
      return <PhotoArt label={label} />
    case 'corporate':
      return <CorporateArt label={label} />
    case 'gift':
      return <GiftArt label={label} />
    case 'billboard':
      return <BillboardArt variant={variant} label={label} />
    case 'menu':
      return <MenuArt label={label} />
    case 'notebook':
      return <NotebookArt label={label} />
    default:
      return <CardsArt variant={variant} label={label} />
  }
}
