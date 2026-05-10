import type { Feeling } from "@/types/checkin";
import type { JointSymptom } from "@/types/joint";

export type CheckInDraft = {
  painScore: number;
  feeling: Feeling;
  notes: string;
  joints: JointSymptom[];
};

let draftState: CheckInDraft = {
  painScore: 5,
  feeling: "okay",
  notes: "",
  joints: [],
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
      painScore: 5,
      feeling: "okay",
      notes: "",
      joints: [],
    };
  },
};
