import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CheckInSummaryCard } from "@/components/checkIn/CheckInSummaryCard";
import { checkInDraftStore } from "@/store/checkInDraftStore";

export default function CheckInReviewScreen() {
  const draft = checkInDraftStore.get();

  return (
    <Screen>
      <SectionTitle title="Review" subtitle="Confirm your check-in before submitting." />
      <CheckInSummaryCard draft={draft} />
      <AppCard>
        <AppText muted>Submission API wiring can be connected in the next step.</AppText>
      </AppCard>
    </Screen>
  );
}
