# Marshmallow UI

A warm, tactile, **soft-brutalist** design system for **Expo / React Native** —
packaged as an **Agent Skill** so coding agents (Cursor, Claude, etc.) can build
apps in this style for you.

> Cream canvas · white rounded cards on solid "chunky" offset shadows · rounded
> Baloo 2 type · vibrant squircle icon badges · green tinted controls · iOS
> switches · bouncy spring motion. Neubrutalism, softened.

## What's in here

```
marshmallow-ui/
├── SKILL.md                # the skill entrypoint (what/when/how + rules)
├── references/
│   ├── tokens.md           # colors, type scale, radii, chunky-shadow recipe, motion
│   ├── setup.md            # deps, font loading, NativeWind, the @/tw font wrapper
│   ├── components.md       # every component + props + usage
│   └── recipes.md          # ready-made screen patterns
└── templates/              # drop-in source (copy into your app)
    ├── constants/          # theme.ts, motion.ts
    ├── hooks/              # use-color-scheme, use-theme-colors
    ├── utils/              # haptics, color-contrast
    ├── tw/                 # the styled-primitive + font wrapper
    ├── global.css
    └── components/         # AppText, Card, ChunkyButton, IconBadge, ListRow, …
```

## Use it as a skill

**Cursor / Claude (personal):** copy this folder to `~/.cursor/skills/marshmallow-ui/`.

**Project-scoped (shared with your team):** copy it to `.cursor/skills/marshmallow-ui/`
(or `.agents/skills/marshmallow-ui/`) in your repo.

Then ask your agent something like *"Build this settings screen with Marshmallow
UI"* or *"Give this app the marshmallow look."* The agent reads `SKILL.md`,
follows the setup, and drops the `templates/` into your source tree.

## Use it by hand

1. Install deps and load Baloo 2 — see [references/setup.md](references/setup.md).
2. Copy `templates/` into `src/` (alias `@/*` → `src/*`); components go in
   `src/components/ds/`.
3. Build with the primitives — see [references/components.md](references/components.md)
   and [references/recipes.md](references/recipes.md).

## Stack

Expo / React Native · NativeWind v5 (react-native-css) · react-native-reanimated
· @expo-google-fonts/baloo-2 · expo-linear-gradient · @expo/vector-icons ·
pressto · expo-haptics.

The tokens, components, shadow recipe, and motion are independent of the styling
library — only the `@/tw` text-font wrapper depends on react-native-css (swap it
out if you use a different stack; see setup.md).

## License

MIT — use it freely in your apps.
