import { View } from "react-native";

import { AppText } from "@/components/common/AppText";
import { useAppTheme } from "@/theme/AppThemeProvider";

type InsightConfidenceBadgeProps = {
  confidence: number;
};

export function InsightConfidenceBadge({ confidence }: InsightConfidenceBadgeProps) {
  const { colors } = useAppTheme();
  const pct = Math.round(confidence * 100);

  return (
    <View
      style={{
        backgroundColor: `${colors.primary}1A`,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 999,
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
      }}
    >
      <AppText style={{ color: colors.primary, fontSize: 12 }}>{pct}% confidence</AppText>
    </View>
  );
}
