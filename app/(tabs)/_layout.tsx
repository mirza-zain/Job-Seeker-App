import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useAppSelector } from '../../state/store';

export default function TabsLayout() {
  const mode = useAppSelector((s) => s.theme.mode);
  const colors = mode === 'dark'
    ? { card: '#111827', primary: '#60a5fa', border: '#374151' }
    : { card: '#ffffff', primary: '#3b82f6', border: '#e5e7eb' };
  const inactive = mode === 'dark' ? '#9ca3af' : '#6b7280';
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: inactive,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="applied"
        options={{
          title: 'Applied Jobs',
          tabBarLabel: 'Applied',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      {/* Hide detail route from tab bar */}
      <Tabs.Screen
        name="job-detail"
        options={{
          href: null,
          title: 'Job Details',
        }}
      />
      {/* Hide apply route from tab bar */}
      <Tabs.Screen
        name="apply"
        options={{
          href: null,
          title: 'Apply',
        }}
      />
    </Tabs>
  );
}
