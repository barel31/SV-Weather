import { WeatherDataState } from './slices/weatherDataSlice';

/** Fetches weather data for a given city name, city key, or both.
 * @param cityName - The name of the city to fetch weather data for.
 * @param cityKey - The key of the city to fetch weather data for.
 * @return A promise that resolves to an object containing the weather data.
 * */
export const searchCityWeather = async (city: string) => {
  // return {
  //   cityKey: searchCityWeatherTemp[0].Key,
  //   cityName: searchCityWeatherTemp[0].EnglishName,
  // };

  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${
        import.meta.env.VITE_ACCUWEATHER_KEY
      }&q=${city}&lanuage=en-us&details=false`
    );
    const data = await response.json();
    if (!data?.length) {
      throw new Error(`No data found for city ${city}`);
    }
    const { Key: cityKey, EnglishName: cityName } = data[0];
    const { EnglishName: countryName } = data[0].Country;

    return { cityKey, cityName, countryName } as {
      cityKey: string;
      cityName: string;
      countryName: string;
    };
  } catch (error) {
    if (error instanceof Error) return error;
    else return new Error('Something went wrong');
  }
};

/** * Fetches current weather conditions for a given city key.
 * @param cityKey - The key of the city to fetch weather data for.
 * @return A promise that resolves to an object containing the weather text and temperature.
 * */
export const getCityWeather = async (cityKey: string) => {
  // return {
  //   weatherText: getCityWeatherTemp[0].WeatherText,
  //   weatherTemp: getCityWeatherTemp[0].Temperature.Metric.Value,
  // };

  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${
        import.meta.env.VITE_ACCUWEATHER_KEY
      }&language=en-us&details=false`
    );
    const data = await response.json();
    if (!data?.length) {
      throw new Error(`No weather data for cityKey ${cityKey}`);
    }
    const text = data[0].WeatherText as string;
    const temperature = data[0].Temperature.Metric.Value as number;

    return { text, temperature };
  } catch (error) {
    if (error instanceof Error) return error;
    else return new Error('Something went wrong');
  }
};

/** Fetches 5-day weather forecast for a given city key.
 * @param cityKey - The key of the city to fetch the 5-day weather forecast for.
 * @return A promise that resolves to an object containing the daily forecast.
 * */
export const getCityWeatherFiveDays = async (cityKey: string) => {
  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${
        import.meta.env.VITE_ACCUWEATHER_KEY
      }&language=en-us&details=false&metric=true`
    );
    const data: { DailyForecasts: [DailyForecast] } = await response.json();
    if (!data) throw new Error('No data');

    type DailyForecast = {
      Date: string;
      Temperature: {
        Minimum: { Value: number };
        Maximum: { Value: number };
      };
    };
    // get daily forecast and save them to object
    const forecast = {} as NonNullable<WeatherDataState['forecast']>;
    // const data = getCityWeatherFiveDaysTemp;
    data.DailyForecasts.forEach((day: DailyForecast, i: number) => {
      // get day from date
      const dayName = new Date(data.DailyForecasts[i].Date).toLocaleDateString(
        'en-US',
        { weekday: 'long' }
      );

      // save to object
      forecast[dayName] = {
        temperatureRange: `${day.Temperature.Minimum.Value}°C - ${day.Temperature.Maximum.Value}°C`,
      };
    });

    return forecast;
  } catch (error) {
    if (error instanceof Error) return error;
    else return new Error('Something went wrong');
  }
};
