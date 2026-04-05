"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

interface PracticeCounterProps {
  soundId: string;
}

export default function PracticeCounter({ soundId }: PracticeCounterProps) {
  const [count, setCount] = useState(0);
  const [justClicked, setJustClicked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadCount();
  }, [soundId]);

  async function loadCount() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);

    const { data } = await supabase
      .from("progress")
      .select("practice_count")
      .eq("user_id", user.id)
      .eq("mission_id", soundId)
      .single();

    if (data) setCount(data.practice_count);
  }

  async function saveCount(newCount: number) {
    if (!userId) return;
    await supabase
      .from("progress")
      .upsert({
        user_id: userId,
        mission_id: soundId,
        practice_count: newCount,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,mission_id" });
  }

  const handleMinus = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    saveCount(newCount);
  };

  const handlePractice = () => {
    const newCount = count + 1;
    setCount(newCount);
    saveCount(newCount);
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-1">Practice Log</h2>
          <p className="text-sm text-slate-500">
            {count === 0
              ? "まだ練習記録がありません"
              : <>合計 <span className="font-bold text-blue-500">{count}</span> 回練習しました</>
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {count > 0 && (
            <button
              onClick={handleMinus}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 text-lg font-medium transition-all active:scale-90"
            >
              -
            </button>
          )}
          <button
            onClick={handlePractice}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              justClicked
                ? "bg-green-500 text-white scale-95"
                : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md hover:shadow-blue-200/50 active:scale-95"
            }`}
          >
            {justClicked ? "+1" : "Practice Done"}
          </button>
        </div>
      </div>
      {count > 0 && (
        <div className="mt-4 bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(count / 50 * 100, 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 whitespace-nowrap">{count} / 50</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            {count < 10
              ? "Keep going! 継続が大事です"
              : count < 30
              ? "Good progress! いい調子です"
              : count < 50
              ? "Almost there! もうすぐマスター"
              : "Mastered! この音はマスターしました"
            }
          </p>
        </div>
      )}
    </div>
  );
}
