import { useMemo } from "react";

import type { CheckIn } from "@/types/checkin";

const mockTimeline: CheckIn[] = [
  {
    id: "checkin-1",
    patientId: "patient-1",
    createdAt: new Date().toISOString(),
    painScore: 6,
    feeling: "okay",
    notes: "Morning stiffness lasted about an hour.",
    joints: [],
  },
];

export function useTimeline() {
  const entries = useMemo(() => mockTimeline, []);
  return { entries };
}
