import React from 'react';
import {
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export default function QuizView({
  data,
  questionSetIndex,
  usingLiveAiQuiz,
  activeAiModelLabel,
  lastAiError,
  isRegenerating,
  currentIndex,
  quizAnswers,
  onSelectIndex,
  onSelectMcq,
  onChangeFill,
  onRegenerate,
  onRequestSubmit,
  onExit,
  onOpenApiModal,
}) {
  if (!data || !data.quiz || !data.quiz[currentIndex]) return null;

  const q = data.quiz[currentIndex];
  const total = data.quiz.length;
  const isMcq = q.type === 'mcq';

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cream-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-lavender-600">
                20-Q Hard Assessment
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  usingLiveAiQuiz
                    ? 'bg-sage-100 text-sage-700'
                    : 'bg-peach-100 text-peach-700'
                }`}
              >
                {usingLiveAiQuiz
                  ? `Set #${questionSetIndex} • Live AI (${activeAiModelLabel})`
                  : `Set #${questionSetIndex} • Offline Chapter Bank`}
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-ink-800">
              {data.chapterTitle} — 20-Q Assessment
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isRegenerating}
              onClick={onRegenerate}
              className="px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-700 border border-lavender-200 text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>New AI Questions</span>
            </button>
            <span className="px-3 py-1.5 rounded-xl bg-cream-100 text-xs font-bold text-ink-700">
              Q{currentIndex + 1} of {total}
            </span>
            <button
              type="button"
              onClick={onExit}
              className="text-xs font-semibold text-ink-400 hover:text-ink-700 px-2 py-1"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Inline AI Notice */}
        {(lastAiError || !usingLiveAiQuiz) && (
          <div
            className={`mt-4 p-3 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              lastAiError
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-lavender-200 bg-lavender-50 text-lavender-700'
            }`}
          >
            <span className="leading-relaxed">
              {lastAiError
                ? `AI API fallback (${lastAiError}). Currently showing offline chapter questions.`
                : 'Running in Offline Mode. Add a Gemini or OpenAI API key and click "New AI Questions" for live, unlimited exam-grade questions tailored to this chapter.'}
            </span>
            <button
              type="button"
              onClick={onOpenApiModal}
              className="px-3 py-1.5 rounded-xl bg-white border border-current text-xs font-bold shrink-0 hover:opacity-80"
            >
              Configure AI Key
            </button>
          </div>
        )}

        {/* Regenerating Spinner */}
        {isRegenerating && (
          <div className="mt-4 p-4 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-center gap-3 text-xs font-semibold text-lavender-700">
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Generating Set #{questionSetIndex + 1} with 20 fresh, non-repeating questions...</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-cream-100 h-2 rounded-full overflow-hidden my-4">
          <div
            className="bg-lavender-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Section Indicator */}
        <div className="mb-4 p-3 rounded-2xl bg-cream-50 border border-cream-200 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <span className={isMcq ? 'text-peach-700' : 'text-lavender-700'}>
            {isMcq
              ? 'Section A: 10 Multiple Choice Questions (Hard / Exam Level)'
              : 'Section B: 10 Fill-in-the-Answer Questions (Numerical / Short Answer)'}
          </span>
          <span className="text-ink-500 font-normal">
            {isMcq ? 'Select 1 correct option' : 'Type exact answer'}
          </span>
        </div>

        {/* 20 Question Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6 max-h-28 overflow-y-auto">
          {data.quiz.map((_, i) => {
            const isAnswered =
              quizAnswers[i] !== undefined && String(quizAnswers[i]).trim() !== '';
            const isCurrent = i === currentIndex;
            let pillClass =
              'px-2 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center ';
            if (isCurrent) {
              pillClass += 'bg-lavender-600 text-white ring-2 ring-lavender-600/30';
            } else if (isAnswered) {
              pillClass += 'bg-sage-100 text-sage-700 border border-sage-300';
            } else {
              pillClass += 'bg-cream-100 text-ink-600 border border-cream-200 hover:bg-cream-200';
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelectIndex(i)}
                className={pillClass}
              >
                {i + 1}
                {i < 10 ? 'M' : 'F'}
              </button>
            );
          })}
        </div>

        {/* Active Question */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isMcq ? 'bg-peach-100 text-peach-700' : 'bg-lavender-100 text-lavender-700'
              }`}
            >
              {isMcq ? 'Section A • MCQ' : 'Section B • Fill-in'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cream-100 text-ink-700">
              Concept: {q.conceptName}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-peach-100 text-peach-700">
              {q.difficulty || 'Hard / Exam Level'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-ink-800 leading-relaxed whitespace-pre-line">
            Q{currentIndex + 1}. {q.question}
          </h3>

          {isMcq ? (
            <div className="space-y-3">
              {q.options.map((opt, optIdx) => {
                const isSelected = quizAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => onSelectMcq(currentIndex, optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-lavender-50 border-lavender-600 text-lavender-700 ring-2 ring-lavender-600/20'
                        : 'bg-white border-cream-200 text-ink-800 hover:bg-cream-50'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-lavender-600 border-lavender-600 text-white'
                          : 'border-cream-300 text-ink-500'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3 bg-cream-50/80 border border-cream-200 p-5 rounded-2xl">
              <label
                htmlFor="fill-answer-input"
                className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1"
              >
                Type Your Calculated / Conceptual Answer:
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  id="fill-answer-input"
                  type="text"
                  value={quizAnswers[currentIndex] ?? ''}
                  onChange={(e) => onChangeFill(currentIndex, e.target.value)}
                  placeholder="Enter answer value..."
                  className="flex-1 bg-white border border-cream-300 rounded-xl px-4 py-3 text-sm font-mono text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-600/30"
                />
                <span className="px-3 py-2 bg-cream-200/70 text-ink-700 rounded-xl text-xs font-mono font-bold text-center border border-cream-300">
                  Hint: {q.unitHint || 'number/text'}
                </span>
              </div>
              <p className="text-[11px] text-ink-500">
                Note: Answer is graded with numerical tolerance and case-insensitive text matching.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-cream-200">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => onSelectIndex(currentIndex - 1)}
            className="px-4 py-2.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < total - 1 ? (
              <button
                type="button"
                onClick={() => onSelectIndex(currentIndex + 1)}
                className="px-5 py-2.5 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onRequestSubmit}
                className="px-6 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit 20-Q Assessment</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
