import { apiGet } from "@/services/apiClient";
import type { ApiInsight } from "@/services/apiSchemas";

export function getInsights(patientId: string) {
  return apiGet<ApiInsight[]>(`/patients/${patientId}/insights`);
}
