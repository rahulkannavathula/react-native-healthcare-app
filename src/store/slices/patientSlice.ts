import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { Patient } from '../../types/patient';

interface PatientState {
  list: Patient[];
  selected: Patient | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: PatientState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
  searchQuery: '',
};

export const fetchPatients = createAsyncThunk(
  'patients/fetchAll',
  async (doctorId: string, { rejectWithValue }) => {
    try {
      const snapshot = await firestore()
        .collection('patients')
        .where('assignedDoctorId', '==', doctorId)
        .orderBy('lastVisit', 'desc')
        .get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Patient[];
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchPatientById = createAsyncThunk(
  'patients/fetchById',
  async (patientId: string, { rejectWithValue }) => {
    try {
      const doc = await firestore().collection('patients').doc(patientId).get();
      if (!doc.exists) throw new Error('Patient not found');
      return { id: doc.id, ...doc.data() } as Patient;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<Patient | null>) { state.selected = action.payload; },
    setSearchQuery(state, action: PayloadAction<string>) { state.searchQuery = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPatients.fulfilled, (state, { payload }) => { state.loading = false; state.list = payload; })
      .addCase(fetchPatients.rejected, (state, { payload }) => { state.loading = false; state.error = payload as string; })
      .addCase(fetchPatientById.fulfilled, (state, { payload }) => { state.selected = payload; });
  },
});

export const { setSelected, setSearchQuery } = patientSlice.actions;
export default patientSlice.reducer;
