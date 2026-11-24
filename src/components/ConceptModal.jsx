import React from 'react';
import { X, BookOpen, GitCommit, PenTool, CheckCircle, Circle } from 'lucide-react';

export default function ConceptModal({ item, isSubtopic, isUnderstood, onClose, onToggleUnderstood }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink-800/40 backdrop-blur-sm transition-opacity"
      />
      <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-cream-50 shadow-2xl border-l border-cream-200 flex flex-col z-10 overflow-hidden">
        <div className="bg-white px-6 py-5 border-b border-cream-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isSubtopic
                    ? 'bg-lavender-100 text-lavender-700'
                    : 'bg-peach-100 text-peach-700'
                }`}
              >
                {isSubtopic ? 'Class 11 Core Subtopic Card' : 'Base Prerequisite Card'}
              </span>
              <span className="text-xs font-medium text-ink-500">
                {item.grade || (isSubtopic ? 'Grade 11 Core' : 'Grade 8-10 Foundation')}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-ink-800">
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-ink-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white rounded-2xl border border-cream-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-sage-700 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>1. Core Theory Explanation</span>
            </div>
            <p className="text-sm text-ink-800 leading-relaxed">{item.overview}</p>
            <div className="mt-3 p-3.5 rounded-xl bg-sage-50 border border-sage-200 text-xs font-mono text-sage-700 whitespace-pre-wrap">
              {item.formula}
            </div>
          </div>

          <div className="bg-lavender-50 rounded-2xl border border-lavender-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-lavender-700 font-bold text-xs uppercase tracking-wider">
              <GitCommit className="w-4 h-4" />
              <span>2. Application &amp; Conceptual Connection</span>
            </div>
            <p className="text-sm text-ink-800 leading-relaxed">{item.connection}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-peach-700 font-bold text-xs uppercase tracking-wider px-1">
              <PenTool className="w-4 h-4" />
              <span>3. Solved NCERT Numerical / Example</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-cream-200 text-xs font-mono text-ink-800 leading-relaxed whitespace-pre-line">
              {item.example}
            </div>
          </div>
        </div>

        <div className="bg-white px-6 py-4 border-t border-cream-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onToggleUnderstood(item.id, isSubtopic)}
            className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            {isUnderstood ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            <span>{isUnderstood ? 'Marked as Understood' : 'Mark as Understood'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
