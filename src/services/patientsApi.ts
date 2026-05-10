import { apiClient } from "@/services/apiClient";
import type { Patient } from "@/types/patient";

export function getPatient(patientId: string) {
  return apiClient<Patient>(`/patients/${patientId}`);
}
