import { useEffect, useMemo, useState } from "react";

import { getCheckIns } from "@/services/checkinsApi";
import { patientStore } from "@/store/patientStore";
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
  const [entries, setEntries] = useState<CheckIn[]>(mockTimeline);
  const [isLoading, setIsLoading] = useState(true);
  const patient = useMemo(() => patientStore.get(), []);

  useEffect(() => {
    let isMounted = true;

    async function loadCheckins() {
      setIsLoading(true);
      try {
        const remoteCheckins = await getCheckIns(patient.id);
        if (!isMounted || !remoteCheckins.length) {
          return;
        }

        const mapped = remoteCheckins.map<CheckIn>((entry) => ({
          id: entry.id,
          patientId: entry.patientId,
          createdAt: entry.checkinTimestamp,
          painScore: entry.painLevel,
          stiffnessLevel:
            typeof entry.stiffnessLevel === "number" ? entry.stiffnessLevel : undefined,
          energyLevel: typeof entry.energyLevel === "number" ? entry.energyLevel : undefined,
          fatigueLevel:
            typeof entry.fatigueLevel === "number" ? entry.fatigueLevel : undefined,
          swellingPresent: entry.swellingPresent,
          feeling: "okay",
          notes: entry.notesText,
          joints: [],
        }));

        setEntries(mapped);
      } catch {
        if (!isMounted) {
          return;
        }
        setEntries(mockTimeline);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadCheckins();

    return () => {
      isMounted = false;
    };
  }, [patient.id]);

  return { entries, isLoading };
}
