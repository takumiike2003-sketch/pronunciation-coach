import Link from "next/link";
import passageData from "@/data/practice-passage.json";

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-500 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back
      </Link>

      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-200/50 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <h1 className="text-xl font-semibold text-slate-800">Practice Passage</h1>
        </div>
        <p className="text-sm text-slate-500 ml-11">18ステップの発音ポイントを含む総合練習</p>
      </div>

      {/* Passage */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Passage</h2>
        <p className="text-base text-slate-700 leading-loose bg-slate-50 rounded-xl p-6">
          {passageData.passage}
        </p>
      </div>

      {/* Sections */}
      {passageData.sections.map((section, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
          <h2 className="text-base font-semibold text-slate-800 mb-4">{section.title}</h2>
          <div className="space-y-2.5">
            {section.notes.map((note, j) => (
              <div key={j} className="flex gap-4 items-start bg-slate-50 rounded-xl p-4">
                <span className="font-semibold text-blue-500 whitespace-nowrap min-w-[130px] text-sm">
                  {note.word}
                </span>
                <span className="text-slate-600 text-[13px] leading-relaxed">
                  {note.point}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
