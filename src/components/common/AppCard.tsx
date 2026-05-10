import { View, type ViewProps } from "react-native";

import { spacing } from "@/constants/spacing";
import { useAppTheme } from "@/theme/AppThemeProvider";

export function AppCard({ style, ...props }: ViewProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing.lg,
        },
        style,
      ]}
      {...props}
    />
  );
}
