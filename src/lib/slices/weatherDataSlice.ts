import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WeatherDataState {
  weatherText: string;
  weatherTemp: number;
  cityName: string;
  cityKey: string;
  forecast: { [key: string]: { temp: string } };
  // isFavorite?: boolean;
  error?: string;
}

const initialState: WeatherDataState = {
  weatherText: '',
  weatherTemp: 0,
  cityName: '',
  cityKey: '',
  forecast: {},
};

export const weatherDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (
      state: WeatherDataState,
      action: PayloadAction<WeatherDataState>
    ) => {
      state = action.payload;
      return state;
    },
    setError: (
      state: WeatherDataState,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
