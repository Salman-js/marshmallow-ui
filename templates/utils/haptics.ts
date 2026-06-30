import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

function canPlayHaptics() {
  return Platform.OS !== "web";
}

/** Light selection tick — segmented controls, toggles, icon buttons. */
export function triggerSelectionHaptic() {
  if (!canPlayHaptics()) return;
  void Haptics.selectionAsync();
}

/** Soft impact — primary actions, confirmations. */
export function triggerSoftImpactHaptic() {
  if (!canPlayHaptics()) return;
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
}

/** Success notification — celebrations, completed streaks. */
export function triggerSuccessHaptic() {
  if (!canPlayHaptics()) return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}
