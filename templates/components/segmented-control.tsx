import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { RoundedFont } from "@/constants/theme";
import { Springs } from "@/constants/motion";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Pressable, Text, View } from "@/tw";
import { triggerSelectionHaptic } from "@/utils/haptics";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
  icon?: IoniconName;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Fire a light haptic on change. Defaults on. */
  haptic?: boolean;
};

/**
 * Discrete labelled toggle buttons: the active option is a tinted green pill
 * with a green border + bold green label; inactive options stay flat cream with
 * muted text.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  haptic = true,
}: SegmentedControlProps<T>) {
  return (
    <View style={styles.row}>
      {options.map((option) => (
        <Segment
          key={option.value}
          option={option}
          active={option.value === value}
          onPress={() => {
            if (option.value === value) return;
            if (haptic) triggerSelectionHaptic();
            onChange(option.value);
          }}
        />
      ))}
    </View>
  );
}

function Segment<T extends string>({
  option,
  active,
  onPress,
}: {
  option: SegmentOption<T>;
  active: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColors();
  const press = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - press.value * 0.03 }],
  }));

  const tint = active ? colors.accentText : colors.textSecondary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={option.label}
      onPress={onPress}
      onPressIn={() => {
        press.value = withSpring(1, Springs.press);
      }}
      onPressOut={() => {
        press.value = withSpring(0, Springs.pop);
      }}
      style={styles.segmentWrap}
    >
      <Animated.View
        style={[
          styles.segment,
          {
            backgroundColor: active ? colors.accentSoft : colors.surfaceInset,
            borderColor: active ? colors.accentBorder : colors.border,
          },
          animatedStyle,
        ]}
      >
        {option.icon ? (
          <Ionicons name={option.icon} size={18} color={tint} />
        ) : null}
        <Text style={[styles.label, { color: tint }]}>{option.label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  segmentWrap: {
    flex: 1,
  },
  segment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  label: {
    fontFamily: RoundedFont.bold,
    fontSize: 16,
  },
});
