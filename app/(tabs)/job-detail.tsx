import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getThemeColors } from '../../lib/theme';
import { useAppSelector } from '../../state/store';

export const options = {
  href: null, // hide from tab bar / drawer
};

export default function JobDetail() {
  const { job } = useLocalSearchParams();
  const parsedJob = job ? JSON.parse(String(job)) : null;
  const mode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(mode);
  const successBg = mode === 'dark' ? 'rgba(34,197,94,0.15)' : '#f0fdf4';
  const successBorder = mode === 'dark' ? 'rgba(34,197,94,0.30)' : '#bbf7d0';
  const successText = mode === 'dark' ? '#86efac' : '#15803d';

  if (!parsedJob) {
    return (
      <View style={[styles.center, { backgroundColor: palette.background }]}>
        <Text style={[styles.error, { color: mode === 'dark' ? '#fca5a5' : '#dc2626' }]}>No job data found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
    <ScrollView contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.title, { color: palette.heading }]} numberOfLines={2}>{parsedJob.title}</Text>
        <Text style={[styles.company, { color: palette.mutedText }]}>{parsedJob.company}</Text>

        <View style={styles.badgeRow}>
          <View style={[styles.chip, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <Text style={[styles.chipText, { color: palette.mutedText }]} numberOfLines={1}>📍 {parsedJob.location || 'Unknown'}</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderColor: 'rgba(37, 99, 235, 0.25)' }]}>
            <Text style={[styles.chipText, { color: palette.primary }]} numberOfLines={1}>{parsedJob.employment_type || 'Type N/A'}</Text>
          </View>
          {parsedJob.job_category ? (
            <View style={[styles.chip, { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderColor: 'rgba(37, 99, 235, 0.25)' }]}>
              <Text style={[styles.chipText, { color: palette.primary }]} numberOfLines={1}>{parsedJob.job_category}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Salary Card */}
      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.sectionHeading, { color: palette.heading }]}>Salary</Text>
        <View style={[styles.salaryBox, { backgroundColor: successBg, borderColor: successBorder }]}>
          <Text style={[styles.salaryText, { color: successText }]}>${parsedJob.salary_from?.toLocaleString()} - ${parsedJob.salary_to?.toLocaleString()}</Text>
        </View>
      </View>

      {/* Description Card */}
      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.sectionHeading, { color: palette.heading }]}>Description</Text>
        <Text style={[styles.body, { color: palette.text }]}>{parsedJob.description || 'No description provided.'}</Text>
      </View>

      {/* Apply CTA */}
      <TouchableOpacity style={[styles.applyButton, { backgroundColor: palette.primary }]} onPress={() => router.push({ pathname: '/(tabs)/apply', params: { job: JSON.stringify(parsedJob) } })}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  company: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chipNeutral: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
  chipNeutralText: {
    color: '#4b5563',
  },
  chipPrimary: {
    backgroundColor: '#dbeafe',
    borderColor: '#bfdbfe',
  },
  chipPrimaryText: {
    color: '#1e40af',
  },
  chipPurple: {
    backgroundColor: '#ede9fe',
    borderColor: '#ddd6fe',
  },
  chipPurpleText: {
    color: '#6b21a8',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  salaryBox: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  salaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#15803d',
  },
  applyButton: {
    marginTop: 24,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 6px 14px rgba(59,130,246,0.35)',
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    fontSize: 16,
    color: '#dc2626',
  },
});
