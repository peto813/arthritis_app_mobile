import { Link } from "expo-router";
import { useState } from "react";

import { AppButton } from "@/components/common/AppButton";
import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FeelingPicker } from "@/components/checkIn/FeelingPicker";
import { NotesInput } from "@/components/checkIn/NotesInput";
import { PainSlider } from "@/components/checkIn/PainSlider";
import { copy } from "@/constants/copy";
import type { Feeling } from "@/types/checkin";

export default function CheckInScreen() {
  const [painScore, setPainScore] = useState(5);
  const [feeling, setFeeling] = useState<Feeling>("okay");
  const [notes, setNotes] = useState("");

  return (
    <Screen>
      <SectionTitle title={copy.checkInTitle} subtitle="Capture how you feel today." />
      <AppCard style={{ gap: 12 }}>
        <PainSlider value={painScore} onChange={setPainScore} />
        <FeelingPicker value={feeling} onChange={setFeeling} />
        <NotesInput value={notes} onChangeText={setNotes} />
      </AppCard>
      <Link href="/check-in/joints" asChild>
        <AppButton label="Next: Joints" />
      </Link>
      <AppText muted>
        Current draft: pain {painScore}, feeling {feeling}, notes {notes ? "added" : "none"}.
      </AppText>
    </Screen>
  );
}
