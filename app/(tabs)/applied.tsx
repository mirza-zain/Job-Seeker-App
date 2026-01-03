import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppliedJobs, useDeleteApplication, useUpdateApplicationStatus } from '../../hooks/useAppliedJobs';

export default function Applied() {
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
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Text style={styles.heading}>Applied Jobs</Text>
      {!data || data.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.placeholder}>No jobs applied yet</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  {item.company ? <Text style={styles.company}>{item.company}</Text> : null}
                </View>
                <TouchableOpacity
                  style={styles.deleteBtn}
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
                    style={[styles.statusChip, { backgroundColor: item.status === s.key ? s.color : '#f3f4f6', borderColor: item.status === s.key ? s.color : '#e5e7eb' }]}
                  >
                    <Text style={[styles.statusText, { color: item.status === s.key ? '#ffffff' : '#374151' }]}>{s.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.metaRow}>
                {item.location ? <Text style={styles.meta}>📍 {item.location}</Text> : null}
                {item.employment_type ? <Text style={styles.meta}>{item.employment_type}</Text> : null}
              </View>
              {item.note ? (
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>{item.note}</Text>
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
    backgroundColor: '#f9fafb',
    padding: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
