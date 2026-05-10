import { apiClient } from "@/services/apiClient";
import type { Insight } from "@/types/insight";

export function getInsights(patientId: string) {
  return apiClient<Insight[]>(`/patients/${patientId}/insights`);
}
