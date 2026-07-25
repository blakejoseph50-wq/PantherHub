import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { courses } from '../../data/pantherHubData';

const COLORS = {
  brown: '#4F2C1D',
  gold: '#FFB500',
  background: '#FFF9EE',
  card: '#FFFFFF',
  text: '#251A15',
  muted: '#74665F',
  lightGold: '#FFF0C2',
};

export default function ClassesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Classes</Text>
      <Text style={styles.subtitle}>Fall semester</Text>

      <View style={styles.semesterCard}>
        <View style={styles.semesterIcon}>
          <Ionicons
            name="school"
            size={27}
            color={COLORS.brown}
          />
        </View>

        <View>
          <Text style={styles.semesterLabel}>CURRENT SCHEDULE</Text>
          <Text style={styles.semesterTitle}>
            {courses.length} enrolled classes
          </Text>
        </View>
      </View>

      {courses.map((course) => (
        <Pressable
          key={course.id}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
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
          <View style={styles.topRow}>
            <View style={styles.courseHeading}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
            </View>

            <View style={styles.arrowContainer}>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={COLORS.brown}
              />
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="time-outline"
              size={18}
              color={COLORS.muted}
            />

            <Text style={styles.details}>
              {course.days} • {course.startTime}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={COLORS.muted}
            />

            <Text style={styles.details}>{course.location}</Text>
          </View>

          <View style={styles.professorRow}>
            <Ionicons
              name="person-outline"
              size={18}
              color={COLORS.muted}
            />

            <Text style={styles.details}>{course.professor}</Text>
          </View>
        </Pressable>
      ))}
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

  semesterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },

  semesterIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    marginRight: 14,
  },

  semesterLabel: {
    color: COLORS.brown,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  semesterTitle: {
    color: COLORS.brown,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 3,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.gold,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  courseHeading: {
    flex: 1,
    paddingRight: 10,
  },

  courseCode: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  courseName: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: '800',
    marginTop: 7,
  },

  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.lightGold,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  professorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  details: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 14,
    marginLeft: 8,
  },
});