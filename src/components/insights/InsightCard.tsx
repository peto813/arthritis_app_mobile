import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";
import { InsightConfidenceBadge } from "@/components/insights/InsightConfidenceBadge";
import type { Insight } from "@/types/insight";

type InsightCardProps = {
  insight: Insight;
};

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <AppCard>
      <AppText style={{ fontWeight: "700", marginBottom: 6 }}>{insight.title}</AppText>
      <AppText muted style={{ marginBottom: 8 }}>
        {insight.detail}
      </AppText>
      <InsightConfidenceBadge confidence={insight.confidence} />
    </AppCard>
  );
}
