import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="information-circle" size={60} color="#3b82f6" />
        <Text style={styles.title}>About Job Seeker</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Job Seeker is a mobile application designed to help you discover, explore, and track job opportunities effortlessly.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Key Features</Text>
          <Text style={styles.featureItem}>• Browse jobs from various industries</Text>
          <Text style={styles.featureItem}>• View detailed job descriptions</Text>
          <Text style={styles.featureItem}>• Track applied jobs easily</Text>
          <Text style={styles.featureItem}>• Manage your job search progress</Text>
          <Text style={styles.featureItem}>• Professional profile management</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Our Mission</Text>
          <Text style={styles.bodyText}>
            We aim to simplify your job search journey by providing an intuitive platform where you can discover opportunities that match your skills and aspirations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 How It Works</Text>
          <Text style={styles.bodyText}>
            1. Browse through available job listings in the Home tab
          </Text>
          <Text style={styles.bodyText}>
            2. Click on any job to view detailed information
          </Text>
          <Text style={styles.bodyText}>
            3. Apply to jobs and track them in the Applied tab
          </Text>
          <Text style={styles.bodyText}>
            4. Manage your profile and preferences in the Profile tab
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Version</Text>
          <Text style={styles.bodyText}>Job Seeker v1.0.0</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for job seekers everywhere
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#3b82f6',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginBottom: 15,
    borderRadius: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 20,
  },
  bodyText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});
