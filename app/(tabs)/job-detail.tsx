import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppliedJobs } from '../context/AppliedJobsContext';

export default function JobDetail() {
  const params = useLocalSearchParams();
  const { isJobApplied } = useAppliedJobs();
  
  const job = params.job ? JSON.parse(params.job as string) : null;

  if (!job) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb'}}>
        <Text style={{fontSize: 18, color: '#6b7280'}}>Job not found</Text>
      </View>
    );
  }

  const alreadyApplied = isJobApplied(job.id);

  return (
    <View style={{flex: 1, backgroundColor: '#f9fafb'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {/* Header Card */}
        <View style={{
          backgroundColor: '#ffffff',
          padding: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <Text style={{fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 12}}>
            {job.title}
          </Text>
          <Text style={{fontSize: 18, color: '#374151', fontWeight: '500', marginBottom: 16}}>
            🏢 {job.company}
          </Text>
          <Text style={{fontSize: 16, color: '#6b7280', marginBottom: 8}}>
            📍 {job.location}
          </Text>
        </View>

        {/* Salary Section */}
        <View style={{
          backgroundColor: '#ffffff',
          marginTop: 12,
          padding: 20,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#e5e7eb'
        }}>
          <Text style={{fontSize: 14, color: '#6b7280', marginBottom: 8}}>💰 Salary Range</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#15803d'}}>
            ${job.salary_from?.toLocaleString()} - ${job.salary_to?.toLocaleString()}
          </Text>
        </View>

        {/* Job Details */}
        <View style={{
          backgroundColor: '#ffffff',
          marginTop: 12,
          padding: 20,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#e5e7eb'
        }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16}}>
            Job Details
          </Text>

          <View style={{marginBottom: 16}}>
            <Text style={{fontSize: 14, color: '#6b7280', marginBottom: 4}}>Employment Type</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
              <View style={{backgroundColor: '#dbeafe', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20}}>
                <Text style={{color: '#1e40af', fontSize: 14, fontWeight: '600'}}>
                  💼 {job.employment_type}
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginBottom: 16}}>
            <Text style={{fontSize: 14, color: '#6b7280', marginBottom: 4}}>Job Category</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
              <View style={{backgroundColor: '#ede9fe', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20}}>
                <Text style={{color: '#6b21a8', fontSize: 14, fontWeight: '600'}}>
                  💻 {job.job_category}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={{fontSize: 14, color: '#6b7280', marginBottom: 4}}>Number of Openings</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
              <View style={{backgroundColor: '#fed7aa', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20}}>
                <Text style={{color: '#92400e', fontSize: 14, fontWeight: '600'}}>
                  👥 {job.number_of_opening} {job.number_of_opening === 1 ? 'opening' : 'openings'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Job Description */}
        <View style={{
          backgroundColor: '#ffffff',
          marginTop: 12,
          padding: 20,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#e5e7eb'
        }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 12}}>
            About the Role
          </Text>
          <Text style={{fontSize: 16, color: '#4b5563', lineHeight: 24}}>
            We are looking for a talented {job.title} to join our team at {job.company}. This is an exciting opportunity to work in {job.location} with a competitive salary package.
          </Text>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb'
      }}>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={alreadyApplied}
          onPress={() => router.push({
            pathname: '/(tabs)/application-form',
            params: { job: JSON.stringify(job) }
          })}
          style={{
            backgroundColor: alreadyApplied ? '#9ca3af' : '#3b82f6',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Ionicons name={alreadyApplied ? 'checkmark-circle' : 'send'} size={24} color="#ffffff" style={{marginRight: 8}} />
          <Text style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
            {alreadyApplied ? 'Already Applied' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
