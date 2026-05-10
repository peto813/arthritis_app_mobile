export const palette = {
  white: "#FFFFFF",
  black: "#000000",
  teal500: "#3BA99C",
  teal800: "#1F6F68",
  cream50: "#FAF7F0",
  peach400: "#F4A261",
  coral500: "#E76F51",
  sage500: "#A7C957",
  charcoal900: "#263238",
  warmGray500: "#7A7A7A",
  sand200: "#E8E1D6",
};

export const colors = {
  background: palette.cream50,
  surface: palette.white,
  textPrimary: palette.charcoal900,
  textSecondary: palette.warmGray500,
  textOnPrimary: palette.white,
  border: palette.sand200,
  primary: palette.teal500,
  primaryDark: palette.teal800,
  accent: palette.peach400,
  danger: palette.coral500,
  success: palette.sage500,
  shadow: palette.black,
};

export type AppColors = typeof colors;
