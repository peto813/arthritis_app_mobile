import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiWeatherObservation,
  CreateWeatherObservationPayload,
} from "@/services/apiSchemas";

export function getWeatherObservations(patientId: string) {
  return apiGet<ApiWeatherObservation[]>(`/patients/${patientId}/weather`);
}

export function createWeatherObservation(
  patientId: string,
  payload: CreateWeatherObservationPayload,
) {
  return apiPost<ApiWeatherObservation>(`/patients/${patientId}/weather`, payload);
}
