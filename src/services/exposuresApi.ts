import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiDailyExposure,
  CreateExposurePayload,
} from "@/services/apiSchemas";

export function getExposures(patientId: string) {
  return apiGet<ApiDailyExposure[]>(`/patients/${patientId}/exposures`);
}

export function createExposure(patientId: string, payload: CreateExposurePayload) {
  return apiPost<ApiDailyExposure>(`/patients/${patientId}/exposures`, payload);
}
