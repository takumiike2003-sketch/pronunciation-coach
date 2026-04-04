interface Word {
  word: string;
  ipa: string;
  meaning: string;
}

interface PracticeSectionProps {
  words: Word[];
  sentences: string[];
}

export default function PracticeSection({ words, sentences }: PracticeSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">練習用の単語</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {words.map((w) => (
            <div key={w.word} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <div className="font-bold text-indigo-600 text-lg">{w.word}</div>
              <div className="text-xs text-gray-500 font-mono">{w.ipa}</div>
              <div className="text-xs text-gray-400 mt-1">{w.meaning}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">練習用の例文</h3>
        <div className="space-y-2">
          {sentences.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4 text-gray-700 leading-relaxed"
            >
              <span className="text-indigo-400 font-mono text-sm mr-2">{i + 1}.</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
