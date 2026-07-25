import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    assignments,
    getCourseForAssignment,
} from '../../data/pantherHubData';

const STORAGE_KEY = 'pantherhub-completed-assignments';

const COLORS = {
  brown: '#4F2C1D',
  gold: '#FFB500',
  background: '#FFF9EE',
  card: '#FFFFFF',
  text: '#251A15',
  muted: '#74665F',
  lightGold: '#FFF0C2',
  border: '#E9DED7',
  success: '#3E7C45',
};

type FilterType = 'all' | 'upcoming' | 'completed';

export default function AssignmentsScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>('all');

  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCompletedAssignments();
  }, []);

  async function loadCompletedAssignments() {
    try {
      const savedAssignments =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (savedAssignments) {
        const parsedAssignments: string[] =
          JSON.parse(savedAssignments);

        setCompletedIds(parsedAssignments);
      } else {
        const defaultCompletedIds = assignments
          .filter((assignment) => assignment.completed)
          .map((assignment) => assignment.id);

        setCompletedIds(defaultCompletedIds);
      }
    } catch (error) {
      console.error(
        'Unable to load completed assignments:',
        error
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCompletedAssignments(ids: string[]) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(ids)
      );
    } catch (error) {
      console.error(
        'Unable to save completed assignments:',
        error
      );
    }
  }

  function toggleAssignment(assignmentId: string) {
    setCompletedIds((currentIds) => {
      const updatedIds = currentIds.includes(assignmentId)
        ? currentIds.filter((id) => id !== assignmentId)
        : [...currentIds, assignmentId];

      saveCompletedAssignments(updatedIds);

      return updatedIds;
    });
  }

  const displayedAssignments = useMemo(() => {
    const sortedAssignments = [...assignments].sort(
      (firstAssignment, secondAssignment) =>
        new Date(firstAssignment.dueDate).getTime() -
        new Date(secondAssignment.dueDate).getTime()
    );

    if (selectedFilter === 'completed') {
      return sortedAssignments.filter((assignment) =>
        completedIds.includes(assignment.id)
      );
    }

    if (selectedFilter === 'upcoming') {
      return sortedAssignments.filter(
        (assignment) =>
          !completedIds.includes(assignment.id)
      );
    }

    return sortedAssignments;
  }, [completedIds, selectedFilter]);

  const completedCount = completedIds.length;
  const upcomingCount = assignments.length - completedCount;

  const progressPercentage =
    assignments.length === 0
      ? 0
      : Math.round(
          (completedCount / assignments.length) * 100
        );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={COLORS.brown}
        />

        <Text style={styles.loadingText}>
          Loading assignments...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.pressed,
        ]}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.brown}
        />

        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text style={styles.title}>Assignments</Text>

      <Text style={styles.subtitle}>
        View and manage your coursework
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryIcon}>
          <Ionicons
            name="document-text"
            size={29}
            color={COLORS.brown}
          />
        </View>

        <View style={styles.summaryInformation}>
          <Text style={styles.summaryLabel}>
            CURRENT WORKLOAD
          </Text>

          <Text style={styles.summaryTitle}>
            {upcomingCount}{' '}
            {upcomingCount === 1
              ? 'assignment remaining'
              : 'assignments remaining'}
          </Text>
        </View>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressTopRow}>
          <Text style={styles.progressTitle}>
            Semester progress
          </Text>

          <Text style={styles.progressCount}>
            {completedCount}/{assignments.length}
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {progressPercentage}% completed
        </Text>
      </View>

      <View style={styles.filterRow}>
        <FilterButton
          label="All"
          selected={selectedFilter === 'all'}
          onPress={() => setSelectedFilter('all')}
        />

        <FilterButton
          label="Upcoming"
          selected={selectedFilter === 'upcoming'}
          onPress={() => setSelectedFilter('upcoming')}
        />

        <FilterButton
          label="Completed"
          selected={selectedFilter === 'completed'}
          onPress={() => setSelectedFilter('completed')}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedFilter === 'all'
            ? 'All assignments'
            : selectedFilter === 'upcoming'
              ? 'Upcoming assignments'
              : 'Completed assignments'}
        </Text>

        <Text style={styles.resultCount}>
          {displayedAssignments.length}
        </Text>
      </View>

      {displayedAssignments.map((assignment) => {
        const course = getCourseForAssignment(
          assignment.courseId
        );

        const completed = completedIds.includes(
          assignment.id
        );

        const dueDate = new Date(assignment.dueDate);

        return (
          <View
            key={assignment.id}
            style={[
              styles.assignmentCard,
              completed && styles.completedCard,
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.checkButton,
                completed && styles.completedCheckButton,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                toggleAssignment(assignment.id)
              }
            >
              <Ionicons
                name={
                  completed
                    ? 'checkmark'
                    : 'ellipse-outline'
                }
                size={24}
                color={
                  completed
                    ? '#FFFFFF'
                    : COLORS.brown
                }
              />
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.assignmentInformation,
                pressed && styles.pressed,
              ]}
              onPress={() => {
                if (!course) {
                  return;
                }

                router.push({
                  pathname: '/class/[id]',
                  params: {
                    id: course.id,
                  },
                });
              }}
            >
              <Text
                style={[
                  styles.assignmentTitle,
                  completed &&
                    styles.completedAssignmentTitle,
                ]}
              >
                {assignment.title}
              </Text>

              <Text style={styles.courseCode}>
                {course?.code ?? 'Course'}
              </Text>

              <View style={styles.assignmentBottomRow}>
                <View style={styles.dateBadge}>
                  <Ionicons
                    name="calendar-outline"
                    size={15}
                    color={COLORS.brown}
                  />

                  <Text style={styles.dateText}>
                    {dueDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.statusText,
                    completed &&
                      styles.completedStatusText,
                  ]}
                >
                  {completed ? 'Completed' : 'Upcoming'}
                </Text>
              </View>
            </Pressable>

            <Ionicons
              name="chevron-forward"
              size={21}
              color={COLORS.muted}
            />
          </View>
        );
      })}

      {displayedAssignments.length === 0 && (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name={
                selectedFilter === 'completed'
                  ? 'checkmark-circle-outline'
                  : 'document-text-outline'
              }
              size={34}
              color={COLORS.brown}
            />
          </View>

          <Text style={styles.emptyTitle}>
            No assignments found
          </Text>

          <Text style={styles.emptyText}>
            There are no assignments in this category.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

type FilterButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function FilterButton({
  label,
  selected,
  onPress,
}: FilterButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.filterButton,
        selected && styles.selectedFilterButton,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterButtonText,
          selected && styles.selectedFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 45,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  loadingText: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 12,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  backText: {
    color: COLORS.brown,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 6,
  },

  title: {
    color: COLORS.brown,
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 24,
  },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  summaryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 14,
  },

  summaryInformation: {
    flex: 1,
  },

  summaryLabel: {
    color: COLORS.brown,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },

  summaryTitle: {
    color: COLORS.brown,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 4,
  },

  progressCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
  },

  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },

  progressCount: {
    color: COLORS.brown,
    fontSize: 15,
    fontWeight: '800',
  },

  progressBackground: {
    height: 10,
    backgroundColor: COLORS.lightGold,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.brown,
    borderRadius: 5,
  },

  progressText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 9,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 24,
  },

  filterButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 11,
  },

  selectedFilterButton: {
    backgroundColor: COLORS.brown,
    borderColor: COLORS.brown,
  },

  filterButtonText: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '700',
  },

  selectedFilterButtonText: {
    color: '#FFFFFF',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    color: COLORS.brown,
    fontSize: 20,
    fontWeight: '800',
  },

  resultCount: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '700',
  },

  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 15,
    marginBottom: 13,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.gold,
  },

  completedCard: {
    opacity: 0.75,
    borderLeftColor: COLORS.success,
  },

  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: COLORS.lightGold,
    marginRight: 13,
  },

  completedCheckButton: {
    backgroundColor: COLORS.success,
  },

  assignmentInformation: {
    flex: 1,
  },

  assignmentTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },

  completedAssignmentTitle: {
    color: COLORS.muted,
    textDecorationLine: 'line-through',
  },

  courseCode: {
    color: COLORS.brown,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },

  assignmentBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },

  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGold,
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  dateText: {
    color: COLORS.brown,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },

  statusText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 10,
  },

  completedStatusText: {
    color: COLORS.success,
  },

  emptyCard: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 28,
  },

  emptyIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: COLORS.lightGold,
    marginBottom: 14,
  },

  emptyTitle: {
    color: COLORS.brown,
    fontSize: 19,
    fontWeight: '800',
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 7,
    textAlign: 'center',
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});