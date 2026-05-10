import { apiClient } from "@/services/apiClient";
import type { CheckIn } from "@/types/checkin";

export function getCheckIns(patientId: string) {
  return apiClient<CheckIn[]>(`/patients/${patientId}/checkins`);
}

export function createCheckIn(payload: Omit<CheckIn, "id">) {
  return apiClient<CheckIn>("/checkins", "POST", payload);
}
