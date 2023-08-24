import { useRef, useState, useEffect } from 'react';
import {
  getCityWeather,
  getCityWeatherFiveDays,
  searchCityWeather,
} from '../lib/fetchWeather';
import WeatherForecast from './WeatherForecast';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  toggleFavorite: (cityKey: string, cityName: string) => void;
  isFavorite: (cityKey: string) => boolean;
};

type WeatherData = {
  weatherText: string;
  weatherTemp: number;
  cityName: string;
  cityKey: string;
  forecast: { [key: string]: { temp: string } };
};

const defaultCityName = 'Tel Aviv';

function Weather({ toggleFavorite, isFavorite }: Props) {
  const { cityName } = useParams<{ cityName: string }>();

  const navigate = useNavigate();

  const [data, setData] = useState<WeatherData>();
  const [error, setError] = useState<string | undefined>();

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
      setData((state) => ({
        ...state,
        weatherText,
        weatherTemp,
        cityName,
        cityKey,
        forecast,
      }));
      setError(undefined);

      if (redirect) navigate(`../${cityName}`);
      return true;
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
      }
      setData(undefined);
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
    if ('cityName' in data!) {
      toggleFavorite(data.cityKey, data.cityName);
    }
  };

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
          className="px-4 py-3 rounded-sm"
          defaultValue={defaultCityName}
        />
        <button type="submit" className="border-slate-600">
          Search
        </button>
      </form>
      <span className="text-red-500 text-center bottom-5 relative">
        {error}
      </span>

      {/* City Weather Info */}
      <div className="city-weather-info text-center">
        <h1 className="m-auto">
          {data?.cityName || (error && 'Error') || 'Loading...'}
        </h1>

        <div className="flex gap-6 mt-2 justify-center">
          <h2 className="text-2xl">
            {data?.weatherText || (error && 'Error') || 'No weather data'}
          </h2>
          <h2 className="text-2xl">{data?.weatherTemp || 0}°C</h2>
        </div>

        <button
          onClick={toggleFav}
          className="m-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={!data}>
          {data && isFavorite(data.cityKey) ? 'Remove From' : 'Add To'} Favorite
        </button>

        {data?.forecast && <WeatherForecast forecast={data.forecast} />}
      </div>
    </main>
  );
}

export default Weather;
