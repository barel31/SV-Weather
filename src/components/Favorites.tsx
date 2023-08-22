import { useEffect, useState } from 'react';
import { getCityWeather } from '../lib/fetchWeather';
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
    (async () => {
      const cityList = {} as WeatherData;
      for (const cityKey of Object.keys(favorites)) {
        const response = await getCityWeather(cityKey);
        cityList[favorites[cityKey]] = response!.weatherTemp;
      }
      setData(() => cityList);
    })();
  }, [favorites]);

  return (
    <main>
      <h1>Favorites Cities</h1>
      <div className="grid grid-cols-3">
        {data &&
          Object.keys(data).map((cityCode, i) => (
            <div
              key={i}
              className="border p-4 cursor-pointer"
              onClick={() => navigate(`/${cityCode}`)}>
              <h1>
                {cityCode} {data[cityCode]}°C
              </h1>
            </div>
          ))}
      </div>
    </main>
  );
}

export default Favorites;
