import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { student } from '../../data/pantherHubData';

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

export default function ProfileScreen() {
  const initials =
    student.firstName.charAt(0) +
    student.lastName.charAt(0);

  const mealBalance = student.mealBalance.toLocaleString(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    }
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Profile</Text>

        <Text style={styles.pageSubtitle}>
          Student account information
        </Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>

        <Text style={styles.name}>
          {student.firstName} {student.lastName}
        </Text>

        <Text style={styles.major}>
          {student.major} Student
        </Text>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            Prototype account
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Student information
      </Text>

      <View style={styles.informationCard}>
        <InformationRow
          icon="card-outline"
          label="Student ID"
          value={student.studentId}
        />

        <InformationRow
          icon="mail-outline"
          label="University email"
          value={student.email}
        />

        <InformationRow
          icon="school-outline"
          label="Major"
          value={student.major}
        />

        <InformationRow
          icon="restaurant-outline"
          label="Meal-plan balance"
          value={mealBalance}
          last
        />
      </View>

      <Text style={styles.sectionTitle}>
        Digital student ID
      </Text>

      <View style={styles.idCard}>
        <View style={styles.idTopRow}>
          <View style={styles.idHeading}>
            <Text style={styles.idUniversity}>
              ADELPHI UNIVERSITY
            </Text>

            <Text style={styles.idLabel}>
              STUDENT IDENTIFICATION
            </Text>
          </View>

          <View style={styles.pantherCircle}>
            <Text style={styles.panther}>🐾</Text>
          </View>
        </View>

        <Text style={styles.idName}>
          {student.firstName} {student.lastName}
        </Text>

        <Text style={styles.idMajor}>{student.major}</Text>

        <View style={styles.idBottomRow}>
          <View>
            <Text style={styles.idSmallLabel}>
              STUDENT ID
            </Text>

            <Text style={styles.idValue}>
              {student.studentId}
            </Text>
          </View>

          <Ionicons
            name="qr-code-outline"
            size={58}
            color={COLORS.brown}
          />
        </View>
      </View>

      <Text style={styles.notice}>
        This student ID is demonstration-only and cannot be used
        for official university access.
      </Text>
    </ScrollView>
  );
}

type InformationRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
};

function InformationRow({
  icon,
  label,
  value,
  last = false,
}: InformationRowProps) {
  return (
    <View
      style={[
        styles.informationRow,
        last && styles.lastRow,
      ]}
    >
      <View style={styles.informationIcon}>
        <Ionicons
          name={icon}
          size={22}
          color={COLORS.brown}
        />
      </View>

      <View style={styles.informationText}>
        <Text style={styles.informationLabel}>
          {label}
        </Text>

        <Text style={styles.informationValue}>
          {value}
        </Text>
      </View>
    </View>
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

  header: {
    marginBottom: 24,
  },

  pageTitle: {
    color: COLORS.brown,
    fontSize: 30,
    fontWeight: '800',
  },

  pageSubtitle: {
    color: COLORS.muted,
    fontSize: 16,
    marginTop: 5,
  },

  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 25,
    marginBottom: 28,
    borderTopWidth: 6,
    borderTopColor: COLORS.gold,
  },

  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.brown,
    borderWidth: 5,
    borderColor: COLORS.gold,
  },

  initials: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
  },

  name: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 18,
  },

  major: {
    color: COLORS.muted,
    fontSize: 16,
    marginTop: 5,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGold,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginTop: 15,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brown,
    marginRight: 7,
  },

  statusText: {
    color: COLORS.brown,
    fontSize: 13,
    fontWeight: '700',
  },

  sectionTitle: {
    color: COLORS.brown,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  informationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 28,
  },

  informationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  informationIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: COLORS.lightGold,
    marginRight: 14,
  },

  informationText: {
    flex: 1,
  },

  informationLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  informationValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },

  idCard: {
    backgroundColor: COLORS.gold,
    borderRadius: 20,
    padding: 22,
    minHeight: 235,
    marginBottom: 15,
  },

  idTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  idHeading: {
    flex: 1,
    paddingRight: 10,
  },

  idUniversity: {
    color: COLORS.brown,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  idLabel: {
    color: COLORS.brown,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 4,
  },

  pantherCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.brown,
  },

  panther: {
    fontSize: 22,
  },

  idName: {
    color: COLORS.brown,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 30,
  },

  idMajor: {
    color: COLORS.brown,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },

  idBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 28,
  },

  idSmallLabel: {
    color: COLORS.brown,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  idValue: {
    color: COLORS.brown,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },

  notice: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});