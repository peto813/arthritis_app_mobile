import { Text, type TextProps } from "react-native";

import { useAppTheme } from "@/theme/AppThemeProvider";

type AppTextProps = TextProps & {
  muted?: boolean;
};

export function AppText({ muted, style, ...props }: AppTextProps) {
  const { colors } = useAppTheme();

  return (
    <Text
      style={[
        { color: muted ? colors.textSecondary : colors.textPrimary, fontSize: 16 },
        style,
      ]}
      {...props}
    />
  );
}
