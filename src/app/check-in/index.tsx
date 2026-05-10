import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FeelingPicker } from "@/components/checkIn/FeelingPicker";
import { NotesInput } from "@/components/checkIn/NotesInput";
import { PainSlider } from "@/components/checkIn/PainSlider";
import { copy } from "@/constants/copy";
import { checkInDraftStore } from "@/store/checkInDraftStore";
import { useAppTheme } from "@/theme/AppThemeProvider";
import type { Feeling } from "@/types/checkin";

export default function CheckInScreen() {
  const { colors } = useAppTheme();
  const savedDraft = checkInDraftStore.get();
  const [painLevel, setPainLevel] = useState(savedDraft.painLevel);
  const [stiffnessLevel, setStiffnessLevel] = useState(savedDraft.stiffnessLevel);
  const [energyLevel, setEnergyLevel] = useState(savedDraft.energyLevel);
  const [fatigueLevel, setFatigueLevel] = useState(savedDraft.fatigueLevel);
  const [swellingPresent, setSwellingPresent] = useState(savedDraft.swellingPresent);
  const [feeling, setFeeling] = useState<Feeling>(savedDraft.feeling);
  const [notesText, setNotesText] = useState(savedDraft.notesText);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showSavedNotice, setShowSavedNotice] = useState(true);

  useEffect(() => {
    checkInDraftStore.set({
      entryDate: new Date().toISOString().slice(0, 10),
      checkinTimestamp: new Date().toISOString(),
      painLevel,
      stiffnessLevel,
      energyLevel,
      fatigueLevel,
      swellingPresent,
      feeling,
      notesText,
    });

    setShowSavedNotice(true);
    const timer = setTimeout(() => setShowSavedNotice(false), 2500);
    return () => clearTimeout(timer);
  }, [painLevel, stiffnessLevel, energyLevel, fatigueLevel, swellingPresent, feeling, notesText]);

  return (
    <Screen>
      <AppText muted style={{ fontSize: 13 }}>
        Step 1 of 2
      </AppText>
      <SectionTitle title={copy.checkInTitle} subtitle="Capture how you feel today." />
      <AppCard style={{ gap: 10, padding: 14 }}>
        <PainSlider value={painLevel} onChange={setPainLevel} showScaleNumbers={false} />
        <PainSlider
          label="Energy"
          minLabel="Very low"
          maxLabel="High"
          value={energyLevel}
          onChange={setEnergyLevel}
          showScaleNumbers={false}
        />
        <Pressable
          onPress={() => setShowMoreDetails((prev) => !prev)}
          style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <AppText style={{ color: colors.primaryDark, fontWeight: "600" }}>
            {showMoreDetails ? "More details" : "More details"}
          </AppText>
          <AppText style={{ color: colors.primaryDark, fontWeight: "600" }}>
            {showMoreDetails ? "▴" : "▾"}
          </AppText>
        </Pressable>
        {showMoreDetails ? (
          <View style={{ gap: 10 }}>
            <PainSlider
              label="Stiffness"
              minLabel="Loose"
              maxLabel="Very stiff"
              value={stiffnessLevel}
              onChange={setStiffnessLevel}
              showScaleNumbers={false}
            />
            <PainSlider
              label="Fatigue"
              minLabel="None"
              maxLabel="Exhausted"
              value={fatigueLevel}
              onChange={setFatigueLevel}
              showScaleNumbers={false}
            />
          </View>
        ) : null}
        <View style={{ gap: 8 }}>
          <AppText style={{ fontWeight: "600" }}>Swelling today?</AppText>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {(["No", "Yes"] as const).map((label) => {
              const isYes = label === "Yes";
              const selected = swellingPresent === isYes;
              return (
                <Pressable
                  key={label}
                  onPress={() => setSwellingPresent(isYes)}
                  style={{
                    borderWidth: 1,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }}
                >
                  <AppText
                    style={{
                      color: selected ? colors.textOnPrimary : colors.textPrimary,
                      fontWeight: selected ? "600" : "400",
                    }}
                  >
                    {label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>
        <FeelingPicker value={feeling} onChange={setFeeling} />
        <NotesInput value={notesText} onChangeText={setNotesText} />
      </AppCard>
      <Link href="/check-in/joints" asChild>
        <AppButton label="Next: Joints" />
      </Link>
      {showSavedNotice ? (
        <AppText muted style={{ fontSize: 12, opacity: 0.75 }}>
          Saved just now.
        </AppText>
      ) : null}
    </Screen>
  );
}
