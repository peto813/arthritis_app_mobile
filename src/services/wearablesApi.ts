import { apiPost } from "@/services/apiClient";
import type {
  ApiWearableDailySummary,
  CreateWearableDailySummaryPayload,
} from "@/services/apiSchemas";

export function createWearableDailySummary(
  patientId: string,
  payload: CreateWearableDailySummaryPayload,
) {
  return apiPost<ApiWearableDailySummary>(
    `/patients/${patientId}/wearables/daily-summaries`,
    payload,
  );
}
