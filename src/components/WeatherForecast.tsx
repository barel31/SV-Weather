type Props = {
  forecast: { [key: string]: { temp: string } };
};

function WeatherForecast({ forecast }: Props) {
  return (
    <div className="flex flex-row max-w-[100%] overflow-auto m-auto">
      {forecast &&
        Object.keys(forecast).map((key, i) => (
          <div
            key={i}
            className={`p-6 border-r border-t border-b ${
              !i ? 'border-l' : ''
            } border-slate-900 min-w-[140px]`}>
            <h2>{key}</h2>
            <h2>{forecast[key].temp}</h2>
          </div>
        ))}
    </div>
  );
}

export default WeatherForecast;
