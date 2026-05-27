import { ApiError, apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiPatientBaseline,
  CreateBaselinePayload,
} from "@/services/apiSchemas";
import type { PatientBaseline } from "@/types/checkin";

function toLevel(value: unknown, fallback = 5) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return fallback;
  }
  return Math.min(10, Math.max(0, Math.round(numericValue)));
}

function toLegacyBaseline(apiBaseline: ApiPatientBaseline): PatientBaseline {
  return {
    patientId: apiBaseline.patientId,
    updatedAt: apiBaseline.updatedAt,
    typicalPainLevel: toLevel(apiBaseline.baselinePain, 5),
    typicalStiffnessLevel: toLevel(apiBaseline.baselineStiffness, 5),
    typicalEnergyLevel: 5,
    typicalFatigueLevel: toLevel(apiBaseline.baselineFatigue, 5),
    typicalSwellingPresent: false,
  };
}

export async function getBaseline(patientId: string) {
  try {
    const latest = await apiGet<ApiPatientBaseline>(
      `/patients/${patientId}/baselines/latest`,
    );
    return toLegacyBaseline(latest);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export type UpdateBaselinePayload = Omit<PatientBaseline, "patientId">;

export async function updateBaseline(
  patientId: string,
  payload: UpdateBaselinePayload,
) {
  const createPayload: CreateBaselinePayload = {
    effectiveFrom: new Date().toISOString().slice(0, 10),
    baselinePain: payload.typicalPainLevel,
    baselineStiffness: payload.typicalStiffnessLevel,
    baselineFatigue: payload.typicalFatigueLevel,
    notes: "Saved from mobile baseline settings.",
  };

  const created = await apiPost<ApiPatientBaseline>(
    `/patients/${patientId}/baselines`,
    createPayload,
  );
  return toLegacyBaseline(created);
}

export function getBaselines(patientId: string) {
  return apiGet<ApiPatientBaseline[]>(`/patients/${patientId}/baselines`);
}

export function getBaselineById(patientId: string, baselineId: string) {
  return apiGet<ApiPatientBaseline>(
    `/patients/${patientId}/baselines/${baselineId}`,
  );
}
