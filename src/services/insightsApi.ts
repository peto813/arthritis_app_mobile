import { apiGet } from "@/services/apiClient";
import type { Insight } from "@/types/insight";

export function getInsights(patientId: string) {
  return apiGet<Insight[]>(`/patients/${patientId}/insights`);
}
