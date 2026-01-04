import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { router } from "expo-router"
import { useState, useMemo } from "react"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppliedJobs } from "../../hooks/useAppliedJobs"
import { getThemeColors } from "../../lib/theme"
import { useAppSelector } from "../../state/store"

export default function Home() {
    const mode = useAppSelector((s) => s.theme.mode)
    const palette = getThemeColors(mode)
    const [searchQuery, setSearchQuery] = useState("")
    
    const {data, isLoading, error} = useQuery({
        queryKey: ["job"],
        queryFn: () => fetch("https://jsonfakery.com/jobs").then(res => res.json()),
    })
    const { data: appliedJobs = [] } = useAppliedJobs()

    if(isLoading) return (
        <View style={[styles.centerContainer, { backgroundColor: palette.background }]}>
            <Text style={[styles.loadingText, { color: palette.mutedText }]}>Loading jobs...</Text>
        </View>
    )
    if(error) return (
        <View style={[styles.centerContainer, { backgroundColor: palette.background }]}>
            <Text style={styles.errorText}>Error: {(error as Error).message}</Text>
        </View>
    )

    const filteredJobs = useMemo(() => {
        if(!data) return []
        let jobs = [...data].sort(() => Math.random() - 0.5).slice(0, 10)
        
        // Filter by search query using regex for flexible matching
        if(searchQuery.trim()) {
            const query = searchQuery.trim()
            // Create regex pattern that matches any occurrence, case-insensitive
            const regex = new RegExp(query.split('').join('.*'), 'i')
            jobs = jobs.filter((job: any) => 
                job.title && regex.test(job.title)
            )
        }
        
        return jobs
    }, [data, searchQuery])

    const isJobApplied = (jobId: string) => {
        return appliedJobs.some(app => app.jobId === jobId)
    }

    return (
        <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
        <Text style={[styles.heading, { color: palette.heading }]}>Explore Jobs</Text>
        
        {/* Search Input */}
        <View style={[styles.searchContainer, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <Ionicons name="search-outline" size={20} color={palette.mutedText} />
            <TextInput
                style={[styles.searchInput, { color: palette.text }]}
                placeholder="Search by job title..."
                placeholderTextColor={palette.mutedText}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Ionicons name="close-circle" size={20} color={palette.mutedText} />
                </TouchableOpacity>
            )}
        </View>
        
        <FlatList 
            data={filteredJobs}
            keyExtractor={item => item.id}
            scrollEnabled={true}
            renderItem={({item}) => 
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push({
                    pathname: '/(tabs)/job-detail',
                    params: { job: JSON.stringify(item) }
                })}
                style={[styles.jobCard, { backgroundColor: palette.card, borderColor: palette.border }]}
            >
                <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.jobTitle, { color: palette.text }]}>{item.title}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.salary}>${item.salary_from?.toLocaleString()}</Text>
                        {isJobApplied(item.id) && (
                            <View style={[styles.appliedBadge, { backgroundColor: 'rgba(16, 185, 129, 0.12)' }]}>
                                <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                                <Text style={[styles.appliedText]}>Applied</Text>
                            </View>
                        )}
                    </View>
                </View>
                
                <Text style={[styles.company, { color: palette.mutedText }]}>{item.company}</Text>
                
                <View style={styles.detailsRow}>
                    <Text style={[styles.location, { color: palette.mutedText }]} numberOfLines={1}>📍 {item.location}</Text>
                    <Text style={[styles.type, { backgroundColor: 'rgba(37, 99, 235, 0.12)', color: palette.primary, borderColor: 'rgba(37, 99, 235, 0.25)', borderWidth: 1 }]} numberOfLines={1}>{item.employment_type}</Text>
                </View>
            </TouchableOpacity>
            }
            ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: palette.border }]} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Ionicons name="search-outline" size={48} color={palette.mutedText} />
                    <Text style={[styles.emptyText, { color: palette.mutedText }]}>No jobs found matching "{searchQuery}"</Text>
                </View>
            }
                />
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        paddingTop: 24
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb'
    },
    loadingText: {
        fontSize: 16,
        color: '#6b7280'
    },
    errorText: {
        fontSize: 16,
        color: '#dc2626'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 16,
        gap: 8
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 2
    },
    jobCard: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        marginBottom: 12
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
        gap: 8
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1
    },
    salary: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#10b981',
    },
    appliedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 4
    },
    appliedText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#10b981'
    },
    company: {
        fontSize: 14,
        marginBottom: 10
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    location: {
        fontSize: 13,
        color: '#4b5563'
    },
    type: {
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        fontWeight: '500',
        flexShrink: 1,
        maxWidth: '50%'
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e7eb'
    },
    listContent: {
        paddingBottom: 20
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40
    },
    emptyText: {
        fontSize: 16,
        marginTop: 12,
        textAlign: 'center'
    }
})