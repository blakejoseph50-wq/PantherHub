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

export default function ClassDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const course = getCourseById(id as string);

  if (!course) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Class not found</Text>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const assignments = getAssignmentsForCourse(course.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={styles.back}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#4B2E83"
        />

        <Text style={styles.backText}>Classes</Text>
      </Pressable>

      <Text style={styles.code}>{course.code}</Text>

      <Text style={styles.title}>{course.name}</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Professor</Text>
        <Text>{course.professor}</Text>

        <Text style={styles.heading}>Meeting Time</Text>
        <Text>
          {course.days} • {course.startTime}-{course.endTime}
        </Text>

        <Text style={styles.heading}>Location</Text>
        <Text>{course.location}</Text>

        <Text style={styles.heading}>Email</Text>
        <Text>{course.email}</Text>
      </View>

      <Text style={styles.section}>Assignments</Text>

      {assignments.map((assignment) => (
        <View
          key={assignment.id}
          style={styles.assignment}
        >
          <Text style={styles.assignmentTitle}>
            {assignment.title}
          </Text>

          <Text>{assignment.dueLabel}</Text>
        </View>
      ))}

      <Text style={styles.section}>Announcement</Text>

      <View style={styles.card}>
        <Text>{course.announcement}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F4F6F8',
    flexGrow: 1,
  },

  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backText: {
    marginLeft: 6,
    color: '#4B2E83',
    fontWeight: '700',
    fontSize: 16,
  },

  code: {
    color: '#4B2E83',
    fontWeight: '700',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 25,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    marginBottom: 22,
  },

  heading: {
    color: '#4B2E83',
    marginTop: 12,
    fontWeight: '700',
  },

  section: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },

  assignment: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    marginBottom: 10,
  },

  assignmentTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFound: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#4B2E83',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});