import React from 'react';
import { GitMerge, KeyRound } from 'lucide-react';

export default function Header({
  currentView,
  onNavigate,
  chapterData,
  quizSubmitted,
  aiConfig,
  onOpenApiModal,
}) {
  const hasKey = Boolean(aiConfig?.apiKey);
  const keyLabel = hasKey
    ? aiConfig.provider === 'gemini'
      ? `Gemini (${aiConfig.geminiModel})`
      : `AI (${aiConfig.openaiModel})`
    : 'AI API Key';

  const navSteps = [
    { id: 'setup', label: '1. Topic Setup', disabled: false },
    { id: 'map', label: '2. Two-Stage Map', disabled: !chapterData },
    { id: 'quiz', label: '3. 20-Q Assessment', disabled: !chapterData },
    { id: 'results', label: '4. Gap Remediation', disabled: !chapterData || !quizSubmitted },
  ];

  return (
    <header className="sticky top-0 z-30 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onNavigate('setup')}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 rounded-2xl bg-lavender-100 border border-lavender-200 flex items-center justify-center text-lavender-700 group-hover:scale-105 transition-transform">
            <GitMerge className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight text-ink-800">
              Bridge<span className="text-lavender-600">Learn</span>
            </span>
            <span className="hidden md:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-sage-100 text-sage-700">
              Class 11 NCERT Master Engine
            </span>
          </div>
        </button>

        <nav className="hidden sm:flex items-center gap-1 bg-cream-100 p-1 rounded-2xl border border-cream-200">
          {navSteps.map((step) => {
            const isActive = currentView === step.id;
            return (
              <button
                key={step.id}
                type="button"
                disabled={step.disabled}
                onClick={() => onNavigate(step.id)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'font-bold bg-white text-lavender-700 shadow-sm'
                    : 'font-semibold text-ink-600 hover:text-ink-800'
                } ${step.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {step.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {chapterData && (
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium bg-white px-3 py-1.5 rounded-2xl border border-cream-200 text-ink-600 max-w-[200px]">
              <span className="w-2 h-2 rounded-full bg-sage-600 shrink-0" />
              <span className="truncate">
                {chapterData.grade} • {chapterData.chapterTitle}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={onOpenApiModal}
            title="Configure AI API Key (Gemini or OpenAI-compatible)"
            className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-lavender-50 px-3 py-1.5 rounded-2xl border border-cream-200 hover:border-lavender-200 text-ink-600 hover:text-lavender-700 transition-colors"
          >
            <span className={`w-2 h-2 rounded-full ${hasKey ? 'bg-sage-600' : 'bg-ink-400'}`} />
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{keyLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
