export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  contactNumber: string;
  email: string;
  address: Address;
  medicalHistory: MedicalRecord[];
  currentMedications: Medication[];
  assignedDoctorId: string;
  lastVisit: string;
  nextAppointment: string | null;
  status: 'active' | 'inactive' | 'critical';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  notes: string;
  doctorId: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string | null;
}

export interface RemoteConfigValues {
  showTelehealthBanner: boolean;
  maxAppointmentsPerDay: number;
  enablePushNotifications: boolean;
  maintenanceMode: boolean;
  featureFlags: Record<string, boolean>;
}
