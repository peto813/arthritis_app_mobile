import { Pressable } from "react-native";

import { spacing } from "@/constants/spacing";
import { useAppTheme } from "@/theme/AppThemeProvider";

import { AppText } from "./AppText";

type AppButtonProps = {
  label: string;
  onPress?: () => void;
};

export function AppButton({ label, onPress }: AppButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <AppText style={{ color: colors.textOnPrimary, fontWeight: "600" }}>{label}</AppText>
    </Pressable>
  );
}
