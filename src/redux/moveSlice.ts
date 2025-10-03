// src/features/moveSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoveState {
  movingFrom: string;
  movingTo: string;
  quote: string;
  movingDate: string;
  message: string;  // הוספתי שדה חדש
}

const initialState: MoveState = {
  movingFrom: '',
  movingTo: '',
  quote: '',
  movingDate: '',
  message: '',  // ערך ברירת מחדל
};

const moveSlice = createSlice({
  name: 'move',
  initialState,
  reducers: {
    setMovingData: (state, action: PayloadAction<{ movingFrom: string; movingTo: string }>) => {
      state.movingFrom = action.payload.movingFrom;
      state.movingTo = action.payload.movingTo;
    },
    setQuote: (state, action: PayloadAction<string>) => {
      state.quote = action.payload;
    },
    setMovingDate: (state, action: PayloadAction<string>) => {
      state.movingDate = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {  // אקשן חדש
      state.message = action.payload;
    },
  },
});

export const { setMovingData, setQuote, setMovingDate, setMessage } = moveSlice.actions;
export default moveSlice.reducer;
