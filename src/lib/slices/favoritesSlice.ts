import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  [key: string]: string; // [cityKey: string]: cityName
}

type ToggleFavoritesAction = {
  cityKey: string;
  cityName: string;
};

const initialState: FavoritesState = {};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (
      state: FavoritesState,
      action: PayloadAction<ToggleFavoritesAction>
    ) => {
      if (Object.keys(state).includes(action.payload.cityKey)) {
        delete state[action.payload.cityKey];
      } else {
        state[action.payload.cityKey] = action.payload.cityName;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
