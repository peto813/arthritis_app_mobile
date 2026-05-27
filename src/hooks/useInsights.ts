import { useEffect, useMemo, useState } from "react";

import { getInsights } from "@/services/insightsApi";
import { patientStore } from "@/store/patientStore";
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
  const [insights, setInsights] = useState<Insight[]>(placeholderInsights);
  const [isLoading, setIsLoading] = useState(true);
  const patient = useMemo(() => patientStore.get(), []);

  useEffect(() => {
    let isMounted = true;

    async function loadInsights() {
      setIsLoading(true);
      try {
        const remoteInsights = await getInsights(patient.id);
        if (!isMounted || !remoteInsights.length) {
          return;
        }
        setInsights(
          remoteInsights.map((insight) => ({
            ...insight,
            confidence: insight.confidence ?? 0,
          })),
        );
      } catch {
        if (!isMounted) {
          return;
        }
        setInsights(placeholderInsights);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInsights();

    return () => {
      isMounted = false;
    };
  }, [patient.id]);

  return { insights, isLoading };
}
