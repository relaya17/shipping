// src/redux/tipsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TipsState {
  movingTips: string[];
}

const initialState: TipsState = {
  movingTips: [],
};

const tipsSlice = createSlice({
  name: 'tips',
  initialState,
  reducers: {
    setMovingTips: (state, action: PayloadAction<string[]>) => {
      state.movingTips = action.payload;
    },
  },
});

export const { setMovingTips } = tipsSlice.actions;
export default tipsSlice.reducer;
