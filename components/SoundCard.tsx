import Link from "next/link";
import PracticeBadge from "./PracticeBadge";

interface SoundCardProps {
  id: string;
  missionNo: number;
  symbol: string;
  name: string;
  checkWord: string;
  difficulty: number;
  description: string;
}

export default function SoundCard({ id, missionNo, symbol, name, checkWord, difficulty, description }: SoundCardProps) {
  return (
    <Link
      href={`/sounds/${id}`}
      className="group block bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md hover:shadow-blue-100/50 hover:border-blue-200 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-blue-500 bg-blue-50 rounded-md px-2 py-0.5 tracking-wide">
            STEP {missionNo}
          </span>
          <PracticeBadge soundId={id} />
        </div>
        <div className="flex gap-[3px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i <= difficulty ? "bg-blue-400" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-xl font-mono font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
        {symbol}
      </div>
      <h3 className="font-medium text-slate-700 text-[13px] leading-snug">{name}</h3>
      <p className="text-[11px] text-blue-400/80 font-mono mt-1 mb-2.5">{checkWord}</p>
      <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{description}</p>
    </Link>
  );
}
