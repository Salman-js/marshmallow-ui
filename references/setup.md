# Marshmallow UI — Setup

## 1. Dependencies

Marshmallow UI targets **Expo / React Native** with **NativeWind v5 /
react-native-css**.

```bash
# fonts + icons + gradient + motion + haptics
npx expo install expo-font @expo-google-fonts/baloo-2 @expo/vector-icons \
  expo-linear-gradient react-native-reanimated expo-haptics

# styling interop + tactile press component
npm i nativewind react-native-css pressto
```

Reference versions from the source app (adjust to your Expo SDK):

- `expo` ~56, `react-native` 0.85, `react` 19
- `nativewind` `5.0.0-preview.2`, `react-native-css` `^3`, `tailwindcss` `^4`
- `react-native-reanimated` `4.x`, `@expo-google-fonts/baloo-2` `^0.4`
- `pressto` `^0.6`, `expo-linear-gradient`, `@expo/vector-icons` `^15`

> `pressto` provides `PressableScale` (spring scale on press). If you don't want
> it, replace `PressableScale` imports with a Reanimated-based pressable or a
> plain `Pressable`.

## 2. Path alias

Templates use the `@/*` → `src/*` alias. Ensure `tsconfig.json` has:

```json
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
```

And `babel.config.js` enables Reanimated + NativeWind per their docs.

## 3. NativeWind / Tailwind + `global.css`

Configure NativeWind v5 / react-native-css per their setup, then import the
provided `templates/global.css` (it defines web font fallbacks). On native, the
fonts are applied by the `@/tw` wrapper (below) + loaded via `useFonts`.

Tailwind theme: map your display font to Baloo so web matches native:

```css
:root { --font-display: 'Baloo 2', 'Quicksand', ui-rounded, system-ui, sans-serif; }
```

## 4. Load the Baloo 2 fonts (root layout)

Per the [Expo Font docs](https://docs.expo.dev/versions/latest/sdk/font/), load
with `useFonts` and gate render until loaded:

```tsx
import {
  Baloo2_400Regular, Baloo2_500Medium, Baloo2_600SemiBold,
  Baloo2_700Bold, Baloo2_800ExtraBold, useFonts,
} from "@expo-google-fonts/baloo-2";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Baloo2_400Regular, Baloo2_500Medium, Baloo2_600SemiBold,
    Baloo2_700Bold, Baloo2_800ExtraBold,
  });
  if (!fontsLoaded) return null; // or a splash screen
  return /* ...app... */;
}
```

The family names loaded here must match `RoundedFont` in `constants/theme.ts`.

For production, prefer embedding via the `expo-font` config plugin (build-time)
— same family names, faster first paint. See the Expo Fonts guide.

## 5. Theme tokens + hooks

- `constants/theme.ts` — `Colors` (light/dark), `RoundedFont`, `BadgePalette`,
  `Spacing`, `Fonts`.
- `hooks/use-color-scheme.ts` — returns `"light" | "dark"`. The template uses
  RN's `useColorScheme`; swap in your own preference context to support an
  in-app theme toggle.
- `hooks/use-theme-colors.ts` — returns the active palette object.

```tsx
const colors = useThemeColors();
<View style={{ backgroundColor: colors.background }} />
```

## 6. The font wrapper (why it looks the way it does)

`tw/index.tsx` wraps RN primitives with the NativeWind/react-native-css interop
**and** applies the rounded Baloo family to text. This is the most delicate part
— read before editing.

How it works:

- `View`, `Pressable`, `ScrollView`, etc. → thin css-interop wrappers.
- `Text` / `TextInput` → render a small **leaf** component *downstream* of the
  interop. The leaf reads the **already-resolved** style and picks the family:
  `explicit fontFamily → resolved fontWeight → className hint → regular`.

Why downstream, and why we never touch the interop's `style`:

> The react-native-css interop **guards on the reference of the `style` prop**
> (it records `["a", "style", currentProps.style]`). If the wrapper injects a
> new `style` array on every render, the interop's internal bail re-render also
> rebuilds it, so the guard never settles → **"Too many re-renders"**. Swapping
> the leaf component type but passing the caller's `style` through untouched
> avoids this entirely (no loop, no blanking). Apply the font in the leaf, after
> the interop has done its work.

**Do not** "optimize" the wrapper by merging `fontFamily` into the `style` passed
to `cssElement`. That reintroduces the infinite-render / blank-text bug.

### Using a different styling stack?

If you don't use NativeWind/react-native-css, you can drop the interop and make
`Text`/`TextInput` plain wrappers that prepend the rounded family based on
`style.fontWeight`. The rest of the system (tokens, components, shadows, motion)
is independent of the styling library.

## 7. Haptics

`utils/haptics.ts` uses `expo-haptics` (`triggerSelectionHaptic`,
`triggerSoftImpactHaptic`). No-ops on web. Wire your own enable/disable setting
if desired.
