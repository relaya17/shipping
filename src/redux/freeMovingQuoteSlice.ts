import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FreeMovingQuoteState {
  quote: string;
}

const initialState: FreeMovingQuoteState = {
  quote: "",
};

const freeMovingQuoteSlice = createSlice({
  name: "freeMovingQuote",
  initialState,
  reducers: {
    setQuote: (state, action: PayloadAction<string>) => {
      state.quote = action.payload;
    },
  },
});

export const { setQuote } = freeMovingQuoteSlice.actions;

export default freeMovingQuoteSlice.reducer;
