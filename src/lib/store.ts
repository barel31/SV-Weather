import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './slices/favoritesSlice';
import weatherDataSlice from './slices/weatherDataSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice,
    data: weatherDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
