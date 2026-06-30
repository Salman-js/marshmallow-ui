---
name: marshmallow-ui
description: >-
  Marshmallow UI — a warm, soft-brutalist, "chunky" mobile design system for
  Expo / React Native (NativeWind v4/v5). Cream canvas, white rounded cards with
  solid offset shadows, rounded Baloo 2 type, vibrant squircle icon badges,
  green tinted segmented controls, iOS switches, and bouncy spring motion. Use
  when building or restyling an Expo/React Native app UI, creating cards,
  buttons, list rows, settings screens, segmented toggles, icon badges, or when
  the user asks for a soft/cozy/chunky/claymorphic/marshmallow look.
---

# Marshmallow UI

A warm, tactile, **soft-brutalist** design system for Expo / React Native. Think
physical, slightly-raised cards and buttons on a cream canvas, rounded friendly
type, and squishy spring motion — playful but clean.

> It's neubrutalism (solid offset shadows, defined hairline borders) **softened**
> with rounded corners, warm tones, and gloss. Friendly, not harsh.

## The 7 signature traits

1. **Warm cream canvas** — never pure white/grey backgrounds. Light mode is cream
   (`#FBF6EA`); dark mode is warm near-black (`#16130D`).
2. **Chunky offset shadows** — elevated surfaces sit on a *solid* color block
   offset down by `4px` (not a soft blur). This is the defining look. Inset/recessed
   surfaces stay flat.
3. **Rounded type** — **Baloo 2** at five weights. Headings are extrabold/bold;
   body is medium. Each weight is its own loaded font family.
4. **Vibrant squircle icon badges** — rounded-square chips (radius ≈ 32% of size)
   in saturated palette colors with a white glyph and a subtle top gloss.
5. **Green tinted controls** — the accent is a Duolingo-ish green (`#5BB318`).
   Active segmented options are a tinted green pill with a green border + label.
6. **iOS switches** — system `Switch` with an iOS blue active track (`#34A7F2`).
7. **Bouncy motion** — short, springy press feedback and entrances (Reanimated).
   Surfaces scale down ~3–5% on press and pop back with overshoot.

## When to use

- Building/restyling an Expo or React Native app and the user wants a soft, cozy,
  chunky, claymorphic, friendly, or "marshmallow" aesthetic.
- Creating cards, labelled/icon buttons, list rows, settings screens, segmented
  toggles, icon badges, switches, sections, empty states.
- Establishing a coherent light/dark theme + type + motion system.

## Quick start

1. **Install deps** (see [references/setup.md](references/setup.md) for versions):

```bash
npx expo install expo-font @expo-google-fonts/baloo-2 @expo/vector-icons \
  expo-linear-gradient react-native-reanimated expo-haptics
# styling (NativeWind v5 / react-native-css) + tactile press
npm i nativewind react-native-css pressto
```

2. **Copy the templates** into your app's source tree (default alias `@/*` → `src/*`):

| From `templates/…` | To |
| --- | --- |
| `constants/theme.ts`, `constants/motion.ts` | `src/constants/` |
| `hooks/use-color-scheme.ts`, `hooks/use-theme-colors.ts` | `src/hooks/` |
| `utils/haptics.ts`, `utils/color-contrast.ts` | `src/utils/` |
| `tw/index.tsx` | `src/tw/` |
| `global.css` | `src/` |
| `components/*.tsx` | `src/components/ds/` (keep `gloss.tsx`, `chunky-button.tsx` here too) |

3. **Wire the font + theme** (root layout): load Baloo 2 with `useFonts` and gate
   render until loaded. See [references/setup.md](references/setup.md).

4. **Build with the primitives** — import from your `ds` folder and `@/tw`:

```tsx
import { Section, SettingCard, AppSwitch, Card, AppText, IconBadge } from "@/components/ds";
import { ChunkyButton } from "@/components/ds/chunky-button";
```

## Read next

- [references/tokens.md](references/tokens.md) — colors (light/dark), type scale, radii, shadow recipe, badge palette, spacing, motion.
- [references/setup.md](references/setup.md) — deps, font loading, NativeWind/`global.css`, the `@/tw` font wrapper (and why it matters), path alias.
- [references/components.md](references/components.md) — every component, its props, and when to use it.
- [references/recipes.md](references/recipes.md) — ready-made screen patterns (settings, list, empty state, hero, segmented toggle).

## Core conventions

- **Always go through `@/tw`** for `View` / `Text` / `Pressable` / `TextInput` /
  `ScrollView`. The `Text`/`TextInput` wrappers apply the rounded Baloo family
  automatically (incl. per-weight). Importing RN `Text` directly skips the font.
- **Use `AppText` for copy**, not raw `Text` — its variants own the type scale.
- **Colors come from `useThemeColors()`**, never hard-coded hex (except the fixed
  palette tokens like badge fills). This keeps light/dark correct.
- **Semantic component names** (`SettingCard`, `IconBadge`, `Card`) — not
  `GreenButton` / `WhiteBox`.
- **Elevated vs inset**: an elevated `Card` gets the chunky offset shadow; an
  `inset` card is flat and recessed. Don't stack two chunky shadows.

## Do / Don't

| ✅ Do | ❌ Don't |
| --- | --- |
| Cream/warm backgrounds | Pure white or cold grey canvas |
| Solid offset "chunky" shadow | Soft gaussian blur drop-shadow |
| Baloo 2 rounded type everywhere | System font / thin geometric sans |
| Vibrant squircle icon badges | Tiny monochrome line icons as the accent |
| Tinted-green active segments | Plain underline/segmented iOS grey |
| Bouncy springs on press | Long, slow opacity fades |
| `useThemeColors()` tokens | Hard-coded hex in components |

## Critical gotcha (font + NativeWind interop)

The `Text` wrapper applies the font **downstream of the css interop** and never
mutates the `style` reference handed to the interop. Mutating that guarded `style`
each render causes **infinite re-renders** or **blank text**. Do not "simplify"
the wrapper by injecting `fontFamily` into the style passed to the interop. See
[references/setup.md](references/setup.md) → "The font wrapper".
