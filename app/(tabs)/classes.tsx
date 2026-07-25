import { router } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const classes = [
  {
    id: 'csc270',
    code: 'CSC 270',
    name: 'Computer Science',
    time: 'Monday and Wednesday • 2:00 PM',
    location: 'Science Building, Room 204',
  },
  {
    id: 'cyb210',
    code: 'CYB 210',
    name: 'Introduction to Cybersecurity',
    time: 'Tuesday and Thursday • 11:00 AM',
    location: 'Nexus Building, Room 126',
  },
  {
    id: 'mat141',
    code: 'MAT 141',
    name: 'Calculus I',
    time: 'Monday and Wednesday • 9:00 AM',
    location: 'Alumnae Hall, Room 114',
  },
];

export default function ClassesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Classes</Text>
      <Text style={styles.subtitle}>Fall semester</Text>

      {classes.map((course) => (
        <Pressable
          key={course.id}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() =>
            router.push({
              pathname: '/class/[id]',
              params: { id: course.id },
            })
          }
        >
          <View style={styles.topRow}>
            <Text style={styles.courseCode}>{course.code}</Text>
            <Text style={styles.arrow}>›</Text>
          </View>

          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.details}>{course.time}</Text>
          <Text style={styles.details}>{course.location}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 40,
  },
  title: {
    color: '#171717',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseCode: {
    color: '#4B2E83',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  arrow: {
    color: '#4B2E83',
    fontSize: 32,
    fontWeight: '300',
  },
  courseName: {
    color: '#171717',
    fontSize: 21,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 12,
  },
  details: {
    color: '#666666',
    fontSize: 15,
    marginBottom: 5,
  },
});