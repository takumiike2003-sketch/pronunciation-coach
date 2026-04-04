"use client";

import { useState, useEffect } from "react";

export default function PracticeBadge({ soundId }: { soundId: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(`practice-${soundId}`);
    if (stored) setCount(parseInt(stored, 10));
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
