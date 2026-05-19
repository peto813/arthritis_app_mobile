import { apiGet, apiPatch, apiPost } from "@/services/apiClient";
import type { PatientBaseline } from "@/types/checkin";

type BaselineListResponse =
  | PatientBaseline[]
  | {
      data?: PatientBaseline[];
      items?: PatientBaseline[];
    };

function pickLatestBaseline(
  response: BaselineListResponse,
): PatientBaseline | null {
  const list = Array.isArray(response)
    ? response
    : (response.items ?? response.data ?? []);

  if (!list.length) {
    return null;
  }

  const sorted = [...list].sort(
    (left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  );

  return sorted[0] ?? null;
}

export async function getBaseline(patientId: string) {
  const response = await apiGet<BaselineListResponse>(
    `/patients/${patientId}/baselines`,
  );
  return pickLatestBaseline(response);
}

export type UpdateBaselinePayload = Omit<PatientBaseline, "patientId">;

export async function updateBaseline(
  patientId: string,
  payload: UpdateBaselinePayload,
) {
  try {
    return await apiPatch<PatientBaseline>(
      `/patients/${patientId}/baselines`,
      payload,
    );
  } catch {
    return apiPost<PatientBaseline>(
      `/patients/${patientId}/baselines`,
      payload,
    );
  }
}
