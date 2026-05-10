export const centerJointOptions = ["Neck"] as const;

export const leftJointOptions = [
  "Left Shoulder",
  "Left Elbow",
  "Left Wrist",
  "Left Hand",
  "Left Hip",
  "Left Knee",
  "Left Ankle",
  "Left Foot",
] as const;

export const rightJointOptions = [
  "Right Shoulder",
  "Right Elbow",
  "Right Wrist",
  "Right Hand",
  "Right Hip",
  "Right Knee",
  "Right Ankle",
  "Right Foot",
] as const;

export const jointOptions = [
  ...centerJointOptions,
  ...leftJointOptions,
  ...rightJointOptions,
] as const;

export type JointOption = (typeof jointOptions)[number];
