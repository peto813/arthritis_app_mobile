import { apiGet } from "@/services/apiClient";
import type { Exposure } from "@/types/exposure";

export function getExposures(patientId: string) {
  return apiGet<Exposure[]>(`/patients/${patientId}/exposures`);
}
