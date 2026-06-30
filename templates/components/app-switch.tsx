import { Platform, Switch as RNSwitch } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";

/** iOS-style blue used by toggles. */
const SWITCH_ON = "#34A7F2";

type AppSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  /** Override the active track color (defaults to the iOS blue). */
  tint?: string;
};

export function AppSwitch({
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel,
  tint = SWITCH_ON,
}: AppSwitchProps) {
  const colors = useThemeColors();

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      trackColor={{ false: colors.backgroundElement, true: tint }}
      thumbColor={Platform.OS === "android" ? "#FFFFFF" : undefined}
      ios_backgroundColor={colors.backgroundElement}
    />
  );
}
