import type { JointSymptom } from "@/types/joint";

export type Feeling = "great" | "okay" | "low";

export type CheckIn = {
  id: string;
  patientId: string;
  createdAt: string;
  painScore: number;
  feeling: Feeling;
  notes?: string;
  joints: JointSymptom[];
};
