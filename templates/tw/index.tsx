/**
 * Marshmallow UI — styled RN primitives.
 *
 * Wraps React Native components with the NativeWind / react-native-css interop
 * AND applies the rounded Baloo 2 family to text. Import View / Text / Pressable
 * / TextInput / ScrollView from here, never from "react-native" directly, so the
 * font and className styling are applied consistently.
 *
 * IMPORTANT (do not "simplify"): the css interop guards on the *reference* of the
 * `style` prop. We never mutate the style handed to the interop. Instead the
 * font is applied in a leaf component (RoundedText) rendered downstream, reading
 * the already-resolved style. Injecting fontFamily into the interop's style each
 * render causes infinite re-renders / blank text. See references/setup.md.
 */

import {
  useCssElement,
  useNativeVariable as useFunctionalVariable,
} from "react-native-css";

import { PressableScale as PresstoPressableScale } from "pressto";
import React from "react";
import {
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  Text as RNText,
  TextInput as RNTextInput,
  View as RNView,
  StyleSheet,
  type TextStyle,
} from "react-native";

import { RoundedFont } from "@/constants/theme";

function cssElement(
  component: any,
  props: any,
  mapping: any
): React.ReactElement {
  return useCssElement(component, props, mapping) as React.ReactElement;
}

const IS_WEB = process.env.EXPO_OS === "web";

/** Maps a numeric/keyword fontWeight to the matching Baloo 2 family. Returns
 * undefined when no weight is set so callers can fall back to a default. */
function weightToFamily(weight: TextStyle["fontWeight"]): string | undefined {
  if (weight == null) return undefined;
  if (weight === "bold") return RoundedFont.bold;
  if (weight === "normal") return RoundedFont.regular;
  const n = typeof weight === "number" ? weight : parseInt(weight, 10);
  if (Number.isNaN(n)) return undefined;
  if (n >= 800) return RoundedFont.extrabold;
  if (n >= 700) return RoundedFont.bold;
  if (n >= 600) return RoundedFont.semibold;
  if (n >= 500) return RoundedFont.medium;
  return RoundedFont.regular;
}

/** Tailwind weight utilities → Baloo family, resolved from `className`. */
const CLASS_WEIGHT: Record<string, string> = {
  "font-thin": RoundedFont.regular,
  "font-extralight": RoundedFont.regular,
  "font-light": RoundedFont.regular,
  "font-normal": RoundedFont.regular,
  "font-medium": RoundedFont.medium,
  "font-semibold": RoundedFont.semibold,
  "font-bold": RoundedFont.bold,
  "font-extrabold": RoundedFont.extrabold,
  "font-black": RoundedFont.extrabold,
};

function familyFromClassName(className: string | undefined): string | undefined {
  if (!className) return undefined;
  for (const token of className.split(/\s+/)) {
    const family = CLASS_WEIGHT[token];
    if (family) return family;
  }
  return undefined;
}

type RoundedFontProp = { __roundedFont?: string };

const RoundedText = React.forwardRef<
  RNText,
  React.ComponentProps<typeof RNText> & RoundedFontProp
>(({ __roundedFont, style, ...rest }, ref) => {
  const flat = StyleSheet.flatten(style) as TextStyle | undefined;
  const fontFamily =
    flat?.fontFamily ??
    weightToFamily(flat?.fontWeight) ??
    __roundedFont ??
    RoundedFont.regular;
  return <RNText ref={ref} {...rest} style={[style, { fontFamily }]} />;
});
RoundedText.displayName = "RoundedText";

const RoundedTextInput = React.forwardRef<
  RNTextInput,
  React.ComponentProps<typeof RNTextInput> & RoundedFontProp
>(({ __roundedFont, style, ...rest }, ref) => {
  const flat = StyleSheet.flatten(style) as TextStyle | undefined;
  const fontFamily =
    flat?.fontFamily ??
    weightToFamily(flat?.fontWeight) ??
    __roundedFont ??
    RoundedFont.regular;
  return <RNTextInput ref={ref} {...rest} style={[style, { fontFamily }]} />;
});
RoundedTextInput.displayName = "RoundedTextInput";

export const useCSSVariable =
  process.env.EXPO_OS !== "web"
    ? useFunctionalVariable
    : (variable: string) => `var(${variable})`;

export type ViewProps = React.ComponentProps<typeof RNView> & {
  className?: string;
};

export const View = (props: ViewProps) => {
  return cssElement(RNView, props, { className: "style" });
};
View.displayName = "CSS(View)";

export const Text = (
  props: React.ComponentProps<typeof RNText> & { className?: string }
) => {
  if (IS_WEB) return cssElement(RNText, props, { className: "style" });
  return cssElement(
    RoundedText,
    { ...props, __roundedFont: familyFromClassName(props.className) },
    { className: "style" }
  );
};
Text.displayName = "CSS(Text)";

export const TextInput = (
  props: React.ComponentProps<typeof RNTextInput> & { className?: string }
) => {
  if (IS_WEB) return cssElement(RNTextInput, props, { className: "style" });
  return cssElement(
    RoundedTextInput,
    { ...props, __roundedFont: familyFromClassName(props.className) },
    { className: "style" }
  );
};
TextInput.displayName = "CSS(TextInput)";

export const ScrollView = (
  props: React.ComponentProps<typeof RNScrollView> & {
    className?: string;
    contentContainerClassName?: string;
  }
) => {
  return cssElement(
    RNScrollView,
    {
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false,
      ...props,
    },
    {
      className: "style",
      contentContainerClassName: "contentContainerStyle",
    }
  );
};
ScrollView.displayName = "CSS(ScrollView)";

export const Pressable = (
  props: React.ComponentProps<typeof RNPressable> & { className?: string }
) => {
  return cssElement(RNPressable, props, { className: "style" });
};
Pressable.displayName = "CSS(Pressable)";

/** Spring scale-on-press wrapper (from `pressto`). Replace with a plain
 * Pressable or your own Reanimated wrapper if you don't want the dependency. */
export const PressableScale = (
  props: React.ComponentProps<typeof PresstoPressableScale> & {
    className?: string;
  }
) => {
  return cssElement(PresstoPressableScale, props, { className: "style" });
};
PressableScale.displayName = "CSS(PressableScale)";
