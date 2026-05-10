import { Link } from "expo-router";
import { Pressable } from "react-native";

import { AppText } from "@/components/common/AppText";
import { useAppTheme } from "@/theme/AppThemeProvider";

export function TimelineShortcut() {
  const { colors } = useAppTheme();

  return (
    <Link href="/timeline" asChild>
      <Pressable
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 12,
        }}
      >
        <AppText style={{ color: colors.primary, fontWeight: "600" }}>See your timeline</AppText>
      </Pressable>
    </Link>
  );
}
