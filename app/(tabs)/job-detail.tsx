import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = {
  href: null, // hide from tab bar / drawer
};

export default function JobDetail() {
  const { job } = useLocalSearchParams();
  const parsedJob = job ? JSON.parse(String(job)) : null;

  if (!parsedJob) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>No job data found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
    <ScrollView contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={2}>{parsedJob.title}</Text>
        <Text style={styles.company}>{parsedJob.company}</Text>

        <View style={styles.badgeRow}>
          <View style={[styles.chip, styles.chipNeutral]}>
            <Text style={[styles.chipText, styles.chipNeutralText]} numberOfLines={1}>📍 {parsedJob.location || 'Unknown'}</Text>
          </View>
          <View style={[styles.chip, styles.chipPrimary]}>
            <Text style={[styles.chipText, styles.chipPrimaryText]} numberOfLines={1}>{parsedJob.employment_type || 'Type N/A'}</Text>
          </View>
          {parsedJob.job_category ? (
            <View style={[styles.chip, styles.chipPurple]}>
              <Text style={[styles.chipText, styles.chipPurpleText]} numberOfLines={1}>{parsedJob.job_category}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Salary Card */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>Salary</Text>
        <View style={styles.salaryBox}>
          <Text style={styles.salaryText}>${parsedJob.salary_from?.toLocaleString()} - ${parsedJob.salary_to?.toLocaleString()}</Text>
        </View>
      </View>

      {/* Description Card */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>Description</Text>
        <Text style={styles.body}>{parsedJob.description || 'No description provided.'}</Text>
      </View>

      {/* Apply CTA */}
      <TouchableOpacity style={styles.applyButton} onPress={() => router.push({ pathname: '/(tabs)/apply', params: { job: JSON.stringify(parsedJob) } })}>
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
