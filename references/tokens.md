# Marshmallow UI — Design Tokens

All tokens live in `templates/constants/theme.ts`. Pull colors at runtime with
`useThemeColors()` — never hard-code theme hex in components.

## Color palette

### Light (warm cream)

| Token | Hex | Use |
| --- | --- | --- |
| `text` | `#37352C` | Primary text (warm near-black) |
| `textSecondary` | `#9A958A` | Muted/supporting text |
| `background` | `#FBF6EA` | Screen canvas (cream) |
| `backgroundElement` | `#F1EBDA` | Chips, unselected segments, inputs |
| `backgroundSelected` | `#FFFFFF` | Selected element |
| `surface` | `#FFFFFF` | Elevated card face |
| `surfaceInset` | `#F4EFE2` | Cream inset on top of a white surface |
| `border` | `#ECE5D3` | Hairline borders (1px) |
| `cardShadow` | `#E3D9C2` | **Solid offset shadow** behind cards/buttons |
| `accent` | `#5BB318` | Primary green |
| `accentMuted` | `#89E219` | Bright green accent |
| `accentShadow` | `#46A302` | Green button offset shadow |
| `accentSoft` | `#E5F4D4` | Active segment / soft green pill bg |
| `accentBorder` | `#BDE29A` | Active segment border |
| `accentText` | `#3E8E2C` | Green label text |
| `danger` | `#FF4B4B` | Destructive |
| `dangerSoft` | `#FCE0E0` | Destructive soft bg |

### Dark (warm near-black)

| Token | Hex |
| --- | --- |
| `text` | `#F4EEDD` |
| `textSecondary` | `#A39C8B` |
| `background` | `#16130D` |
| `backgroundElement` | `#27231A` |
| `backgroundSelected` | `#2C2820` |
| `surface` | `#221E16` |
| `surfaceInset` | `#2C271D` |
| `border` | `#332E23` |
| `cardShadow` | `#0C0A06` |
| `accent` | `#7AD33C` |
| `accentMuted` | `#89E219` |
| `accentShadow` | `#3E7E1E` |
| `accentSoft` | `#2E3A1C` |
| `accentBorder` | `#4C6A2A` |
| `accentText` | `#9FE05E` |
| `danger` | `#FF6B6B` |
| `dangerSoft` | `#3A201F` |

### Badge palette (fixed, both themes)

Squircle icon-badge fills — always pair with a **white** glyph.

`purple #9D6BF0` · `blue #34B6F0` · `orange #F5A623` · `green #5DBB2E` ·
`teal #21C4B0` · `pink #F067A6` · `red #FF5C5C` · `indigo #6C7BF0` · `slate #7C8A99`

## Typography — Baloo 2

Each weight is a **separate loaded family** (RN can't synthesize weights for
custom fonts). Tokens in `RoundedFont`:

| Token | Family | Weight |
| --- | --- | --- |
| `regular` | `Baloo2_400Regular` | 400 |
| `medium` | `Baloo2_500Medium` | 500 |
| `semibold` | `Baloo2_600SemiBold` | 600 |
| `bold` | `Baloo2_700Bold` | 700 |
| `extrabold` | `Baloo2_800ExtraBold` | 800 |

### Type scale (`AppText` variants)

| Variant | Family | Size / line | Use |
| --- | --- | --- | --- |
| `display` | extrabold | 32 / 38 | Big screen titles |
| `title` | extrabold | 24 / 30 | Sheet / smaller screen titles |
| `cardTitle` | bold | 19 / 24 | Card headings, list-row titles |
| `body` | medium | 16 / 22 | Default copy |
| `subtitle` | medium | 15 / 20 | Muted supporting copy |
| `label` | bold | 12 / 16, uppercase, +0.8 tracking | Tiny section labels |
| `caption` | medium | 13 / 18 | Footnotes |

## Radii

| Element | Radius |
| --- | --- |
| Card | `24` |
| Icon badge | `~size * 0.32` (squircle) |
| Icon button (squircle) | `~size * 0.34` |
| Segment / outline button | `16` |
| Chunky button (rect) | `18` |

## The chunky shadow recipe

The signature elevation. Two stacked layers, **no blur**:

```
<View style={{ position: "relative" }}>
  {/* solid shadow block, offset DOWN by 4px */}
  <View style={{ position: "absolute", left: 0, right: 0, top: 4, bottom: 0,
                 borderRadius: 24, backgroundColor: colors.cardShadow }} />
  {/* face, lifted with marginBottom: 4 so the shadow peeks out the bottom */}
  <View style={{ borderRadius: 24, marginBottom: 4, backgroundColor: colors.surface,
                 borderWidth: 1, borderColor: colors.border }}>
    {children}
  </View>
</View>
```

- Offset constant: **`4`**.
- Card uses `cardShadow`; the green primary button uses `accentShadow`.
- **Inset** surfaces (recessed cream) are flat — no shadow.
- Never nest two chunky shadows.

## Spacing

`half 2 · one 4 · two 8 · three 16 · four 24 · five 32 · six 64`.
Default card padding `16`; section gaps `12` (compact) / `16` (large).

## Motion (`constants/motion.ts`)

Reanimated spring presets — interruptible, retargetable:

| Preset | Config | Use |
| --- | --- | --- |
| `press` | damping 18, stiffness 420, mass 0.7 | Press-down feedback |
| `pop` | damping 12, stiffness 280, mass 0.8 | Release "boing" |
| `bouncy` | damping 11, stiffness 170, mass 0.9 | Hero / celebration entrance |
| `smooth` | damping 26, stiffness 240, mass 1 | Indicators, layout shifts |

Press scale-down ≈ `0.95` (buttons) / `0.97` (segments). Keep UI feedback < ~300ms.
