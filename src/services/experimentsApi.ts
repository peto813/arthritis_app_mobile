import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiExperiment,
  ApiExperimentPhase,
  CreateExperimentPayload,
  CreateExperimentPhasePayload,
} from "@/services/apiSchemas";

export function createExperiment(
  patientId: string,
  payload: CreateExperimentPayload,
) {
  return apiPost<ApiExperiment>(`/patients/${patientId}/experiments`, payload);
}

export function getExperiments(patientId: string) {
  return apiGet<ApiExperiment[]>(`/patients/${patientId}/experiments`);
}

export function createExperimentPhase(
  experimentId: string,
  payload: CreateExperimentPhasePayload,
) {
  return apiPost<ApiExperimentPhase>(`/experiments/${experimentId}/phases`, payload);
}
