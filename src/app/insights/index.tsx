import { View } from "react-native";

import { EmptyState } from "@/components/common/EmptyState";
import { Screen } from "@/components/common/Screen";
import { SectionTitle } from "@/components/common/SectionTitle";
import { InsightCard } from "@/components/insights/InsightCard";
import { copy } from "@/constants/copy";
import { useInsights } from "@/hooks/useInsights";

export default function InsightsScreen() {
  const { insights } = useInsights();

  return (
    <Screen>
      <SectionTitle title={copy.insightsTitle} subtitle="Patterns generated from your timeline." />
      {insights.length ? (
        <View style={{ gap: 10 }}>
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </View>
      ) : (
        <EmptyState title="No insights yet" message="Add a few days of check-ins to generate insights." />
      )}
    </Screen>
  );
}
