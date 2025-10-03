import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomsState {
  processInfo: string;
  status: 'idle' | 'loading' | 'completed' | 'error';
  documents: string[];
  inspectionRequired: boolean;
}

const initialState: CustomsState = {
  processInfo: 'Customs inspection information is being prepared...',
  status: 'idle',
  documents: [],
  inspectionRequired: false,
};

const customsSlice = createSlice({
  name: 'customs',
  initialState,
  reducers: {
    setProcessInfo: (state, action: PayloadAction<string>) => {
      state.processInfo = action.payload;
    },
    setStatus: (state, action: PayloadAction<CustomsState['status']>) => {
      state.status = action.payload;
    },
    addDocument: (state, action: PayloadAction<string>) => {
      state.documents.push(action.payload);
    },
    setInspectionRequired: (state, action: PayloadAction<boolean>) => {
      state.inspectionRequired = action.payload;
    },
    resetCustoms: () => {
      return initialState;
    },
  },
});

export const { 
  setProcessInfo, 
  setStatus, 
  addDocument, 
  setInspectionRequired, 
  resetCustoms 
} = customsSlice.actions;

export default customsSlice.reducer;