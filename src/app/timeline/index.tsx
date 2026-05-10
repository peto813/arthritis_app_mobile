import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { TimelineList } from "@/components/timeline/TimelineList";
import { PainTrendCard } from "@/components/timeline/PainTrendCard";
import { copy } from "@/constants/copy";
import { useTimeline } from "@/hooks/useTimeline";

export default function TimelineScreen() {
  const { entries } = useTimeline();
  const averagePain =
    entries.length > 0 ? entries.reduce((sum, entry) => sum + entry.painScore, 0) / entries.length : 0;

  return (
    <Screen>
      <SectionTitle title={copy.timelineTitle} subtitle="Your recent symptom history." />
      <PainTrendCard averagePain={averagePain} />
      <TimelineList entries={entries} />
    </Screen>
  );
}
