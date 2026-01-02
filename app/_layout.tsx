import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppliedJobsProvider } from './context/AppliedJobsContext';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppliedJobsProvider>
          <Drawer
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#3b82f6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
              drawerStyle: {
                backgroundColor: '#f9fafb',
                width: 280,
              },
              drawerLabelStyle: {
                fontSize: 16,
                fontWeight: '500',
              },
              unmountOnBlur: false,
            }}
          >
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: 'Home',
                title: '💼 Job Seeker',
                unmountOnBlur: false,
              }}
            />
            <Drawer.Screen
              name="about"
              options={{
                drawerLabel: 'About',
                title: 'About Job Seeker',
                unmountOnBlur: false,
              }}
            />
            <Drawer.Screen
              name="index"
              options={{
                href: null,
              }}
            />
          </Drawer>
        </AppliedJobsProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
