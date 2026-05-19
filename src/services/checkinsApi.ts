import { apiGet, apiPost } from "@/services/apiClient";
import type { DailyCheckin } from "@/types/checkin";

export function getCheckIns(patientId: string) {
  return apiGet<DailyCheckin[]>(`/patients/${patientId}/checkins`);
}

export type CreateCheckInPayload = Omit<DailyCheckin, "id" | "patientId">;

export function createCheckIn(patientId: string, payload: CreateCheckInPayload) {
  return apiPost<DailyCheckin>(`/patients/${patientId}/checkins`, payload);
}
