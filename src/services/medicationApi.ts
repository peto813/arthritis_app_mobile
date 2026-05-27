import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiMedicationAdherenceEvent,
  ApiMedicationPlan,
  CreateMedicationEventPayload,
  CreateMedicationPlanPayload,
} from "@/services/apiSchemas";

export function createMedicationPlan(
  patientId: string,
  payload: CreateMedicationPlanPayload,
) {
  return apiPost<ApiMedicationPlan>(
    `/patients/${patientId}/medication-plans`,
    payload,
  );
}

export function getMedicationPlans(patientId: string) {
  return apiGet<ApiMedicationPlan[]>(`/patients/${patientId}/medication-plans`);
}

export function createMedicationEvent(
  patientId: string,
  payload: CreateMedicationEventPayload,
) {
  return apiPost<ApiMedicationAdherenceEvent>(
    `/patients/${patientId}/medication-events`,
    payload,
  );
}
