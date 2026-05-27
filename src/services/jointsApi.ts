import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiJointReference,
  CreateJointReferencePayload,
} from "@/services/apiSchemas";

export function getJoints() {
  return apiGet<ApiJointReference[]>("/joints");
}

export function createJoint(payload: CreateJointReferencePayload) {
  return apiPost<ApiJointReference>("/joints", payload);
}
