import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface AppliedJob {
  id: string;
  jobId: string;
  title: string;
  company: string;
  location: string;
  salary_from?: number;
  salary_to?: number;
  employment_type?: string;
  job_category?: string;
  appliedDate: string;
  status: 'applied' | 'interview' | 'rejected' | 'accepted';
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter: string;
}

interface AppliedJobsContextType {
  appliedJobs: AppliedJob[];
  addJobMutation: UseMutationResult<AppliedJob, Error, AppliedJob, unknown>;
  updateStatusMutation: UseMutationResult<
    { id: string; status: AppliedJob['status'] }, 
    Error, 
    { id: string; status: AppliedJob['status'] }, 
    unknown
  >;
  isJobApplied: (jobId: string) => boolean;
}

const AppliedJobsContext = createContext<AppliedJobsContextType | undefined>(undefined);

export function AppliedJobsProvider({ children }: { children: ReactNode }) {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const queryClient = useQueryClient();

  // Mutation for adding a new job application
  const addJobMutation = useMutation({
    mutationFn: async (job: AppliedJob) => {
      // In production, this would be: await fetch('/api/applications', { method: 'POST', body: JSON.stringify(job) })
      return job;
    },
    onSuccess: (newJob) => {
      setAppliedJobs(prev => [...prev, newJob]);
      // Invalidate and refetch if you have a server endpoint
      // queryClient.invalidateQueries({ queryKey: ['appliedJobs'] });
    },
    onError: (error) => {
      console.error('Failed to add application:', error);
    }
  });

  // Mutation for updating job status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: AppliedJob['status'] }) => {
      // In production: await fetch(`/api/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
      return { id, status };
    },
    onSuccess: ({ id, status }) => {
      setAppliedJobs(prev => 
        prev.map(job => job.id === id ? { ...job, status } : job)
      );
      // queryClient.invalidateQueries({ queryKey: ['appliedJobs'] });
    },
    onError: (error) => {
      console.error('Failed to update status:', error);
    }
  });

  const isJobApplied = (jobId: string) => {
    return appliedJobs.some(job => job.jobId === jobId);
  };

  return (
    <AppliedJobsContext.Provider value={{ 
      appliedJobs, 
      addJobMutation, 
      updateStatusMutation, 
      isJobApplied 
    }}>
      {children}
    </AppliedJobsContext.Provider>
  );
}

export function useAppliedJobs() {
  const context = useContext(AppliedJobsContext);
  if (context === undefined) {
    throw new Error('useAppliedJobs must be used within an AppliedJobsProvider');
  }
  return context;
}
