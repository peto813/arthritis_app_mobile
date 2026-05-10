import { View } from "react-native";

import { spacing } from "@/constants/spacing";

import { AppText } from "./AppText";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={{ gap: spacing.xs }}>
      <AppText style={{ fontSize: 24, fontWeight: "700" }}>{title}</AppText>
      {subtitle ? <AppText muted>{subtitle}</AppText> : null}
    </View>
  );
}
