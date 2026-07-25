import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getAssignmentsForCourse,
  getCourseById,
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

export default function ClassDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const courseId = Array.isArray(id) ? id[0] : id;
  const course = courseId
    ? getCourseById(courseId)
    : undefined;

  if (!course) {
    return (
      <View style={styles.center}>
        <View style={styles.notFoundIcon}>
          <Ionicons
            name="alert-circle-outline"
            size={44}
            color={COLORS.brown}
          />
        </View>

        <Text style={styles.notFound}>Class not found</Text>

        <Text style={styles.notFoundMessage}>
          The selected class could not be loaded.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const assignments = getAssignmentsForCourse(course.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.back,
          pressed && styles.pressed,
        ]}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.brown}
        />

        <Text style={styles.backText}>Classes</Text>
      </Pressable>

      <View style={styles.courseHeader}>
        <Text style={styles.code}>{course.code}</Text>
        <Text style={styles.title}>{course.name}</Text>

        <View style={styles.scheduleBadge}>
          <Ionicons
            name="time-outline"
            size={17}
            color={COLORS.brown}
          />

          <Text style={styles.scheduleBadgeText}>
            {course.startTime} – {course.endTime}
          </Text>
        </View>
      </View>

      <Text style={styles.section}>Class information</Text>

      <View style={styles.card}>
        <InformationRow
          icon="person-outline"
          label="Professor"
          value={course.professor}
        />

        <InformationRow
          icon="calendar-outline"
          label="Meeting days"
          value={course.days}
        />

        <InformationRow
          icon="time-outline"
          label="Meeting time"
          value={`${course.startTime} – ${course.endTime}`}
        />

        <InformationRow
          icon="location-outline"
          label="Location"
          value={course.location}
        />

        <InformationRow
          icon="mail-outline"
          label="Email"
          value={course.email}
          last
        />
      </View>

      <Text style={styles.section}>Assignments</Text>

      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <View
            key={assignment.id}
            style={styles.assignment}
          >
            <View style={styles.assignmentIcon}>
              <Ionicons
                name={
                  assignment.completed
                    ? 'checkmark-circle'
                    : 'document-text-outline'
                }
                size={24}
                color={COLORS.brown}
              />
            </View>

            <View style={styles.assignmentInformation}>
              <Text style={styles.assignmentTitle}>
                {assignment.title}
              </Text>

              <Text style={styles.assignmentDue}>
                {assignment.dueLabel}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.muted}
            />
          </View>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            No assignments are listed for this class.
          </Text>
        </View>
      )}

      <Text style={styles.section}>Announcement</Text>

      <View style={styles.announcementCard}>
        <View style={styles.announcementIcon}>
          <Ionicons
            name="megaphone-outline"
            size={24}
            color={COLORS.brown}
          />
        </View>

        <Text style={styles.announcementText}>
          {course.announcement}
        </Text>
      </View>

      <Text style={styles.section}>Course tools</Text>

      <View style={styles.toolRow}>
        <CourseTool
          icon="folder-open-outline"
          title="Resources"
        />

        <CourseTool
          icon="bar-chart-outline"
          title="Grades"
        />
      </View>
    </ScrollView>
  );
}

type InformationRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
};

function InformationRow({
  icon,
  label,
  value,
  last = false,
}: InformationRowProps) {
  return (
    <View
      style={[
        styles.informationRow,
        last && styles.lastInformationRow,
      ]}
    >
      <View style={styles.informationIcon}>
        <Ionicons
          name={icon}
          size={21}
          color={COLORS.brown}
        />
      </View>

      <View style={styles.informationText}>
        <Text style={styles.informationLabel}>
          {label}
        </Text>

        <Text style={styles.informationValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

type CourseToolProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
};

function CourseTool({
  icon,
  title,
}: CourseToolProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.toolCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.toolIcon}>
        <Ionicons
          name={icon}
          size={25}
          color={COLORS.brown}
        />
      </View>

      <Text style={styles.toolTitle}>{title}</Text>
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

  back: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 22,
  },

  backText: {
    marginLeft: 6,
    color: COLORS.brown,
    fontWeight: '700',
    fontSize: 16,
  },

  courseHeader: {
    backgroundColor: COLORS.gold,
    borderRadius: 20,
    padding: 22,
    marginBottom: 27,
  },

  code: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  title: {
    color: COLORS.brown,
    fontSize: 29,
    fontWeight: '900',
    marginTop: 8,
  },

  scheduleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginTop: 17,
  },

  scheduleBadgeText: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },

  section: {
    color: COLORS.brown,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 11,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 26,
  },

  informationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  lastInformationRow: {
    borderBottomWidth: 0,
  },

  informationIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.lightGold,
    marginRight: 13,
  },

  informationText: {
    flex: 1,
  },

  informationLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  informationValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 3,
  },

  assignment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 17,
    padding: 15,
    marginBottom: 11,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
  },

  assignmentIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: COLORS.lightGold,
    marginRight: 13,
  },

  assignmentInformation: {
    flex: 1,
  },

  assignmentTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '800',
  },

  assignmentDue: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 4,
  },

  announcementCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 17,
    marginBottom: 26,
  },

  announcementIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: COLORS.lightGold,
    marginRight: 13,
  },

  announcementText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
  },

  toolRow: {
    flexDirection: 'row',
    gap: 13,
  },

  toolCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    borderTopWidth: 4,
    borderTopColor: COLORS.gold,
  },

  toolIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: COLORS.lightGold,
    marginBottom: 10,
  },

  toolTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '800',
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 17,
    padding: 18,
    marginBottom: 22,
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 25,
  },

  notFoundIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightGold,
    marginBottom: 18,
  },

  notFound: {
    color: COLORS.brown,
    fontSize: 24,
    fontWeight: '800',
  },

  notFoundMessage: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 7,
    marginBottom: 20,
    textAlign: 'center',
  },

  button: {
    backgroundColor: COLORS.brown,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});