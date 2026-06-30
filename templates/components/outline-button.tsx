import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet } from "react-native";

import { AppText } from "@/components/ds/app-text";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { PressableScale, View } from "@/tw";
import { triggerSelectionHaptic } from "@/utils/haptics";

type OutlineButtonProps = {
  label: string;
  icon?: ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  /** Dashed border to read as an "add / create" affordance. */
  dashed?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
};

/** A low-emphasis outlined pill button, used for "Add …" affordances. */
export function OutlineButton({
  label,
  icon,
  onPress,
  dashed = true,
  fullWidth = false,
  disabled = false,
}: OutlineButtonProps) {
  const colors = useThemeColors();

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      enabled={!disabled}
      onPress={
        disabled
          ? undefined
          : () => {
              triggerSelectionHaptic();
              onPress?.();
            }
      }
      style={{ alignSelf: fullWidth ? "stretch" : "flex-start" }}
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: colors.surfaceInset,
            borderColor: colors.border,
            borderStyle: dashed ? "dashed" : "solid",
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {icon ? (
          <Ionicons name={icon} size={18} color={colors.textSecondary} />
        ) : null}
        <AppText variant="cardTitle" color="textSecondary">
          {label}
        </AppText>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
});
