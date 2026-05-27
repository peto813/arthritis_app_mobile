import { apiPost } from "@/services/apiClient";
import type {
  ApiFeatureSnapshot,
  CreateFeatureSnapshotPayload,
} from "@/services/apiSchemas";

export function createFeatureSnapshot(
  patientId: string,
  payload: CreateFeatureSnapshotPayload,
) {
  return apiPost<ApiFeatureSnapshot>(
    `/patients/${patientId}/feature-snapshots`,
    payload,
  );
}
