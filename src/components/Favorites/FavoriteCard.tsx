import { useNavigate } from 'react-router-dom';

type Props = {
  cityName: string;
  i: number;
  temperature: number;
};

function FavoriteCard({ cityName, i, temperature }: Props) {
  const navigate = useNavigate();

  return (
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
        {temperature}°C
      </h1>
    </div>
  );
}

export default FavoriteCard;
