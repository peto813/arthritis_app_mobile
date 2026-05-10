import { Stack } from "expo-router";

import { useAppTheme, AppThemeProvider } from "@/theme/AppThemeProvider";

function RootLayoutContent() {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primaryDark },
        headerTintColor: colors.textOnPrimary,
        headerTitleStyle: { color: colors.textOnPrimary },
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="check-in/index" options={{ title: "Check-in" }} />
      <Stack.Screen name="check-in/joints" options={{ title: "Joints" }} />
      <Stack.Screen name="check-in/context" options={{ title: "Check-in Context" }} />
      <Stack.Screen name="check-in/review" options={{ title: "Review" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}
