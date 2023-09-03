import { useEffect, useState } from 'react';
import { getCityWeather } from '@/lib/fetchWeather';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '@/lib/store';

type WeatherData = {
  // cityName:   temperature
  [key: string]: number;
};

function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites);

  const [weatherData, setWeatherData] = useState<WeatherData | Error>();

  const navigate = useNavigate();

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
          cityList[favorites[cityKey]] = result.weatherTemp;
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
      {weatherData instanceof Error ? (
        <h2 className="text-red-500">Failed to fetch data</h2>
      ) : !weatherData ? (
        <h2>Loading...</h2>
      ) : !Object.keys(weatherData).length ? (
        <h2>No Favorites Cities</h2>
      ) : (
        <>
          <h2 className="m-2">Favorites Cities</h2>

          <div className="grid grid-cols-3 gap-6 p-2">
            {Object.keys(weatherData).map((cityName, i) => (
              <div
                key={i}
                className="border border-slate-500 p-4 cursor-pointer min-w-min rounded-xl hover:shadow-xl hover:border-[#646cff] hover:-translate-y-1 transition duration-75 hover:scale-105
                bg-gradient-to-br from-[#646cff] to-[#a6b1ff]
                hover:from-[#a6b1ff] hover:to-[#646cff]"
                onClick={() => navigate(`/${cityName}`)}>
                <h1 className="text-base md:text-2xl lg:text-3xl break-all font-semibold">
                  {cityName}
                </h1>
                <h1 className="text-base md:text-2xl lg:text-3xl break-words leading-loose italic">
                  {weatherData[cityName]}°C
                </h1>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
