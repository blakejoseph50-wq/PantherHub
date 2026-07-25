import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const showMessage = (message: string) => {
    Alert.alert('PantherHub', message);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={styles.header}
        onPress={() => showMessage('Profile and settings will be added later.')}
      >
        <Text style={styles.logo}>🐾 PantherHub</Text>
        <Text style={styles.greeting}>Good afternoon, Joseph</Text>
        <Text style={styles.subtitle}>Here is what is happening today.</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>NEXT CLASS</Text>
        <Text style={styles.cardTitle}>Computer Science</Text>
        <Text style={styles.cardText}>2:00 PM – 3:15 PM</Text>
        <Text style={styles.cardText}>Science Building, Room 204</Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => showMessage('The class details page will be added next.')}
        >
          <Text style={styles.primaryButtonText}>View class</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Upcoming</Text>

      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() =>
          showMessage('Cybersecurity Portfolio is due tomorrow at 11:59 PM.')
        }
      >
        <Text style={styles.cardLabel}>ASSIGNMENT</Text>
        <Text style={styles.cardTitle}>Cybersecurity Portfolio</Text>
        <Text style={styles.cardText}>Due tomorrow at 11:59 PM</Text>
      </Pressable>

      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => showMessage('Your demo meal-plan balance is $245.50.')}
        >
          <Text style={styles.icon}>🍽️</Text>
          <Text style={styles.smallCardTitle}>Meal Plan</Text>
          <Text style={styles.smallCardText}>$245.50</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => showMessage('You have 3 upcoming calendar events.')}
        >
          <Text style={styles.icon}>📅</Text>
          <Text style={styles.smallCardTitle}>Calendar</Text>
          <Text style={styles.smallCardText}>3 events</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => showMessage('The interactive campus map is coming soon.')}
        >
          <Text style={styles.icon}>🗺️</Text>
          <Text style={styles.smallCardTitle}>Campus Map</Text>
          <Text style={styles.smallCardText}>Find a building</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.smallCard,
            pressed && styles.cardPressed,
          ]}
          onPress={() => showMessage('The demo student ID page is coming soon.')}
        >
          <Text style={styles.icon}>🪪</Text>
          <Text style={styles.smallCardTitle}>Student ID</Text>
          <Text style={styles.smallCardText}>Demo card</Text>
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
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  logo: {
    color: '#4B2E83',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 18,
  },
  greeting: {
    color: '#171717',
    fontSize: 25,
    fontWeight: '700',
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#171717',
    fontSize: 21,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  cardLabel: {
    color: '#4B2E83',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#171717',
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 7,
  },
  cardText: {
    color: '#666666',
    fontSize: 15,
    marginBottom: 3,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#4B2E83',
    borderRadius: 12,
    marginTop: 17,
    paddingVertical: 13,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    fontSize: 28,
    marginBottom: 12,
  },
  smallCardTitle: {
    color: '#171717',
    fontSize: 17,
    fontWeight: '700',
  },
  smallCardText: {
    color: '#666666',
    fontSize: 14,
    marginTop: 5,
  },
  demoNotice: {
    color: '#777777',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
    textAlign: 'center',
  },
});