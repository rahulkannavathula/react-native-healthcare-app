import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Patient } from '../types/patient';

const STATUS_COLOR: Record<Patient['status'], string> = {
  active: '#28a745',
  inactive: '#6c757d',
  critical: '#dc3545',
};

export const PatientCard: React.FC<{ patient: Patient; onPress: (p: Patient) => void }> = memo(
  ({ patient, onPress }) => {
    const fullName = `${patient.firstName} ${patient.lastName}`;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(patient)}
        accessible
        accessibilityLabel={`Patient: ${fullName}, Status: ${patient.status}, Last visit: ${new Date(patient.lastVisit).toLocaleDateString()}`}
        accessibilityRole="button"
        accessibilityHint="Tap to view patient details"
      >
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={[styles.badge, { backgroundColor: STATUS_COLOR[patient.status] }]}>
            <Text style={styles.badgeText}>{patient.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.meta}>DOB: {patient.dateOfBirth}</Text>
          <Text style={styles.meta}>Blood: {patient.bloodGroup}</Text>
          <Text style={styles.meta}>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</Text>
        </View>
        {patient.nextAppointment && (
          <Text style={styles.appt}>Next: {new Date(patient.nextAppointment).toLocaleString()}</Text>
        )}
      </TouchableOpacity>
    );
  }
);
PatientCard.displayName = 'PatientCard';

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '700', color: '#212529', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 4 },
  meta: { fontSize: 13, color: '#6c757d' },
  appt: { fontSize: 13, color: '#0d6efd', marginTop: 4, fontWeight: '500' },
});
