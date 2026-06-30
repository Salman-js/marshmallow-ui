import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";

import { Card } from "@/components/ds/card";
import { ListRow } from "@/components/ds/list-row";
import { type BadgeColor } from "@/constants/theme";
import { View } from "@/tw";

type SettingCardProps = {
  icon?: ComponentProps<typeof Ionicons>["name"];
  badgeColor?: BadgeColor;
  title: string;
  subtitle?: string;
  /** Trailing control aligned with the header (e.g. a switch). */
  trailing?: ReactNode;
  chevron?: boolean;
  onPress?: () => void;
  destructive?: boolean;
  disabled?: boolean;
  /** Body content rendered below the header (e.g. a segmented control). */
  children?: ReactNode;
};

/**
 * A self-contained white card holding one setting: an icon-badge header with a
 * title/subtitle and an optional trailing control, plus optional body content.
 */
export function SettingCard({
  icon,
  badgeColor,
  title,
  subtitle,
  trailing,
  chevron,
  onPress,
  destructive,
  disabled,
  children,
}: SettingCardProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={title}>
      <ListRow
        icon={icon}
        badgeColor={badgeColor}
        title={title}
        subtitle={subtitle}
        trailing={trailing}
        chevron={chevron}
        destructive={destructive}
        disabled={disabled}
      />
      {children ? <View className="mt-4">{children}</View> : null}
    </Card>
  );
}
