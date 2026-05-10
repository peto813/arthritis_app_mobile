import {
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  type Theme as NavigationTheme,
} from "@react-navigation/native";
import { createContext, useContext, useMemo, type PropsWithChildren } from "react";

import { colors as defaultColors, type AppColors } from "@/constants/colors";

type AppTheme = {
  colors: AppColors;
  navigationTheme: NavigationTheme;
};

const defaultNavigationTheme: NavigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: defaultColors.primary,
    background: defaultColors.background,
    card: defaultColors.surface,
    text: defaultColors.textPrimary,
    border: defaultColors.border,
    notification: defaultColors.danger,
  },
};

const AppThemeContext = createContext<AppTheme>({
  colors: defaultColors,
  navigationTheme: defaultNavigationTheme,
});

type AppThemeProviderProps = PropsWithChildren<{
  colors?: AppColors;
}>;

export function AppThemeProvider({ children, colors = defaultColors }: AppThemeProviderProps) {
  const navigationTheme = useMemo<NavigationTheme>(
    () => ({
      ...NavigationDefaultTheme,
      colors: {
        ...NavigationDefaultTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.textPrimary,
        border: colors.border,
        notification: colors.danger,
      },
    }),
    [colors],
  );

  const value = useMemo(
    () => ({
      colors,
      navigationTheme,
    }),
    [colors, navigationTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(AppThemeContext);
}
