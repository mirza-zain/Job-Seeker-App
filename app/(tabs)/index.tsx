import { useQuery } from "@tanstack/react-query"
import { router } from "expo-router"
import { useMemo } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
    const {data, isLoading, error} = useQuery({
        queryKey: ["job"],
        queryFn: () => fetch("https://jsonfakery.com/jobs").then(res => res.json()),
    })

    if(isLoading) return (
        <View style={styles.centerContainer}>
            <Text style={styles.loadingText}>Loading jobs...</Text>
        </View>
    )
    if(error) return (
        <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Error: {(error as Error).message}</Text>
        </View>
    )

    const filteredJobs = useMemo(() => {
        if(!data) return []
        let jobs = [...data].sort(() => Math.random() - 0.5).slice(0, 10)
        return jobs
    }, [data])

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
        <Text style={styles.heading}>Explore Jobs</Text>
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
                style={styles.jobCard}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.salary}>${item.salary_from?.toLocaleString()}</Text>
                </View>
                
                <Text style={styles.company}>{item.company}</Text>
                
                <View style={styles.detailsRow}>
                    <Text style={styles.location} numberOfLines={1}>📍 {item.location}</Text>
                    <Text style={styles.type} numberOfLines={1}>{item.employment_type}</Text>
                </View>
            </TouchableOpacity>
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
                />
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f9fafb',
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
        color: '#111827',
        marginBottom: 16
    },
    jobCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 12
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        flex: 1
    },
    salary: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#10b981',
        marginLeft: 8
    },
    company: {
        fontSize: 14,
        color: '#6b7280',
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
        backgroundColor: '#dbeafe',
        color: '#1e40af',
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
