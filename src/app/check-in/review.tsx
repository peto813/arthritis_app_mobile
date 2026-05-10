import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CheckInSummaryCard } from "@/components/checkIn/CheckInSummaryCard";
import { checkInDraftStore } from "@/store/checkInDraftStore";
import { useAppTheme } from "@/theme/AppThemeProvider";
import { confirmCancelCheckIn } from "@/utils/confirmCancelCheckIn";

export default function CheckInReviewScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const draft = checkInDraftStore.get();

  const handleCancelPress = () => {
    confirmCancelCheckIn(() => router.replace("/"));
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                  return;
                }
                router.replace("/check-in/joints");
              }}
              hitSlop={10}
              style={{ paddingRight: 8, paddingVertical: 2 }}
            >
              <Ionicons name="chevron-back" size={24} color={colors.textOnPrimary} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={handleCancelPress}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Cancel check-in"
              style={{ paddingHorizontal: 4, paddingVertical: 2, marginRight: 10 }}
            >
              <AppText style={{ color: colors.textOnPrimary, fontWeight: "600", fontSize: 15 }}>
                Cancel
              </AppText>
            </Pressable>
          ),
        }}
      />
      <SectionTitle title="Review" subtitle="Confirm your check-in before submitting." />
      <CheckInSummaryCard draft={draft} />
      <AppCard>
        <AppText muted>Submission API wiring can be connected in the next step.</AppText>
      </AppCard>
    </Screen>
  );
}
