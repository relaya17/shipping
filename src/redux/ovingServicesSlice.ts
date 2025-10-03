// src/redux/movingServicesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovingServicesState {
  services: string[];
}

const initialState: MovingServicesState = {
  services: [], // רשימת השירותים (תוכל להוסיף את הנתונים עצמך או לשלוף אותם מ-API)
};

const movingServicesSlice = createSlice({
  name: 'movingServices',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<string[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setServices } = movingServicesSlice.actions;
export default movingServicesSlice.reducer;
