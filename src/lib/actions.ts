import { ActionTypes, type AppState } from './reducer';

type ToggleFavoriteAction = {
  type: ActionTypes.TOGGLE_FAVORITE;
  payload: {
    cityKey: string;
    cityName: string;
  };
};

type IsFavoriteAction = {
  type: ActionTypes.IS_FAVORITE;
  payload: string;
};

type SetDataAction = {
  type: ActionTypes.SET_DATA;
  payload: AppState['data'];
};

type SetErrorAction = {
  type: ActionTypes.SET_ERROR;
  payload: string;
};

export type Action =
  | ToggleFavoriteAction
  | IsFavoriteAction
  | SetDataAction
  | SetErrorAction;

export const toggleFavorite = (
  cityKey: string,
  cityName: string
): ToggleFavoriteAction => {
  return {
    type: ActionTypes.TOGGLE_FAVORITE,
    payload: {
      cityKey,
      cityName,
    },
  };
};

export const isFavorite = (cityKey: string): IsFavoriteAction => {
  return {
    type: ActionTypes.IS_FAVORITE,
    payload: cityKey,
  };
};

export const setData = (data: NonNullable<AppState['data']>): SetDataAction => {
  return {
    type: ActionTypes.SET_DATA,
    payload: data,
  };
};

export const setError = (error: string): SetErrorAction => {
  return {
    type: ActionTypes.SET_ERROR,
    payload: error,
  };
};
