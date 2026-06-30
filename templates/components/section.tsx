import type { ReactNode } from "react";

import { AppText } from "@/components/ds/app-text";
import { View } from "@/tw";

type SectionProps = {
  title?: string;
  description?: string;
  /** Use the big display heading instead of a small label. */
  large?: boolean;
  children: ReactNode;
  /** Gap between the stacked children (cards). */
  gap?: number;
};

/**
 * A titled group of cards. `large` renders the big rounded screen heading with
 * an optional description paragraph; otherwise a compact uppercase label.
 */
export function Section({
  title,
  description,
  large = false,
  children,
  gap = 12,
}: SectionProps) {
  return (
    <View style={{ gap: large ? 16 : 12 }}>
      {title ? (
        <View style={{ gap: 4 }}>
          <AppText variant={large ? "display" : "label"}>{title}</AppText>
          {description ? (
            <AppText variant="subtitle">{description}</AppText>
          ) : null}
        </View>
      ) : null}
      <View style={{ gap }}>{children}</View>
    </View>
  );
}
