import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import type { CheckIn } from "@/types/checkin";

type LastPainCardProps = {
  latestEntry?: CheckIn;
};

export function LastPainCard({ latestEntry }: LastPainCardProps) {
  if (!latestEntry) {
    return (
      <AppCard>
        <AppText style={{ fontWeight: "700", marginBottom: 4 }}>Last entry</AppText>
        <AppText muted>No entries yet. Your first check-in will show here.</AppText>
      </AppCard>
    );
  }

  const highPain = latestEntry.painScore >= 6;
  const note = highPain ? "Yesterday was a high-pain day." : "Yesterday looked more manageable.";

  return (
    <AppCard>
      <AppText style={{ fontWeight: "700", marginBottom: 4 }}>
        Last entry: Pain {latestEntry.painScore}/10
      </AppText>
      <AppText muted>{note}</AppText>
    </AppCard>
  );
}
