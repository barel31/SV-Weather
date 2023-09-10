import { useEffect, useCallback } from 'react';
import {
  getCityWeather,
  getCityWeatherFiveDays,
  searchCityWeather,
} from '@/lib/fetchWeather';
import { useNavigate, useParams } from 'react-router-dom';
import WeatherInfo from './WeatherInfo';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/lib/store';
import { setData, setError } from '@/lib/slices/weatherDataSlice';
import WeatherForm from './WeatherForm';

function WeatherPage() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);

  const { cityName } = useParams<{ cityName: string }>();

  const navigate = useNavigate();

  const loadData = useCallback(
    async (city: string, redirect = true) => {
      try {
        // get cityName and cityKey from search
        const result = await searchCityWeather(city);
        if (result instanceof Error) throw result;
        const { cityKey, cityName } = result;

        // get weather with cityKey
        const cityWeatherResult = await getCityWeather(cityKey);
        if (cityWeatherResult instanceof Error) throw result;

        const { text, temperature } = cityWeatherResult;

        // get weather forecast with cityKey
        const forecast = await getCityWeatherFiveDays(cityKey);
        if (forecast instanceof Error) throw result;

        // save data to state
        dispatch(
          setData({ cityKey, cityName, text, temperature, forecast })
        );

        if (redirect) navigate(`../${cityName}`);
        return true;
      } catch (error) {
        console.error(error);
        if (error instanceof Error) dispatch(setError(error.message));
        else dispatch(setError('Something went wrong'));

        return false;
      }
    },
    [dispatch, navigate]
  );

  // Load data on mount and when cityName or data.cityName changes
  useEffect(() => {
    loadData(cityName || data.cityName!, false);
  }, [cityName, loadData, data.cityName]);

  return (
    <div>
      <h2 className="m-2">Weather</h2>

      <div className="flex flex-col gap-10 justify-center">
        <WeatherForm cityName={cityName} data={data} loadData={loadData} />
        <WeatherInfo cityName={cityName} data={data} />
      </div>
    </div>
  );
}

export default WeatherPage;
