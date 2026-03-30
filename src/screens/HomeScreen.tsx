import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchPatients, setSearchQuery, setSelected } from '../store/slices/patientSlice';
import { PatientCard } from '../components/PatientCard';
import { Patient } from '../types/patient';
import { useFirebaseConfig } from '../hooks/useFirebaseConfig';

const DOCTOR_ID = 'current-doctor-id';

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, searchQuery } = useAppSelector((s) => s.patients);
  const { config } = useFirebaseConfig();

  useEffect(() => { dispatch(fetchPatients(DOCTOR_ID)); }, [dispatch]);

  const filtered = list.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.firstName.toLowerCase().includes(q) || p.lastName.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
  });

  const handleSelect = useCallback((p: Patient) => dispatch(setSelected(p)), [dispatch]);

  if (loading)
    return <View style={s.center}><ActivityIndicator size="large" color="#0d6efd" accessibilityLabel="Loading patients" /></View>;

  return (
    <View style={s.container}>
      {config?.showTelehealthBanner && (
        <View style={s.banner} accessibilityRole="alert">
          <Text style={s.bannerText}>Telehealth sessions are now available!</Text>
        </View>
      )}
      <Text style={s.heading} accessibilityRole="header">My Patients</Text>
      <TextInput
        style={s.search}
        placeholder="Search by name or email..."
        value={searchQuery}
        onChangeText={(q) => dispatch(setSearchQuery(q))}
        accessible accessibilityLabel="Search patients"
        returnKeyType="search" clearButtonMode="while-editing"
      />
      {error && <Text style={s.error} accessibilityRole="alert">{error}</Text>}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PatientCard patient={item} onPress={handleSelect} />}
        ListEmptyComponent={<Text style={s.empty}>No patients found.</Text>}
        contentContainerStyle={s.list}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  banner: { backgroundColor: '#0d6efd', padding: 12, borderRadius: 8, marginBottom: 12 },
  bannerText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  heading: { fontSize: 24, fontWeight: '800', color: '#212529', marginBottom: 12 },
  search: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#dee2e6' },
  list: { paddingBottom: 24 },
  empty: { textAlign: 'center', color: '#6c757d', marginTop: 48, fontSize: 16 },
  error: { color: '#dc3545', marginBottom: 12 },
});
