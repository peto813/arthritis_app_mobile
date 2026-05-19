import { apiGet } from "@/services/apiClient";
import type { Patient } from "@/types/patient";

export function getPatients() {
  return apiGet<Patient[]>("/patients");
}

export function getPatient(patientId: string) {
  return apiGet<Patient>(`/patients/${patientId}`);
}
