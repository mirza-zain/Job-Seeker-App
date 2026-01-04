import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { toggleTheme } from '../../state/themeSlice';

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user);
  const themeMode = useAppSelector((s) => s.theme.mode);
  const colors = themeMode === 'dark'
    ? { background: '#0f172a', text: '#f8fafc', primary: '#60a5fa', card: '#111827', border: '#374151', muted: '#9ca3af' }
    : { background: '#f9fafb', text: '#111827', primary: '#3b82f6', card: '#ffffff', border: '#e5e7eb', muted: '#6b7280' };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.push('/edit-profile')}
        >
          <Ionicons name="create-outline" size={18} color={colors.primary} />
          <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <View style={[styles.avatar, { backgroundColor: colors.primary, borderColor: colors.border }]}> 
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
          {user.role && (
            <Text style={[styles.subtitle, { color: colors.muted }]}>{user.role}</Text>
          )}

          <View style={styles.rows}>
            <View style={styles.row}>
              <Ionicons name="mail-outline" size={20} color={colors.muted} />
              <Text style={[styles.rowText, { color: colors.text }]}>{user.email}</Text>
            </View>
            {user.location && (
              <View style={styles.row}>
                <Ionicons name="location-outline" size={20} color={colors.muted} />
                <Text style={[styles.rowText, { color: colors.text }]}>{user.location}</Text>
              </View>
            )}
          </View>

          {user.bio && (
            <View style={[styles.bioBox, { borderColor: colors.border }]}> 
              <Text style={[styles.bioText, { color: colors.text }]}>{user.bio}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.toggleBtn, { backgroundColor: colors.primary }]}
            onPress={() => dispatch(toggleTheme())}
            activeOpacity={0.9}
          >
            <Ionicons name={themeMode === 'light' ? 'moon' : 'sunny'} size={18} color="#ffffff" />
            <Text style={[styles.toggleText]}>Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 4px 12px rgba(0,0,0,0.08)' },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  rows: {
    width: '100%',
    marginTop: 14,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowText: {
    fontSize: 15,
    fontWeight: '500',
  },
  bioBox: {
    width: '100%',
    marginTop: 14,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
  },
  toggleBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});