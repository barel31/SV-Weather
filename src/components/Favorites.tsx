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
    try {
      (async () => {
        const cityList = {} as WeatherData;
        for (const cityKey of Object.keys(favorites)) {
          const response = await getCityWeather(cityKey);
          if (!response) {
            throw new Error('Cannot get city weather data');
          }
          cityList[favorites[cityKey]] = response!.weatherTemp;
        }
        setData(() => cityList);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [favorites]);

  return (
    <main>
      <h2 className="m-4">Favorites Cities</h2>
      <div className="grid grid-cols-3 gap-3">
        {data &&
          Object.keys(data).map((cityCode, i) => (
            <div
              key={i}
              className="border p-4 cursor-pointer min-w-min"
              onClick={() => navigate(`/${cityCode}`)}>
              <h1 className="max-md:text-xl break-words">
                {cityCode} {data[cityCode]}°C
              </h1>
            </div>
          ))}
      </div>
    </main>
  );
}

export default Favorites;
