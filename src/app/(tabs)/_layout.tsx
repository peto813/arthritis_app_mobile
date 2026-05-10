import { Link, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/common/AppText";
import { spacing } from "@/constants/spacing";
import { useAppTheme } from "@/theme/AppThemeProvider";

function HeaderLogo() {
  return (
    <Image
      source={require("../../../assets/images/arthritis_app_logo.png")}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
      }}
      resizeMode="contain"
    />
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const tabBarHeight = 56 + insets.bottom;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryDark },
          headerTintColor: colors.textOnPrimary,
          headerTitleStyle: { color: colors.textOnPrimary },
          headerRight: () => (
            <View style={{ marginRight: 8 }}>
              <HeaderLogo />
            </View>
          ),
          tabBarActiveTintColor: colors.primaryDark,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 4,
          },
          tabBarItemStyle: {
            paddingTop: 4,
          },
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: tabBarHeight,
            paddingBottom: insets.bottom,
            paddingTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="timeline"
          options={{
            title: "Timeline",
            tabBarLabel: "Timeline",
            tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarLabel: "Insights",
            tabBarIcon: ({ color, size }) => <Ionicons name="bulb" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
          }}
        />
      </Tabs>

      <Link href="/check-in" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Start daily check-in"
          style={{
            position: "absolute",
            right: spacing.lg,
            bottom: tabBarHeight + spacing.md,
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
