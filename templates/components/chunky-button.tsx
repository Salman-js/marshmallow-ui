import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { GlossOverlay, Sheen } from "@/components/ds/gloss";
import { Springs } from "@/constants/motion";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Pressable, Text, View } from "@/tw";
import { getOppositeTextColor } from "@/utils/color-contrast";
import { triggerSelectionHaptic } from "@/utils/haptics";

const CHUNKY_OFFSET = 4;
const COMPACT_RECT_RADIUS = 18;

type ChunkyButtonProps = {
  label?: string;
  children?: ReactNode;
  icon?: ComponentProps<typeof Ionicons>["name"];
  materialIcon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconSize?: number;
  accessibilityLabel?: string;
  onPress?: () => void;
  color?: string;
  shadowColor?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  shape?: "rect" | "circle";
  size?: number;
  variant?: "primary" | "secondary" | "danger";
  /** Fire a light selection haptic on press-in. */
  haptic?: boolean;
  /** Glossy top highlight on the face. Defaults on for filled variants. */
  gloss?: boolean;
  /** Animated diagonal shine sweep across the face. */
  sheen?: boolean;
};

/**
 * The primary labelled button: a chunky solid offset shadow, top gloss + optional
 * sheen, and a face that depresses into the shadow on press.
 */
export function ChunkyButton({
  label,
  children,
  icon,
  materialIcon,
  iconSize = 28,
  accessibilityLabel,
  onPress,
  color,
  shadowColor,
  disabled = false,
  fullWidth = false,
  shape = "rect",
  size,
  variant = "primary",
  haptic = true,
  gloss,
  sheen = false,
}: ChunkyButtonProps) {
  const colors = useThemeColors();
  const press = useSharedValue(0);
  const showGloss = gloss ?? variant !== "secondary";

  const fill =
    color ??
    (variant === "primary"
      ? colors.accent
      : variant === "danger"
        ? colors.danger
        : colors.backgroundElement);

  const shadow =
    shadowColor ??
    (variant === "primary"
      ? colors.accentShadow
      : variant === "danger"
        ? "#D33131"
        : colors.cardShadow);

  const labelColor =
    variant === "secondary"
      ? colors.text
      : color
        ? getOppositeTextColor(color)
        : "#FFFFFF";

  const faceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * CHUNKY_OFFSET }],
  }));

  const isCircle = shape === "circle";
  const resolvedSize = size ?? (isCircle ? 60 : undefined);
  const isCompactIcon =
    shape === "rect" &&
    resolvedSize != null &&
    !label &&
    Boolean(icon || materialIcon || children);
  const compactIconSize = isCircle
    ? Math.round(resolvedSize! * 0.42)
    : isCompactIcon
      ? Math.round(resolvedSize! * 0.42)
      : iconSize;

  const compactShapeStyle =
    resolvedSize == null
      ? undefined
      : {
          width: resolvedSize,
          height: resolvedSize,
          minHeight: resolvedSize,
          borderRadius: isCircle ? resolvedSize / 2 : COMPACT_RECT_RADIUS,
          paddingHorizontal: 0,
          paddingVertical: 0,
        };

  const iconContent =
    children ??
    (materialIcon ? (
      <MaterialCommunityIcons
        name={materialIcon}
        size={compactIconSize}
        color={labelColor}
      />
    ) : icon ? (
      <Ionicons name={icon} size={compactIconSize} color={labelColor} />
    ) : (
      <Text
        className="text-center text-lg font-extrabold"
        style={{ color: labelColor, letterSpacing: 0.3 }}
      >
        {label}
      </Text>
    ));

  const face = (
    <Animated.View
      style={[
        styles.wrap,
        fullWidth && styles.fullWidth,
        (isCircle || isCompactIcon) && {
          width: resolvedSize,
          minHeight: resolvedSize! + CHUNKY_OFFSET,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.shadow,
          fullWidth && styles.fullWidth,
          (isCircle || isCompactIcon) && compactShapeStyle,
          { backgroundColor: shadow },
        ]}
      />
      <Animated.View
        style={[
          styles.face,
          fullWidth && styles.fullWidth,
          (isCircle || isCompactIcon) && compactShapeStyle,
          { backgroundColor: fill, overflow: "hidden" },
          faceAnimatedStyle,
        ]}
      >
        {showGloss ? (
          <GlossOverlay
            radius={
              isCircle && resolvedSize ? resolvedSize / 2 : COMPACT_RECT_RADIUS
            }
            intensity={0.22}
          />
        ) : null}
        {sheen ? <Sheen /> : null}
        {iconContent}
      </Animated.View>
    </Animated.View>
  );

  const containerStyle = {
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? ("100%" as const) : undefined,
    alignSelf: isCircle || isCompactIcon ? ("flex-start" as const) : undefined,
  };

  if (!onPress) {
    return (
      <View
        accessibilityLabel={accessibilityLabel ?? label}
        style={containerStyle}
      >
        {face}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        if (haptic) triggerSelectionHaptic();
        press.value = withSpring(1, Springs.press);
      }}
      onPressOut={() => {
        press.value = withSpring(0, Springs.pop);
      }}
      style={containerStyle}
    >
      {face}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    minHeight: 52,
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 52,
    borderRadius: COMPACT_RECT_RADIUS,
  },
  face: {
    minHeight: 52,
    borderRadius: COMPACT_RECT_RADIUS,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: CHUNKY_OFFSET,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
  },
});
