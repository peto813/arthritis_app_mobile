import { apiPost } from "@/services/apiClient";

type IngestionPayload = {
  source: string;
  data: Record<string, unknown>;
};

export function ingestData(payload: IngestionPayload) {
  return apiPost<{ accepted: boolean }>("/ingestion", payload);
}
