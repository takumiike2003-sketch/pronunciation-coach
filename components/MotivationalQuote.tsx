"use client";

import { useState, useEffect } from "react";

const quotes = [
  { en: "The limits of my language mean the limits of my world.", ja: "言語の限界が、世界の限界である。", by: "Ludwig Wittgenstein", byJa: "ルートヴィヒ・ヴィトゲンシュタイン" },
  { en: "One language sets you in a corridor. Two languages open every door along the way.", ja: "一つの言語は廊下に立たせる。二つの言語は全ての扉を開く。", by: "Frank Smith", byJa: "フランク・スミス" },
  { en: "To have another language is to possess a second soul.", ja: "もう一つの言語を持つことは、もう一つの魂を持つこと。", by: "Charlemagne", byJa: "カール大帝" },
  { en: "Language is the road map of a culture.", ja: "言語はその文化へのロードマップだ。", by: "Rita Mae Brown", byJa: "リタ・メイ・ブラウン" },
  { en: "If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart.", ja: "相手の分かる言語で話せば頭に届く。相手の母語で話せば心に届く。", by: "Nelson Mandela", byJa: "ネルソン・マンデラ" },
  { en: "The greatest glory in living lies not in never falling, but in rising every time we fall.", ja: "人生最大の栄光は、倒れないことではなく、倒れるたびに起き上がることにある。", by: "Nelson Mandela", byJa: "ネルソン・マンデラ" },
  { en: "It does not matter how slowly you go as long as you do not stop.", ja: "どれだけゆっくりでもいい。止まらなければ。", by: "Confucius", byJa: "孔子" },
  { en: "The only way to do great work is to love what you do.", ja: "偉大な仕事をする唯一の方法は、自分のやることを愛すること。", by: "Steve Jobs", byJa: "スティーブ・ジョブズ" },
  { en: "Success is not final, failure is not fatal: it is the courage to continue that counts.", ja: "成功は終わりではなく、失敗は致命的ではない。大切なのは続ける勇気だ。", by: "Winston Churchill", byJa: "ウィンストン・チャーチル" },
  { en: "The secret of getting ahead is getting started.", ja: "先に進む秘訣は、始めること。", by: "Mark Twain", byJa: "マーク・トウェイン" },
  { en: "I have not failed. I've just found 10,000 ways that won't work.", ja: "失敗したのではない。うまくいかない方法を1万通り見つけただけだ。", by: "Thomas Edison", byJa: "トーマス・エジソン" },
  { en: "In the middle of difficulty lies opportunity.", ja: "困難の中に、機会がある。", by: "Albert Einstein", byJa: "アルベルト・アインシュタイン" },
  { en: "What we think, we become.", ja: "思考が、自分自身を作る。", by: "Buddha", byJa: "ブッダ" },
  { en: "The best time to plant a tree was 20 years ago. The second best time is now.", ja: "木を植える最良の時は20年前だった。次に良い時は今だ。", by: "Chinese Proverb", byJa: "中国のことわざ" },
  { en: "You miss 100% of the shots you don't take.", ja: "打たなかったシュートは100%外れる。", by: "Wayne Gretzky", byJa: "ウェイン・グレツキー" },
  { en: "Knowledge of languages is the doorway to wisdom.", ja: "語学の知識は知恵への入口である。", by: "Roger Bacon", byJa: "ロジャー・ベーコン" },
  { en: "A different language is a different vision of life.", ja: "異なる言語は、異なる人生の景色だ。", by: "Federico Fellini", byJa: "フェデリコ・フェリーニ" },
  { en: "Learning is a treasure that will follow its owner everywhere.", ja: "学びは、持ち主をどこへでも追いかける宝だ。", by: "Chinese Proverb", byJa: "中国のことわざ" },
  { en: "Believe you can and you're halfway there.", ja: "できると信じれば、もう半分たどり着いている。", by: "Theodore Roosevelt", byJa: "セオドア・ルーズベルト" },
  { en: "The beautiful thing about learning is that no one can take it away from you.", ja: "学びの美しさは、誰にも奪われないこと。", by: "B.B. King", byJa: "B.B.キング" },
];

export default function MotivationalQuote() {
  const [index, setIndex] = useState(-1);
  const [showJa, setShowJa] = useState(false);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * quotes.length));
  }, []);

  if (index < 0) return null;

  const q = quotes[index];

  return (
    <div
      className={`cursor-pointer select-none rounded-2xl p-5 transition-all duration-200 border ${
        showJa ? "bg-blue-50 border-blue-200/60" : "bg-white border-slate-200/80 hover:border-slate-300"
      }`}
      onClick={() => setShowJa(!showJa)}
    >
      <p className={`text-lg sm:text-xl font-semibold italic leading-relaxed transition-colors ${
        showJa ? "text-blue-600" : "text-slate-700"
      }`}>
        &ldquo;{q.en}&rdquo;
        <span className={`not-italic text-sm sm:text-base font-medium ml-1 ${
          showJa ? "text-blue-500" : "text-slate-400"
        }`}>
          &mdash; {showJa ? q.byJa : q.by}
        </span>
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span className={`text-xs rounded-lg px-2.5 py-1 font-medium flex-shrink-0 ${
          showJa ? "bg-blue-100 text-blue-500" : "bg-slate-100 text-slate-400"
        }`}>
          日本語訳
        </span>
        <p className={`text-sm leading-relaxed transition-all duration-300 ${
          showJa ? "text-blue-400" : "text-slate-300"
        }`}>
          {showJa ? q.ja : "タップで表示"}
        </p>
      </div>
    </div>
  );
}
