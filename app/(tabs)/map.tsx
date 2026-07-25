import { StyleSheet, Text, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Map</Text>
      <Text style={styles.subtitle}>
        Building search and campus directions will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  title: {
    color: '#171717',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
});