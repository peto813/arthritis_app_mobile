import { apiPost } from "@/services/apiClient";
import type {
  ApiDietSummary,
  CreateDietSummaryPayload,
} from "@/services/apiSchemas";

export function createDietSummary(
  patientId: string,
  payload: CreateDietSummaryPayload,
) {
  return apiPost<ApiDietSummary>(`/patients/${patientId}/diet-summaries`, payload);
}
