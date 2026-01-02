import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isRemoteOnly, setIsRemoteOnly] = useState(false)
    const [salaryRange, setSalaryRange] = useState<'all' | '0-50k' | '50k-100k' | '100k+'>('all')

    const {data, isLoading, error} = useQuery({
        queryKey: ['jobs'],
        queryFn: () => fetch("https://jsonfakery.com/jobs").then(res => res.json())
    })

    const filteredJobs = useMemo(() => {
        if(!data) return [];
        let jobs = [...data].sort(() => Math.random() - 0.5).slice(0, 10)
        
        // Filter by search query
        if(searchQuery) {
            jobs = jobs.filter(job => 
                job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        
        // Filter by remote
        if(isRemoteOnly) {
            jobs = jobs.filter(job => 
                job.location?.toLowerCase().includes('remote') ||
                job.employment_type?.toLowerCase().includes('remote')
            )
        }
        
        // Filter by salary range
        if(salaryRange !== 'all') {
            jobs = jobs.filter(job => {
                const salary = job.salary_from || 0
                if(salaryRange === '0-50k') return salary < 50000
                if(salaryRange === '50k-100k') return salary >= 50000 && salary < 100000
                if(salaryRange === '100k+') return salary >= 100000
                return true
            })
        }
        
        return jobs
    }, [data, searchQuery, isRemoteOnly, salaryRange])

    if (isLoading) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb'}}>
            <Text style={{fontSize: 18, color: '#4b5563'}}>Loading jobs...</Text>
        </View>
    )
    
    if (error) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb'}}>
            <Text style={{fontSize: 18, color: '#dc2626'}}>Error: {error.message}</Text>
        </View>
    )

  return (
    <View style={{flex: 1, backgroundColor: '#f9fafb'}}>
        {/* Search Bar */}
        <View style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb'
        }}>
            <TextInput
                style={{
                    backgroundColor: '#f3f4f6',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 12,
                    fontSize: 16,
                    color: '#111827',
                    borderWidth: 1,
                    borderColor: '#e5e7eb'
                }}
                placeholder="Search jobs, companies, or locations..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>

        {/* Filter Options */}
        <View style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb'
        }}>
            {/* Remote Filter */}
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setIsRemoteOnly(!isRemoteOnly)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                    backgroundColor: isRemoteOnly ? '#dbeafe' : '#f9fafb',
                    padding: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: isRemoteOnly ? '#3b82f6' : '#e5e7eb'
                }}
            >
                <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    backgroundColor: isRemoteOnly ? '#3b82f6' : '#ffffff',
                    borderWidth: 2,
                    borderColor: isRemoteOnly ? '#3b82f6' : '#d1d5db',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                }}>
                    {isRemoteOnly && <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>✓</Text>}
                </View>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: isRemoteOnly ? '#1e40af' : '#374151'
                }}>🏠 Remote Only</Text>
            </TouchableOpacity>

            {/* Salary Range Filter */}
            <View>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8}}>
                    💰 Salary Range
                </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                    {(['all', '0-50k', '50k-100k', '100k+'] as const).map((range) => (
                        <TouchableOpacity
                            key={range}
                            activeOpacity={0.7}
                            onPress={() => setSalaryRange(range)}
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 20,
                                backgroundColor: salaryRange === range ? '#10b981' : '#f3f4f6',
                                borderWidth: 1,
                                borderColor: salaryRange === range ? '#10b981' : '#e5e7eb'
                            }}
                        >
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: salaryRange === range ? '#ffffff' : '#6b7280'
                            }}>
                                {range === 'all' ? 'All' : range === '0-50k' ? '$0-$50k' : range === '50k-100k' ? '$50k-$100k' : '$100k+'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>

        <FlatList 
            data={filteredJobs}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => router.push({
                        pathname: '/job-detail',
                        params: { job: JSON.stringify(item) }
                    })}
                    style={{
                        backgroundColor: '#ffffff',
                        marginHorizontal: 16,
                        padding: 20,
                        borderRadius: 16,
                        marginVertical: 8,
                        borderWidth: 1,
                        borderColor: '#e5e7eb'
                    }}
                >
                    {/* Header Section - Title & Company */}
                    <View style={{marginBottom: 16}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 8}}>
                            {item.title}
                        </Text>
                        <Text style={{fontSize: 16, color: '#374151', fontWeight: '500'}}>
                            🏢 {item.company}
                        </Text>
                    </View>
                    
                    {/* Location Section */}
                    <View style={{marginBottom: 16, backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8}}>
                        <Text style={{fontSize: 14, color: '#4b5563'}}>
                            📍 {item.location}
                        </Text>
                    </View>
                    
                    {/* Salary Section */}
                    <View style={{marginBottom: 16, backgroundColor: '#f0fdf4', padding: 12, borderRadius: 8}}>
                        <Text style={{fontSize: 12, color: '#6b7280', marginBottom: 4}}>Salary Range</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#15803d'}}>
                            ${item.salary_from?.toLocaleString()} - ${item.salary_to?.toLocaleString()}
                        </Text>
                    </View>
                    
                    {/* Job Details Row - Badges */}
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb'}}>
                        {/* Employment Type Badge */}
                        <View style={{backgroundColor: '#dbeafe', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20}}>
                            <Text style={{color: '#1e40af', fontSize: 12, fontWeight: '600'}}>
                                💼 {item.employment_type}
                            </Text>
                        </View>
                        
                        {/* Job Category Badge */}
                        <View style={{backgroundColor: '#ede9fe', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20}}>
                            <Text style={{color: '#6b21a8', fontSize: 12, fontWeight: '600'}}>
                                💻 {item.job_category}
                            </Text>
                        </View>
                        
                        {/* Number of Openings */}
                        <View style={{backgroundColor: '#fed7aa', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20}}>
                            <Text style={{color: '#92400e', fontSize: 12, fontWeight: '600'}}>
                                👥 {item.number_of_opening} {item.number_of_opening === 1 ? 'opening' : 'openings'}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{height: 8}} />}
            contentContainerStyle={{paddingVertical: 16, paddingBottom: 80}}
            scrollEnabled={true}
        />
    </View>
  )
}