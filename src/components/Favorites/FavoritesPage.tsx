import { useEffect, useState } from 'react';
import { getCityWeather } from '@/lib/fetchWeather';
import { useSelector } from 'react-redux';
import { type RootState } from '@/lib/store';
import FavoriteCard from './FavoriteCard';

type WeatherData = {
  [cityName: string]: {
    temperature: number;
  };
};

function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const [weatherData, setWeatherData] = useState<WeatherData | Error>();

  useEffect(() => {
    (async () => {
      try {
        // get weather with cityKey from favorites
        const cityList = {} as WeatherData;
        for (const cityKey of Object.keys(favorites)) {
          const result = await getCityWeather(cityKey);
          if (result instanceof Error) {
            throw result;
          }
          // create new field in cityList with cityKey as key and temperature as value
          cityList[favorites[cityKey].cityName] = {
            temperature: result.temperature,
          };
        }
        setWeatherData(cityList);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setWeatherData(error);
        } else {
          console.error('Something went wrong');
          setWeatherData(new Error('Something went wrong'));
        }
      }
    })();
  }, [favorites]);

  return (
    <div>
      <h2 className="m-2">Favorites Cities</h2>

      {weatherData instanceof Error ? (
        <h2 className="text-red-500">Failed to fetch data</h2>
      ) : !weatherData ? (
        <h2>Loading...</h2>
      ) : !Object.keys(weatherData).length ? (
        <h2>No Favorites Cities</h2>
      ) : (
        <div className="grid grid-cols-3 gap-6 p-2">
          {Object.keys(weatherData).map((cityName, i) => (
            <FavoriteCard
              key={i}
              i={i}
              cityName={cityName}
              temperature={weatherData[cityName].temperature}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
