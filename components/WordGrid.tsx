"use client";

import SpeakButton from "./SpeakButton";

interface Word {
  word: string;
  meaning1: string;
  pair?: string;
  meaning2?: string;
}

export default function WordGrid({ words }: { words: Word[] }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-slate-400 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.8L10.7 5.2a.5.5 0 01.8.4v12.8a.5.5 0 01-.8.4L6.5 15.2H4a1 1 0 01-1-1v-4.4a1 1 0 011-1h2.5z" /></svg>
        タップで発音を聞く
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {words.map((w, i) => {
          const pair = "pair" in w ? w.pair : undefined;
          const meaning2 = "meaning2" in w ? w.meaning2 : undefined;
          return (
            <div key={i} className="bg-slate-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-0.5">
                <SpeakButton text={w.word} className="w-7 h-7" />
                <span className="font-semibold text-slate-800 text-sm">{w.word}</span>
              </div>
              {pair && (
                <div className="flex items-center gap-2 mb-0.5">
                  <SpeakButton text={pair} className="w-7 h-7" />
                  <span className="text-xs text-blue-400 font-medium">vs {pair}</span>
                </div>
              )}
              <div className="text-[11px] text-slate-400 ml-9">
                {w.meaning1}
                {meaning2 && ` / ${meaning2}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
