export type Exposure = {
  id: string;
  type: "weather" | "activity" | "medication" | "sleep";
  value: string;
  recordedAt: string;
};
