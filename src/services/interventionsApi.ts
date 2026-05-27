import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiInterventionEvent,
  CreateInterventionPayload,
} from "@/services/apiSchemas";

export function createIntervention(
  patientId: string,
  payload: CreateInterventionPayload,
) {
  return apiPost<ApiInterventionEvent>(`/patients/${patientId}/interventions`, payload);
}

export function getInterventions(patientId: string) {
  return apiGet<ApiInterventionEvent[]>(`/patients/${patientId}/interventions`);
}
