import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComparingQuotesState {
  comparison: string;
}

const initialState: ComparingQuotesState = {
  comparison: "",
};

const comparingQuotesSlice = createSlice({
  name: "comparingQuotes",
  initialState,
  reducers: {
    setComparison: (state, action: PayloadAction<string>) => {
      state.comparison = action.payload;
    },
  },
});

export const { setComparison } = comparingQuotesSlice.actions;

export default comparingQuotesSlice.reducer;
