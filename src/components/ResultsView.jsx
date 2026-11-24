import React from 'react';
import { BarChart3, LifeBuoy, Trophy, Video, RefreshCw, ExternalLink } from 'lucide-react';
import { checkFillAnswer, gradeQuiz } from '../utils/grading';
import { getVideoLinksForQuestion } from '../utils/videoLinks';

export default function ResultsView({
  data,
  quizAnswers,
  questionSetIndex,
  usingLiveAiQuiz,
  activeAiModelLabel,
  onRegenerate,
  onRetake,
  onBackToMap,
}) {
  if (!data || !data.quiz) return null;

  const stats = gradeQuiz(data.quiz, quizAnswers);

  return (
    <section className="space-y-8">
      <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-lavender-100 text-lavender-700">
              <BarChart3 className="w-3.5 h-3.5" />
              Diagnostic Gap &amp; Mastery Report
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-800">
              {data.chapterTitle} — Performance Report
            </h1>
            <p className="text-sm text-ink-600 max-w-xl">
              Evaluated Set #{questionSetIndex} (
              {usingLiveAiQuiz ? `Live AI: ${activeAiModelLabel}` : 'Offline Chapter Bank'}) across{' '}
              {stats.mcqCount} MCQs and {stats.fillCount} Fill-in questions.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-cream-50 border border-cream-200 rounded-3xl p-4 sm:p-5 shrink-0">
            <div className="text-center px-2">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Total Score</p>
              <p className="font-display text-3xl font-extrabold text-lavender-600">
                {stats.score}/{stats.total}
              </p>
            </div>
            <div className="h-10 w-px bg-cream-200" />
            <div className="text-center px-2">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Accuracy</p>
              <p className="font-display text-3xl font-extrabold text-ink-800">{stats.accuracy}%</p>
            </div>
          </div>
        </div>

        {/* Breakdowns */}
        <div className="mt-8 pt-6 border-t border-cream-200 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-sm text-peach-700 uppercase tracking-wider">
                Section A: Multiple Choice Questions (Q1–Q{stats.mcqCount})
              </h3>
              <span className="text-xs font-bold text-ink-700">
                {stats.secAScore}/{stats.mcqCount} ({stats.secAPct}%)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.quiz.slice(0, stats.mcqCount).map((q, idx) => {
                const isCorrect = quizAnswers[idx] === q.correctIndex;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-bold text-ink-800 truncate">
                        Q{idx + 1}: {q.conceptName}
                      </p>
                      <p className="text-[11px] text-ink-500">
                        {isCorrect ? 'Correct MCQ Answer' : 'Incorrect MCQ'}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                        isCorrect ? 'bg-sage-100 text-sage-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isCorrect ? '100%' : '0%'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-sm text-lavender-700 uppercase tracking-wider">
                Section B: Fill-in-the-Answer Numerical &amp; Short Answer (Q{stats.mcqCount + 1}–Q
                {stats.total})
              </h3>
              <span className="text-xs font-bold text-ink-700">
                {stats.secBScore}/{stats.fillCount} ({stats.secBPct}%)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.quiz.slice(stats.mcqCount).map((q, idx) => {
                const qIdx = idx + stats.mcqCount;
                const isCorrect = checkFillAnswer(quizAnswers[qIdx], q);
                return (
                  <div
                    key={qIdx}
                    className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-bold text-ink-800 truncate">
                        Q{qIdx + 1}: {q.conceptName}
                      </p>
                      <p className="text-[11px] text-ink-500">
                        {isCorrect ? 'Correct Typed Answer' : 'Incorrect Typed Answer'}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                        isCorrect ? 'bg-sage-100 text-sage-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isCorrect ? '100%' : '0%'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Remediation */}
      <div className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-ink-800 flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-peach-600" />
            <span>Targeted Remediation — PW &amp; Khan Academy Video Fix</span>
          </h2>
          <p className="text-xs text-ink-600">
            Step-by-step solutions + direct <strong>Physics Wallah (PW)</strong> and{' '}
            <strong>Khan Academy</strong> video links with timestamps for every weak topic.
          </p>
        </div>

        <div className="space-y-5">
          {stats.weakIndices.length === 0 ? (
            <div className="bg-sage-50 border border-sage-200 rounded-3xl p-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-sage-700">
                Perfect Score! 100% Chapter Mastery
              </h3>
              <p className="text-xs text-ink-600">
                You scored {stats.total}/{stats.total} across both MCQs and Fill-in-the-Answer
                questions.
              </p>
            </div>
          ) : (
            stats.weakIndices.map((idx) => {
              const q = data.quiz[idx];
              const isMcq = q.type === 'mcq';
              const videoLinks = getVideoLinksForQuestion(data.subject, data.chapterTitle, q.conceptName);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isMcq
                              ? 'bg-peach-100 text-peach-700'
                              : 'bg-lavender-100 text-lavender-700'
                          }`}
                        >
                          Q{idx + 1} • {isMcq ? 'Section A MCQ Gap' : 'Section B Fill-in Gap'}
                        </span>
                        <span className="text-xs font-bold text-ink-800">{q.conceptName}</span>
                        {videoLinks.isCurated && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-sage-100 text-sage-700">
                            ★ Curated video
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink-600 font-medium">{q.question}</p>
                    </div>

                    {/* Video Fix Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      <a
                        href={videoLinks.pw}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>PW Video</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                      <a
                        href={videoLinks.khan}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Khan Academy</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>
                  </div>

                  {/* Video link description */}
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-orange-50 border border-orange-100 text-[11px] text-orange-800">
                    <Video className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <p>
                      <strong>PW (Physics Wallah):</strong> Alakh Pandey's renowned free video lectures on this exact concept •{' '}
                      <strong>Khan Academy:</strong> Step-by-step interactive explanation with practice exercises.
                      {videoLinks.isCurated
                        ? ' Direct video links with timestamps provided.'
                        : ' Searching for the best match for this concept.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-1.5 text-xs">
                    <p className="font-bold text-sage-700">Detailed Solution &amp; Concept Rule:</p>
                    <p className="text-ink-800 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Full Graded Review */}
      <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="font-display font-bold text-lg text-ink-800">
            Complete 20-Question Graded Review
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onRegenerate}
              className="px-4 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-sage-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New AI Questions</span>
            </button>
            <button
              type="button"
              onClick={onRetake}
              className="px-4 py-2 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-700 text-xs font-bold transition-colors"
            >
              Retake Quiz
            </button>
            <button
              type="button"
              onClick={onBackToMap}
              className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold transition-colors"
            >
              Back to Map
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {data.quiz.map((q, idx) => {
            const isMcq = q.type === 'mcq';
            const userVal = quizAnswers[idx];
            const isCorrect = isMcq
              ? userVal === q.correctIndex
              : checkFillAnswer(userVal, q);

            let userAnsText = 'Not answered';
            if (isMcq) {
              userAnsText =
                userVal !== undefined && q.options[userVal] !== undefined
                  ? q.options[userVal]
                  : 'Not answered';
            } else if (userVal !== undefined && String(userVal).trim() !== '') {
              userAnsText = String(userVal);
            }

            const expectedText = isMcq
              ? q.options[q.correctIndex]
              : `${q.correctAnswer}${q.unitHint ? ` (${q.unitHint})` : ''}`;

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${
                  isCorrect
                    ? 'border-sage-200 bg-sage-50/40'
                    : 'border-red-200 bg-red-50/30'
                } space-y-2 text-xs`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>
                    Q{idx + 1} [{isMcq ? 'MCQ' : 'Fill-in'}]: {q.conceptName}
                  </span>
                  <span className={isCorrect ? 'text-sage-700' : 'text-red-700'}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                <p className="text-ink-800 font-medium">{q.question}</p>
                <p className="text-ink-600">
                  <strong>Your Answer:</strong> {userAnsText}
                </p>
                <p className="text-sage-700">
                  <strong>Expected Answer:</strong> {expectedText}
                </p>
                <p className="text-ink-500 pt-1 border-t border-cream-200/80">{q.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
