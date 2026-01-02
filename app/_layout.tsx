import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppliedJobsProvider } from './context/AppliedJobsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppliedJobsProvider>
          <Drawer
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                backgroundColor: '#f9fafb',
                width: 280,
              },
              drawerLabelStyle: {
                fontSize: 16,
                fontWeight: '500',
              },
            }}
          >
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: 'Home',
                title: '💼 Job Seeker',
              }}
            />
          </Drawer>
        </AppliedJobsProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
