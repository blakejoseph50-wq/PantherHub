import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Alert,
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
  student,
} from '../../data/pantherHubData';

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
}

export default function HomeScreen() {
  const nextClass = courses[0];

  const upcomingAssignments = getUpcomingAssignments();
  const nextAssignment = upcomingAssignments[0];

  const assignmentCourse = nextAssignment
    ? getCourseForAssignment(nextAssignment.courseId)
    : undefined;

  const mealBalance = student.mealBalance.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const openNextClass = () => {
    if (!nextClass) {
      Alert.alert('PantherHub', 'No classes were found.');
      return;
    }

    router.push({
      pathname: '/class/[id]',
      params: {
        id: nextClass.id,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.logoButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.logo}>🐾 PantherHub</Text>

          <View style={styles.profileIcon}>
            <Ionicons name="person" size={20} color="#FFFFFF" />
          </View>
        </Pressable>

        <Text style={styles.greeting}>
          {getGreeting()}, {student.firstName}
        </Text>

        <Text style={styles.subtitle}>
          Here is what is happening today.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Next class</Text>

      {nextClass ? (
        <View style={styles.largeCard}>
          <View style={styles.cardTopRow}>
            <View>
              <Text style={styles.cardLabel}>{nextClass.code}</Text>
              <Text style={styles.cardTitle}>{nextClass.name}</Text>
            </View>

            <View style={styles.iconContainer}>
              <Ionicons name="school-outline" size={24} color="#4B2E83" />
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={19} color="#666666" />

            <Text style={styles.detailText}>
              {nextClass.days} • {nextClass.startTime}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={19} color="#666666" />

            <Text style={styles.detailText}>{nextClass.location}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={openNextClass}
          >
            <Text style={styles.primaryButtonText}>View class</Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No upcoming classes.</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Upcoming assignment</Text>

      {nextAssignment ? (
        <Pressable
          style={({ pressed }) => [
            styles.assignmentCard,
            pressed && styles.pressed,
          ]}
          onPress={() => {
            if (assignmentCourse) {
              router.push({
                pathname: '/class/[id]',
                params: {
                  id: assignmentCourse.id,
                },
              });
            }
          }}
        >
          <View style={styles.assignmentIcon}>
            <Ionicons
              name="document-text-outline"
              size={25}
              color="#4B2E83"
            />
          </View>

          <View style={styles.assignmentInformation}>
            <Text style={styles.assignmentTitle}>
              {nextAssignment.title}
            </Text>

            <Text style={styles.assignmentCourse}>
              {assignmentCourse?.code ?? 'Course'}
            </Text>

            <Text style={styles.assignmentDue}>
              {nextAssignment.dueLabel}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#999999" />
        </Pressable>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            You have no upcoming assignments.
          </Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Quick access</Text>

      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.pressed,
          ]}
          onPress={() =>
            Alert.alert(
              'Meal Plan',
              `Your current demonstration balance is ${mealBalance}.`
            )
          }
        >
          <View style={styles.smallIcon}>
            <Ionicons name="restaurant-outline" size={25} color="#4B2E83" />
          </View>

          <Text style={styles.smallCardTitle}>Meal Plan</Text>
          <Text style={styles.smallCardValue}>{mealBalance}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/calendar')}
        >
          <View style={styles.smallIcon}>
            <Ionicons name="calendar-outline" size={25} color="#4B2E83" />
          </View>

          <Text style={styles.smallCardTitle}>Calendar</Text>
          <Text style={styles.smallCardValue}>
            {upcomingAssignments.length} assignments
          </Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/map')}
        >
          <View style={styles.smallIcon}>
            <Ionicons name="map-outline" size={25} color="#4B2E83" />
          </View>

          <Text style={styles.smallCardTitle}>Campus Map</Text>
          <Text style={styles.smallCardValue}>Find a building</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.smallIcon}>
            <Ionicons name="card-outline" size={25} color="#4B2E83" />
          </View>

          <Text style={styles.smallCardTitle}>Student ID</Text>
          <Text style={styles.smallCardValue}>
            {student.studentId}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.demoNotice}>
        PantherHub is an unofficial student project using demonstration data.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 25,
  },

  logoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  logo: {
    color: '#4B2E83',
    fontSize: 28,
    fontWeight: '800',
  },

  profileIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#4B2E83',
  },

  greeting: {
    color: '#171717',
    fontSize: 25,
    fontWeight: '800',
  },

  subtitle: {
    color: '#666666',
    fontSize: 16,
    marginTop: 6,
  },

  sectionTitle: {
    color: '#171717',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  largeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  cardLabel: {
    color: '#4B2E83',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  cardTitle: {
    color: '#171717',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 7,
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1EBFA',
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },

  detailText: {
    flex: 1,
    color: '#666666',
    fontSize: 15,
    marginLeft: 9,
  },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B2E83',
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 10,
    gap: 8,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 16,
    marginBottom: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 7,
    elevation: 2,
  },

  assignmentIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1EBFA',
    marginRight: 13,
  },

  assignmentInformation: {
    flex: 1,
  },

  assignmentTitle: {
    color: '#252525',
    fontSize: 16,
    fontWeight: '800',
  },

  assignmentCourse: {
    color: '#4B2E83',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },

  assignmentDue: {
    color: '#777777',
    fontSize: 13,
    marginTop: 3,
  },

  row: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },

  smallCard: {
    flex: 1,
    minHeight: 145,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 7,
    elevation: 2,
  },

  smallIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#F1EBFA',
    marginBottom: 12,
  },

  smallCardTitle: {
    color: '#252525',
    fontSize: 16,
    fontWeight: '800',
  },

  smallCardValue: {
    color: '#666666',
    fontSize: 13,
    marginTop: 5,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
  },

  emptyText: {
    color: '#777777',
    fontSize: 15,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  demoNotice: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 15,
  },
});