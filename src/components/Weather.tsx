import { useRef, useEffect } from 'react';
import {
  getCityWeather,
  getCityWeatherFiveDays,
  searchCityWeather,
} from '@/lib/fetchWeather';
import WeatherForecast from './WeatherForecast';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/lib/store';
import { setData, setError } from '@/lib/slices/weatherDataSlice';
import { toggleFavorite } from '@/lib/slices/favoritesSlice';

const defaultCityName = 'Tel Aviv';

function Weather() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const favorites = useSelector((state: RootState) => state.favorites);

  const { cityName } = useParams<{ cityName: string }>();

  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement>(null);

  const loadData = async (city: string, redirect = true) => {
    try {
      // get cityName and cityKey from search
      const result = await searchCityWeather(city);
      if (result instanceof Error) throw result;
      const { cityKey, cityName } = result;

      // get weather with cityKey
      const cityWeatherResult = await getCityWeather(cityKey);
      if (cityWeatherResult instanceof Error) throw result;

      const { weatherText, weatherTemp } = cityWeatherResult;

      // get weather forecast with cityKey
      const forecast = await getCityWeatherFiveDays(cityKey);
      if (forecast instanceof Error) throw result;
      // save data to state
      dispatch(
        setData({ weatherText, weatherTemp, cityName, cityKey, forecast })
      );

      if (redirect) navigate(`../${cityName}`);
      return true;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) dispatch(setError(error.message));
      else dispatch(setError('Something went wrong'));

      if (redirect) navigate('../');
      return false;
    }
  };

  // Search for tel aviv on first load
  useEffect(() => {
    (async () => {
      const response = await loadData(cityName || defaultCityName, false);
      if (!response) navigate('../');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadData(ref.current!.value);
  };

  const toggleFav = () => {
    if (data?.cityKey) {
      const { cityKey, cityName } = data;
      dispatch(toggleFavorite({ cityKey, cityName }));
    }
  };

  const isFav = () => !!favorites[data?.cityKey];

  return (
    <div>
      <h2>Weather</h2>

      <div className="flex flex-col gap-10 justify-center">
        <form
          onSubmit={onSubmit}
          className="flex gap-4 flex-wrap w-full justify-center">
          <input
            ref={ref}
            type="text"
            placeholder="City Name"
            className="px-4 py-3 rounded-sm bg-[#3B3B3B]"
            defaultValue={cityName || defaultCityName}
          />
          <button type="submit" className="border-slate-600">
            Search
          </button>
        </form>
        <span className="text-red-500 bottom-5 relative">{data?.error}</span>

        {/* City Weather Info */}
        <div className="city-weather-info">
          <h1>{data?.cityName || data?.error || 'Loading...'}</h1>

          <div className="flex gap-6 mt-2 justify-center">
            <h2 className="text-2xl">
              {data?.weatherText || data?.error || 'No weather data'}
            </h2>
            <h2 className="text-2xl">{data?.weatherTemp || 0}°C</h2>
          </div>

          <button
            onClick={toggleFav}
            className="m-4 border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-600"
            disabled={!data?.cityKey}
            type="button">
            {isFav() ? 'Remove From' : 'Add To'} Favorite
          </button>

          {data?.forecast && <WeatherForecast forecast={data.forecast} />}
        </div>
      </div>
    </div>
  );
}

export default Weather;
