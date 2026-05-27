import { apiGet, apiPatch, apiPost } from "@/services/apiClient";
import type {
  ApiDailyCheckin,
  ApiDailyJointSymptom,
  CreateCheckinPayload,
  UpdateCheckinPayload,
} from "@/services/apiSchemas";
import type { DailyCheckin } from "@/types/checkin";
import type { JointSymptom } from "@/types/joint";

function toApiJointSymptoms(
  jointSymptoms: JointSymptom[] | undefined,
): ApiDailyJointSymptom[] | undefined {
  if (!jointSymptoms?.length) {
    return undefined;
  }

  return jointSymptoms.map((item) => ({
    jointCode: item.jointCode ?? item.joint.toLowerCase().replace(/\s+/g, "_"),
    painPresent: item.painPresent ?? item.pain >= 5,
    swellingPresent: item.swellingPresent ?? item.swelling,
    stiffnessPresent: item.stiffnessPresent ?? Boolean(item.stiffness && item.stiffness > 0),
    tendernessPresent: item.tendernessPresent ?? false,
    severity: item.severity ?? item.pain,
  }));
}

export function getCheckIns(patientId: string) {
  return apiGet<DailyCheckin[]>(`/patients/${patientId}/checkins`);
}

export type CreateCheckInPayload = Omit<DailyCheckin, "id" | "patientId">;

export function createCheckIn(patientId: string, payload: CreateCheckInPayload) {
  const apiPayload: CreateCheckinPayload = {
    ...payload,
    jointSymptoms: toApiJointSymptoms(payload.jointSymptoms),
  };
  return apiPost<DailyCheckin>(`/patients/${patientId}/checkins`, apiPayload);
}

export function getCheckIn(checkinId: string) {
  return apiGet<ApiDailyCheckin>(`/checkins/${checkinId}`);
}

export function updateCheckIn(checkinId: string, payload: UpdateCheckinPayload) {
  return apiPatch<ApiDailyCheckin>(`/checkins/${checkinId}`, payload);
}

export function addJointSymptom(checkinId: string, payload: ApiDailyJointSymptom) {
  return apiPost<ApiDailyJointSymptom>(
    `/checkins/${checkinId}/joint-symptoms`,
    payload,
  );
}

export function getJointSymptoms(checkinId: string) {
  return apiGet<ApiDailyJointSymptom[]>(`/checkins/${checkinId}/joint-symptoms`);
}
