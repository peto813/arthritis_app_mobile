import { useMemo } from "react";

import { patientStore } from "@/store/patientStore";

export function usePatient() {
  const patient = useMemo(() => patientStore.get(), []);
  return { patient };
}
