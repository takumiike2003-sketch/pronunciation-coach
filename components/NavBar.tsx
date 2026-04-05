"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function NavBar() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setRole(data?.role || null);
          setLoading(false);
        });
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) return null;

  return (
    <div className="flex gap-1 items-center">
      <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
        一覧
      </Link>
      <Link href="/practice" className="text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
        総合練習
      </Link>
      {role === "coach" && (
        <Link href="/admin" className="text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition font-medium">
          管理
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="text-sm text-slate-400 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition ml-1"
      >
        ログアウト
      </button>
    </div>
  );
}
