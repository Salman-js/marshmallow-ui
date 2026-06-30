import type { ReactNode } from "react";
import { StyleSheet, type TextProps } from "react-native";

import { RoundedFont, type ThemeColor } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Text } from "@/tw";

export type AppTextVariant =
  | "display" // big screen titles
  | "title" // smaller screen / sheet titles
  | "cardTitle" // bold card headings
  | "body" // default copy
  | "subtitle" // muted supporting copy under a title
  | "label" // tiny uppercase section labels
  | "caption"; // small muted footnotes

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  /** Override the theme color token. Defaults are sensible per variant. */
  color?: ThemeColor;
  /** Raw color string, wins over `color`. */
  tint?: string;
  center?: boolean;
  children?: ReactNode;
};

const VARIANT_STYLE = StyleSheet.create({
  display: {
    fontFamily: RoundedFont.extrabold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 0.2,
  },
  title: {
    fontFamily: RoundedFont.extrabold,
    fontSize: 24,
    lineHeight: 30,
  },
  cardTitle: {
    fontFamily: RoundedFont.bold,
    fontSize: 19,
    lineHeight: 24,
  },
  body: {
    fontFamily: RoundedFont.medium,
    fontSize: 16,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: RoundedFont.medium,
    fontSize: 15,
    lineHeight: 20,
  },
  label: {
    fontFamily: RoundedFont.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  caption: {
    fontFamily: RoundedFont.medium,
    fontSize: 13,
    lineHeight: 18,
  },
});

const DEFAULT_TOKEN: Record<AppTextVariant, ThemeColor> = {
  display: "text",
  title: "text",
  cardTitle: "text",
  body: "text",
  subtitle: "textSecondary",
  label: "textSecondary",
  caption: "textSecondary",
};

export function AppText({
  variant = "body",
  color,
  tint,
  center,
  style,
  ...rest
}: AppTextProps) {
  const colors = useThemeColors();
  const resolved = tint ?? colors[color ?? DEFAULT_TOKEN[variant]];

  return (
    <Text
      style={[
        VARIANT_STYLE[variant],
        { color: resolved },
        center && styles.center,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  center: { textAlign: "center" },
});
