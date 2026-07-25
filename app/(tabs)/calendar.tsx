import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  courses,
  getCourseForAssignment,
  getUpcomingAssignments,
} from '../../data/pantherHubData';

const COLORS = {
  brown: '#4F2C1D',
  gold: '#FFB500',
  background: '#FFF9EE',
  card: '#FFFFFF',
  text: '#251A15',
  muted: '#74665F',
  lightGold: '#FFF0C2',
  border: '#E9DED7',
};

export default function CalendarScreen() {
  const upcomingAssignments = getUpcomingAssignments();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      <Text style={styles.subtitle}>
        Classes and upcoming assignments
      </Text>

      <View style={styles.dateCard}>
        <View style={styles.dateIcon}>
          <Ionicons
            name="calendar"
            size={28}
            color={COLORS.brown}
          />
        </View>

        <View>
          <Text style={styles.dateLabel}>CURRENT SEMESTER</Text>
          <Text style={styles.dateTitle}>Fall 2026</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Weekly classes</Text>

      {courses.map((course) => (
        <Pressable
          key={course.id}
          style={({ pressed }) => [
            styles.classCard,
            pressed && styles.pressed,
          ]}
          onPress={() =>
            router.push({
              pathname: '/class/[id]',
              params: {
                id: course.id,
              },
            })
          }
        >
          <View style={styles.classTime}>
            <Text style={styles.classStartTime}>
              {course.startTime}
            </Text>

            <Text style={styles.classDays}>{course.days}</Text>
          </View>

          <View style={styles.classDivider} />

          <View style={styles.classInformation}>
            <Text style={styles.courseCode}>{course.code}</Text>
            <Text style={styles.courseName}>{course.name}</Text>

            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={16}
                color={COLORS.muted}
              />

              <Text style={styles.locationText}>
                {course.location}
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={21}
            color={COLORS.brown}
          />
        </Pressable>
      ))}

      <Text style={styles.sectionTitle}>
        Upcoming assignments
      </Text>

      {upcomingAssignments.map((assignment) => {
        const course = getCourseForAssignment(
          assignment.courseId
        );

        const dueDate = new Date(assignment.dueDate);

        return (
          <Pressable
            key={assignment.id}
            style={({ pressed }) => [
              styles.assignmentCard,
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
            <View style={styles.assignmentDate}>
              <Text style={styles.assignmentMonth}>
                {dueDate
                  .toLocaleDateString('en-US', {
                    month: 'short',
                  })
                  .toUpperCase()}
              </Text>

              <Text style={styles.assignmentDay}>
                {dueDate.getDate()}
              </Text>
            </View>

            <View style={styles.assignmentInformation}>
              <Text style={styles.assignmentTitle}>
                {assignment.title}
              </Text>

              <Text style={styles.assignmentCourse}>
                {course?.code ?? 'Course'}
              </Text>

              <Text style={styles.assignmentDue}>
                {assignment.dueLabel}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color={COLORS.brown}
            />
          </Pressable>
        );
      })}

      {upcomingAssignments.length === 0 && (
        <View style={styles.emptyCard}>
          <Ionicons
            name="checkmark-circle-outline"
            size={30}
            color={COLORS.brown}
          />

          <Text style={styles.emptyText}>
            You have no upcoming assignments.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 45,
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

  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
  },

  dateIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 51,
    height: 51,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginRight: 14,
  },

  dateLabel: {
    color: COLORS.brown,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  dateTitle: {
    color: COLORS.brown,
    fontSize: 21,
    fontWeight: '900',
    marginTop: 3,
  },

  sectionTitle: {
    color: COLORS.brown,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 3,
  },

  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 13,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.gold,
  },

  classTime: {
    width: 89,
  },

  classStartTime: {
    color: COLORS.brown,
    fontSize: 15,
    fontWeight: '800',
  },

  classDays: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
  },

  classDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: COLORS.border,
    marginHorizontal: 13,
  },

  classInformation: {
    flex: 1,
  },

  courseCode: {
    color: COLORS.brown,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  courseName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 3,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  locationText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 12,
    marginLeft: 4,
  },

  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 15,
    marginBottom: 13,
  },

  assignmentDate: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 62,
    borderRadius: 14,
    backgroundColor: COLORS.lightGold,
    marginRight: 13,
  },

  assignmentMonth: {
    color: COLORS.brown,
    fontSize: 10,
    fontWeight: '900',
  },

  assignmentDay: {
    color: COLORS.brown,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 1,
  },

  assignmentInformation: {
    flex: 1,
  },

  assignmentTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '800',
  },

  assignmentCourse: {
    color: COLORS.brown,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  assignmentDue: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },

  emptyCard: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 24,
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 10,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});