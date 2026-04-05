"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

interface Student {
  id: string;
  email: string;
  name: string;
  created_at: string;
  progress: { mission_id: string; practice_count: number; level: number }[];
}

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [checking, setChecking] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    checkRole();
  }, []);

  async function checkRole() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/login"; return; }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "coach") {
      window.location.href = "/";
      return;
    }

    setIsCoach(true);
    setChecking(false);
    loadStudents();
  }

  async function loadStudents() {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "student")
      .order("created_at", { ascending: false });

    if (!profiles) return;

    const studentList: Student[] = [];
    for (const p of profiles) {
      const { data: progress } = await supabase
        .from("progress")
        .select("mission_id, practice_count, level")
        .eq("user_id", p.id);

      studentList.push({ ...p, progress: progress || [] });
    }
    setStudents(studentList);
  }

  async function inviteStudent(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const password = Math.random().toString(36).slice(-10) + "A1";

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      setMessage("エラー: " + error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // メール確認をスキップ
      // Note: Supabase dashboard から Email confirmations を OFF にする必要あり
      setMessage(`招待完了！\nメール: ${email}\nパスワード: ${password}\n\nこの情報を生徒に送ってください。`);
    }

    setEmail("");
    setName("");
    setLoading(false);
    setTimeout(() => loadStudents(), 2000);
  }

  if (checking) return <div className="text-center py-20 text-slate-400">読み込み中...</div>;
  if (!isCoach) return null;

  return (
    <div className="space-y-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-500 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back
      </Link>

      <div>
        <h1 className="text-xl font-bold text-slate-900">管理画面</h1>
        <p className="text-sm text-slate-400 mt-1">生徒の招待・進捗管理</p>
      </div>

      {/* Invite */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">生徒を招待する</h2>
        <form onSubmit={inviteStudent} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">名前</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                placeholder="山田太郎"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                placeholder="student@example.com"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition disabled:opacity-50"
          >
            {loading ? "招待中..." : "招待する"}
          </button>
        </form>

        {message && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 whitespace-pre-line">
            {message}
          </div>
        )}
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          生徒一覧
          <span className="text-slate-400 font-normal ml-2">{students.length}人</span>
        </h2>

        {students.length === 0 ? (
          <p className="text-sm text-slate-400 py-4">まだ生徒がいません。上のフォームから招待してください。</p>
        ) : (
          <div className="space-y-3">
            {students.map((s) => {
              const totalPractice = s.progress.reduce((sum, p) => sum + p.practice_count, 0);
              const completedSteps = s.progress.filter(p => p.practice_count >= 50).length;
              return (
                <div key={s.id} className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{s.name || "名前未設定"}</p>
                      <p className="text-xs text-slate-400">{s.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-500">{totalPractice}回</p>
                      <p className="text-[11px] text-slate-400">{completedSteps}/18 マスター</p>
                    </div>
                  </div>
                  {/* Mini progress bar */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 18 }, (_, i) => {
                      const p = s.progress.find(p => p.practice_count > 0);
                      const stepProgress = s.progress.find(pr => {
                        const allIds = ["r-l","th-voiceless","th-voiced","f-v","b-v","s-sh","w","y","ae","uh","ah","schwa","er","linking","reduction","flapping","syllable","intonation"];
                        return pr.mission_id === allIds[i];
                      });
                      const count = stepProgress?.practice_count || 0;
                      return (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            count >= 50 ? "bg-green-400" :
                            count > 0 ? "bg-blue-300" :
                            "bg-slate-200"
                          }`}
                          title={`Step ${i + 1}: ${count}回`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
