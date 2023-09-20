import { useRef } from 'react';
import { type WeatherDataState } from '@/lib/slices/weatherDataSlice';

type Props = {
  cityName?: string;
  data: WeatherDataState;
  loadData: (city: string, redirect?: boolean) => Promise<boolean>;
};

function WeatherForm({ cityName, data, loadData }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadData(ref.current!.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-4 flex-wrap w-full justify-center">
      <input
        ref={ref}
        type="text"
        placeholder="City Name"
        className="px-4 py-3 rounded-sm bg-[#3B3B3B]"
        defaultValue={cityName || data.cityName}
        required
        pattern="^[a-zA-Z\s]+$"
      />
      <button type="submit" className="border-slate-600">
        Search
      </button>

      {data.error && (
        <span className="text-red-500 bottom-5 w-full">{data.error}</span>
      )}
    </form>
  );
}

export default WeatherForm;
