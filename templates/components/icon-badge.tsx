import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
import { Platform, StyleSheet, type ViewStyle } from "react-native";

import { GlossOverlay } from "@/components/ds/gloss";
import { BadgePalette, type BadgeColor } from "@/constants/theme";
import { View } from "@/tw";

type IconBadgeProps = {
  /** Named color from the badge palette. */
  color?: BadgeColor;
  /** Raw fill color, wins over `color`. */
  fill?: string;
  icon?: ComponentProps<typeof Ionicons>["name"];
  materialIcon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  glyphColor?: string;
  children?: ReactNode;
};

export function IconBadge({
  color = "green",
  fill,
  icon,
  materialIcon,
  size = 44,
  glyphColor = "#FFFFFF",
  children,
}: IconBadgeProps) {
  const background = fill ?? BadgePalette[color];
  const glyphSize = Math.round(size * 0.52);
  const radius = Math.round(size * 0.32);

  return (
    <View
      style={[
        styles.badge,
        shadowFor(background),
        {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: background,
        },
      ]}
    >
      <GlossOverlay radius={radius} intensity={0.18} />
      {children ??
        (materialIcon ? (
          <MaterialCommunityIcons
            name={materialIcon}
            size={glyphSize}
            color={glyphColor}
          />
        ) : icon ? (
          <Ionicons name={icon} size={glyphSize} color={glyphColor} />
        ) : null)}
    </View>
  );
}

function shadowFor(color: string): ViewStyle {
  return Platform.select<ViewStyle>({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
    default: {},
  })!;
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
