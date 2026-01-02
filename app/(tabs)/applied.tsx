import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import { useAppliedJobs, AppliedJob } from '../context/AppliedJobsContext';
import { Ionicons } from '@expo/vector-icons';

export default function Applied() {
  const { appliedJobs, updateStatusMutation } = useAppliedJobs();
  const [selectedJob, setSelectedJob] = useState<AppliedJob | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const statuses: AppliedJob['status'][] = ['applied', 'interview', 'rejected', 'accepted'];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'applied': return '#3b82f6';
      case 'interview': return '#8b5cf6';
      case 'rejected': return '#ef4444';
      case 'accepted': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch(status) {
      case 'applied': return '#dbeafe';
      case 'interview': return '#ede9fe';
      case 'rejected': return '#fee2e2';
      case 'accepted': return '#d1fae5';
      default: return '#f3f4f6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'applied': return 'send';
      case 'interview': return 'people';
      case 'rejected': return 'close-circle';
      case 'accepted': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  const handleStatusUpdate = (newStatus: AppliedJob['status']) => {
    if (selectedJob) {
      updateStatusMutation.mutate(
        { id: selectedJob.id, status: newStatus },
        {
          onSuccess: () => {
            setShowStatusModal(false);
            setSelectedJob(null);
          }
        }
      );
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f9fafb'}}>
      <View style={{padding: 16}}>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 16}}>
          {appliedJobs.length} {appliedJobs.length === 1 ? 'Application' : 'Applications'}
        </Text>

        {appliedJobs.length === 0 ? (
          <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 60}}>
            <Text style={{fontSize: 48, marginBottom: 16}}>📭</Text>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#6b7280', marginBottom: 8}}>
              No applications yet
            </Text>
            <Text style={{fontSize: 14, color: '#9ca3af', textAlign: 'center'}}>
              Start applying to jobs and track them here
            </Text>
          </View>
        ) : (
          appliedJobs.map((job) => (
            <View
              key={job.id}
              style={{
                backgroundColor: '#ffffff',
                padding: 20,
                borderRadius: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}
            >
              <View style={{marginBottom: 12}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 6}}>
                  {job.title}
                </Text>
                <Text style={{fontSize: 15, color: '#374151', fontWeight: '500'}}>
                  🏢 {job.company}
                </Text>
              </View>

              <Text style={{fontSize: 14, color: '#6b7280', marginBottom: 12}}>
                📍 {job.location}
              </Text>

              {job.salary_from && job.salary_to && (
                <View style={{marginBottom: 12, backgroundColor: '#f0fdf4', padding: 10, borderRadius: 8}}>
                  <Text style={{fontSize: 14, fontWeight: 'bold', color: '#15803d'}}>
                    ${job.salary_from?.toLocaleString()} - ${job.salary_to?.toLocaleString()}
                  </Text>
                </View>
              )}

              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb'}}>
                <Text style={{fontSize: 13, color: '#9ca3af'}}>
                  Applied: {new Date(job.appliedDate).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedJob(job);
                    setShowStatusModal(true);
                  }}
                  style={{
                    backgroundColor: getStatusBgColor(job.status),
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Ionicons name={getStatusIcon(job.status)} size={14} color={getStatusColor(job.status)} style={{marginRight: 4}} />
                  <Text style={{
                    color: getStatusColor(job.status),
                    fontSize: 12,
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {job.status}
                  </Text>
                  <Ionicons name="chevron-down" size={12} color={getStatusColor(job.status)} style={{marginLeft: 4}} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Status Update Modal */}
      <Modal
        visible={showStatusModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end'
        }}>
          <View style={{
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            paddingBottom: 40
          }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#111827'}}>
                Update Status
              </Text>
              <TouchableOpacity onPress={() => setShowStatusModal(false)}>
                <Ionicons name="close" size={28} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {selectedJob && (
              <View style={{marginBottom: 24}}>
                <Text style={{fontSize: 16, color: '#6b7280', marginBottom: 4}}>
                  {selectedJob.title}
                </Text>
                <Text style={{fontSize: 14, color: '#9ca3af'}}>
                  {selectedJob.company}
                </Text>
              </View>
            )}

            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                activeOpacity={0.7}
                onPress={() => handleStatusUpdate(status)}
                style={{
                  backgroundColor: selectedJob?.status === status ? getStatusBgColor(status) : '#f9fafb',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: selectedJob?.status === status ? getStatusColor(status) : '#e5e7eb',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Ionicons 
                  name={getStatusIcon(status)} 
                  size={24} 
                  color={selectedJob?.status === status ? getStatusColor(status) : '#6b7280'} 
                  style={{marginRight: 12}} 
                />
                <Text style={{
                  fontSize: 16,
                  fontWeight: selectedJob?.status === status ? '600' : '500',
                  color: selectedJob?.status === status ? getStatusColor(status) : '#374151',
                  textTransform: 'capitalize',
                  flex: 1
                }}>
                  {status}
                </Text>
                {selectedJob?.status === status && (
                  <Ionicons name="checkmark-circle" size={24} color={getStatusColor(status)} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
