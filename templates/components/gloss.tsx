import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, type LayoutChangeEvent, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Durations } from "@/constants/motion";

/**
 * Static glossy top-highlight — the cheap, always-on "this surface is shiny"
 * cue. Drop it as the last child of any rounded, colored, `overflow-hidden`
 * surface. Pure gradient, no animation, no cost.
 */
export function GlossOverlay({
  radius = 16,
  intensity = 0.35,
  height = "55%",
  style,
}: {
  radius?: number;
  intensity?: number;
  /** How far down the highlight fades, as a % of the surface height. */
  height?: number | `${number}%`;
  style?: ViewStyle;
}) {
  return (
    <LinearGradient
      pointerEvents="none"
      colors={[
        `rgba(255,255,255,${intensity})`,
        `rgba(255,255,255,${intensity * 0.35})`,
        "rgba(255,255,255,0)",
      ]}
      locations={[0, 0.5, 1]}
      style={[
        styles.glossTop,
        { borderTopLeftRadius: radius, borderTopRightRadius: radius, height },
        style,
      ]}
    />
  );
}

/**
 * Animated diagonal sheen that sweeps across a surface — the premium "catch the
 * light" moment. Clip it inside an `overflow-hidden` rounded parent. Respects
 * reduced-motion (renders nothing).
 */
export function Sheen({
  color = "rgba(255,255,255,0.5)",
  bandWidth = 70,
  delayMs = 2400,
  loop = true,
}: {
  color?: string;
  bandWidth?: number;
  delayMs?: number;
  loop?: boolean;
}) {
  const [width, setWidth] = useState(0);
  const progress = useSharedValue(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || width === 0) return;

    const sweep = withDelay(
      delayMs,
      withTiming(1, {
        duration: Durations.sheen,
        easing: Easing.inOut(Easing.cubic),
      })
    );

    progress.value = 0;
    progress.value = loop ? withRepeat(sweep, -1, false) : sweep;
  }, [reducedMotion, width, delayMs, loop, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const offscreenOffset = bandWidth * 2;
    const travel = width + offscreenOffset * 2;
    return {
      transform: [
        { translateX: -offscreenOffset + progress.value * travel },
        { rotate: "18deg" },
      ],
    };
  });

  const onLayout = (e: LayoutChangeEvent) => {
    const next = e.nativeEvent.layout.width;
    setWidth((prev) => (Math.abs(prev - next) > 1 ? next : prev));
  };

  if (reducedMotion) return null;

  return (
    <Animated.View
      pointerEvents="none"
      onLayout={onLayout}
      style={[StyleSheet.absoluteFill, styles.sheenClip]}
    >
      <Animated.View
        style={[styles.sheenBand, { width: bandWidth }, animatedStyle]}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0)", color, "rgba(255,255,255,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  glossTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  sheenClip: {
    overflow: "hidden",
  },
  sheenBand: {
    position: "absolute",
    top: -40,
    bottom: -40,
    left: 0,
  },
});
