"use client";

import { useState } from "react";
import SpeakButton from "./SpeakButton";

interface SentenceListProps {
  sentences: { en: string; ja: string }[];
}

export default function SentenceList({ sentences }: SentenceListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-2">
      <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        タップで日本語訳 ・ スピーカーで音声再生
      </p>
      {sentences.map((s, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-xl px-4 py-3 transition-all duration-200 ${
              isOpen
                ? "bg-blue-50 border border-blue-200/60"
                : "bg-slate-50 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <SpeakButton text={s.en} className="w-8 h-8" />
              <div
                className="flex-1 cursor-pointer select-none"
                onClick={() => toggle(i)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-700 leading-relaxed">{s.en}</p>
                  <span className={`text-[10px] flex-shrink-0 ml-2 transition-colors ${isOpen ? "text-blue-400" : "text-slate-300"}`}>
                    {isOpen ? "JA" : "訳"}
                  </span>
                </div>
                {isOpen && (
                  <p className="text-[12px] text-blue-500/70 mt-1 leading-relaxed">
                    {s.ja}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
