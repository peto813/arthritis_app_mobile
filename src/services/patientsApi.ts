import { apiGet, apiPatch, apiPost } from "@/services/apiClient";
import type {
  ApiPatient,
  CreatePatientPayload,
  UpdatePatientPayload,
} from "@/services/apiSchemas";

export function getPatients() {
  return apiGet<ApiPatient[]>("/patients");
}

export function getPatient(patientId: string) {
  return apiGet<ApiPatient>(`/patients/${patientId}`);
}

export function createPatient(payload: CreatePatientPayload) {
  return apiPost<ApiPatient>("/patients", payload);
}

export function updatePatient(patientId: string, payload: UpdatePatientPayload) {
  return apiPatch<ApiPatient>(`/patients/${patientId}`, payload);
}
