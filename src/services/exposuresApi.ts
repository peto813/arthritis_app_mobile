import { apiClient } from "@/services/apiClient";
import type { Exposure } from "@/types/exposure";

export function getExposures(patientId: string) {
  return apiClient<Exposure[]>(`/patients/${patientId}/exposures`);
}
