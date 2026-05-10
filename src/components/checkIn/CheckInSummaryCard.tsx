import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import type { CheckInDraft } from "@/store/checkInDraftStore";

type CheckInSummaryCardProps = {
  draft: CheckInDraft;
};

export function CheckInSummaryCard({ draft }: CheckInSummaryCardProps) {
  return (
    <AppCard>
      <AppText style={{ fontWeight: "700", marginBottom: 8 }}>Summary</AppText>
      <AppText>Entry date: {draft.entryDate}</AppText>
      <AppText>Pain: {draft.painLevel}/10</AppText>
      <AppText>Stiffness: {draft.stiffnessLevel}/10</AppText>
      <AppText>Energy: {draft.energyLevel}/10</AppText>
      <AppText>Fatigue: {draft.fatigueLevel}/10</AppText>
      <AppText>Swelling: {draft.swellingPresent ? "yes" : "no"}</AppText>
      <AppText>Feeling: {draft.feeling}</AppText>
      <AppText>Joints tracked: {draft.jointSymptoms.length}</AppText>
      {draft.notesText ? <AppText>Notes: {draft.notesText}</AppText> : null}
    </AppCard>
  );
}
