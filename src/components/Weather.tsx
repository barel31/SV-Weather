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

type WeatherData = {
  weatherText: string;
  weatherTemp: number;
  cityName: string;
  cityKey: string;
  forecast: { [key: string]: { temp: string } };
};

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
      const res = await searchCityWeather(city);
      if (!res) throw new Error(`City ${city} not found`);
      const { cityKey, cityName } = res;

      // get weather with cityKey
      const cityWeatherResult = await getCityWeather(cityKey);
      if (!cityWeatherResult) {
        throw new Error(`Cannot get weather data from city key ${cityKey}`);
      }
      const { weatherText, weatherTemp } = cityWeatherResult;

      // get weather forecast with cityKey
      const forecast = (await getCityWeatherFiveDays(
        cityKey
      )) as WeatherData['forecast'];
      // save data to state
      dispatch(
        setData({ weatherText, weatherTemp, cityName, cityKey, forecast })
      );

      if (redirect) navigate(`../${cityName}`);
      return true;
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        dispatch(setError(err.message));
      }
      navigate('../');
      return false;
    }
  };

  // Search for tel aviv on first load
  useEffect(() => {
    (async () => {
      const res = await loadData(cityName || defaultCityName, false);
      if (!res) navigate('../');
    })();
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
    <main className="flex flex-col gap-10 justify-center">
      <h2 className="text-center">Weather</h2>
      <form
        onSubmit={onSubmit}
        className="flex gap-4 m-auto flex-wrap w-full justify-center">
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
      <span className="text-red-500 text-center bottom-5 relative">
        {data?.error}
      </span>

      {/* City Weather Info */}
      <div className="city-weather-info text-center">
        <h1 className="m-auto">
          {data?.cityName || (data?.error && 'Error') || 'Loading...'}
        </h1>

        <div className="flex gap-6 mt-2 justify-center">
          <h2 className="text-2xl">
            {data?.weatherText || (data?.error && 'Error') || 'No weather data'}
          </h2>
          <h2 className="text-2xl">{data?.weatherTemp || 0}°C</h2>
        </div>

        <button
          onClick={toggleFav}
          className="m-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={!data}>
          {isFav() ? 'Remove From' : 'Add To'} Favorite
        </button>

        {data?.forecast && <WeatherForecast forecast={data.forecast} />}
      </div>
    </main>
  );
}

export default Weather;
