import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type WeatherDataState = {
  cityName?: string;
  cityKey?: string;
  text?: string;
  temperature?: number;
  forecast?: {
    [day: string]: {
      temperatureRange: string;
    };
  };
  error?: string;
};

const initialState: WeatherDataState = {
  cityName: 'Tel Aviv',
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
