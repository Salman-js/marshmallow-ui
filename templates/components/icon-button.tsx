import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, type ViewStyle } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";
import { PressableScale } from "@/tw";
import { triggerSelectionHaptic } from "@/utils/haptics";

type IconButtonVariant = "soft" | "plain" | "accent" | "danger";

type IconButtonProps = {
  icon?: ComponentProps<typeof Ionicons>["name"];
  materialIcon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress?: () => void;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  size?: number;
  iconSize?: number;
  /** Circular instead of squircle. */
  round?: boolean;
  disabled?: boolean;
  haptic?: boolean;
  tint?: string;
};

export function IconButton({
  icon,
  materialIcon,
  onPress,
  accessibilityLabel,
  variant = "soft",
  size = 48,
  iconSize,
  round = false,
  disabled = false,
  haptic = true,
  tint,
}: IconButtonProps) {
  const colors = useThemeColors();

  const palette: Record<
    IconButtonVariant,
    { bg: string | undefined; fg: string; border?: string }
  > = {
    soft: { bg: colors.surface, fg: colors.text, border: colors.border },
    plain: { bg: undefined, fg: colors.textSecondary },
    accent: { bg: colors.accent, fg: "#FFFFFF" },
    danger: { bg: colors.dangerSoft, fg: colors.danger },
  };

  const { bg, fg, border } = palette[variant];
  const glyphColor = tint ?? fg;
  const glyph = iconSize ?? Math.round(size * 0.46);

  const shape: ViewStyle = {
    width: size,
    height: size,
    borderRadius: round ? size / 2 : Math.round(size * 0.34),
    backgroundColor: bg,
    borderWidth: border ? 1 : 0,
    borderColor: border,
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      enabled={!disabled}
      onPress={
        disabled
          ? undefined
          : () => {
              if (haptic) triggerSelectionHaptic();
              onPress?.();
            }
      }
      style={[styles.base, shape]}
    >
      {materialIcon ? (
        <MaterialCommunityIcons
          name={materialIcon}
          size={glyph}
          color={glyphColor}
        />
      ) : icon ? (
        <Ionicons name={icon} size={glyph} color={glyphColor} />
      ) : null}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
});
