import { useMemo } from "react";

import type { CheckIn } from "@/types/checkin";

const mockTimeline: CheckIn[] = [
  {
    id: "checkin-1",
    patientId: "patient-1",
    createdAt: new Date().toISOString(),
    painScore: 6,
    stiffnessLevel: 6,
    energyLevel: 4,
    fatigueLevel: 6,
    swellingPresent: true,
    feeling: "okay",
    notes: "Morning stiffness lasted about an hour.",
    joints: [],
  },
  {
    id: "checkin-2",
    patientId: "patient-1",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    painScore: 4,
    stiffnessLevel: 5,
    energyLevel: 6,
    fatigueLevel: 4,
    swellingPresent: false,
    feeling: "okay",
    notes: "Gentle walk helped in the afternoon.",
    joints: [],
  },
  {
    id: "checkin-3",
    patientId: "patient-1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    painScore: 5,
    stiffnessLevel: 5,
    energyLevel: 5,
    fatigueLevel: 5,
    swellingPresent: false,
    feeling: "low",
    notes: "Needed extra rest after lunch.",
    joints: [],
  },
  {
    id: "checkin-4",
    patientId: "patient-1",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    painScore: 3,
    stiffnessLevel: 4,
    energyLevel: 7,
    fatigueLevel: 3,
    swellingPresent: false,
    feeling: "great",
    notes: "Slept better and felt lighter this morning.",
    joints: [],
  },
];

export function useTimeline() {
  const entries = useMemo(() => mockTimeline, []);
  return { entries };
}
