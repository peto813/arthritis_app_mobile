import { apiClient } from "@/services/apiClient";

type IngestionPayload = {
  source: string;
  data: Record<string, unknown>;
};

export function ingestData(payload: IngestionPayload) {
  return apiClient<{ accepted: boolean }>("/ingestion", "POST", payload);
}
