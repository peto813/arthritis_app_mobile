import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { View } from "react-native";

import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import type { CheckInDraft } from "@/store/checkInDraftStore";

type CheckInContextValue = {
  draft: CheckInDraft;
  setDraft: (next: CheckInDraft) => void;
};

const initialDraft: CheckInDraft = {
  entryDate: new Date().toISOString().slice(0, 10),
  checkinTimestamp: new Date().toISOString(),
  painLevel: 5,
  stiffnessLevel: 5,
  energyLevel: 5,
  fatigueLevel: 5,
  swellingPresent: false,
  feeling: "okay",
  notesText: "",
  jointSymptoms: [],
};

const CheckInContext = createContext<CheckInContextValue | null>(null);

export function CheckInProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<CheckInDraft>(initialDraft);
  const value = useMemo(() => ({ draft, setDraft }), [draft]);
  return <CheckInContext.Provider value={value}>{children}</CheckInContext.Provider>;
}

export function useCheckInContext() {
  const context = useContext(CheckInContext);
  if (!context) {
    throw new Error("useCheckInContext must be used inside CheckInProvider");
  }
  return context;
}

export default function CheckInContextScreen() {
  return (
    <Screen>
      <AppCard>
        <View style={{ gap: 8 }}>
          <AppText style={{ fontWeight: "700" }}>Check-in Context Route</AppText>
          <AppText muted>
            This file exports the shared context hooks and is also available as a route.
          </AppText>
        </View>
      </AppCard>
    </Screen>
  );
}
