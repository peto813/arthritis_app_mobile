import { SafeAreaView, ScrollView, type ScrollViewProps } from "react-native";

import { spacing } from "@/constants/spacing";
import { useAppTheme } from "@/theme/AppThemeProvider";

type ScreenProps = ScrollViewProps;

export function Screen({ contentContainerStyle, ...props }: ScreenProps) {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={[{ padding: spacing.lg, gap: spacing.md }, contentContainerStyle]}
        {...props}
      />
    </SafeAreaView>
  );
}
