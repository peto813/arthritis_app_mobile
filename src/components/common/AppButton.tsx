import { Pressable } from "react-native";

import { spacing } from "@/constants/spacing";
import { useAppTheme } from "@/theme/AppThemeProvider";

import { AppText } from "./AppText";

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function AppButton({ label, onPress, disabled = false }: AppButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={{
        backgroundColor: disabled ? colors.border : colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 10,
        alignItems: "center",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <AppText style={{ color: colors.textOnPrimary, fontWeight: "600" }}>{label}</AppText>
    </Pressable>
  );
}
