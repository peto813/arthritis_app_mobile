import { useMemo } from "react";

import { checkInDraftStore } from "@/store/checkInDraftStore";

export function useDailyCheckin() {
  const draft = useMemo(() => checkInDraftStore.get(), []);
  return { draft };
}
