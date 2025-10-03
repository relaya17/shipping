// src/features/freeQuote/freeQuoteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FreeQuoteState {
  movingFrom: string;
  movingTo: string;
  quoteState: string;
}

const initialState: FreeQuoteState = {
  movingFrom: '',
  movingTo: '',
  quoteState: '',
};

const freeQuoteSlice = createSlice({
  name: 'freeQuote',
  initialState,
  reducers: {
    setMovingFrom: (state, action: PayloadAction<string>) => {
      state.movingFrom = action.payload;
    },
    setMovingTo: (state, action: PayloadAction<string>) => {
      state.movingTo = action.payload;
    },
    setQuoteState: (state, action: PayloadAction<string>) => {
      state.quoteState = action.payload;
    },
  },
});

export const { setMovingFrom, setMovingTo, setQuoteState } = freeQuoteSlice.actions;
export default freeQuoteSlice.reducer;
