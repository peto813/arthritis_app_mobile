import { apiPost } from "@/services/apiClient";
import type { NoteAnalysisPayload } from "@/services/apiSchemas";

export function createNoteAnalysis(
  checkinId: string,
  payload: NoteAnalysisPayload,
) {
  return apiPost(`/checkins/${checkinId}/note-analysis`, payload);
}
