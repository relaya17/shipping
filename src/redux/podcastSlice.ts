// src/redux/podcastSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PodcastState {
  episodes: string[];
}

const initialState: PodcastState = {
  episodes: [],
};

const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    setPodcastEpisodes: (state, action: PayloadAction<string[]>) => {
      state.episodes = action.payload;
    },
  },
});

export const { setPodcastEpisodes } = podcastSlice.actions;
export default podcastSlice.reducer;
