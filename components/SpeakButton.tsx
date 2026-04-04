"use client";

import { useState, useCallback, useEffect } from "react";

interface SpeakButtonProps {
  text: string;
  className?: string;
}

let voiceCache: SpeechSynthesisVoice | null = null;

function getNativeVoice(): SpeechSynthesisVoice | null {
  if (voiceCache) return voiceCache;
  const voices = speechSynthesis.getVoices();
  const preferred = [
    "Google US English",
    "Google UK English Female",
    "Google UK English Male",
    "Samantha",
    "Alex",
    "Daniel",
    "Karen",
    "Moira",
    "Tessa",
    "Rishi",
  ];
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name));
    if (v) { voiceCache = v; return v; }
  }
  const english = voices.find(v => v.lang === "en-US" && !v.localService)
    || voices.find(v => v.lang === "en-US")
    || voices.find(v => v.lang === "en-GB")
    || voices.find(v => v.lang.startsWith("en"));
  if (english) voiceCache = english;
  return english || null;
}

export default function SpeakButton({ text, className = "" }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => {
      if (speechSynthesis.getVoices().length > 0) setReady(true);
    };
    load();
    speechSynthesis.addEventListener("voiceschanged", load);
    return () => speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  const speak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ready) return;

    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const clean = text.replace(/\(.*?\)/g, "").replace(/（.*?）/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voice = getNativeVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [text, speaking, ready]);

  return (
    <button
      onClick={speak}
      className={`flex-shrink-0 rounded-lg flex items-center justify-center transition-all active:scale-90 ${
        speaking
          ? "bg-blue-500 text-white"
          : "bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-500"
      } ${className}`}
    >
      {speaking ? (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.8L10.7 5.2a.5.5 0 01.8.4v12.8a.5.5 0 01-.8.4L6.5 15.2H4a1 1 0 01-1-1v-4.4a1 1 0 011-1h2.5z" /></svg>
      )}
    </button>
  );
}
