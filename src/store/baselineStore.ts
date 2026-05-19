import type { PatientBaseline } from "@/types/checkin";

function createDefaultBaseline(patientId: string): PatientBaseline {
  return {
    patientId,
    updatedAt: new Date().toISOString(),
    typicalPainLevel: 5,
    typicalStiffnessLevel: 5,
    typicalEnergyLevel: 5,
    typicalFatigueLevel: 5,
    typicalSwellingPresent: false,
  };
}

const baselineByPatientId: Record<string, PatientBaseline> = {
  "patient-1": createDefaultBaseline("patient-1"),
};

export const baselineStore = {
  get(patientId: string): PatientBaseline {
    return baselineByPatientId[patientId] ?? createDefaultBaseline(patientId);
  },
  set(next: PatientBaseline) {
    baselineByPatientId[next.patientId] = next;
  },
};
