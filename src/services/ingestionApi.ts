import { apiGet, apiPost } from "@/services/apiClient";
import type {
  ApiIngestionEvent,
  ApiIngestionItem,
  CreateIngestionEventPayload,
  CreateIngestionItemPayload,
  CreateIngestionPerceptionPayload,
} from "@/services/apiSchemas";

export function createIngestionItem(payload: CreateIngestionItemPayload) {
  return apiPost<ApiIngestionItem>("/ingestion-items", payload);
}

export function getIngestionItems(search?: string) {
  return apiGet<ApiIngestionItem[]>("/ingestion-items", {
    query: search ? { search } : undefined,
  });
}

export function createIngestionEvent(
  patientId: string,
  payload: CreateIngestionEventPayload,
) {
  return apiPost<ApiIngestionEvent>(`/patients/${patientId}/ingestion-events`, payload);
}

export function getIngestionEvents(patientId: string) {
  return apiGet<ApiIngestionEvent[]>(`/patients/${patientId}/ingestion-events`);
}

export function createIngestionPerception(
  ingestionEventId: string,
  payload: CreateIngestionPerceptionPayload,
) {
  return apiPost(`/ingestion-events/${ingestionEventId}/perceptions`, payload);
}
