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
      <AppText>Pain: {draft.painScore}/10</AppText>
      <AppText>Feeling: {draft.feeling}</AppText>
      <AppText>Joints tracked: {draft.joints.length}</AppText>
      {draft.notes ? <AppText>Notes: {draft.notes}</AppText> : null}
    </AppCard>
  );
}
