import { useDispatch, useSelector } from 'react-redux';
import WeatherForecast from './WeatherForecast';
import { toggleFavorite } from '@/lib/slices/favoritesSlice';
import { type WeatherDataState } from '@/lib/slices/weatherDataSlice';
import { type RootState } from '@/lib/store';

type Props = {
  data: WeatherDataState;
};

function WeatherInfo({ data }: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const toggleFav = () => {
    if (data.cityKey && data.cityName) {
      const { cityKey, cityName } = data;
      dispatch(toggleFavorite({ cityKey, cityName }));
    }
  };

  const isFav = () => (data.cityKey ? !!favorites[data.cityKey] : false);

  const info = () => {
    if (data.countryName && data.cityName) {
      return `${data.countryName}, ${data.cityName}`;
    }
    return 'Loading...';
  };

  return (
    <div className="city-weather-info">
      <h1>{info()}</h1>

      <div className="flex gap-6 mt-2 justify-center">
        <h2 className="text-2xl">{data.text || data.error || 'loading...'}</h2>
        <h2 className="text-2xl">{data.temperature || 0}°C</h2>
      </div>

      <button
        onClick={toggleFav}
        className="m-4 border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-600"
        disabled={!data.cityKey}
        type="button">
        {isFav() ? 'Remove From' : 'Add To'} Favorite
      </button>

      {data.forecast && <WeatherForecast forecast={data.forecast} />}
    </div>
  );
}

export default WeatherInfo;
