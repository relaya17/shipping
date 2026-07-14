// src/features/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  language: string;  // שדה בודד של השפה
}

function readStoredLanguage(): string {
  try {
    const saved = localStorage.getItem('vip-lang');
    if (saved) return saved.split('-')[0];
  } catch {
    /* ignore */
  }
  return 'en';
}

const initialState: LanguageState = {
  language: readStoredLanguage(),
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
