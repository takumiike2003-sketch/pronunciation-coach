import { notFound } from "next/navigation";
import Link from "next/link";
import PracticeCounter from "@/components/PracticeCounter";
import SentenceList from "@/components/SentenceList";
import WordGrid from "@/components/WordGrid";
import soundsData from "@/data/sounds.json";

const allSounds = [...soundsData.consonants, ...soundsData.vowels, ...soundsData.rhythm];

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allSounds.map((s) => ({ id: s.id }));
}

export default async function SoundPage({ params }: PageProps) {
  const { id } = await params;
  const sound = allSounds.find((s) => s.id === id);
  if (!sound) notFound();

  const category =
    soundsData.consonants.find((s) => s.id === id) ? "Consonant" :
    soundsData.vowels.find((s) => s.id === id) ? "Vowel" : "Rhythm";

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-500 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold text-blue-500 bg-blue-50 rounded-md px-2 py-0.5 tracking-wide">
                STEP {sound.missionNo}
              </span>
              <span className="text-[11px] text-slate-400">{category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono mb-1">
              {sound.symbol}
            </h1>
            <p className="text-base text-slate-600">{sound.name}</p>
            <p className="text-xs text-blue-400 font-mono mt-1">Check: {sound.checkWord}</p>
          </div>
          <div className="flex gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= sound.difficulty ? "bg-blue-400" : "bg-slate-200"}`} />
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{sound.description}</p>
      </div>

      {/* Practice Counter */}
      <PracticeCounter soundId={id} />

      {/* Step by Step */}
      {"steps" in sound && sound.steps && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
          <h2 className="text-base font-semibold text-slate-800 mb-5">How to Practice</h2>
          <div className="space-y-5">
            {sound.steps.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-50 text-blue-500 font-bold flex items-center justify-center text-sm">
                  {s.step}
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-medium text-slate-800 text-sm mb-0.5">{s.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {"commonMistakes" in sound && sound.commonMistakes && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Common Mistakes</h2>
          <ul className="space-y-2.5">
            {sound.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                <span className="text-red-400 mt-px text-xs">&#x2717;</span>
                <span className="leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Japanese Comparison */}
      {"japaneseComparison" in sound && sound.japaneseComparison && (
        <div className="bg-blue-50/50 rounded-2xl border border-blue-200/50 p-6 sm:p-8">
          <h2 className="text-base font-semibold text-blue-700 mb-3">Japanese Comparison</h2>
          <p className="text-[13px] text-slate-600 leading-relaxed">{sound.japaneseComparison}</p>
        </div>
      )}

      {/* YouTube Videos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <h2 className="text-base font-semibold text-slate-800 mb-5">Reference Videos</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2 tracking-wide">JAPANESE</p>
            {sound.youtubeJaId ? (
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                <iframe
                  src={`https://www.youtube.com/embed/${sound.youtubeJaId}`}
                  title="Japanese explanation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center">
                <p className="text-sm text-slate-400">Coming soon</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2 tracking-wide">ENGLISH</p>
            {sound.youtubeEnId ? (
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                <iframe
                  src={`https://www.youtube.com/embed/${sound.youtubeEnId}`}
                  title="English explanation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center">
                <p className="text-sm text-slate-400">Coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Words */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Words</h2>
        <WordGrid words={sound.words} />
      </div>

      {/* Sentences */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Practice Sentences</h2>
        <SentenceList sentences={sound.sentences} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        {(() => {
          const idx = allSounds.findIndex((s) => s.id === id);
          const prev = idx > 0 ? allSounds[idx - 1] : null;
          const next = idx < allSounds.length - 1 ? allSounds[idx + 1] : null;
          return (
            <>
              {prev ? (
                <Link href={`/sounds/${prev.id}`} className="text-sm text-slate-400 hover:text-blue-500 transition">
                  &larr; Step {prev.missionNo}
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/sounds/${next.id}`} className="text-sm text-slate-400 hover:text-blue-500 transition">
                  Step {next.missionNo} &rarr;
                </Link>
              ) : (
                <Link href="/practice" className="text-sm text-blue-500 hover:text-blue-600 font-medium transition">
                  Practice Passage &rarr;
                </Link>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}
