import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import type { CheckIn } from "@/types/checkin";

type DailyEntryCardProps = {
  entry: CheckIn;
};

export function DailyEntryCard({ entry }: DailyEntryCardProps) {
  return (
    <AppCard>
      <AppText style={{ fontWeight: "700" }}>{new Date(entry.createdAt).toDateString()}</AppText>
      <AppText>Pain: {entry.painScore}/10</AppText>
      <AppText>Feeling: {entry.feeling}</AppText>
      {entry.notes ? <AppText muted>{entry.notes}</AppText> : null}
    </AppCard>
  );
}
