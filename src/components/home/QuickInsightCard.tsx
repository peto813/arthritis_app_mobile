import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import type { Insight } from "@/types/insight";

type QuickInsightCardProps = {
  insight?: Insight;
};

export function QuickInsightCard({ insight }: QuickInsightCardProps) {
  if (!insight) {
    return null;
  }

  return (
    <AppCard>
      <AppText style={{ fontWeight: "700", marginBottom: 4 }}>Quick insight</AppText>
      <AppText muted>{insight.detail}</AppText>
    </AppCard>
  );
}
