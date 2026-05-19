import { apiGet } from "@/services/apiClient";
import type { JointSymptom } from "@/types/joint";

export function getJointStatus(patientId: string) {
  return apiGet<JointSymptom[]>(`/patients/${patientId}/joints`);
}
