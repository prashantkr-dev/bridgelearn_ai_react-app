import React, { useState, useCallback } from 'react';
import {
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookmarkCheck,
  Bookmark,
  Clock,
  AlertCircle,
  X,
} from 'lucide-react';

// ── Status helpers ──────────────────────────────────────────────────────────
// 5 states mirroring the legend in the reference image:
//   not-visited  : grey   — question hasn't been opened yet
//   not-answered : red    — question was opened but no answer given
//   answered     : green  — answered (and not marked for review)
//   review       : blue/indigo — marked for review (no answer yet)
//   answered-review : purple  — answered AND marked for review (counts for evaluation)

function getQuestionStatus(idx, quizAnswers, visitedSet, markedSet) {
  const isAnswered =
    quizAnswers[idx] !== undefined && String(quizAnswers[idx]).trim() !== '';
  const isMarked = markedSet.has(idx);
  const isVisited = visitedSet.has(idx);

  if (isAnswered && isMarked) return 'answered-review';
  if (isAnswered) return 'answered';
  if (isMarked) return 'review';
  if (isVisited) return 'not-answered';
  return 'not-visited';
}

const STATUS_STYLES = {
  'not-visited':    'bg-[#e5e7eb] text-gray-500 border-gray-300',
  'not-answered':   'bg-[#f87171] text-white border-red-400',
  answered:         'bg-[#4ade80] text-white border-green-500',
  review:           'bg-[#818cf8] text-white border-indigo-400',
  'answered-review':'bg-[#7c3aed] text-white border-purple-600',
};

// ── Question Palette Panel ──────────────────────────────────────────────────
function QuestionPalette({ total, currentIndex, quizAnswers, visitedSet, markedSet, onSelectIndex, onSubmit }) {
  const counts = { 'not-visited': 0, 'not-answered': 0, answered: 0, review: 0, 'answered-review': 0 };
  for (let i = 0; i < total; i++) counts[getQuestionStatus(i, quizAnswers, visitedSet, markedSet)]++;

  return (
    <aside className="bg-white rounded-3xl border border-cream-200 soft-shadow flex flex-col overflow-hidden h-fit sticky top-24">
      {/* Palette Header */}
      <div className="bg-lavender-600 px-5 py-3.5">
        <h3 className="font-display font-bold text-sm text-white">Question Palette</h3>
        <p className="text-lavender-200 text-[11px] mt-0.5">Click a number to jump to that question</p>
      </div>

      {/* Grid of question numbers */}
      <div className="p-4 flex-1">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: total }, (_, i) => {
            const status = getQuestionStatus(i, quizAnswers, visitedSet, markedSet);
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelectIndex(i)}
                title={`Q${i + 1} — ${status.replace('-', ' ')}`}
                className={`
                  relative w-10 h-10 rounded-xl text-xs font-bold transition-all
                  flex items-center justify-center border-2
                  ${STATUS_STYLES[status]}
                  ${isCurrent ? 'ring-2 ring-offset-1 ring-lavender-700 scale-110' : 'hover:scale-105'}
                `}
              >
                {i + 1}
                {/* Lock icon for answered-review */}
                {status === 'answered-review' && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center border border-purple-400">
                    <BookmarkCheck className="w-2 h-2 text-purple-600" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 pb-3 space-y-2 border-t border-cream-200 pt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-2">Legend</p>
        {[
          { status: 'not-visited',    label: 'Not Visited' },
          { status: 'not-answered',   label: 'Not Answered' },
          { status: 'answered',       label: 'Answered' },
          { status: 'review',         label: 'Marked for Review' },
          { status: 'answered-review',label: 'Answered & Marked for Review\n(will be evaluated)' },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-2.5">
            <span
              className={`w-6 h-6 rounded-lg border-2 shrink-0 flex items-center justify-center ${STATUS_STYLES[status]}`}
            >
              {status === 'answered-review' && (
                <BookmarkCheck className="w-3 h-3" />
              )}
            </span>
            <span className="text-[11px] text-ink-600 leading-tight whitespace-pre-line">{label}</span>
          </div>
        ))}
      </div>

      {/* Progress counters */}
      <div className="px-4 pb-4 pt-2 border-t border-cream-200 grid grid-cols-2 gap-2">
        <div className="bg-green-50 border border-green-200 rounded-xl p-2 text-center">
          <p className="text-lg font-extrabold text-green-700">{counts.answered + counts['answered-review']}</p>
          <p className="text-[10px] text-green-600 font-semibold">Answered</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-center">
          <p className="text-lg font-extrabold text-red-600">{total - counts.answered - counts['answered-review']}</p>
          <p className="text-[10px] text-red-500 font-semibold">Remaining</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm bg-sage-600 hover:bg-sage-700 text-white cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          Submit Assessment
        </button>
      </div>
    </aside>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function CoachingQuizView({
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
  const [visitedSet, setVisitedSet] = useState(() => new Set([0]));
  const [markedSet, setMarkedSet]   = useState(() => new Set());

  if (!data || !data.quiz || !data.quiz[currentIndex]) return null;

  const q     = data.quiz[currentIndex];
  const total = data.quiz.length;
  const isMcq = q.type === 'mcq';

  const effectiveAnswered = data.quiz.filter((_, i) => {
    const v = quizAnswers[i];
    return v !== undefined && String(v).trim() !== '';
  }).length;

  const goTo = useCallback((idx) => {
    setVisitedSet(prev => { const n = new Set(prev); n.add(idx); return n; });
    onSelectIndex(idx);
  }, [onSelectIndex]);

  const toggleMarkForReview = () => {
    setMarkedSet(prev => {
      const n = new Set(prev);
      if (n.has(currentIndex)) n.delete(currentIndex);
      else n.add(currentIndex);
      return n;
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < total - 1) goTo(currentIndex + 1);
  };
  const handleSaveAndNext = () => {
    if (currentIndex < total - 1) goTo(currentIndex + 1);
  };

  const isMarked = markedSet.has(currentIndex);
  const currentStatus = getQuestionStatus(currentIndex, quizAnswers, visitedSet, markedSet);

  return (
    <section className="max-w-7xl mx-auto">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-lavender-600">
            Coaching Assessment
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            usingLiveAiQuiz ? 'bg-sage-100 text-sage-700' : 'bg-peach-100 text-peach-700'
          }`}>
            {usingLiveAiQuiz
              ? `Set #${questionSetIndex} · Live AI (${activeAiModelLabel})`
              : `Set #${questionSetIndex} · Offline`}
          </span>
          <h2 className="font-display text-lg font-bold text-ink-800">
            {data.chapterTitle}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-100 border border-cream-200 text-xs font-semibold text-ink-700">
            <Clock className="w-3.5 h-3.5 text-ink-500" />
            <span>Q {currentIndex + 1} / {total}</span>
          </div>
          <button
            type="button"
            disabled={isRegenerating}
            onClick={onRegenerate}
            className="px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-700 border border-lavender-200 text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            New Set
          </button>
          <button
            type="button"
            onClick={onExit}
            className="p-1.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-ink-500 hover:text-ink-700 transition-colors"
            title="Exit quiz"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Offline / Error notice */}
      {(lastAiError || !usingLiveAiQuiz) && (
        <div className={`mb-4 p-3 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
          lastAiError
            ? 'border-red-200 bg-red-50 text-red-700'
            : 'border-lavender-200 bg-lavender-50 text-lavender-700'
        }`}>
          <span className="leading-relaxed">
            {lastAiError
              ? `AI API fallback (${lastAiError}). Showing offline chapter questions.`
              : 'Offline Mode — Add an API key for live AI questions.'}
          </span>
          <button type="button" onClick={onOpenApiModal}
            className="px-3 py-1.5 rounded-xl bg-white border border-current text-xs font-bold shrink-0 hover:opacity-80">
            Configure AI Key
          </button>
        </div>
      )}

      {isRegenerating && (
        <div className="mb-4 p-3 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-center gap-3 text-xs font-semibold text-lavender-700">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          Generating Set #{questionSetIndex + 1} with 20 fresh questions…
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT: Question Panel ── */}
        <div className="flex-1 min-w-0 bg-white rounded-3xl border border-cream-200 soft-shadow overflow-hidden">

          {/* Section ribbon */}
          <div className={`px-6 py-2.5 flex items-center justify-between text-xs font-bold border-b ${
            isMcq
              ? 'bg-peach-50 border-peach-100 text-peach-700'
              : 'bg-lavender-50 border-lavender-100 text-lavender-700'
          }`}>
            <span>
              {isMcq
                ? 'Section A — Multiple Choice (Q1–Q10)'
                : 'Section B — Fill-in-the-Answer (Q11–Q20)'}
            </span>
            <div className="flex items-center gap-2">
              {/* Status badge */}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_STYLES[currentStatus]}`}>
                {currentStatus === 'not-visited'    && 'Not Visited'}
                {currentStatus === 'not-answered'   && 'Not Answered'}
                {currentStatus === 'answered'       && 'Answered'}
                {currentStatus === 'review'         && 'Marked for Review'}
                {currentStatus === 'answered-review'&& 'Answered & Marked'}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {/* Question meta */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isMcq ? 'bg-peach-100 text-peach-700' : 'bg-lavender-100 text-lavender-700'
              }`}>
                {isMcq ? 'MCQ' : 'Fill-in'}
              </span>
              <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-cream-100 text-ink-700">
                {q.conceptName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-orange-700">
                {q.difficulty || 'Hard'}
              </span>
            </div>

            {/* Question text */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-2">
                Question {currentIndex + 1} of {total}
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-ink-800 leading-relaxed whitespace-pre-line">
                {q.question}
              </h3>
            </div>

            {/* Answer area */}
            {isMcq ? (
              <div className="space-y-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => onSelectMcq(currentIndex, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                        isSelected
                          ? 'bg-lavender-50 border-lavender-500 ring-2 ring-lavender-500/20'
                          : 'bg-white border-cream-200 hover:border-lavender-300 hover:bg-lavender-50/40'
                      }`}
                    >
                      {/* Option circle */}
                      <span className={`w-8 h-8 rounded-full border-2 text-sm font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-lavender-600 border-lavender-600 text-white'
                          : 'border-cream-300 text-ink-500 group-hover:border-lavender-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-ink-800">{opt}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-lavender-600 ml-auto shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3 bg-cream-50 border border-cream-200 p-5 rounded-2xl">
                <label htmlFor="fill-answer-input"
                  className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1">
                  Your Answer:
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    id="fill-answer-input"
                    type="text"
                    value={quizAnswers[currentIndex] ?? ''}
                    onChange={(e) => onChangeFill(currentIndex, e.target.value)}
                    placeholder="Type your answer here…"
                    className="flex-1 bg-white border-2 border-cream-300 rounded-xl px-4 py-3 text-sm font-mono text-ink-800 focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-500/20 transition-colors"
                  />
                  <span className="px-3 py-2.5 bg-cream-200 text-ink-700 rounded-xl text-xs font-mono font-bold border border-cream-300 shrink-0">
                    {q.unitHint || 'value'}
                  </span>
                </div>
                <p className="text-[11px] text-ink-500">
                  Graded with numerical tolerance and case-insensitive matching.
                </p>
              </div>
            )}

            {/* Action row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-cream-200">
              {/* Left: Mark for review */}
              <button
                type="button"
                onClick={toggleMarkForReview}
                className={`px-4 py-2.5 rounded-2xl border-2 text-xs font-bold flex items-center gap-2 transition-all ${
                  isMarked
                    ? 'bg-indigo-100 border-indigo-400 text-indigo-700'
                    : 'bg-cream-50 border-cream-300 text-ink-600 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {isMarked
                  ? <BookmarkCheck className="w-4 h-4" />
                  : <Bookmark className="w-4 h-4" />}
                {isMarked ? 'Marked for Review' : 'Mark for Review'}
              </button>

              {/* Right: Prev / Save & Next / Submit */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  className="px-3.5 py-2.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentIndex < total - 1 ? (
                  <button
                    type="button"
                    onClick={handleSaveAndNext}
                    className="px-5 py-2.5 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    Save & Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onRequestSubmit}
                    className="px-5 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Question Palette ── */}
        <div className="hidden lg:block w-64 shrink-0">
          <QuestionPalette
            total={total}
            currentIndex={currentIndex}
            quizAnswers={quizAnswers}
            visitedSet={visitedSet}
            markedSet={markedSet}
            onSelectIndex={goTo}
            onSubmit={onRequestSubmit}
          />
        </div>
      </div>

      {/* Mobile palette — compact sticky bottom bar */}
      <div className="lg:hidden mt-6 bg-white rounded-3xl border border-cream-200 soft-shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-ink-700">Question Palette</p>
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-green-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-green-400 inline-block" />
              {effectiveAnswered} done
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" />
              {total - effectiveAnswered} left
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: total }, (_, i) => {
            const status = getQuestionStatus(i, quizAnswers, visitedSet, markedSet);
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`w-9 h-9 rounded-xl text-[11px] font-bold border-2 transition-all flex items-center justify-center
                  ${STATUS_STYLES[status]}
                  ${isCurrent ? 'ring-2 ring-offset-1 ring-lavender-600 scale-110' : 'hover:scale-105'}
                `}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onRequestSubmit}
          className="mt-3 w-full py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          Submit Assessment
        </button>
      </div>
    </section>
  );
}
