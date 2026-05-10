import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Alert, Pressable } from "react-native";

import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CheckInSummaryCard } from "@/components/checkIn/CheckInSummaryCard";
import { checkInDraftStore } from "@/store/checkInDraftStore";
import { useAppTheme } from "@/theme/AppThemeProvider";

export default function CheckInReviewScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const draft = checkInDraftStore.get();

  function confirmCancelCheckIn() {
    Alert.alert("Cancel check-in?", "Your current check-in will be discarded.", [
      { text: "Keep editing", style: "cancel" },
      {
        text: "Cancel check-in",
        style: "destructive",
        onPress: () => {
          checkInDraftStore.reset();
          router.replace("/");
        },
      },
    ]);
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={confirmCancelCheckIn}
              hitSlop={10}
              style={{ paddingRight: 8, paddingVertical: 2 }}
            >
              <Ionicons name="chevron-back" size={24} color={colors.textOnPrimary} />
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
