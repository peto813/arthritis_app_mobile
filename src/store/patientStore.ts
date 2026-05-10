import type { Patient } from "@/types/patient";

let currentPatient: Patient = {
  id: "patient-1",
  firstName: "Alex",
  lastName: "Taylor",
};

export const patientStore = {
  get(): Patient {
    return currentPatient;
  },
  set(next: Patient) {
    currentPatient = next;
  },
};
