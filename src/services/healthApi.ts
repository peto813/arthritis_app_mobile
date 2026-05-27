import { apiGet } from "@/services/apiClient";

export type HealthStatus = {
  status: string;
  timestamp?: string;
};

export function getHealth() {
  return apiGet<HealthStatus>("/health");
}
