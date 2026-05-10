import { useMemo } from "react";

import type { Insight } from "@/types/insight";

const placeholderInsights: Insight[] = [
  {
    id: "insight-1",
    title: "High pain follows poor sleep",
    detail: "3 of the last 4 high-pain days followed less than 6 hours of sleep.",
    confidence: 0.72,
    createdAt: new Date().toISOString(),
  },
];

export function useInsights() {
  const insights = useMemo(() => placeholderInsights, []);
  return { insights };
}
