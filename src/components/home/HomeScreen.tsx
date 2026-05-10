import { Screen } from "@/components/common/Screen";
import { LastPainCard } from "@/components/home/LastPainCard";
import { QuickInsightCard } from "@/components/home/QuickInsightCard";
import { TimelineShortcut } from "@/components/home/TimelineShortcut";
import { TodayStatusCard } from "@/components/home/TodayStatusCard";
import { useInsights } from "@/hooks/useInsights";
import { useTimeline } from "@/hooks/useTimeline";

export function HomeScreen() {
  const { entries } = useTimeline();
  const { insights } = useInsights();
  const latestEntry = entries[0];
  const topInsight = insights[0];

  return (
    <Screen>
      <TodayStatusCard />
      <LastPainCard latestEntry={latestEntry} />
      <QuickInsightCard insight={topInsight} />
      <TimelineShortcut />
    </Screen>
  );
}
