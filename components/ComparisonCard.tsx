import Link from "next/link";

interface ComparisonCardProps {
  id: string;
  title: string;
  titleJa: string;
  difficulty: number;
  description: string;
}

export default function ComparisonCard({ id, title, titleJa, difficulty, description }: ComparisonCardProps) {
  return (
    <Link
      href={`/compare/${id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-rose-300 transition group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl font-mono font-bold text-rose-500 group-hover:text-rose-600">
          {title}
        </span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i <= difficulty ? "bg-orange-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 text-sm">{titleJa}</h3>
      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{description}</p>
    </Link>
  );
}
