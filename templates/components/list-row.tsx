import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";

import { AppText } from "@/components/ds/app-text";
import { IconBadge } from "@/components/ds/icon-badge";
import { type BadgeColor } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { PressableScale, View } from "@/tw";

type ListRowProps = {
  icon?: ComponentProps<typeof Ionicons>["name"];
  materialIcon?: ComponentProps<typeof Ionicons>["name"];
  badgeColor?: BadgeColor;
  /** Render a custom leading element instead of an icon badge. */
  leading?: ReactNode;
  title: string;
  subtitle?: string;
  /** Trailing control (switch, chevron, text...). */
  trailing?: ReactNode;
  /** Show a chevron when there's no custom trailing element. */
  chevron?: boolean;
  onPress?: () => void;
  destructive?: boolean;
  disabled?: boolean;
};

/**
 * A leading icon badge + title/subtitle + trailing control. The atomic row used
 * for settings, data sources, account lists, and menu items.
 */
export function ListRow({
  icon,
  badgeColor = "green",
  leading,
  title,
  subtitle,
  trailing,
  chevron = false,
  onPress,
  destructive = false,
  disabled = false,
}: ListRowProps) {
  const colors = useThemeColors();

  const body = (
    <View
      className="flex-row items-center gap-3"
      style={disabled ? { opacity: 0.5 } : undefined}
    >
      {leading ??
        (icon ? (
          <IconBadge icon={icon} color={destructive ? "red" : badgeColor} />
        ) : null)}
      <View className="min-w-0 flex-1 gap-0.5">
        <AppText
          variant="cardTitle"
          tint={destructive ? colors.danger : colors.text}
          numberOfLines={1}
        >
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="subtitle" numberOfLines={2}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing ??
        (chevron ? (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        ) : null)}
    </View>
  );

  if (!onPress || disabled) return body;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
    >
      {body}
    </PressableScale>
  );
}
