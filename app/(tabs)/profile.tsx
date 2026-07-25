import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>JB</Text>
      </View>

      <Text style={styles.title}>Joseph Blake</Text>
      <Text style={styles.subtitle}>Computer Science Student</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.value}>0000000 — Demo</Text>

        <Text style={styles.label}>University email</Text>
        <Text style={styles.value}>student@example.edu</Text>

        <Text style={styles.label}>App status</Text>
        <Text style={styles.value}>Prototype account</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#4B2E83',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  title: {
    color: '#171717',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 18,
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 25,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },
  label: {
    color: '#4B2E83',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 14,
    textTransform: 'uppercase',
  },
  value: {
    color: '#333333',
    fontSize: 16,
    marginTop: 5,
  },
});