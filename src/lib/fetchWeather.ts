export const searchCityWeather = async (city: string) => {
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

    const { Key, EnglishName } = data[0];
    const cityName = EnglishName as string;
    const cityKey = Key as string;

    return { cityKey, cityName };
    // return searchCityWeatherTemped;
  } catch (error) {
    console.log(error);
  }
};

export const getCityWeather = async (cityKey: string) => {
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
    const weatherText = data[0].WeatherText as string;
    const weatherTemp = data[0].Temperature.Metric.Value as number;

    return { weatherText, weatherTemp };
    // return getCityWeatherTemped;
  } catch (error) {
    console.log(error);
  }
};

export const getCityWeatherFiveDays = async (cityKey: string) => {
  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${
        import.meta.env.VITE_ACCUWEATHER_KEY
      }&language=en-us&details=false&metric=true`
    );
    const data = await response.json();
    if (!data) throw new Error('No data');

    // get daily forecast and save them to object
    const forecast = {} as { [key: string]: { temp: string } };
    type DailyForecast = {
      Temperature: {
        Minimum: { Value: number };
        Maximum: { Value: number };
      };
    };
    data.DailyForecasts.forEach((day: DailyForecast, i: number) => {
      // get day from date
      const dayName = new Date(data.DailyForecasts[i].Date).toLocaleDateString(
        'en-US',
        { weekday: 'long' }
      );

      // save to object
      forecast[dayName] = {
        temp: `${day.Temperature.Minimum.Value}°C - ${day.Temperature.Maximum.Value}°C`,
      };
    });

    return forecast;
    // return getCityWeatherFiveDaysTemped;
  } catch (error) {
    console.log(error);
  }
};

// const searchCityWeatherTemped = [
//   {
//     Version: 1,
//     Key: '215854',
//     Type: 'City',
//     Rank: 31,
//     LocalizedName: 'Tel Aviv',
//     EnglishName: 'Tel Aviv',
//     PrimaryPostalCode: '',
//     Region: {
//       ID: 'MEA',
//       LocalizedName: 'Middle East',
//       EnglishName: 'Middle East',
//     },
//     Country: {
//       ID: 'IL',
//       LocalizedName: 'Israel',
//       EnglishName: 'Israel',
//     },
//     AdministrativeArea: {
//       ID: 'TA',
//       LocalizedName: 'Tel Aviv',
//       EnglishName: 'Tel Aviv',
//       Level: 1,
//       LocalizedType: 'District',
//       EnglishType: 'District',
//       CountryID: 'IL',
//     },
//     TimeZone: {
//       Code: 'IDT',
//       Name: 'Asia/Jerusalem',
//       GmtOffset: 3.0,
//       IsDaylightSaving: true,
//       NextOffsetChange: '2023-10-28T23:00:00Z',
//     },
//     GeoPosition: {
//       Latitude: 32.045,
//       Longitude: 34.77,
//       Elevation: {
//         Metric: {
//           Value: 34.0,
//           Unit: 'm',
//           UnitType: 5,
//         },
//         Imperial: {
//           Value: 111.0,
//           Unit: 'ft',
//           UnitType: 0,
//         },
//       },
//     },
//     IsAlias: false,
//     SupplementalAdminAreas: [],
//     DataSets: [
//       'AirQualityCurrentConditions',
//       'AirQualityForecasts',
//       'Alerts',
//       'DailyPollenForecast',
//       'ForecastConfidence',
//       'FutureRadar',
//       'MinuteCast',
//     ],
//   },
// ];

// const getCityWeatherTemped = [
//   {
//     LocalObservationDateTime: '2023-08-22T15:22:00+03:00',
//     EpochTime: 1692706920,
//     WeatherText: 'Sunny',
//     WeatherIcon: 1,
//     HasPrecipitation: false,
//     PrecipitationType: null,
//     IsDayTime: true,
//     Temperature: {
//       Metric: {
//         Value: 32,
//         Unit: 'C',
//         UnitType: 17,
//       },
//       Imperial: {
//         Value: 90,
//         Unit: 'F',
//         UnitType: 18,
//       },
//     },
//     RealFeelTemperature: {
//       Metric: {
//         Value: 35.9,
//         Unit: 'C',
//         UnitType: 17,
//         Phrase: 'Hot',
//       },
//       Imperial: {
//         Value: 97,
//         Unit: 'F',
//         UnitType: 18,
//         Phrase: 'Hot',
//       },
//     },
//     RealFeelTemperatureShade: {
//       Metric: {
//         Value: 32.9,
//         Unit: 'C',
//         UnitType: 17,
//         Phrase: 'Hot',
//       },
//       Imperial: {
//         Value: 91,
//         Unit: 'F',
//         UnitType: 18,
//         Phrase: 'Hot',
//       },
//     },
//     RelativeHumidity: 55,
//     IndoorRelativeHumidity: 55,
//     DewPoint: {
//       Metric: {
//         Value: 21.8,
//         Unit: 'C',
//         UnitType: 17,
//       },
//       Imperial: {
//         Value: 71,
//         Unit: 'F',
//         UnitType: 18,
//       },
//     },
//     Wind: {
//       Direction: {
//         Degrees: 225,
//         Localized: 'SW',
//         English: 'SW',
//       },
//       Speed: {
//         Metric: {
//           Value: 21.4,
//           Unit: 'km/h',
//           UnitType: 7,
//         },
//         Imperial: {
//           Value: 13.3,
//           Unit: 'mi/h',
//           UnitType: 9,
//         },
//       },
//     },
//     WindGust: {
//       Speed: {
//         Metric: {
//           Value: 39.7,
//           Unit: 'km/h',
//           UnitType: 7,
//         },
//         Imperial: {
//           Value: 24.7,
//           Unit: 'mi/h',
//           UnitType: 9,
//         },
//       },
//     },
//     UVIndex: 6,
//     UVIndexText: 'High',
//     Visibility: {
//       Metric: {
//         Value: 16.1,
//         Unit: 'km',
//         UnitType: 6,
//       },
//       Imperial: {
//         Value: 10,
//         Unit: 'mi',
//         UnitType: 2,
//       },
//     },
//     ObstructionsToVisibility: '',
//     CloudCover: 0,
//     Ceiling: {
//       Metric: {
//         Value: 10363,
//         Unit: 'm',
//         UnitType: 5,
//       },
//       Imperial: {
//         Value: 34000,
//         Unit: 'ft',
//         UnitType: 0,
//       },
//     },
//     Pressure: {
//       Metric: {
//         Value: 1008.8,
//         Unit: 'mb',
//         UnitType: 14,
//       },
//       Imperial: {
//         Value: 29.79,
//         Unit: 'inHg',
//         UnitType: 12,
//       },
//     },
//     PressureTendency: {
//       LocalizedText: 'Falling',
//       Code: 'F',
//     },
//     Past24HourTemperatureDeparture: {
//       Metric: {
//         Value: 0.2,
//         Unit: 'C',
//         UnitType: 17,
//       },
//       Imperial: {
//         Value: 0,
//         Unit: 'F',
//         UnitType: 18,
//       },
//     },
//     ApparentTemperature: {
//       Metric: {
//         Value: 36.7,
//         Unit: 'C',
//         UnitType: 17,
//       },
//       Imperial: {
//         Value: 98,
//         Unit: 'F',
//         UnitType: 18,
//       },
//     },
//     WindChillTemperature: {
//       Metric: {
//         Value: 32.2,
//         Unit: 'C',
//         UnitType: 17,
//       },
//       Imperial: {
//         Value: 90,
//         Unit: 'F',
//         UnitType: 18,
//       },
//     },
//     WetBulbTemperature: {
//       Metric: {
//         Value: 24.9,
//         Unit: 'C',
//         UnitType: 17,
//       },
//       Imperial: {
//         Value: 77,
//         Unit: 'F',
//         UnitType: 18,
//       },
//     },
//     Precip1hr: {
//       Metric: {
//         Value: 0,
//         Unit: 'mm',
//         UnitType: 3,
//       },
//       Imperial: {
//         Value: 0,
//         Unit: 'in',
//         UnitType: 1,
//       },
//     },
//     PrecipitationSummary: {
//       Precipitation: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//       PastHour: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//       Past3Hours: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//       Past6Hours: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//       Past9Hours: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//       Past12Hours: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//       Past18Hours: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//       Past24Hours: {
//         Metric: {
//           Value: 0,
//           Unit: 'mm',
//           UnitType: 3,
//         },
//         Imperial: {
//           Value: 0,
//           Unit: 'in',
//           UnitType: 1,
//         },
//       },
//     },
//     TemperatureSummary: {
//       Past6HourRange: {
//         Minimum: {
//           Metric: {
//             Value: 29.6,
//             Unit: 'C',
//             UnitType: 17,
//           },
//           Imperial: {
//             Value: 85,
//             Unit: 'F',
//             UnitType: 18,
//           },
//         },
//         Maximum: {
//           Metric: {
//             Value: 34.5,
//             Unit: 'C',
//             UnitType: 17,
//           },
//           Imperial: {
//             Value: 94,
//             Unit: 'F',
//             UnitType: 18,
//           },
//         },
//       },
//       Past12HourRange: {
//         Minimum: {
//           Metric: {
//             Value: 25.9,
//             Unit: 'C',
//             UnitType: 17,
//           },
//           Imperial: {
//             Value: 79,
//             Unit: 'F',
//             UnitType: 18,
//           },
//         },
//         Maximum: {
//           Metric: {
//             Value: 34.5,
//             Unit: 'C',
//             UnitType: 17,
//           },
//           Imperial: {
//             Value: 94,
//             Unit: 'F',
//             UnitType: 18,
//           },
//         },
//       },
//       Past24HourRange: {
//         Minimum: {
//           Metric: {
//             Value: 25.9,
//             Unit: 'C',
//             UnitType: 17,
//           },
//           Imperial: {
//             Value: 79,
//             Unit: 'F',
//             UnitType: 18,
//           },
//         },
//         Maximum: {
//           Metric: {
//             Value: 34.5,
//             Unit: 'C',
//             UnitType: 17,
//           },
//           Imperial: {
//             Value: 94,
//             Unit: 'F',
//             UnitType: 18,
//           },
//         },
//       },
//     },
//     MobileLink:
//       'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
//     Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
//   },
// ];

// const getCityWeatherFiveDaysTemped = {
//   Headline: {
//     EffectiveDate: '2023-08-22T14:00:00+03:00',
//     EffectiveEpochDate: 1692702000,
//     Severity: 4,
//     Text: 'Danger of dehydration and heat stroke if outside for extended periods of time Tuesday afternoon',
//     Category: 'heat',
//     EndDate: '2023-08-22T20:00:00+03:00',
//     EndEpochDate: 1692723600,
//     MobileLink:
//       'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
//     Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us',
//   },
//   DailyForecasts: [
//     {
//       Date: '2023-08-22T07:00:00+03:00',
//       EpochDate: 1692676800,
//       Temperature: {
//         Minimum: {
//           Value: 78,
//           Unit: 'F',
//           UnitType: 18,
//         },
//         Maximum: {
//           Value: 94,
//           Unit: 'F',
//           UnitType: 18,
//         },
//       },
//       Day: {
//         Icon: 1,
//         IconPhrase: 'Sunny',
//         HasPrecipitation: false,
//       },
//       Night: {
//         Icon: 34,
//         IconPhrase: 'Mostly clear',
//         HasPrecipitation: false,
//       },
//       Sources: ['AccuWeather'],
//       MobileLink:
//         'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us',
//       Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us',
//     },
//     {
//       Date: '2023-08-23T07:00:00+03:00',
//       EpochDate: 1692763200,
//       Temperature: {
//         Minimum: {
//           Value: 77,
//           Unit: 'F',
//           UnitType: 18,
//         },
//         Maximum: {
//           Value: 89,
//           Unit: 'F',
//           UnitType: 18,
//         },
//       },
//       Day: {
//         Icon: 1,
//         IconPhrase: 'Sunny',
//         HasPrecipitation: false,
//       },
//       Night: {
//         Icon: 36,
//         IconPhrase: 'Intermittent clouds',
//         HasPrecipitation: false,
//       },
//       Sources: ['AccuWeather'],
//       MobileLink:
//         'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us',
//       Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us',
//     },
//     {
//       Date: '2023-08-24T07:00:00+03:00',
//       EpochDate: 1692849600,
//       Temperature: {
//         Minimum: {
//           Value: 77,
//           Unit: 'F',
//           UnitType: 18,
//         },
//         Maximum: {
//           Value: 88,
//           Unit: 'F',
//           UnitType: 18,
//         },
//       },
//       Day: {
//         Icon: 2,
//         IconPhrase: 'Mostly sunny',
//         HasPrecipitation: false,
//       },
//       Night: {
//         Icon: 35,
//         IconPhrase: 'Partly cloudy',
//         HasPrecipitation: false,
//       },
//       Sources: ['AccuWeather'],
//       MobileLink:
//         'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us',
//       Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us',
//     },
//     {
//       Date: '2023-08-25T07:00:00+03:00',
//       EpochDate: 1692936000,
//       Temperature: {
//         Minimum: {
//           Value: 78,
//           Unit: 'F',
//           UnitType: 18,
//         },
//         Maximum: {
//           Value: 88,
//           Unit: 'F',
//           UnitType: 18,
//         },
//       },
//       Day: {
//         Icon: 1,
//         IconPhrase: 'Sunny',
//         HasPrecipitation: false,
//       },
//       Night: {
//         Icon: 34,
//         IconPhrase: 'Mostly clear',
//         HasPrecipitation: false,
//       },
//       Sources: ['AccuWeather'],
//       MobileLink:
//         'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us',
//       Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us',
//     },
//     {
//       Date: '2023-08-26T07:00:00+03:00',
//       EpochDate: 1693022400,
//       Temperature: {
//         Minimum: {
//           Value: 77,
//           Unit: 'F',
//           UnitType: 18,
//         },
//         Maximum: {
//           Value: 89,
//           Unit: 'F',
//           UnitType: 18,
//         },
//       },
//       Day: {
//         Icon: 2,
//         IconPhrase: 'Mostly sunny',
//         HasPrecipitation: false,
//       },
//       Night: {
//         Icon: 34,
//         IconPhrase: 'Mostly clear',
//         HasPrecipitation: false,
//       },
//       Sources: ['AccuWeather'],
//       MobileLink:
//         'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us',
//       Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us',
//     },
//   ],
// };
