"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function PracticeBadge({ soundId }: { soundId: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase
        .from("progress")
        .select("practice_count")
        .eq("user_id", user.id)
        .eq("mission_id", soundId)
        .single()
        .then(({ data }) => {
          if (data) setCount(data.practice_count);
        });
    });
  }, [soundId]);

  if (count === 0) return null;

  return (
    <span className={`text-[10px] font-semibold rounded-md px-1.5 py-0.5 ${
      count >= 50
        ? "bg-green-50 text-green-500"
        : "bg-blue-50 text-blue-400"
    }`}>
      {count >= 50 ? "Mastered" : `${count}x`}
    </span>
  );
}
