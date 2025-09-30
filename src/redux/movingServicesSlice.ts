// src/redux/movingServicesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// הגדרת המצב הראשוני של השירותים
interface MovingServicesState {
  services: string[];
}

// מצב התחלתי עם רשימת שירותים ריקה
const initialState: MovingServicesState = {
  services: [],
};

// יצירת הסלייס
const movingServicesSlice = createSlice({
  name: 'movingServices',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<string[]>) => {
      state.services = action.payload; // עדכון רשימת השירותים
    },
  },
});

export const { setServices } = movingServicesSlice.actions; // פעולה לעדכון השירותים
export default movingServicesSlice.reducer;
