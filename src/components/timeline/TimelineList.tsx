import { View } from "react-native";

import { EmptyState } from "@/components/common/EmptyState";
import { DailyEntryCard } from "@/components/timeline/DailyEntryCard";
import { copy } from "@/constants/copy";
import type { CheckIn } from "@/types/checkin";

type TimelineListProps = {
  entries: CheckIn[];
};

export function TimelineList({ entries }: TimelineListProps) {
  if (!entries.length) {
    return <EmptyState title="No entries" message={copy.emptyTimeline} />;
  }

  return (
    <View style={{ gap: 10 }}>
      {entries.map((entry) => (
        <DailyEntryCard key={entry.id} entry={entry} />
      ))}
    </View>
  );
}
