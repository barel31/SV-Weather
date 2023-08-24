import { useEffect, useState } from 'react';
import { getCityWeather } from '@/lib/fetchWeather';
import { useNavigate } from 'react-router-dom';

type Props = {
  favorites: {
    // cityKey:    cityName
    [key: string]: string;
  };
};

type WeatherData = {
  // cityName:   temperature
  [key: string]: number;
};

function Favorites({ favorites }: Props) {
  const navigate = useNavigate();

  const [data, setData] = useState<WeatherData>();

  useEffect(() => {
    if (!Object.keys(favorites)?.length) return;
    try {
      // get weather with cityKey from favorites
      (async () => {
        const cityList = {} as WeatherData;
        for (const cityKey of Object.keys(favorites)) {
          const response = await getCityWeather(cityKey);
          if (!response) {
            throw new Error(`Cannot get weather data from cityCode ${cityKey}`);
          }
          // create new field in cityList with cityKey as key and temperature as value
          cityList[favorites[cityKey]] = response.weatherTemp;
        }
        setData(() => cityList);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [favorites]);

  return (
    <main>
      <h2 className="text-center m-4">Favorites Cities</h2>
      {data ? (
        <div className="grid grid-cols-3 gap-6">
          {Object.keys(data).map((cityName, i) => (
            <div
              key={i}
              className="text-center border border-slate-500 p-4 cursor-pointer min-w-min rounded-xl hover:shadow-xl hover:border-[#646cff] hover:-translate-y-1 transition duration-75 hover:scale-105"
              onClick={() => navigate(`/${cityName}`)}>
              <h1 className="text-base md:text-2xl lg:text-3xl break-all font-semibold">
                {cityName}
              </h1>
              <h1 className="text-base md:text-2xl lg:text-3xl break-words leading-loose italic">
                {data[cityName]}°C
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <h2>No Favorites Cities</h2>
      )}
    </main>
  );
}

export default Favorites;
