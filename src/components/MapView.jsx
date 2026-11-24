import React from 'react';
import {
  ClipboardCheck,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  BookOpen,
} from 'lucide-react';

export default function MapView({
  data,
  usingLiveAi,
  activeAiModelLabel,
  understoodPrereqs,
  understoodTopics,
  onToggleUnderstood,
  onOpenModal,
  onStartQuiz,
  onSwitchChapter,
}) {
  if (!data) return null;

  const totalPrereqs = data.prerequisites.length || 4;
  const prereqPct = Math.min(100, Math.round((understoodPrereqs.size / totalPrereqs) * 100));
  const totalTopics = data.chapterSubtopics.length || 4;
  const topicPct = Math.min(100, Math.round((understoodTopics.size / totalTopics) * 100));

  return (
    <section className="space-y-8">
      <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cream-100 text-ink-700 border border-cream-200">
                {data.board}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-lavender-100 text-lavender-700">
                {data.grade}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sage-100 text-sage-700">
                {data.subject}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  usingLiveAi ? 'bg-sage-100 text-sage-700' : 'bg-peach-100 text-peach-700'
                }`}
              >
                {usingLiveAi ? `Live AI (${activeAiModelLabel})` : 'Offline NCERT Engine'}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-800 tracking-tight">
              {data.chapterTitle}
            </h1>
            <p className="text-sm text-ink-600 leading-relaxed">{data.overview}</p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onStartQuiz}
              className="px-5 py-3 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Start 20-Question Hard Quiz</span>
            </button>
            <button
              type="button"
              onClick={onSwitchChapter}
              className="px-4 py-2.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Switch Chapter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage 1: Base Prerequisites */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl border border-cream-200 soft-shadow p-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-peach-100 text-peach-700 uppercase tracking-wider">
                Stage 1
              </span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink-800">
                Earlier-Grade Base Prerequisites
              </h2>
            </div>
            <p className="text-xs text-ink-600 mt-0.5">
              Foundational concepts from Grades 7–10 needed before tackling this Class 11 chapter.
            </p>
          </div>
          <div className="sm:w-52 shrink-0 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-ink-600">Base Readiness</span>
              <span className="text-sage-700">
                {understoodPrereqs.size} / {totalPrereqs} Ready
              </span>
            </div>
            <div className="w-full bg-cream-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-sage-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${prereqPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.prerequisites.map((p, idx) => {
            const isUnderstood = understoodPrereqs.has(p.id);
            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl border ${
                  isUnderstood ? 'border-sage-300 bg-sage-50/40' : 'border-cream-200'
                } soft-shadow p-5 flex flex-col justify-between gap-4 card-hover`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-peach-100 text-peach-700">
                      Base Prereq #{idx + 1} • {p.grade || 'Grade 8-10'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleUnderstood(p.id, false)}
                      title="Toggle Understood"
                      className={`p-1 rounded-lg text-xs font-semibold transition-colors ${
                        isUnderstood
                          ? 'text-sage-700 bg-sage-100'
                          : 'text-ink-400 hover:text-sage-600 bg-cream-100'
                      }`}
                    >
                      {isUnderstood ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <h3 className="font-display font-bold text-base text-ink-800">{p.title}</h3>
                  <p className="text-xs text-ink-600 leading-relaxed">{p.overview}</p>
                </div>
                <div className="pt-3 border-t border-cream-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-ink-500">
                    Bridge Formulas &amp; Examples
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenModal(p, false)}
                    className="px-3 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-700 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Deep Dive Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage 2: Chapter Subtopics */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl border border-cream-200 soft-shadow p-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-lavender-100 text-lavender-700 uppercase tracking-wider">
                Stage 2
              </span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink-800">
                Actual Class 11 Chapter Subtopics (NCERT Core Theory &amp; Examples)
              </h2>
            </div>
            <p className="text-xs text-ink-600">
              Core subtopics taught in this chapter with key formulas, rules, and worked examples.
            </p>
          </div>
          <div className="sm:w-52 shrink-0 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-ink-600">Core Mastery</span>
              <span className="text-lavender-700">
                {understoodTopics.size} / {totalTopics} Ready
              </span>
            </div>
            <div className="w-full bg-cream-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-lavender-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${topicPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.chapterSubtopics.map((t, idx) => {
            const isUnderstood = understoodTopics.has(t.id);
            return (
              <div
                key={t.id}
                className={`bg-white rounded-3xl border ${
                  isUnderstood ? 'border-lavender-200 bg-lavender-50/30' : 'border-cream-200'
                } soft-shadow p-6 flex flex-col justify-between gap-4 card-hover`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-lavender-100 text-lavender-700">
                      Class 11 Subtopic #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleUnderstood(t.id, true)}
                      title="Toggle Subtopic Mastery"
                      className={`p-1 rounded-lg text-xs font-semibold transition-colors ${
                        isUnderstood
                          ? 'text-lavender-700 bg-lavender-100'
                          : 'text-ink-400 hover:text-lavender-600 bg-cream-100'
                      }`}
                    >
                      {isUnderstood ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink-800">{t.title}</h3>
                  <p className="text-xs text-ink-700 leading-relaxed">{t.overview}</p>
                  <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono text-sage-700 leading-normal whitespace-pre-line">
                    <strong>Key Equation / Rule:</strong>
                    {'\n'}
                    {t.formula}
                  </div>
                  <div className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 text-xs font-mono text-ink-800 leading-normal whitespace-pre-line">
                    <strong className="text-peach-700 font-sans font-bold">Worked Example:</strong>
                    {'\n'}
                    {t.example}
                  </div>
                </div>

                <div className="pt-3 border-t border-cream-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-ink-500">
                    Interactive Subtopic Drawer
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenModal(t, true)}
                    className="px-3.5 py-2 rounded-xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Subtopic Card</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz CTA */}
      <div className="bg-lavender-50 border border-lavender-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display font-bold text-base text-lavender-700">
            Ready to test both Base Prerequisites &amp; Core Class 11 Mastery?
          </h3>
          <p className="text-xs text-ink-600">
            20 Unique Hard Questions: 10 MCQs (Exam / JEE level) + 10 Fill-in-the-Answer numericals
            &amp; short answers.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold shadow-sm transition-colors shrink-0 flex items-center justify-center gap-2"
        >
          <span>Launch 20-Question Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
