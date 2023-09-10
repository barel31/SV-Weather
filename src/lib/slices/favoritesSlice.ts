import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FavoritesState = {
  [cityKey: string]: {
    cityName: string;
  };
};

type ToggleFavoritesAction = {
  cityKey: string;
  cityName: string;
};

const initialState: FavoritesState = {
  // ['215854']: 'Tel Aviv',
};

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
        favorites[cityKey] = {
          cityName: cityName,
        };
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
