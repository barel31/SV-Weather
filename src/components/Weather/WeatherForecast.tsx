type Props = {
  forecast: {
    [cityName: string]: {
      temperatureRange: string;
    };
  };
};

function WeatherForecast({ forecast }: Props) {
  return (
    <div className="flex flex-row overflow-auto md:justify-center">
      {forecast &&
        Object.keys(forecast).map((cityName, i) => (
          <div
            key={i}
            className={`py-6 px-3 border-r border-t border-b ${
              !i ? 'border-l' : ''
            } border-slate-900 min-w-[140px]`}>
            <h2 className="text-xl leading-loose">{cityName}</h2>
            <h2 className="max-md:text-sm">
              {forecast[cityName].temperatureRange}
            </h2>
          </div>
        ))}
    </div>
  );
}

export default WeatherForecast;
