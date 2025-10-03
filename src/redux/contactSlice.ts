// contactSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactState {
  name: string;
  email: string;
  phone: string;
  question: string;
}

const initialState: ContactState = {
  name: '',
  email: '',
  phone: '',
  question: ''
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<ContactState>>) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => initialState
  }
});

export const { setFormData, resetFormData } = contactSlice.actions;
export default contactSlice.reducer;
