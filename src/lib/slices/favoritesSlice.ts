import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FavoritesState = {
  [key: string]: string; // [cityKey: string]: cityName
};

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
      favorites: FavoritesState,
      action: PayloadAction<ToggleFavoritesAction>
    ) => {
      const { cityKey, cityName } = action.payload;
      if (Object.keys(favorites).includes(cityKey)) {
        delete favorites[cityKey];
      } else {
        favorites[cityKey] = cityName;
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
