export type JointSymptom = {
  // Legacy fields currently used by check-in UI state.
  joint: string;
  pain: number;
  stiffness?: number;
  swelling?: boolean;
  // API-aligned fields for /checkins/{checkinId}/joint-symptoms.
  jointCode?: string;
  painPresent?: boolean;
  swellingPresent?: boolean;
  stiffnessPresent?: boolean;
  tendernessPresent?: boolean;
  severity?: number;
};
