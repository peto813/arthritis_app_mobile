import { useMemo } from "react";

import { jointOptions } from "@/constants/joints";

export function useJoints() {
  const joints = useMemo(() => [...jointOptions], []);
  return { joints };
}
