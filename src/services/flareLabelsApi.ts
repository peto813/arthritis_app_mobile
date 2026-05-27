import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiFlareLabel,
  CreateFlareLabelPayload,
} from "@/services/apiSchemas";

export function createFlareLabel(patientId: string, payload: CreateFlareLabelPayload) {
  return apiPost<ApiFlareLabel>(`/patients/${patientId}/flare-labels`, payload);
}

export function getFlareLabels(patientId: string) {
  return apiGet<ApiFlareLabel[]>(`/patients/${patientId}/flare-labels`);
}
