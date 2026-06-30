/**
 * Marshmallow UI — theme tokens.
 * Warm cream light mode + warm near-black dark mode. Pull colors at runtime via
 * `useThemeColors()`; never hard-code theme hex in components.
 */

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#37352C",
    textSecondary: "#9A958A",
    background: "#FBF6EA",
    /** Soft cream used for insets, chips, unselected segments, input fields. */
    backgroundElement: "#F1EBDA",
    backgroundSelected: "#FFFFFF",
    /** Elevated white card surface. */
    surface: "#FFFFFF",
    /** Cream inset placed on top of a white surface. */
    surfaceInset: "#F4EFE2",
    /** Hairline borders around cards and insets. */
    border: "#ECE5D3",
    /** Solid offset shadow behind cards/buttons (the chunky look). */
    cardShadow: "#E3D9C2",
    accent: "#5BB318",
    accentMuted: "#89E219",
    accentShadow: "#46A302",
    /** Tinted green pill background for active labelled buttons/segments. */
    accentSoft: "#E5F4D4",
    accentBorder: "#BDE29A",
    accentText: "#3E8E2C",
    danger: "#FF4B4B",
    dangerSoft: "#FCE0E0",
    shadow: "rgba(86, 74, 43, 0.16)",
  },
  dark: {
    text: "#F4EEDD",
    textSecondary: "#A39C8B",
    background: "#16130D",
    backgroundElement: "#27231A",
    backgroundSelected: "#2C2820",
    surface: "#221E16",
    surfaceInset: "#2C271D",
    border: "#332E23",
    cardShadow: "#0C0A06",
    accent: "#7AD33C",
    accentMuted: "#89E219",
    accentShadow: "#3E7E1E",
    accentSoft: "#2E3A1C",
    accentBorder: "#4C6A2A",
    accentText: "#9FE05E",
    danger: "#FF6B6B",
    dangerSoft: "#3A201F",
    shadow: "rgba(0, 0, 0, 0.45)",
  },
} as const;

/**
 * Baloo 2 weight families. React Native cannot synthesize weights from a single
 * file, so each weight is its own font family. Loaded via `useFonts` in the root
 * layout — the names here must match the loaded families.
 */
export const RoundedFont = {
  regular: "Baloo2_400Regular",
  medium: "Baloo2_500Medium",
  semibold: "Baloo2_600SemiBold",
  bold: "Baloo2_700Bold",
  extrabold: "Baloo2_800ExtraBold",
} as const;

/** Vibrant squircle icon-badge fills. Pair each with a white glyph. */
export const BadgePalette = {
  purple: "#9D6BF0",
  blue: "#34B6F0",
  orange: "#F5A623",
  green: "#5DBB2E",
  teal: "#21C4B0",
  pink: "#F067A6",
  red: "#FF5C5C",
  indigo: "#6C7BF0",
  slate: "#7C8A99",
} as const;

export type BadgeColor = keyof typeof BadgePalette;

export type ThemeColor = Exclude<
  {
    [K in keyof typeof Colors.light]: (typeof Colors.light)[K] extends string
      ? K
      : never;
  }[keyof typeof Colors.light],
  undefined
>;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;
