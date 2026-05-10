import { Link, Stack } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/common/AppText";
import { spacing } from "@/constants/spacing";
import { AppThemeProvider, useAppTheme } from "@/theme/AppThemeProvider";

function HeaderLogo() {
  return (
    <Image
      source={require("../../assets/images/arthritis_app_logo.png")}
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
      }}
      resizeMode="contain"
    />
  );
}

function RootLayoutContent() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryDark },
          headerTintColor: colors.textOnPrimary,
          headerTitleStyle: { color: colors.textOnPrimary },
          headerBackTitle: "Back",
          headerRight: () => (
            <View style={{ marginRight: 8 }}>
              <HeaderLogo />
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="check-in/index" options={{ title: "Check-in" }} />
        <Stack.Screen name="check-in/joints" options={{ title: "Joints" }} />
        <Stack.Screen
          name="check-in/context"
          options={{ title: "Check-in Context" }}
        />
        <Stack.Screen name="check-in/review" options={{ title: "Review" }} />
        <Stack.Screen name="timeline/index" options={{ title: "Timeline" }} />
        <Stack.Screen name="insights/index" options={{ title: "Insights" }} />
        <Stack.Screen name="settings/index" options={{ title: "Settings" }} />
      </Stack>

      <Link href="/check-in" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Start daily check-in"
          style={{
            position: "absolute",
            right: spacing.lg,
            bottom: insets.bottom + spacing.lg,
            minWidth: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: colors.primary,
            paddingHorizontal: spacing.lg,
            flexDirection: "row",
            gap: spacing.sm,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 10,
            elevation: 7,
          }}
        >
          <AppText
            style={{ color: colors.textOnPrimary, fontWeight: "700", fontSize: 22, lineHeight: 24 }}
          >
            +
          </AppText>
          <AppText style={{ color: colors.textOnPrimary, fontWeight: "600", fontSize: 15 }}>
            Check-in
          </AppText>
        </Pressable>
      </Link>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}
