import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const courseData = {
  csc270: {
    code: 'CSC 270',
    name: 'Computer Science',
    professor: 'Professor John Smith',
    email: 'jsmith@example.edu',
    time: 'Monday and Wednesday • 2:00 PM – 3:15 PM',
    location: 'Science Building, Room 204',
    assignments: [
      {
        title: 'Programming Assignment 1',
        due: 'Due September 12',
      },
      {
        title: 'Chapter 3 Quiz',
        due: 'Due September 18',
      },
    ],
    announcement:
      'Remember to bring your laptop to the next class meeting.',
  },

  cyb210: {
    code: 'CYB 210',
    name: 'Introduction to Cybersecurity',
    professor: 'Professor Sarah Johnson',
    email: 'sjohnson@example.edu',
    time: 'Tuesday and Thursday • 11:00 AM – 12:15 PM',
    location: 'Nexus Building, Room 126',
    assignments: [
      {
        title: 'Network Security Reflection',
        due: 'Due September 14',
      },
      {
        title: 'Threat Analysis Worksheet',
        due: 'Due September 21',
      },
    ],
    announcement:
      'The cybersecurity lab will take place during Thursday’s class.',
  },

  mat141: {
    code: 'MAT 141',
    name: 'Calculus I',
    professor: 'Professor Michael Davis',
    email: 'mdavis@example.edu',
    time: 'Monday and Wednesday • 9:00 AM – 10:15 AM',
    location: 'Alumnae Hall, Room 114',
    assignments: [
      {
        title: 'Limits Homework',
        due: 'Due September 13',
      },
      {
        title: 'Derivatives Practice',
        due: 'Due September 20',
      },
    ],
    announcement:
      'Office hours will be held Tuesday afternoon this week.',
  },
};

type CourseId = keyof typeof courseData;

export default function ClassDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const course = courseData[id as CourseId];

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Class not found</Text>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.headerBackButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#4B2E83" />
        <Text style={styles.headerBackText}>Classes</Text>
      </Pressable>

      <Text style={styles.courseCode}>{course.code}</Text>
      <Text style={styles.title}>{course.name}</Text>

      <View style={styles.infoCard}>
        <InfoRow
          icon="person-outline"
          label="Professor"
          value={course.professor}
        />

        <InfoRow
          icon="time-outline"
          label="Meeting time"
          value={course.time}
        />

        <InfoRow
          icon="location-outline"
          label="Location"
          value={course.location}
        />

        <InfoRow
          icon="mail-outline"
          label="Email"
          value={course.email}
          last
        />
      </View>

      <Text style={styles.sectionTitle}>Assignments</Text>

      {course.assignments.map((assignment) => (
        <Pressable
          key={assignment.title}
          style={({ pressed }) => [
            styles.assignmentCard,
            pressed && styles.cardPressed,
          ]}
        >
          <View style={styles.assignmentIcon}>
            <Ionicons name="document-text-outline" size={22} color="#4B2E83" />
          </View>

          <View style={styles.assignmentTextContainer}>
            <Text style={styles.assignmentTitle}>{assignment.title}</Text>
            <Text style={styles.assignmentDue}>{assignment.due}</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </Pressable>
      ))}

      <Text style={styles.sectionTitle}>Latest announcement</Text>

      <View style={styles.announcementCard}>
        <Ionicons
          name="megaphone-outline"
          size={25}
          color="#4B2E83"
          style={styles.announcementIcon}
        />

        <Text style={styles.announcementText}>{course.announcement}</Text>
      </View>

      <Text style={styles.sectionTitle}>Course tools</Text>

      <View style={styles.toolsRow}>
        <CourseTool icon="folder-outline" title="Resources" />
        <CourseTool icon="bar-chart-outline" title="Grades" />
      </View>
    </ScrollView>
  );
}

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
};

function InfoRow({ icon, label, value, last = false }: InfoRowProps) {
  return (
    <View style={[styles.infoRow, last && styles.lastInfoRow]}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={22} color="#4B2E83" />
      </View>

      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

type CourseToolProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
};

function CourseTool({ icon, title }: CourseToolProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.toolCard,
        pressed && styles.cardPressed,
      ]}
    >
      <Ionicons name={icon} size={27} color="#4B2E83" />
      <Text style={styles.toolTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 50,
  },
  headerBackButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerBackText: {
    color: '#4B2E83',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 7,
  },
  courseCode: {
    color: '#4B2E83',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#171717',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 7,
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 28,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  lastInfoRow: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1EBFA',
    marginRight: 14,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: '#252525',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#171717',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 13,
  },
  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  assignmentIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: '#F1EBFA',
    marginRight: 13,
  },
  assignmentTextContainer: {
    flex: 1,
  },
  assignmentTitle: {
    color: '#252525',
    fontSize: 16,
    fontWeight: '700',
  },
  assignmentDue: {
    color: '#777777',
    fontSize: 14,
    marginTop: 4,
  },
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 28,
  },
  announcementIcon: {
    marginRight: 13,
    marginTop: 2,
  },
  announcementText: {
    flex: 1,
    color: '#444444',
    fontSize: 15,
    lineHeight: 22,
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  toolCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 115,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  toolTitle: {
    color: '#252525',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 9,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F6F8',
    padding: 20,
  },
  errorTitle: {
    color: '#171717',
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4B2E83',
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 13,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});