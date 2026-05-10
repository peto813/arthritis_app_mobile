export const jointOptions = [
  "Neck",
  "Shoulders",
  "Elbows",
  "Wrists",
  "Hands",
  "Hips",
  "Knees",
  "Ankles",
  "Feet",
] as const;

export type JointOption = (typeof jointOptions)[number];
