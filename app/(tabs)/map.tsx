import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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

type CampusBuilding = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const campusBuildings: CampusBuilding[] = [
  {
    id: 'nexus',
    name: 'Nexus Building',
    category: 'Academic',
    description:
      'Classrooms, laboratories and academic offices.',
    icon: 'school-outline',
  },
  {
    id: 'swirbul',
    name: 'Swirbul Library',
    category: 'Library',
    description:
      'Study spaces, computers, printing and research support.',
    icon: 'library-outline',
  },
  {
    id: 'university-center',
    name: 'Ruth S. Harley University Center',
    category: 'Student Life',
    description:
      'Dining, student activities, events and gathering spaces.',
    icon: 'people-outline',
  },
  {
    id: 'science',
    name: 'Science Building',
    category: 'Academic',
    description:
      'Science classrooms, laboratories and faculty offices.',
    icon: 'flask-outline',
  },
  {
    id: 'alumnae',
    name: 'Alumnae Hall',
    category: 'Academic',
    description:
      'Classrooms and academic department offices.',
    icon: 'business-outline',
  },
  {
    id: 'performing-arts',
    name: 'Performing Arts Center',
    category: 'Arts',
    description:
      'Music, dance, theatre and live performances.',
    icon: 'musical-notes-outline',
  },
  {
    id: 'center-recreation',
    name: 'Center for Recreation and Sports',
    category: 'Athletics',
    description:
      'Fitness facilities, recreation and athletic activities.',
    icon: 'barbell-outline',
  },
  {
    id: 'health-services',
    name: 'Student Health Services',
    category: 'Student Services',
    description:
      'Health support and student wellness services.',
    icon: 'medkit-outline',
  },
];

export default function MapScreen() {
  const [searchText, setSearchText] = useState('');

  const filteredBuildings = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return campusBuildings;
    }

    return campusBuildings.filter((building) => {
      return (
        building.name.toLowerCase().includes(search) ||
        building.category.toLowerCase().includes(search) ||
        building.description.toLowerCase().includes(search)
      );
    });
  }, [searchText]);

  async function openDirections(buildingName: string) {
    const searchQuery = encodeURIComponent(
      `${buildingName}, Adelphi University, Garden City, NY`
    );

    const mapUrl =
      `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

    try {
      const supported = await Linking.canOpenURL(mapUrl);

      if (!supported) {
        Alert.alert(
          'Directions unavailable',
          'Your device could not open the map link.'
        );
        return;
      }

      await Linking.openURL(mapUrl);
    } catch {
      Alert.alert(
        'Directions unavailable',
        'Something went wrong while opening directions.'
      );
    }
  }

  function clearSearch() {
    setSearchText('');
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Campus Map</Text>

      <Text style={styles.subtitle}>
        Find buildings and campus services
      </Text>

      <View style={styles.mapBanner}>
        <View style={styles.bannerIcon}>
          <Ionicons
            name="map"
            size={30}
            color={COLORS.brown}
          />
        </View>

        <View style={styles.bannerInformation}>
          <Text style={styles.bannerLabel}>
            ADELPHI UNIVERSITY
          </Text>

          <Text style={styles.bannerTitle}>
            Garden City Campus
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={21}
          color={COLORS.muted}
        />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search buildings or services"
          placeholderTextColor={COLORS.muted}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        {searchText.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={clearSearch}
          >
            <Ionicons
              name="close-circle"
              size={21}
              color={COLORS.muted}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.sectionTitle}>
          Campus buildings
        </Text>

        <Text style={styles.resultCount}>
          {filteredBuildings.length}{' '}
          {filteredBuildings.length === 1
            ? 'result'
            : 'results'}
        </Text>
      </View>

      {filteredBuildings.map((building) => (
        <View key={building.id} style={styles.buildingCard}>
          <View style={styles.buildingIcon}>
            <Ionicons
              name={building.icon}
              size={25}
              color={COLORS.brown}
            />
          </View>

          <View style={styles.buildingInformation}>
            <Text style={styles.buildingCategory}>
              {building.category.toUpperCase()}
            </Text>

            <Text style={styles.buildingName}>
              {building.name}
            </Text>

            <Text style={styles.buildingDescription}>
              {building.description}
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.directionsButton,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                openDirections(building.name)
              }
            >
              <Ionicons
                name="navigate-outline"
                size={17}
                color="#FFFFFF"
              />

              <Text style={styles.directionsButtonText}>
                Get directions
              </Text>
            </Pressable>
          </View>
        </View>
      ))}

      {filteredBuildings.length === 0 && (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="search-outline"
              size={32}
              color={COLORS.brown}
            />
          </View>

          <Text style={styles.emptyTitle}>
            No buildings found
          </Text>

          <Text style={styles.emptyText}>
            Try searching for a different building or service.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.pressed,
            ]}
            onPress={clearSearch}
          >
            <Text style={styles.resetButtonText}>
              Clear search
            </Text>
          </Pressable>
        </View>
      )}

      <View style={styles.noticeCard}>
        <Ionicons
          name="information-circle-outline"
          size={22}
          color={COLORS.brown}
        />

        <Text style={styles.noticeText}>
          Building information in this prototype is for
          demonstration purposes. Directions open in Google Maps.
        </Text>
      </View>
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

  mapBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
  },

  bannerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 14,
  },

  bannerInformation: {
    flex: 1,
  },

  bannerLabel: {
    color: COLORS.brown,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },

  bannerTitle: {
    color: COLORS.brown,
    fontSize: 21,
    fontWeight: '900',
    marginTop: 4,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    paddingVertical: 15,
    marginLeft: 9,
  },

  clearButton: {
    padding: 4,
  },

  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    color: COLORS.brown,
    fontSize: 20,
    fontWeight: '800',
  },

  resultCount: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '600',
  },

  buildingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 17,
    marginBottom: 14,
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

  buildingIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.lightGold,
    marginRight: 14,
  },

  buildingInformation: {
    flex: 1,
  },

  buildingCategory: {
    color: COLORS.brown,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  buildingName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },

  buildingDescription: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },

  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.brown,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginTop: 12,
    gap: 6,
  },

  directionsButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  emptyCard: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 28,
  },

  emptyIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: COLORS.lightGold,
    marginBottom: 14,
  },

  emptyTitle: {
    color: COLORS.brown,
    fontSize: 19,
    fontWeight: '800',
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 7,
  },

  resetButton: {
    backgroundColor: COLORS.brown,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 10,
    marginTop: 16,
  },

  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightGold,
    borderRadius: 16,
    padding: 16,
    marginTop: 15,
  },

  noticeText: {
    flex: 1,
    color: COLORS.brown,
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 10,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});