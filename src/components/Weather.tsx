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

  const [data, setData] = useState<WeatherData>({
    cityName: '',
    weatherText: '',
    weatherTemp: 0,
    cityKey: '',
    forecast: {},
  });

  const ref = useRef<HTMLInputElement>(null);

  const loadData = async (city: string, redirect = true) => {
    try {
      // get cityName and cityKey from search
      const res = await searchCityWeather(city);
      if (!res) throw new Error('City not found');
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

      if (redirect) navigate(`../${cityName}`);
      return true;
    } catch (err) {
      console.log(err);
      navigate('../');
      return false;
    }
  };

  // Search for tel aviv on first load
  useEffect(() => {
    (async () => {
      const res = await loadData(cityName || defaultCityName, false);
      // const res = await loadData(cityName ? cityName : 'Tel Aviv', false);
      if (!res) navigate('../');
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadData(ref.current!.value);
  };

  const toggleFav = () => {
    if (data.cityKey) {
      toggleFavorite(data.cityKey, data.cityName);
    }
  };

  return (
    <main className="flex flex-col gap-10">
      <h2>Weather</h2>
      <form onSubmit={onSubmit} className="flex gap-4 m-auto">
        <input
          ref={ref}
          type="text"
          placeholder="City Name"
          className="px-4 rounded-sm center w-full"
          defaultValue={defaultCityName}
        />
        <button type="submit">Search</button>
      </form>

      {/* City Weather Info */}
      <h1>{data.cityName || 'Loading...'}</h1>

      <div className="flex gap-6 m-auto">
        <h2 className="text-2xl">{data.weatherText}</h2>
        <h2 className="text-2xl">{data.weatherTemp}°C</h2>
      </div>

      <button onClick={toggleFav}>
        {isFavorite(data.cityKey) ? 'Remove From' : 'Add To'} Favorite
      </button>

      {/* City Weather forecast */}
      {data.forecast && <WeatherForecast forecast={data.forecast} />}
    </main>
  );
}

export default Weather;
