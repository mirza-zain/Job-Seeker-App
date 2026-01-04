import { Ionicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { router } from "expo-router"
import { useMemo } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppliedJobs } from "../../hooks/useAppliedJobs"
import { getThemeColors } from "../../lib/theme"
import { useAppSelector } from "../../state/store"

export default function Home() {
    const mode = useAppSelector((s) => s.theme.mode)
    const palette = getThemeColors(mode)
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
        return jobs
    }, [data])

    const isJobApplied = (jobId: string) => {
        return appliedJobs.some(app => app.jobId === jobId)
    }

    return (
        <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
        <Text style={[styles.heading, { color: palette.heading }]}>Explore Jobs</Text>
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
    }
})
