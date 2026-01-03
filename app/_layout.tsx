import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";
// Removed ThemeProvider and react-navigation theme; using Redux-driven colors
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { getThemeColors } from "../lib/theme";
import { store, useAppSelector } from "../state/store";

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

function DrawerWrapper() {
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  const insets = useSafeAreaInsets();
  return (
    <Drawer screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: palette.card,
      },
      headerTintColor: palette.heading,
      headerTitleStyle: {
        fontWeight: 'bold',
        color: palette.heading,
      },
      // Position drawer below status bar and theme it
      drawerStyle: { marginTop: insets.top, backgroundColor: palette.card },
      drawerActiveTintColor: palette.text,
      drawerInactiveTintColor: palette.text,
      drawerActiveBackgroundColor: mode === 'dark' ? '#1f2937' : '#e5e7eb',
    }}>
      {/* Hide the root index route if present */}
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Hidden Index',
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Job Seeker",
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About",
          title: "About",
        }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  const queryClient = new QueryClient()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <DrawerWrapper />
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
