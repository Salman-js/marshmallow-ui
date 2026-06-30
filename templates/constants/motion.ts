/**
 * Marshmallow UI — shared motion language. Bouncy, tactile, arcade-y.
 * Use these tokens everywhere so press feedback and entrances feel cohesive.
 */

import { Easing } from "react-native-reanimated";

/** Spring presets. All interruptible and safe to retarget mid-flight. */
export const Springs = {
  /** Snappy tactile press feedback (buttons, chips, tab icons). */
  press: { damping: 18, stiffness: 420, mass: 0.7 },
  /** Lively return with a touch of overshoot — the "boing" on release. */
  pop: { damping: 12, stiffness: 280, mass: 0.8 },
  /** Playful entrance bounce for hero elements and celebrations. */
  bouncy: { damping: 11, stiffness: 170, mass: 0.9 },
  /** Smooth, controlled glide for indicators and layout shifts. */
  smooth: { damping: 26, stiffness: 240, mass: 1 },
} as const;

/** Timing durations (ms). Keep UI feedback under ~300ms. */
export const Durations = {
  instant: 90,
  fast: 140,
  base: 200,
  slow: 280,
  /** Ambient shine sweep — deliberately slower, it's decorative. */
  sheen: 900,
} as const;

/** Easing curves — strong, responsive `out` for entrances. */
export const Easings = {
  out: Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
} as const;

/** Standard press scale-down for tappable surfaces. */
export const PRESS_SCALE = 0.95;

/** Stagger between items in a group entrance (ms). */
export const STAGGER_MS = 55;
