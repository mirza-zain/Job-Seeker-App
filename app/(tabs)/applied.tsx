import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppliedJobs, useDeleteApplication, useUpdateApplicationStatus } from '../../hooks/useAppliedJobs';
import { getThemeColors } from '../../lib/theme';
import { useAppSelector } from '../../state/store';

export default function Applied() {
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  const { data } = useAppliedJobs();
  const updateStatus = useUpdateApplicationStatus();
  const deleteApp = useDeleteApplication();
  const statuses: Array<{ key: 'applied'|'interview'|'accepted'|'rejected'; label: string; color: string }> = [
    { key: 'applied', label: 'Applied', color: '#3b82f6' },
    { key: 'interview', label: 'Interview', color: '#f59e0b' },
    { key: 'accepted', label: 'Accepted', color: '#10b981' },
    { key: 'rejected', label: 'Rejected', color: '#ef4444' },
  ];
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
      <Text style={[styles.heading, { color: palette.heading }]}>Applied Jobs</Text>
      {!data || data.length === 0 ? (
        <View style={styles.container}>
          <Text style={[styles.placeholder, { color: palette.mutedText }]}>No jobs applied yet</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }] }>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: palette.text }]} numberOfLines={1}>{item.title}</Text>
                  {item.company ? <Text style={[styles.company, { color: palette.mutedText }]}>{item.company}</Text> : null}
                </View>
                <TouchableOpacity
                  style={[styles.deleteBtn, { backgroundColor: palette.card, borderColor: '#fee2e2' }]}
                  onPress={() => deleteApp.mutate(item.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
              <View style={styles.statusRow}>
                {statuses.map(s => (
                  <TouchableOpacity
                    key={s.key}
                    onPress={() => updateStatus.mutate({ id: item.id, status: s.key })}
                    style={[styles.statusChip, { backgroundColor: item.status === s.key ? s.color : (mode === 'dark' ? '#1f2937' : '#f3f4f6'), borderColor: item.status === s.key ? s.color : (mode === 'dark' ? '#374151' : '#e5e7eb') }]}
                  >
                    <Text style={[styles.statusText, { color: item.status === s.key ? '#ffffff' : palette.text }]}>{s.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.metaRow}>
                {item.location ? <Text style={[styles.meta, { color: palette.mutedText }]}>📍 {item.location}</Text> : null}
                {item.employment_type ? <Text style={[styles.meta, { color: palette.mutedText }]}>{item.employment_type}</Text> : null}
              </View>
              {item.note ? (
                <View style={[styles.noteBox, { backgroundColor: mode === 'dark' ? '#0f172a' : '#f3f4f6', borderColor: palette.border }]}>
                  <Text style={[styles.noteText, { color: palette.text }]}>{item.note}</Text>
                </View>
              ) : null}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#9ca3af',
  },
  separator: {
    height: 12,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  company: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  meta: {
    fontSize: 12,
    color: '#4b5563',
  },
  noteBox: {
    marginTop: 12,
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  noteText: {
    fontSize: 13,
    color: '#374151',
  },
});
