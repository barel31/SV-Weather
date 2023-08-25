import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type WeatherDataState = {
  weatherText: string;
  weatherTemp: number;
  cityName: string;
  cityKey: string;
  forecast: { [key: string]: { temp: string } };
  error?: string;
};

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
      data: WeatherDataState,
      action: PayloadAction<WeatherDataState>
    ) => action.payload,

    setError: (
      data: WeatherDataState,
      action: PayloadAction<string | undefined>
    ) => {
      data.error = action.payload;
    },
  },
});

export const { setData, setError } = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
