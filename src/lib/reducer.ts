import { Action } from './actions';

export type AppState = {
  favorites: {
    // cityKey:    cityName
    [key: string]: string;
  };
  data?: {
    weatherText: string;
    weatherTemp: number;
    cityName: string;
    cityKey: string;
    forecast: { [key: string]: { temp: string } };
    isFavorite?: boolean;
  };
  error?: string;
};

const initialState: AppState = {
  favorites: {},
  error: '',
};

export enum ActionTypes {
  TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
  IS_FAVORITE = 'IS_FAVORITE',
  SET_DATA = 'SET_DATA',
  SET_ERROR = 'SET_ERROR',
}

const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_FAVORITE: {
      if (Object.keys(state.favorites).includes(action.payload.cityKey)) {
        
        const favorites = { ...state.favorites };
        delete favorites[action.payload.cityKey];

        return { ...state, favorites };
      } else {
        const favorites = { ...state.favorites };
        favorites[action.payload.cityKey] = action.payload.cityName;

        return { ...state, favorites };
      }
    }
    case ActionTypes.IS_FAVORITE: {
      const isFavorite = Object.keys(state.favorites).includes(action.payload);

      return { ...state, data: { ...state.data!, isFavorite } };
    }
    case ActionTypes.SET_DATA: {
      const { weatherText, weatherTemp, cityName, cityKey, forecast } =
        action.payload!;
      return {
        ...state,
        data: action.payload
          ? {
              weatherText,
              weatherTemp,
              cityName,
              cityKey,
              forecast,
              isFavorite: Object.keys(state.favorites).includes(cityKey),
            }
          : undefined,
        error: undefined,
      };
    }
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
