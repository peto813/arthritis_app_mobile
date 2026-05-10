import type { Feeling } from "@/types/checkin";
import type { JointSymptom } from "@/types/joint";

export type CheckInDraft = {
  entryDate: string;
  checkinTimestamp: string;
  painLevel: number;
  stiffnessLevel: number;
  energyLevel: number;
  fatigueLevel: number;
  swellingPresent: boolean;
  feeling: Feeling;
  notesText: string;
  jointSymptoms: JointSymptom[];
};

let draftState: CheckInDraft = {
  entryDate: new Date().toISOString().slice(0, 10),
  checkinTimestamp: new Date().toISOString(),
  painLevel: 5,
  stiffnessLevel: 5,
  energyLevel: 5,
  fatigueLevel: 5,
  swellingPresent: false,
  feeling: "okay",
  notesText: "",
  jointSymptoms: [],
};

export const checkInDraftStore = {
  get(): CheckInDraft {
    return draftState;
  },
  set(next: Partial<CheckInDraft>) {
    draftState = { ...draftState, ...next };
  },
  reset() {
    draftState = {
      entryDate: new Date().toISOString().slice(0, 10),
      checkinTimestamp: new Date().toISOString(),
      painLevel: 5,
      stiffnessLevel: 5,
      energyLevel: 5,
      fatigueLevel: 5,
      swellingPresent: false,
      feeling: "okay",
      notesText: "",
      jointSymptoms: [],
    };
  },
};
