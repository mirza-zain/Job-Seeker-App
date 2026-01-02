import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { useAppliedJobs } from './context/AppliedJobsContext';

export default function ApplicationForm() {
  const params = useLocalSearchParams();
  const { addJobMutation } = useAppliedJobs();
  const job = params.job ? JSON.parse(params.job as string) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    const appliedJob = {
      id: Date.now().toString(),
      jobId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary_from: job.salary_from,
      salary_to: job.salary_to,
      employment_type: job.employment_type,
      job_category: job.job_category,
      appliedDate: new Date().toISOString(),
      status: 'applied' as const,
      applicantName: formData.name,
      applicantEmail: formData.email,
      applicantPhone: formData.phone,
      coverLetter: formData.coverLetter
    };

    addJobMutation.mutate(appliedJob, {
      onSuccess: () => {
        Alert.alert(
          'Application Submitted',
          'Your application has been submitted successfully!',
          [
            {
              text: 'View Applied Jobs',
              onPress: () => router.replace('/(tabs)/applied')
            },
            {
              text: 'OK',
              onPress: () => router.back()
            }
          ]
        );
      },
      onError: () => {
        Alert.alert('Error', 'Failed to submit application. Please try again.');
      }
    });
  };

  if (!job) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb'}}>
        <Text style={{fontSize: 18, color: '#6b7280'}}>Job not found</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#f9fafb'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {/* Header */}
        <View style={{
          backgroundColor: '#3b82f6',
          padding: 24,
          paddingTop: 60
        }}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 8}}>
            Application Form
          </Text>
          <Text style={{fontSize: 16, color: '#dbeafe'}}>
            Applying for {job.title} at {job.company}
          </Text>
        </View>

        {/* Form */}
        <View style={{padding: 16, marginTop: 16}}>
          {/* Name Field */}
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8}}>
              Full Name <Text style={{color: '#dc2626'}}>*</Text>
            </Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 12,
                fontSize: 16,
                color: '#111827',
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}
              placeholder="Enter your full name"
              placeholderTextColor="#9ca3af"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
            />
          </View>

          {/* Email Field */}
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8}}>
              Email Address <Text style={{color: '#dc2626'}}>*</Text>
            </Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 12,
                fontSize: 16,
                color: '#111827',
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}
              placeholder="your.email@example.com"
              placeholderTextColor="#9ca3af"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Field */}
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8}}>
              Phone Number <Text style={{color: '#dc2626'}}>*</Text>
            </Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 12,
                fontSize: 16,
                color: '#111827',
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}
              placeholder="+1 (555) 123-4567"
              placeholderTextColor="#9ca3af"
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              keyboardType="phone-pad"
            />
          </View>

          {/* Cover Letter Field */}
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8}}>
              Cover Letter (Optional)
            </Text>
            <TextInput
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 12,
                fontSize: 16,
                color: '#111827',
                borderWidth: 1,
                borderColor: '#e5e7eb',
                minHeight: 120,
                textAlignVertical: 'top'
              }}
              placeholder="Tell us why you're a great fit for this role..."
              placeholderTextColor="#9ca3af"
              value={formData.coverLetter}
              onChangeText={(text) => setFormData({...formData, coverLetter: text})}
              multiline
              numberOfLines={6}
            />
          </View>

          {/* Info Box */}
          <View style={{
            backgroundColor: '#dbeafe',
            padding: 16,
            borderRadius: 12,
            marginBottom: 20
          }}>
            <Text style={{fontSize: 14, color: '#1e40af', lineHeight: 20}}>
              💡 Your application will be reviewed by the hiring team. You can track the status in the "Applied" tab.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        flexDirection: 'row',
        gap: 12
      }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={{
            flex: 1,
            backgroundColor: '#f3f4f6',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e5e7eb'
          }}
        >
          <Text style={{color: '#6b7280', fontSize: 16, fontWeight: '600'}}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSubmit}
          disabled={addJobMutation.isPending}
          style={{
            flex: 2,
            backgroundColor: addJobMutation.isPending ? '#9ca3af' : '#3b82f6',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center'
          }}
        >
          <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
            {addJobMutation.isPending ? 'Submitting...' : 'Submit Application'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
