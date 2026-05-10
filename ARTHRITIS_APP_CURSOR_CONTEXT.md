# Arthritis Support App - Cursor Project Context

Use this file as project context for Cursor. Place it in the project root, or copy its contents into `.cursor/rules/arthritis-app.mdc`.

## Product Summary

This is a mobile-first Arthritis Support App MVP, initially built for one patient: the user's mom.

The goal is not to build a generic medical platform yet. The goal is to help one non-technical patient quickly understand pain patterns and make better daily decisions with minimal effort.

Core product promise:

- Log how she feels in under 30 seconds.
- Track pain, joints, stiffness, energy, fatigue, swelling, notes, and possible triggers.
- Show simple timelines and gentle insights.
- Avoid medical claims.
- Avoid over-engineering.

The app should feel calm, human, warm, simple, and emotionally supportive. It should not feel clinical, cold, enterprise-like, or complicated.

## MVP Principles

1. Simplicity first.
2. Single-patient MVP first.
3. No complex authentication for MVP unless explicitly requested.
4. No machine learning in the first usable version.
5. Rule-based insights only for MVP.
6. Large buttons, low text, fast input.
7. The patient should never feel like she is filling out a medical form.
8. Every screen should answer one question or support one action.
9. Prefer clear working code over abstract patterns.
10. Do not add libraries or architecture unless there is a real need.

## Target User

The initial user is mom:

- Non-technical.
- May have rheumatoid arthritis or autoimmune-related symptoms.
- Needs low-friction daily logging.
- May not want to type much.
- Needs clarity, not dashboards.
- Needs reassurance, not alarms.

Design for tired hands, low patience, and bad pain days.

## Tech Direction

Frontend:

- Expo
- React Native
- TypeScript
- React Navigation or Expo Router, depending on the existing project setup
- Component-based UI
- Mobile-first only

Backend:

- FastAPI
- PostgreSQL
- REST API
- OpenAPI-driven thinking

Do not assume the backend is fully built. Frontend work may need mock services first.

## Suggested Frontend Folder Structure

Use this as the preferred mobile app structure unless the project already has a better structure:

```txt
src/
  app/ or navigation/
    RootNavigator.tsx
    tabs.tsx
  screens/
    HomeScreen.tsx
    CheckInScreen.tsx
    JointPickerScreen.tsx
    TimelineScreen.tsx
    InsightsScreen.tsx
    SettingsScreen.tsx
  components/
    layout/
      Screen.tsx
      Section.tsx
    ui/
      Button.tsx
      Card.tsx
      Text.tsx
      SliderField.tsx
      ChoiceChip.tsx
      EmptyState.tsx
    checkin/
      PainSlider.tsx
      EnergySelector.tsx
      StiffnessSelector.tsx
      FatigueSelector.tsx
      JointSymptomPicker.tsx
      NotesInput.tsx
    timeline/
      PainTrendCard.tsx
      DailyEntryCard.tsx
    insights/
      InsightCard.tsx
  services/
    apiClient.ts
    patientsApi.ts
    checkinsApi.ts
    jointsApi.ts
    insightsApi.ts
    mockData.ts
  hooks/
    useDailyCheckin.ts
    usePatient.ts
    useInsights.ts
  types/
    patient.ts
    checkin.ts
    joint.ts
    insight.ts
    api.ts
  constants/
    colors.ts
    spacing.ts
    joints.ts
  utils/
    date.ts
    validation.ts
```

## Main Screens

### Home Screen

Purpose:

Help the user start today’s check-in quickly.

Main content:

- Warm greeting.
- “How do you feel today?”
- Big button: “Start check-in”.
- Small summary of last entry.
- Optional card showing yesterday/today trend.

Do not overload this screen.

### Check-In Screen

Purpose:

Capture the minimum daily symptom state.

Fields:

- Pain level: 0-10 slider or large selectable scale.
- Stiffness: low / medium / high / unknown.
- Energy: low / medium / high / unknown.
- Fatigue: low / medium / high / unknown.
- Swelling present: yes / no / unsure.
- Morning stiffness minutes: optional.
- Function difficulty: none / mild / moderate / severe / unknown.
- Patient-reported flare: yes / no.
- Optional notes.
- Optional voice note placeholder for later.

UX rule:

The screen should still be useful even if the user only enters pain level.

### Joint Picker Screen

Purpose:

Let the patient mark painful or swollen joints.

Preferred MVP approach:

- Start with simple joint chips grouped by body region.
- Later replace or enhance with an SVG body/joint map.

Joint symptom fields:

- jointCode
- painPresent
- swellingPresent
- stiffnessPresent
- tendernessPresent
- severity 0-10

Do not make the body map block progress. Use a simple list first if needed.

### Timeline Screen

Purpose:

Show symptom history in a simple way.

Content:

- List of daily entries.
- Pain trend over time.
- Visual markers for bad days / flare days.
- Tap a day to see detail.

Avoid complicated analytics.

### Insights Screen

Purpose:

Show simple, patient-friendly explanation cards.

Examples:

- “Pain was higher on days with poor sleep.”
- “Your wrist pain appeared 3 times this week.”
- “Pain was higher after days with low energy.”
- “Pressure changes may be related, but we need more days.”

Rules:

- Use gentle language.
- Never sound certain when data is weak.
- Never provide medical instructions.
- Prefer “may be related” over “caused by”.

## Core Data Concepts

### Patient

Represents the tracked person.

Important fields:

- id
- displayName
- birthDate
- sex
- timezone
- diagnosisDate
- raConfirmed
- serostatus

MVP will usually have one patient.

### Patient Baseline

Represents what is normal for the patient during a period.

Important fields:

- effectiveFrom
- effectiveTo
- baselinePain
- baselineStiffness
- baselineFatigue
- baselineSleepHours
- baselineSteps
- notes

A patient can have multiple baselines over time. The active baseline is the one whose date range applies to the current day.

### Daily Check-In

The central daily record.

Important fields:

- id
- patientId
- entryDate
- checkinTimestamp
- painLevel
- stiffnessLevel
- energyLevel
- fatigueLevel
- swellingPresent
- morningStiffnessMinutes
- functionDifficultyLevel
- patientReportedFlare
- patientFlareSeverity
- notesText
- voiceNoteUrl
- jointSymptoms

Frontend should treat `painLevel`, `entryDate`, and `checkinTimestamp` as the minimum useful fields.

### Joint Reference

Selectable joints used in the UI.

Important fields:

- code
- bodyRegion
- displayName
- side
- symmetricPairCode

Example codes:

- left_wrist
- right_wrist
- left_knee
- right_knee
- left_ankle
- right_ankle

### Daily Joint Symptom

Joint-level pain/swelling/stiffness/tenderness for a check-in.

Important fields:

- jointCode
- painPresent
- swellingPresent
- stiffnessPresent
- tendernessPresent
- severity

### Daily Exposure

Possible non-food triggers or context.

Important fields:

- sleepHours
- sleepQuality
- stressLevel
- overexertionPresent
- illnessPresent
- infectionSymptomsPresent
- hydrationLow
- travelPresent
- unusualRoutinePresent

This can be a later part of the check-in flow or a separate “context” step.

### Ingestion Event

Something the patient consumed.

Can include:

- food
- drink
- supplement
- medication
- other

Important fields:

- eventTimestamp
- freeTextName
- itemType
- category
- mealType
- quantityText
- wasIntentionalForRelief
- intendedReliefTarget
- source
- tags

For MVP, do not force detailed food tracking unless requested. Keep it optional.

### Ingestion Perception

Patient’s later perception of whether something helped or worsened symptoms.

Important values:

- helped
- worsened
- no_effect
- unsure

This is subjective and should be treated as patient perception, not medical truth.

### Medication

Medication plan and adherence tracking exist in the API/data model but should not dominate the first UI unless explicitly prioritized.

Medication event types:

- taken
- missed
- skipped
- late

### Weather Observation

Passive context signal.

Important fields:

- temperatureC
- humidityPct
- pressureHpa
- precipitationMm
- pressureDelta24h
- temperatureDelta24h
- humidityDelta24h
- weatherCondition

Weather should support insights, not be the main story.

### Wearable Daily Summary

Future or optional data.

Important fields:

- stepCount
- restingHeartRate
- hrv
- sleepTrackerHours
- sleepEfficiency
- activeMinutes
- sedentaryMinutes
- source

Do not build wearable integration in MVP unless explicitly requested.

### Note Analysis

Future support for typed/voice notes.

Can extract signals like:

- stress
- sleep issues
- infection mentions
- skipped medication
- overexertion
- diet trigger mentions
- relief action mentions

Do not build automated note analysis unless explicitly requested.

### Self Experiments

Future structured experiments, such as testing whether avoiding a food category helps.

Do not build in first UI unless explicitly requested.

### Feature Snapshot

ML-ready feature vector for future prediction.

Do not build ML in MVP. Only keep data clean enough that feature engineering is possible later.

## API Awareness

The backend API is REST-style and organized around:

- Patients
- Baselines
- Daily Check-ins
- Joints
- Flare Labels
- Exposures
- Ingestion
- Diet Summaries
- Medication
- Interventions
- Weather
- Wearables
- Notes
- Experiments
- Features
- Insights

Important frontend-facing endpoints likely needed early:

```txt
GET    /patients
POST   /patients
GET    /patients/{patientId}
PATCH  /patients/{patientId}

POST   /patients/{patientId}/checkins
GET    /patients/{patientId}/checkins
GET    /checkins/{checkinId}
PATCH  /checkins/{checkinId}

GET    /joints
POST   /checkins/{checkinId}/joint-symptoms
GET    /checkins/{checkinId}/joint-symptoms

GET    /patients/{patientId}/insights
GET    /patients/{patientId}/weather
POST   /patients/{patientId}/weather
```

For frontend development, create typed API functions but allow mock implementations while backend is incomplete.

## TypeScript Naming Style

Use frontend camelCase types that match the OpenAPI schema style.

Example:

```ts
export type DailyCheckin = {
  id: string;
  patientId: string;
  entryDate: string;
  checkinTimestamp: string;
  painLevel: number;
  stiffnessLevel?: 'low' | 'medium' | 'high' | 'unknown';
  energyLevel?: 'low' | 'medium' | 'high' | 'unknown';
  fatigueLevel?: 'low' | 'medium' | 'high' | 'unknown';
  swellingPresent?: boolean;
  morningStiffnessMinutes?: number;
  functionDifficultyLevel?: 'none' | 'mild' | 'moderate' | 'severe' | 'unknown';
  patientReportedFlare?: boolean;
  patientFlareSeverity?: 'mild' | 'moderate' | 'severe' | 'unknown';
  notesText?: string;
  voiceNoteUrl?: string;
  jointSymptoms?: DailyJointSymptom[];
};
```

## UI Style Direction

The app should look:

- soft
- warm
- calm
- trustworthy
- simple
- readable
- human

Avoid:

- hospital-dashboard feel
- dense forms
- tiny text
- scary red warnings
- complex charts
- technical labels

Preferred UI patterns:

- Cards
- Large touch targets
- Rounded corners
- Clear spacing
- Simple choices
- One primary action per screen
- Friendly microcopy

## Copywriting Rules

Use plain language.

Good:

- “How do you feel today?”
- “Pain looks higher than usual this week.”
- “This may be related to poor sleep.”
- “We need more days before showing stronger patterns.”

Avoid:

- “Prediction model”
- “Causal inference”
- “Clinical recommendation”
- “Adherence failure”
- “Abnormal symptom event”

## Medical Safety Rules

Never tell the patient to start, stop, increase, or decrease medication.

Never diagnose.

Never claim a trigger caused a flare.

Allowed:

- “You may want to mention this to your doctor.”
- “This pattern may be worth watching.”
- “This app is not a replacement for medical advice.”

## What Not To Build Yet

Do not build these unless explicitly requested:

- Multi-user system
- Doctor dashboard
- Complex auth
- ML prediction
- Push notification engine
- Wearable integration
- Complex food database
- Complex medication scheduler
- Full body SVG map as a blocker
- Admin portal
- Payment system

## Development Priorities

Build in this order:

1. Project structure.
2. Theme, layout, reusable UI components.
3. Mock patient and mock check-in data.
4. Home screen.
5. Daily check-in screen.
6. Simple joint picker.
7. Save check-in to mock service.
8. Timeline screen.
9. Insights screen with mock/rule-based cards.
10. Replace mock API with real API client when backend is ready.

## Cursor Behavior Instructions

When generating code for this project:

- Prefer simple, readable code.
- Explain changes briefly.
- Do not introduce unnecessary abstractions.
- Keep components small.
- Use TypeScript types.
- Use mock data when backend availability is unclear.
- Do not invent backend endpoints beyond the OpenAPI direction.
- Do not create medical recommendations.
- Keep MVP scope tight.
- Ask before adding major packages.
- When unsure, choose the simpler mobile UX.

## Suggested First Implementation Task

Create the mobile UI foundation:

- `Screen` layout component
- `Card` component
- `PrimaryButton` component
- `ChoiceChip` component
- `PainSlider` component
- `HomeScreen`
- `CheckInScreen`
- mock `DailyCheckin` types and data

The first working version should let the user open the app, tap “Start check-in”, select pain/stiffness/energy, optionally select joints, and save a mock entry.
