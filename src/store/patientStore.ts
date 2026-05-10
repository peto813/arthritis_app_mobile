import type { Patient } from "@/types/patient";

let currentPatient: Patient = {
  id: "patient-1",
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
