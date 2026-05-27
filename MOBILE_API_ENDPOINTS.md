# Mobile API Endpoint Catalog

This document lists every currently exposed endpoint in the API so the mobile app workspace can wire connections consistently.

## Base URL and auth

- Base URL for API routes: `/v1`
- Health endpoint is excluded from the global prefix: `/health`
- Auth header for protected endpoints: `X-Auth-Hash: <token>`
- Swagger (non-production): `/docs`, `/docs/openapi.json`, `/docs/openapi.yaml`

## Public endpoint

- `GET /health` - basic service health status

## Patients

- `POST /v1/patients` - create patient profile
- `GET /v1/patients` - list patient profiles
- `GET /v1/patients/{patientId}` - get patient profile
- `PATCH /v1/patients/{patientId}` - update patient profile

## Baselines

- `POST /v1/patients/{patientId}/baselines` - create patient baseline
- `GET /v1/patients/{patientId}/baselines` - list patient baselines
- `GET /v1/patients/{patientId}/baselines/{baselineId}` - get patient baseline by id

## Daily Check-ins

- `POST /v1/patients/{patientId}/checkins` - create daily check-in (optional joint symptoms inline)
- `GET /v1/patients/{patientId}/checkins` - list daily check-ins
- `GET /v1/checkins/{checkinId}` - get daily check-in
- `PATCH /v1/checkins/{checkinId}` - update daily check-in

## Joint Symptoms and Joint Catalog

- `POST /v1/checkins/{checkinId}/joint-symptoms` - add joint symptom to a check-in
- `GET /v1/checkins/{checkinId}/joint-symptoms` - list joint symptoms for a check-in
- `GET /v1/joints` - list joint reference values
- `POST /v1/joints` - create joint reference value

## Notes

- `POST /v1/checkins/{checkinId}/note-analysis` - store transcript and extracted note signals

## Exposures

- `POST /v1/patients/{patientId}/exposures` - create daily exposure record
- `GET /v1/patients/{patientId}/exposures` - list daily exposure records

## Ingestion

- `POST /v1/ingestion-items` - create ingestion item reference
- `GET /v1/ingestion-items` - search ingestion item references
- `POST /v1/patients/{patientId}/ingestion-events` - create ingestion event
- `GET /v1/patients/{patientId}/ingestion-events` - list ingestion events
- `POST /v1/ingestion-events/{ingestionEventId}/perceptions` - record post-ingestion perception

## Medication

- `POST /v1/patients/{patientId}/medication-plans` - create medication plan
- `GET /v1/patients/{patientId}/medication-plans` - list medication plans
- `POST /v1/patients/{patientId}/medication-events` - record medication adherence event

## Interventions

- `POST /v1/patients/{patientId}/interventions` - create intervention event
- `GET /v1/patients/{patientId}/interventions` - list intervention events

## Weather

- `POST /v1/patients/{patientId}/weather` - store weather observation
- `GET /v1/patients/{patientId}/weather` - list weather observations

## Wearables

- `POST /v1/patients/{patientId}/wearables/daily-summaries` - store wearable daily summary

## Flare Labels

- `POST /v1/patients/{patientId}/flare-labels` - create computed flare label
- `GET /v1/patients/{patientId}/flare-labels` - list computed flare labels

## Diet Summaries

- `POST /v1/patients/{patientId}/diet-summaries` - create/store daily diet summary

## Experiments

- `POST /v1/patients/{patientId}/experiments` - create self experiment
- `GET /v1/patients/{patientId}/experiments` - list self experiments
- `POST /v1/experiments/{experimentId}/phases` - create self experiment phase

## Features

- `POST /v1/patients/{patientId}/feature-snapshots` - store derived feature snapshot

## Insights

- `GET /v1/patients/{patientId}/insights` - list lightweight patient insight cards

## Source of truth

- Route list in this file is based on `generated-openapi.yaml` and the global prefix in `src/main.ts`.
- To refresh after API changes, run `yarn openapi:generate` and regenerate this document from the updated spec.
