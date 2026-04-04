import Link from "next/link";
import SoundCard from "@/components/SoundCard";
import MotivationalQuote from "@/components/MotivationalQuote";
import soundsData from "@/data/sounds.json";

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="pb-2">
        <MotivationalQuote />
      </section>

      {/* Consonants */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Consonants</h2>
            <p className="text-xs text-slate-400">子音 &middot; Step 1 - 8</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {soundsData.consonants.map((sound) => (
            <SoundCard key={sound.id} {...sound} />
          ))}
        </div>
      </section>

      {/* Vowels */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-400 flex items-center justify-center">
            <span className="text-white text-xs font-bold">V</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Vowels</h2>
            <p className="text-xs text-slate-400">母音 &middot; Step 9 - 13</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {soundsData.vowels.map((sound) => (
            <SoundCard key={sound.id} {...sound} />
          ))}
        </div>
      </section>

      {/* Rhythm */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-sky-400 flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Rhythm & Flow</h2>
            <p className="text-xs text-slate-400">リズム &middot; Step 14 - 18</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {soundsData.rhythm.map((sound) => (
            <SoundCard key={sound.id} {...sound} />
          ))}
        </div>
      </section>

      {/* Practice */}
      <section>
        <Link
          href="/practice"
          className="block bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-200/60 p-6 hover:shadow-md hover:shadow-blue-100/50 transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <h3 className="font-semibold text-slate-800">Practice Passage</h3>
          </div>
          <p className="text-sm text-slate-500 ml-11">
            18ステップの発音ポイントを含む総合練習。セクションごとの解説付き。
          </p>
        </Link>
      </section>
    </div>
  );
}
