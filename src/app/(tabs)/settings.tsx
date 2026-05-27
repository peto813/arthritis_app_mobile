import { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { PainSlider } from "@/components/checkIn/PainSlider";
import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { copy } from "@/constants/copy";
import { usePatient } from "@/hooks/usePatient";
import { useTimeline } from "@/hooks/useTimeline";
import { ApiError } from "@/services/apiClient";
import { getBaseline, updateBaseline } from "@/services/baselinesApi";
import { baselineStore } from "@/store/baselineStore";
import { useAppTheme } from "@/theme/AppThemeProvider";
import type { CheckIn, PatientBaseline } from "@/types/checkin";

const MIN_CHECKINS_FOR_SUGGESTION = 3;

function toRoundedAverage(values: number[]) {
  if (!values.length) {
    return 5;
  }
  return Math.min(
    10,
    Math.max(
      0,
      Math.round(values.reduce((sum, value) => sum + value, 0) / values.length),
    ),
  );
}

function calculateSuggestedBaseline(
  entries: CheckIn[],
  currentBaseline: PatientBaseline,
): PatientBaseline | null {
  if (entries.length < MIN_CHECKINS_FOR_SUGGESTION) {
    return null;
  }

  const recentEntries = entries.slice(0, 14);
  const painValues = recentEntries.map((entry) => entry.painScore);
  const stiffnessValues = recentEntries.map(
    (entry) => entry.stiffnessLevel ?? entry.painScore,
  );
  const energyValues = recentEntries.map(
    (entry) => entry.energyLevel ?? 10 - entry.painScore,
  );
  const fatigueValues = recentEntries.map(
    (entry) => entry.fatigueLevel ?? entry.painScore,
  );
  const swellingValues = recentEntries.map(
    (entry) => entry.swellingPresent ?? entry.painScore >= 6,
  );
  const swellingTrueCount = swellingValues.filter(Boolean).length;

  return {
    patientId: currentBaseline.patientId,
    updatedAt: new Date().toISOString(),
    typicalPainLevel: toRoundedAverage(painValues),
    typicalStiffnessLevel: toRoundedAverage(stiffnessValues),
    typicalEnergyLevel: toRoundedAverage(energyValues),
    typicalFatigueLevel: toRoundedAverage(fatigueValues),
    typicalSwellingPresent: swellingTrueCount / swellingValues.length >= 0.5,
  };
}

function baselineDiffers(left: PatientBaseline, right: PatientBaseline) {
  return (
    left.typicalPainLevel !== right.typicalPainLevel ||
    left.typicalStiffnessLevel !== right.typicalStiffnessLevel ||
    left.typicalEnergyLevel !== right.typicalEnergyLevel ||
    left.typicalFatigueLevel !== right.typicalFatigueLevel ||
    left.typicalSwellingPresent !== right.typicalSwellingPresent
  );
}

export default function SettingsScreen() {
  const { patient } = usePatient();
  const { entries } = useTimeline();
  const { colors } = useAppTheme();
  const existingBaseline = baselineStore.get(patient.id);

  const [painLevel, setPainLevel] = useState(existingBaseline.typicalPainLevel);
  const [stiffnessLevel, setStiffnessLevel] = useState(
    existingBaseline.typicalStiffnessLevel,
  );
  const [energyLevel, setEnergyLevel] = useState(
    existingBaseline.typicalEnergyLevel,
  );
  const [fatigueLevel, setFatigueLevel] = useState(
    existingBaseline.typicalFatigueLevel,
  );
  const [swellingPresent, setSwellingPresent] = useState(
    existingBaseline.typicalSwellingPresent,
  );
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [isLoadingBaseline, setIsLoadingBaseline] = useState(true);
  const [isSavingBaseline, setIsSavingBaseline] = useState(false);
  const [hasSavedBaseline, setHasSavedBaseline] = useState(false);

  const suggestedBaseline = useMemo(
    () => calculateSuggestedBaseline(entries, existingBaseline),
    [entries, existingBaseline],
  );
  const baselinePreview: PatientBaseline = {
    patientId: patient.id,
    updatedAt: new Date().toISOString(),
    typicalPainLevel: painLevel,
    typicalStiffnessLevel: stiffnessLevel,
    typicalEnergyLevel: energyLevel,
    typicalFatigueLevel: fatigueLevel,
    typicalSwellingPresent: swellingPresent,
  };

  useEffect(() => {
    let isMounted = true;

    async function loadSavedBaseline() {
      setIsLoadingBaseline(true);
      setHasSavedBaseline(false);
      try {
        const remoteBaseline = await getBaseline(patient.id);

        if (!isMounted) {
          return;
        }
        if (remoteBaseline) {
          setHasSavedBaseline(true);
          baselineStore.set(remoteBaseline);
          setPainLevel(remoteBaseline.typicalPainLevel);
          setStiffnessLevel(remoteBaseline.typicalStiffnessLevel);
          setEnergyLevel(remoteBaseline.typicalEnergyLevel);
          setFatigueLevel(remoteBaseline.typicalFatigueLevel);
          setSwellingPresent(remoteBaseline.typicalSwellingPresent);
          setSavedNotice("Loaded saved baseline.");
        } else {
          setSavedNotice("No saved baseline yet. You can save one now.");
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }
        const isNotFoundError =
          (error instanceof ApiError && error.status === 404) ||
          (error instanceof Error && /not[\s-]?found/i.test(error.message));
        if (isNotFoundError) {
          setSavedNotice("No saved baseline yet. You can save one now.");
        } else {
          setSavedNotice("Using local baseline. Could not load from server.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingBaseline(false);
        }
      }
    }

    void loadSavedBaseline();

    return () => {
      isMounted = false;
    };
  }, [patient.id]);

  async function saveBaseline(next: PatientBaseline, notice: string) {
    setIsSavingBaseline(true);
    try {
      const savedBaseline = await updateBaseline(patient.id, {
        updatedAt: next.updatedAt,
        typicalPainLevel: next.typicalPainLevel,
        typicalStiffnessLevel: next.typicalStiffnessLevel,
        typicalEnergyLevel: next.typicalEnergyLevel,
        typicalFatigueLevel: next.typicalFatigueLevel,
        typicalSwellingPresent: next.typicalSwellingPresent,
      });
      baselineStore.set(savedBaseline);
      setSavedNotice(notice);
    } catch {
      baselineStore.set(next);
      setSavedNotice("Saved locally only. Could not sync with server.");
    } finally {
      setIsSavingBaseline(false);
    }
  }

  const baselineInputsDisabled =
    isSavingBaseline || isLoadingBaseline || hasSavedBaseline;

  return (
    <Screen>
      <SectionTitle
        title={copy.settingsTitle}
        subtitle="Profile and app configuration."
      />
      <AppCard>
        <AppText style={{ fontWeight: "700" }}>Patient</AppText>
        <AppText>
          {patient.firstName} {patient.lastName}
        </AppText>
      </AppCard>

      <AppCard style={{ gap: 12 }}>
        <View style={{ gap: 4 }}>
          <AppText style={{ fontWeight: "700" }}>Baseline</AppText>
          <AppText muted>
            Your baseline is your typical day. Compare daily check-ins against
            this reference.
          </AppText>
        </View>

        <PainSlider
          label="Typical pain"
          minLabel="No pain"
          maxLabel="Severe"
          value={painLevel}
          onChange={setPainLevel}
          showScaleNumbers={false}
          disabled={baselineInputsDisabled}
        />
        <PainSlider
          label="Typical stiffness"
          minLabel="Loose"
          maxLabel="Very stiff"
          value={stiffnessLevel}
          onChange={setStiffnessLevel}
          showScaleNumbers={false}
          disabled={baselineInputsDisabled}
        />
        <PainSlider
          label="Typical energy"
          minLabel="Very low"
          maxLabel="High"
          value={energyLevel}
          onChange={setEnergyLevel}
          showScaleNumbers={false}
          disabled={baselineInputsDisabled}
        />
        <PainSlider
          label="Typical fatigue"
          minLabel="None"
          maxLabel="Exhausted"
          value={fatigueLevel}
          onChange={setFatigueLevel}
          showScaleNumbers={false}
          disabled={baselineInputsDisabled}
        />

        <View style={{ gap: 8 }}>
          <AppText style={{ fontWeight: "600" }}>Typical swelling?</AppText>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {(["No", "Yes"] as const).map((label) => {
              const isYes = label === "Yes";
              const selected = swellingPresent === isYes;
              return (
                <Pressable
                  key={label}
                  onPress={() => setSwellingPresent(isYes)}
                  disabled={baselineInputsDisabled}
                  style={{
                    borderWidth: 1,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    opacity: baselineInputsDisabled ? 0.6 : 1,
                  }}
                >
                  <AppText
                    style={{
                      color: selected
                        ? colors.textOnPrimary
                        : colors.textPrimary,
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

        {!hasSavedBaseline ? (
          <AppButton
            label={isSavingBaseline ? "Saving..." : "Save Baseline"}
            onPress={() => {
              void saveBaseline(baselinePreview, "Baseline saved.");
            }}
            disabled={baselineInputsDisabled}
          />
        ) : null}
        {savedNotice ? <AppText muted>{savedNotice}</AppText> : null}
      </AppCard>

      {suggestedBaseline ? (
        <AppCard style={{ gap: 10 }}>
          <AppText style={{ fontWeight: "700" }}>Suggested baseline</AppText>
          <AppText muted>
            Based on recent check-ins ({Math.min(entries.length, 14)} days).
            Review before applying.
          </AppText>
          <AppText>Pain: {suggestedBaseline.typicalPainLevel}/10</AppText>
          <AppText>
            Stiffness: {suggestedBaseline.typicalStiffnessLevel}/10
          </AppText>
          <AppText>Energy: {suggestedBaseline.typicalEnergyLevel}/10</AppText>
          <AppText>Fatigue: {suggestedBaseline.typicalFatigueLevel}/10</AppText>
          <AppText>
            Swelling:{" "}
            {suggestedBaseline.typicalSwellingPresent
              ? "usually present"
              : "usually absent"}
          </AppText>
          <AppButton
            label="Apply Suggested Baseline"
            onPress={() => {
              setPainLevel(suggestedBaseline.typicalPainLevel);
              setStiffnessLevel(suggestedBaseline.typicalStiffnessLevel);
              setEnergyLevel(suggestedBaseline.typicalEnergyLevel);
              setFatigueLevel(suggestedBaseline.typicalFatigueLevel);
              setSwellingPresent(suggestedBaseline.typicalSwellingPresent);
              saveBaseline(suggestedBaseline, "Suggested baseline applied.");
            }}
          />
          {!baselineDiffers(suggestedBaseline, baselinePreview) ? (
            <AppText muted>
              The suggested baseline already matches the current values.
            </AppText>
          ) : null}
        </AppCard>
      ) : (
        <AppCard>
          <AppText muted>
            Complete at least {MIN_CHECKINS_FOR_SUGGESTION} check-ins to receive
            a suggested baseline.
          </AppText>
        </AppCard>
      )}
    </Screen>
  );
}
