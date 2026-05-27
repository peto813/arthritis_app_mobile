export type SymptomLevel = "low" | "medium" | "high" | "unknown";
export type FlareSeverity = "mild" | "moderate" | "severe" | "unknown";
export type FunctionDifficultyLevel =
  | "none"
  | "mild"
  | "moderate"
  | "severe"
  | "unknown";

export type ApiPatient = {
  id: string;
  displayName: string;
  birthDate?: string;
  sex?: string;
  timezone?: string;
  diagnosisDate?: string;
  raConfirmed?: boolean;
  serostatus?: string;
};

export type CreatePatientPayload = Omit<ApiPatient, "id">;
export type UpdatePatientPayload = Partial<CreatePatientPayload>;

export type ApiPatientBaseline = {
  id: string;
  patientId: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  baselinePain?: number;
  baselineStiffness?: number;
  baselineFatigue?: number;
  baselineSleepHours?: number;
  baselineSteps?: number;
  notes?: string;
  updatedAt: string;
};

export type CreateBaselinePayload = Omit<ApiPatientBaseline, "id" | "patientId" | "updatedAt">;

export type ApiDailyJointSymptom = {
  id?: string;
  checkinId?: string;
  jointCode: string;
  painPresent?: boolean;
  swellingPresent?: boolean;
  stiffnessPresent?: boolean;
  tendernessPresent?: boolean;
  severity?: number;
};

export type ApiDailyCheckin = {
  id: string;
  patientId: string;
  entryDate: string;
  checkinTimestamp: string;
  painLevel: number;
  stiffnessLevel?: SymptomLevel | number;
  energyLevel?: SymptomLevel | number;
  fatigueLevel?: SymptomLevel | number;
  swellingPresent?: boolean;
  morningStiffnessMinutes?: number;
  functionDifficultyLevel?: FunctionDifficultyLevel;
  patientReportedFlare?: boolean;
  patientFlareSeverity?: FlareSeverity;
  notesText?: string;
  voiceNoteUrl?: string;
  jointSymptoms?: ApiDailyJointSymptom[];
};

export type CreateCheckinPayload = Omit<ApiDailyCheckin, "id" | "patientId">;
export type UpdateCheckinPayload = Partial<CreateCheckinPayload>;

export type ApiJointReference = {
  code: string;
  bodyRegion: string;
  displayName: string;
  side?: string;
  symmetricPairCode?: string;
};

export type CreateJointReferencePayload = ApiJointReference;

export type NoteAnalysisPayload = {
  transcriptText: string;
  extractedSignals?: Record<string, unknown>;
};

export type ApiDailyExposure = {
  id: string;
  patientId: string;
  entryDate?: string;
  sleepHours?: number;
  sleepQuality?: number;
  stressLevel?: number;
  overexertionPresent?: boolean;
  illnessPresent?: boolean;
  infectionSymptomsPresent?: boolean;
  hydrationLow?: boolean;
  travelPresent?: boolean;
  unusualRoutinePresent?: boolean;
  notes?: string;
};

export type CreateExposurePayload = Omit<ApiDailyExposure, "id" | "patientId">;

export type ApiIngestionItem = {
  id: string;
  name: string;
  itemType?: string;
  category?: string;
  aliases?: string[];
};

export type CreateIngestionItemPayload = Omit<ApiIngestionItem, "id">;

export type ApiIngestionEvent = {
  id: string;
  patientId: string;
  eventTimestamp: string;
  freeTextName?: string;
  itemType?: string;
  category?: string;
  mealType?: string;
  quantityText?: string;
  wasIntentionalForRelief?: boolean;
  intendedReliefTarget?: string;
  source?: string;
  tags?: string[];
  ingestionItemId?: string;
};

export type CreateIngestionEventPayload = Omit<ApiIngestionEvent, "id" | "patientId">;

export type IngestionPerception = "helped" | "worsened" | "no_effect" | "unsure";

export type CreateIngestionPerceptionPayload = {
  perception: IngestionPerception;
  notes?: string;
  perceptionTimestamp?: string;
};

export type ApiMedicationPlan = {
  id: string;
  patientId: string;
  medicationName: string;
  doseText?: string;
  scheduleText?: string;
  route?: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
};

export type CreateMedicationPlanPayload = Omit<ApiMedicationPlan, "id" | "patientId">;

export type MedicationEventType = "taken" | "missed" | "skipped" | "late";

export type ApiMedicationAdherenceEvent = {
  id: string;
  patientId: string;
  medicationPlanId?: string;
  eventType: MedicationEventType;
  eventTimestamp: string;
  notes?: string;
};

export type CreateMedicationEventPayload = Omit<ApiMedicationAdherenceEvent, "id" | "patientId">;

export type ApiInterventionEvent = {
  id: string;
  patientId: string;
  interventionType: string;
  eventTimestamp: string;
  notes?: string;
  perceivedEffect?: IngestionPerception;
};

export type CreateInterventionPayload = Omit<ApiInterventionEvent, "id" | "patientId">;

export type ApiWeatherObservation = {
  id: string;
  patientId: string;
  observedAt: string;
  temperatureC?: number;
  humidityPct?: number;
  pressureHpa?: number;
  precipitationMm?: number;
  pressureDelta24h?: number;
  temperatureDelta24h?: number;
  humidityDelta24h?: number;
  weatherCondition?: string;
};

export type CreateWeatherObservationPayload = Omit<ApiWeatherObservation, "id" | "patientId">;

export type ApiWearableDailySummary = {
  id: string;
  patientId: string;
  entryDate: string;
  stepCount?: number;
  restingHeartRate?: number;
  hrv?: number;
  sleepTrackerHours?: number;
  sleepEfficiency?: number;
  activeMinutes?: number;
  sedentaryMinutes?: number;
  source?: string;
};

export type CreateWearableDailySummaryPayload = Omit<
  ApiWearableDailySummary,
  "id" | "patientId"
>;

export type ApiFlareLabel = {
  id: string;
  patientId: string;
  entryDate: string;
  flarePresent: boolean;
  flareSeverity?: FlareSeverity;
  score?: number;
  rationale?: string;
};

export type CreateFlareLabelPayload = Omit<ApiFlareLabel, "id" | "patientId">;

export type ApiDietSummary = {
  id: string;
  patientId: string;
  entryDate: string;
  summaryText?: string;
  categories?: string[];
};

export type CreateDietSummaryPayload = Omit<ApiDietSummary, "id" | "patientId">;

export type ApiExperiment = {
  id: string;
  patientId: string;
  title: string;
  hypothesis?: string;
  status?: "planned" | "active" | "completed" | "cancelled";
  startDate?: string;
  endDate?: string;
};

export type CreateExperimentPayload = Omit<ApiExperiment, "id" | "patientId">;

export type ApiExperimentPhase = {
  id: string;
  experimentId: string;
  phaseName: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
};

export type CreateExperimentPhasePayload = Omit<ApiExperimentPhase, "id" | "experimentId">;

export type ApiFeatureSnapshot = {
  id: string;
  patientId: string;
  snapshotTimestamp: string;
  values: Record<string, number | string | boolean | null>;
};

export type CreateFeatureSnapshotPayload = Omit<ApiFeatureSnapshot, "id" | "patientId">;

export type ApiInsight = {
  id: string;
  title: string;
  detail: string;
  confidence?: number;
  createdAt: string;
};
