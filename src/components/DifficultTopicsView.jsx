import React, { useState } from 'react';
import { AlertTriangle, CheckSquare, Square, ArrowRight, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

export default function DifficultTopicsView({ data, onProceed, onSkip }) {
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [step, setStep] = useState('select'); // 'select' | 'prereqCheck'
  const [prereqAnswers, setPrereqAnswers] = useState({}); // topicId -> 'yes'|'no'
  const [expandedTopic, setExpandedTopic] = useState(null);

  const topics = data.chapterSubtopics || [];
  const prereqs = data.prerequisites || [];

  const toggleTopic = (id) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleProceedToPrereqCheck = () => {
    if (selectedTopics.size === 0) {
      onSkip(); // No topics selected – go straight to map
      return;
    }
    setStep('prereqCheck');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrereqAnswer = (topicId, answer) => {
    setPrereqAnswers((prev) => ({ ...prev, [topicId]: answer }));
  };

  const allAnswered = [...selectedTopics].every((id) => prereqAnswers[id]);

  const handleFinalProceed = () => {
    // Build a payload with which topics need explanation vs. are ready
    const topicsMissingPrereqs = [...selectedTopics].filter((id) => prereqAnswers[id] === 'no');
    const topicsReadyForMain = [...selectedTopics].filter((id) => prereqAnswers[id] === 'yes');
    onProceed({
      selectedTopics: [...selectedTopics],
      topicsMissingPrereqs,
      topicsReadyForMain,
    });
  };

  if (step === 'select') {
    return (
      <section className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-peach-100 text-peach-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cream-100 text-ink-700 border border-cream-200">
                  {data.board}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-lavender-100 text-lavender-700">
                  {data.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sage-100 text-sage-700">
                  {data.subject}
                </span>
              </div>
              <h1 className="font-display text-2xl font-extrabold text-ink-800">
                {data.chapterTitle}
              </h1>
              <p className="text-sm text-ink-600 leading-relaxed">
                Before we build your personalised learning path, tell us which topics in this chapter you find difficult. We'll then craft focused explanations, examples, and a mind map just for you!
              </p>
            </div>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-ink-800">
                Which topics are you finding difficult?
              </h2>
              <p className="text-xs text-ink-500 mt-0.5">
                Select all that apply — you can pick multiple. We'll focus your learning on these.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-peach-100 text-peach-700">
              {selectedTopics.size} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((topic) => {
              const isSelected = selectedTopics.has(topic.id);
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className={`text-left p-4 rounded-2xl border transition-all group ${
                    isSelected
                      ? 'border-lavender-400 bg-lavender-50 shadow-sm'
                      : 'border-cream-200 bg-cream-50/60 hover:border-lavender-200 hover:bg-lavender-50/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 ${isSelected ? 'text-lavender-600' : 'text-ink-300'}`}>
                      {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className={`font-bold text-sm leading-tight ${isSelected ? 'text-lavender-800' : 'text-ink-800'}`}>
                        {topic.title}
                      </p>
                      <p className="text-[11px] text-ink-500 leading-relaxed line-clamp-2">
                        {topic.overview}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleProceedToPrereqCheck}
              className="flex-1 py-3 px-6 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {selectedTopics.size === 0 ? (
                <span>I know all topics — take me to the chapter map</span>
              ) : (
                <>
                  <span>Continue with {selectedTopics.size} selected topic{selectedTopics.size > 1 ? 's' : ''}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="px-5 py-3 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-700 font-semibold text-sm transition-colors"
            >
              Skip — Go to full chapter
            </button>
          </div>
        </div>
      </section>
    );
  }

  // step === 'prereqCheck'
  const selectedTopicObjs = topics.filter((t) => selectedTopics.has(t.id));

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-ink-800">
              Do you know the basics needed to learn these topics?
            </h2>
            <p className="text-xs text-ink-500 mt-0.5">
              For each topic you selected, tell us if you're familiar with the subtopics/basic concepts required to learn it.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {selectedTopicObjs.map((topic) => {
          const answer = prereqAnswers[topic.id];
          const isExpanded = expandedTopic === topic.id;

          return (
            <div
              key={topic.id}
              className={`bg-white rounded-3xl border soft-shadow p-5 space-y-4 transition-all ${
                answer === 'yes'
                  ? 'border-sage-300'
                  : answer === 'no'
                  ? 'border-peach-300'
                  : 'border-cream-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lavender-600">
                    Class 11 Topic
                  </span>
                  <h3 className="font-display font-bold text-base text-ink-800">{topic.title}</h3>
                  <p className="text-xs text-ink-600 leading-relaxed">{topic.overview}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  className="p-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-ink-500 shrink-0"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isExpanded && (
                <div className="p-3 rounded-xl bg-lavender-50 border border-lavender-100 text-xs space-y-2">
                  <p className="font-bold text-lavender-700">Prerequisites needed for this topic:</p>
                  <ul className="space-y-1">
                    {prereqs.map((p) => (
                      <li key={p.id} className="flex items-center gap-2 text-ink-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-lavender-400 shrink-0" />
                        {p.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 border-t border-cream-100">
                <p className="text-xs font-semibold text-ink-700 mb-3">
                  Do you know the basic subtopics/concepts needed to learn{' '}
                  <span className="text-lavender-700">{topic.title}</span>?
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handlePrereqAnswer(topic.id, 'yes')}
                    className={`flex-1 py-2.5 px-4 rounded-xl border font-bold text-sm transition-all ${
                      answer === 'yes'
                        ? 'bg-sage-600 border-sage-600 text-white shadow-sm'
                        : 'bg-sage-50 border-sage-200 text-sage-700 hover:bg-sage-100'
                    }`}
                  >
                    ✓ Yes, I know the basics
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrereqAnswer(topic.id, 'no')}
                    className={`flex-1 py-2.5 px-4 rounded-xl border font-bold text-sm transition-all ${
                      answer === 'no'
                        ? 'bg-peach-600 border-peach-600 text-white shadow-sm'
                        : 'bg-peach-50 border-peach-200 text-peach-700 hover:bg-peach-100'
                    }`}
                  >
                    ✗ No, explain the basics first
                  </button>
                </div>
                {answer === 'yes' && (
                  <p className="mt-2 text-[11px] text-sage-700 font-medium">
                    Great! We'll go straight to the main Class 11 explanation for this topic.
                  </p>
                )}
                {answer === 'no' && (
                  <p className="mt-2 text-[11px] text-peach-700 font-medium">
                    No problem! We'll explain the foundational concepts with examples first, then move to the Class 11 topic.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep('select')}
          className="px-5 py-3 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-700 font-semibold text-sm transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleFinalProceed}
          disabled={!allAnswered}
          className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
            allAnswered
              ? 'bg-lavender-600 hover:bg-lavender-700 text-white'
              : 'bg-cream-200 text-ink-400 cursor-not-allowed'
          }`}
        >
          <span>Build My Personalised Learning Path</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
