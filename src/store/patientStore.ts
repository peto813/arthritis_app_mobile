import type { Patient } from "@/types/patient";

const DEFAULT_PATIENT_ID = "patient-1";
const CONFIGURED_PATIENT_ID =
  process.env["EXPO_PUBLIC_USER_ID"]?.trim() || DEFAULT_PATIENT_ID;

let currentPatient: Patient = {
  id: CONFIGURED_PATIENT_ID,
  firstName: "Joely",
  lastName: "Rodriguez",
  dateOfBirth: "1985-05-10",
  nickname: "Mommy",
};

export const patientStore = {
  get(): Patient {
    return currentPatient;
  },
  set(next: Patient) {
    currentPatient = next;
  },
};
