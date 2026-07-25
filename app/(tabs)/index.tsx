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

const COLORS = {
  brown: '#4F2C1D',
  gold: '#FFB500',
  background: '#FFF9EE',
  card: '#FFFFFF',
  text: '#251A15',
  muted: '#74665F',
  lightGold: '#FFF0C2',
};

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

  function openNextClass() {
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
  }

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
            <View style={styles.cardTitleArea}>
              <Text style={styles.cardLabel}>{nextClass.code}</Text>
              <Text style={styles.cardTitle}>{nextClass.name}</Text>
            </View>

            <View style={styles.iconContainer}>
              <Ionicons
                name="school-outline"
                size={24}
                color={COLORS.brown}
              />
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="time-outline"
              size={19}
              color={COLORS.muted}
            />

            <Text style={styles.detailText}>
              {nextClass.days} • {nextClass.startTime}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="location-outline"
              size={19}
              color={COLORS.muted}
            />

            <Text style={styles.detailText}>
              {nextClass.location}
            </Text>
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

      <Text style={styles.sectionTitle}>
        Upcoming assignment
      </Text>

      {nextAssignment ? (
        <Pressable
          style={({ pressed }) => [
            styles.assignmentCard,
            pressed && styles.pressed,
          ]}
          onPress={() => {
            if (!assignmentCourse) {
              return;
            }

            router.push({
              pathname: '/class/[id]',
              params: {
                id: assignmentCourse.id,
              },
            });
          }}
        >
          <View style={styles.assignmentIcon}>
            <Ionicons
              name="document-text-outline"
              size={25}
              color={COLORS.brown}
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

          <Ionicons
            name="chevron-forward"
            size={22}
            color={COLORS.muted}
          />
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
            <Ionicons
              name="restaurant-outline"
              size={25}
              color={COLORS.brown}
            />
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
            <Ionicons
              name="calendar-outline"
              size={25}
              color={COLORS.brown}
            />
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
            <Ionicons
              name="map-outline"
              size={25}
              color={COLORS.brown}
            />
          </View>

          <Text style={styles.smallCardTitle}>Campus Map</Text>
          <Text style={styles.smallCardValue}>
            Find a building
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.smallIcon}>
            <Ionicons
              name="card-outline"
              size={25}
              color={COLORS.brown}
            />
          </View>

          <Text style={styles.smallCardTitle}>Student ID</Text>
          <Text style={styles.smallCardValue}>
            {student.studentId}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.demoNotice}>
        PantherHub is an unofficial student project using demonstration
        data.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.brown,
    fontSize: 28,
    fontWeight: '800',
  },

  profileIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.brown,
    borderWidth: 3,
    borderColor: COLORS.gold,
  },

  greeting: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 16,
    marginTop: 6,
  },

  sectionTitle: {
    color: COLORS.brown,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  largeCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
    borderTopWidth: 5,
    borderTopColor: COLORS.gold,
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

  cardTitleArea: {
    flex: 1,
    paddingRight: 12,
  },

  cardLabel: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  cardTitle: {
    color: COLORS.text,
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
    backgroundColor: COLORS.lightGold,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },

  detailText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 15,
    marginLeft: 9,
  },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.brown,
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
    backgroundColor: COLORS.card,
    borderRadius: 17,
    padding: 16,
    marginBottom: 25,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.gold,
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
    backgroundColor: COLORS.lightGold,
    marginRight: 13,
  },

  assignmentInformation: {
    flex: 1,
  },

  assignmentTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },

  assignmentCourse: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },

  assignmentDue: {
    color: COLORS.muted,
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
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 17,
    justifyContent: 'center',
    borderTopWidth: 4,
    borderTopColor: COLORS.gold,
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
    backgroundColor: COLORS.lightGold,
    marginBottom: 12,
  },

  smallCardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },

  smallCardValue: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 5,
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 15,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  demoNotice: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 15,
  },
});