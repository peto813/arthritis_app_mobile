import { apiClient } from "@/services/apiClient";
import type { JointSymptom } from "@/types/joint";

export function getJointStatus(patientId: string) {
  return apiClient<JointSymptom[]>(`/patients/${patientId}/joints`);
}
