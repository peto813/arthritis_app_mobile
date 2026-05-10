import { AppCard } from "@/components/common/AppCard";
import { AppText } from "@/components/common/AppText";

type PainTrendCardProps = {
  averagePain: number;
};

export function PainTrendCard({ averagePain }: PainTrendCardProps) {
  return (
    <AppCard>
      <AppText style={{ fontWeight: "700", marginBottom: 6 }}>Pain Trend</AppText>
      <AppText>Average this week: {averagePain.toFixed(1)}/10</AppText>
    </AppCard>
  );
}
