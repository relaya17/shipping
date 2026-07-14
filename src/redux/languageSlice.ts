// src/features/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  language: string;  // שדה בודד של השפה
}

const initialState: LanguageState = {
  language: 'en', // ברירת מחדל באנגלית
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
