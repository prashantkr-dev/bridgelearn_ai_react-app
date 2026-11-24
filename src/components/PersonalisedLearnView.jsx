import React, { useState } from 'react';
import {
  BookOpen,
  Brain,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Layers,
  Zap,
  Star,
} from 'lucide-react';

// ── Mind Map SVG Component ──────────────────────────────────────────────────
function MindMap({ chapter, prereqs, topics, selectedTopicIds }) {
  const centerX = 300;
  const centerY = 220;
  const radius = 155;

  const allNodes = [
    ...prereqs.map((p, i) => ({ ...p, kind: 'prereq', i })),
    ...topics.map((t, i) => ({ ...t, kind: 'topic', i })),
  ];
  const count = allNodes.length;

  return (
    <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-4 overflow-x-auto">
      <div className="flex items-center gap-2 mb-3 px-2">
        <Brain className="w-4 h-4 text-lavender-600" />
        <h3 className="font-display font-bold text-sm text-ink-800">
          Chapter Mind Map — {chapter}
        </h3>
        <span className="ml-auto text-[11px] text-ink-400 font-medium">
          Purple = selected difficult topics
        </span>
      </div>
      <svg viewBox="0 0 600 440" className="w-full max-w-2xl mx-auto" style={{ minWidth: 340 }}>
        {/* Lines from center to nodes */}
        {allNodes.map((node, idx) => {
          const angle = (2 * Math.PI * idx) / count - Math.PI / 2;
          const nx = centerX + radius * Math.cos(angle);
          const ny = centerY + radius * Math.sin(angle);
          return (
            <line
              key={node.id}
              x1={centerX}
              y1={centerY}
              x2={nx}
              y2={ny}
              stroke={
                selectedTopicIds.includes(node.id)
                  ? '#7c3aed'
                  : node.kind === 'prereq'
                  ? '#fb923c'
                  : '#a3e635'
              }
              strokeWidth="1.5"
              strokeDasharray={node.kind === 'prereq' ? '5,3' : '0'}
              opacity="0.6"
            />
          );
        })}

        {/* Center node */}
        <circle cx={centerX} cy={centerY} r="52" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text
          x={centerX}
          y={centerY - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold"
          fontSize="9"
          fill="#4c1d95"
          fontWeight="700"
        >
          {chapter.length > 20 ? chapter.slice(0, 18) + '…' : chapter}
        </text>
        <text x={centerX} y={centerY + 10} textAnchor="middle" fontSize="7" fill="#6d28d9">
          Chapter Core
        </text>

        {/* Outer nodes */}
        {allNodes.map((node, idx) => {
          const angle = (2 * Math.PI * idx) / count - Math.PI / 2;
          const nx = centerX + radius * Math.cos(angle);
          const ny = centerY + radius * Math.sin(angle);
          const isSelected = selectedTopicIds.includes(node.id);
          const isPrereq = node.kind === 'prereq';

          const fillColor = isSelected
            ? '#7c3aed'
            : isPrereq
            ? '#fed7aa'
            : '#d9f99d';
          const strokeColor = isSelected ? '#4c1d95' : isPrereq ? '#fb923c' : '#84cc16';
          const textColor = isSelected ? '#fff' : isPrereq ? '#7c2d12' : '#365314';
          const shortTitle =
            node.title.length > 22 ? node.title.slice(0, 20) + '…' : node.title;

          return (
            <g key={node.id}>
              <ellipse
                cx={nx}
                cy={ny}
                rx="52"
                ry="22"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth="1.2"
              />
              <text
                x={nx}
                y={ny + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="6.5"
                fill={textColor}
                fontWeight="600"
              >
                {shortTitle}
              </text>
              {isPrereq && (
                <text x={nx} y={ny + 12} textAnchor="middle" fontSize="5.5" fill="#c2410c">
                  Prereq
                </text>
              )}
              {isSelected && (
                <text x={nx} y={ny + 12} textAnchor="middle" fontSize="5.5" fill="#c4b5fd">
                  ★ Difficult
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-2 text-[11px] font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-orange-200 border border-orange-400 inline-block" />
          Base Prerequisites
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-lime-200 border border-lime-500 inline-block" />
          Chapter Topics
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-violet-600 border border-violet-800 inline-block" />
          Your Difficult Topics
        </span>
      </div>
    </div>
  );
}

// ── Prerequisite Explanation Card ───────────────────────────────────────────
function PrereqCard({ prereq, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-peach-200 soft-shadow overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-peach-50/40 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-7 h-7 rounded-full bg-peach-100 text-peach-700 font-bold text-xs flex items-center justify-center shrink-0">
            {idx + 1}
          </span>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-peach-600 block">
              Basic Concept / Prerequisite
            </span>
            <p className="font-display font-bold text-sm text-ink-800 leading-tight">{prereq.title}</p>
          </div>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-ink-400 shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-ink-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-peach-100">
          <p className="text-xs text-ink-700 leading-relaxed mt-3">{prereq.overview}</p>
          {prereq.formula && (
            <div className="p-3 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono text-sage-800 whitespace-pre-line">
              <strong>Key Formula / Rule:</strong>
              {'\n'}
              {prereq.formula}
            </div>
          )}
          {prereq.example && (
            <div className="p-3 rounded-xl bg-cream-50 border border-cream-200 text-xs font-mono text-ink-800 whitespace-pre-line">
              <strong className="font-sans text-peach-700">Worked Example:</strong>
              {'\n'}
              {prereq.example}
            </div>
          )}
          {prereq.connection && (
            <div className="p-3 rounded-xl bg-lavender-50 border border-lavender-100 text-xs text-lavender-800">
              <strong>Connection to Chapter:</strong> {prereq.connection}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Topic Explanation Card ─────────────────────────────────────────────
function TopicCard({ topic, idx, isDifficult }) {
  const [open, setOpen] = useState(isDifficult); // Auto-open difficult topics
  return (
    <div
      className={`bg-white rounded-3xl border soft-shadow overflow-hidden ${
        isDifficult ? 'border-lavender-300 ring-1 ring-lavender-200' : 'border-cream-200'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-5 flex items-center justify-between gap-3 hover:bg-lavender-50/40 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isDifficult ? 'bg-lavender-600 text-white' : 'bg-lavender-100 text-lavender-700'
            }`}
          >
            {isDifficult ? <Star className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-lavender-600">
                Class 11 Topic #{idx + 1}
              </span>
              {isDifficult && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-lavender-100 text-lavender-700">
                  ★ You selected as difficult
                </span>
              )}
            </div>
            <p className="font-display font-bold text-sm sm:text-base text-ink-800 leading-tight">
              {topic.title}
            </p>
          </div>
        </div>
        {open ? (
          <ChevronDown className="w-5 h-5 text-ink-400 shrink-0" />
        ) : (
          <ChevronRight className="w-5 h-5 text-ink-400 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-cream-200/80">
          {/* Overview */}
          <div className="pt-4 space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-500">Overview</p>
            <p className="text-sm text-ink-700 leading-relaxed">{topic.overview}</p>
          </div>

          {/* Formula */}
          {topic.formula && (
            <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200 space-y-1">
              <p className="text-xs font-bold text-sage-700">Key Equation / Formula</p>
              <pre className="text-xs font-mono text-sage-800 whitespace-pre-line leading-relaxed">
                {topic.formula}
              </pre>
            </div>
          )}

          {/* Worked Example */}
          {topic.example && (
            <div className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 space-y-1">
              <p className="text-xs font-bold text-peach-700">Worked Example (Step-by-Step)</p>
              <pre className="text-xs font-mono text-ink-800 whitespace-pre-line leading-relaxed">
                {topic.example}
              </pre>
            </div>
          )}

          {/* Connection */}
          {topic.connection && (
            <div className="p-3.5 rounded-xl bg-lavender-50 border border-lavender-200 text-xs text-lavender-800">
              <strong className="font-bold">Why this matters:</strong> {topic.connection}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function PersonalisedLearnView({
  data,
  learningPlan,  // { selectedTopics, topicsMissingPrereqs, topicsReadyForMain }
  onStartQuiz,
  onBackToMap,
}) {
  if (!data) return null;

  const { selectedTopics = [], topicsMissingPrereqs = [] } = learningPlan || {};
  const prereqs = data.prerequisites || [];
  const topics = data.chapterSubtopics || [];

  // Topics that need prereq explanation first
  const needsPrereqExplanation = topicsMissingPrereqs.length > 0;

  // All topics – put difficult ones first
  const sortedTopics = [
    ...topics.filter((t) => selectedTopics.includes(t.id)),
    ...topics.filter((t) => !selectedTopics.includes(t.id)),
  ];

  return (
    <section className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
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
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-peach-100 text-peach-700">
                Personalised Path
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-800 tracking-tight">
              {data.chapterTitle}
            </h1>
            <p className="text-sm text-ink-600 leading-relaxed">{data.overview}</p>
            {selectedTopics.length > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-lavender-50 border border-lavender-200">
                <Zap className="w-4 h-4 text-lavender-600 shrink-0" />
                <p className="text-xs text-lavender-800 font-medium">
                  <strong>Your focus topics:</strong>{' '}
                  {topics
                    .filter((t) => selectedTopics.includes(t.id))
                    .map((t) => t.title)
                    .join(', ')}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onStartQuiz}
              className="px-5 py-3 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Take Personalised Quiz</span>
            </button>
            <button
              type="button"
              onClick={onBackToMap}
              className="px-4 py-2.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Chapter Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mind Map */}
      <MindMap
        chapter={data.chapterTitle}
        prereqs={prereqs}
        topics={topics}
        selectedTopicIds={selectedTopics}
      />

      {/* Stage 1 – Prerequisites / Basic Concepts (only if student said "No") */}
      {needsPrereqExplanation && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-peach-200 soft-shadow p-5">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-peach-100 text-peach-700 uppercase tracking-wider">
                Stage 1 · Foundation First
              </span>
              <h2 className="font-display text-lg font-bold text-ink-800">
                Basic Concepts & Subtopics You Need First
              </h2>
            </div>
            <p className="text-xs text-ink-600 mt-1.5">
              Since you indicated you need to review the basics, here are the foundational concepts with detailed explanations and examples. Master these before moving to the main chapter topics.
            </p>
          </div>
          <div className="space-y-3">
            {prereqs.map((p, idx) => (
              <PrereqCard key={p.id} prereq={p} idx={idx} />
            ))}
          </div>
        </div>
      )}

      {/* Stage 2 – Main Class 11 Topics */}
      <div className="space-y-4">
        <div className="bg-white rounded-3xl border border-lavender-200 soft-shadow p-5">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-lavender-100 text-lavender-700 uppercase tracking-wider">
              {needsPrereqExplanation ? 'Stage 2' : 'Core Topics'} · Class 11 NCERT
            </span>
            <h2 className="font-display text-lg font-bold text-ink-800">
              Chapter Topics — Detailed Explanations & Examples
            </h2>
          </div>
          <p className="text-xs text-ink-600 mt-1.5">
            Your difficult topics are auto-expanded below. Each card includes the full explanation, formula, and a worked step-by-step example.
          </p>
        </div>

        <div className="space-y-4">
          {sortedTopics.map((topic, idx) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              idx={idx}
              isDifficult={selectedTopics.includes(topic.id)}
            />
          ))}
        </div>
      </div>

      {/* Quiz CTA */}
      <div className="bg-lavender-50 border border-lavender-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display font-bold text-base text-lavender-700">
            Ready to test your personalised learning?
          </h3>
          <p className="text-xs text-ink-600">
            Your quiz will focus on the topics you found difficult:{' '}
            {selectedTopics.length > 0
              ? topics
                  .filter((t) => selectedTopics.includes(t.id))
                  .map((t) => t.title)
                  .join(', ')
              : 'all chapter topics'}.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold shadow-sm transition-colors shrink-0 flex items-center justify-center gap-2"
        >
          <span>Take Personalised Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
