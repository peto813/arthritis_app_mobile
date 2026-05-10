import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";

import { JointBodyMap } from "@/components/checkIn/JointBodyMap";
import { JointSymptomSelector } from "@/components/checkIn/JointSymptomSelector";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import type { JointOption } from "@/constants/joints";
import { checkInDraftStore } from "@/store/checkInDraftStore";
import { useAppTheme } from "@/theme/AppThemeProvider";

export default function CheckInJointsScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const draft = checkInDraftStore.get();
  const [selected, setSelected] = useState<string[]>(
    draft.jointSymptoms.map((item) => item.joint),
  );

  function toggleJoint(joint: JointOption) {
    setSelected((prev) => {
      const nextSelected = prev.includes(joint)
        ? prev.filter((item) => item !== joint)
        : [...prev, joint];

      checkInDraftStore.set({
        jointSymptoms: nextSelected.map((jointName) => ({
          joint: jointName,
          pain: draft.painLevel,
          stiffness: draft.stiffnessLevel,
          swelling: draft.swellingPresent,
        })),
      });

      return nextSelected;
    });
  }

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
                router.replace("/check-in");
              }}
              hitSlop={10}
              style={{ paddingRight: 8, paddingVertical: 2 }}
            >
              <Ionicons name="chevron-back" size={24} color={colors.textOnPrimary} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => router.replace("/")} hitSlop={10} style={{ paddingVertical: 2 }}>
              <AppText style={{ color: colors.textOnPrimary, fontWeight: "600", fontSize: 15 }}>
                Cancel
              </AppText>
            </Pressable>
          ),
        }}
      />
      <AppText muted style={{ fontSize: 13 }}>
        Step 2 of 2
      </AppText>
      <SectionTitle
        title="Joints"
        subtitle="Select joints that are currently affected."
      />
      <AppCard style={{ gap: 12 }}>
        <JointBodyMap selected={selected} onToggle={toggleJoint} />
        <JointSymptomSelector selected={selected} onToggle={toggleJoint} />
      </AppCard>
      <Link href="/check-in/review" asChild>
        <AppButton label="Review Check-in" />
      </Link>
    </Screen>
  );
}
