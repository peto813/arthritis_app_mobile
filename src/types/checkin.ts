import type { JointSymptom } from "@/types/joint";

export type Feeling = "great" | "okay" | "low";

export type DailyJointSymptom = JointSymptom;

// Legacy timeline shape used by current mock timeline cards.
export type CheckIn = {
  id: string;
  patientId: string;
  createdAt: string;
  painScore: number;
  feeling: Feeling;
  notes?: string;
  joints: JointSymptom[];
};

export type DailyCheckin = {
  id: string;
  patientId: string;
  entryDate: string;
  checkinTimestamp: string;
  painLevel: number;
  stiffnessLevel: number;
  energyLevel: number;
  fatigueLevel: number;
  swellingPresent: boolean;
  notesText?: string;
  feeling: Feeling;
  jointSymptoms: DailyJointSymptom[];
};

export type PatientBaseline = {
  patientId: string;
  updatedAt: string;
  typicalPainLevel: number;
  typicalStiffnessLevel: number;
  typicalEnergyLevel: number;
  typicalFatigueLevel: number;
  typicalSwellingPresent: boolean;
};
