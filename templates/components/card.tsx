import type { ReactNode } from "react";
import { StyleSheet, type ViewStyle } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";
import { PressableScale, View } from "@/tw";

/** Solid offset behind the card face — the chunky shadow. */
const CHUNKY_OFFSET = 4;
const CARD_RADIUS = 24;

type CardProps = {
  children: ReactNode;
  /** Soft cream inset look instead of an elevated white surface. */
  inset?: boolean;
  /** Remove inner padding when the content manages its own spacing. */
  flush?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  className?: string;
  style?: ViewStyle | ViewStyle[];
};

export function Card({
  children,
  inset = false,
  flush = false,
  onPress,
  accessibilityLabel,
  className,
  style,
}: CardProps) {
  const colors = useThemeColors();

  const faceStyle: ViewStyle = {
    backgroundColor: inset ? colors.surfaceInset : colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  };

  const face = (
    <View
      className={className}
      style={[
        styles.card,
        !flush && styles.padded,
        // Elevated cards lift off a solid offset shadow; insets stay flat.
        !inset && styles.face,
        faceStyle,
        style,
      ]}
    >
      {children}
    </View>
  );

  // Inset cards are recessed, so they don't get the chunky drop shadow.
  const content = inset ? (
    face
  ) : (
    <View style={styles.stack}>
      <View style={[styles.shadow, { backgroundColor: colors.cardShadow }]} />
      {face}
    </View>
  );

  if (!onPress) return content;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
    >
      {content}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  stack: {
    position: "relative",
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: CHUNKY_OFFSET,
    bottom: 0,
    borderRadius: CARD_RADIUS,
  },
  card: {
    borderRadius: CARD_RADIUS,
  },
  face: {
    marginBottom: CHUNKY_OFFSET,
  },
  padded: {
    padding: 16,
  },
});
