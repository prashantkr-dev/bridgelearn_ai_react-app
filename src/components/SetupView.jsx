import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Zap,
  Sigma,
  Atom,
  BookOpenText,
  ChevronDown,
  Search,
  ArrowUpRight,
} from 'lucide-react';
import { CLASS_11_NCERT_SYLLABUS } from '../data/syllabus';

export default function SetupView({ aiConfig, onOpenApiModal, onLaunchChapter }) {
  const [board, setBoard] = useState('CBSE (NCERT)');
  const [grade, setGrade] = useState('Grade 11');
  const [subject, setSubject] = useState('Physics');
  const [chapterChoice, setChapterChoice] = useState('Motion in a Straight Line');
  const [customChapter, setCustomChapter] = useState('');
  const [activeTab, setActiveTab] = useState('Physics');
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = Object.keys(CLASS_11_NCERT_SYLLABUS);
  const subjectChapters = CLASS_11_NCERT_SYLLABUS[subject]?.chapters || [];
  const hasKey = Boolean(aiConfig?.apiKey);

  const handleSubjectChange = (newSubject) => {
    setSubject(newSubject);
    setActiveTab(newSubject);
    const first = CLASS_11_NCERT_SYLLABUS[newSubject]?.chapters?.[0]?.title || '';
    setChapterChoice(first);
  };

  const handleTabSelect = (subj) => {
    setActiveTab(subj);
    if (subject !== subj) {
      setSubject(subj);
      const first = CLASS_11_NCERT_SYLLABUS[subj]?.chapters?.[0]?.title || '';
      setChapterChoice(first);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resolvedTitle =
      chapterChoice === '__custom__' ? customChapter.trim() : chapterChoice.trim();
    if (!resolvedTitle) return;
    onLaunchChapter(board, grade, subject, resolvedTitle);
  };

  const filteredChapters = (CLASS_11_NCERT_SYLLABUS[activeTab]?.chapters || []).filter((ch) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.part.toLowerCase().includes(q) ||
      (ch.topics || []).some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <section className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-50 border border-lavender-200 text-lavender-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live AI Quiz Engine + Authentic NCERT Chapter Bridge</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-800 tracking-tight mb-3">
          Master Class 11 NCERT with <span className="text-lavender-600">Unique AI Assessments</span>
        </h1>
        <p className="text-ink-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Select any Class 11 chapter or enter a custom topic. Explore prerequisites &amp; core
          subtopics, then take a 20-question chapter-isolated assessment (10 unique MCQs + 10
          Fill-in-the-Answer) powered by live Gemini or OpenAI-compatible APIs.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-6 sm:p-8">
        {/* AI Status Banner */}
        <div
          className={`mb-5 rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            hasKey
              ? 'border-sage-200 bg-sage-50/70'
              : 'border-lavender-200 bg-lavender-50/70'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-lavender-100 text-lavender-700 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className={`font-bold ${hasKey ? 'text-sage-700' : 'text-lavender-700'}`}>
                {hasKey
                  ? `Live AI Active: ${
                      aiConfig.provider === 'gemini' ? aiConfig.geminiModel : aiConfig.openaiModel
                    }`
                  : 'Connect an AI API Key for Live Custom Question Generation'}
              </p>
              <p className="text-ink-600 mt-0.5">
                {hasKey
                  ? 'Every chapter generates 20 fresh, unique, chapter-isolated questions directly via your configured AI API.'
                  : 'Add a Gemini API key or OpenAI-compatible key to generate 20 fresh, non-repeating questions for any chapter. Offline chapter banks work without a key.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenApiModal}
            className="px-3.5 py-2 rounded-xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold shrink-0 transition-colors"
          >
            Configure AI Key
          </button>
        </div>

        {/* Quick Sample Launchers */}
        <div className="bg-sage-50 border border-sage-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sage-700">
                Instant Chapter Demos
              </p>
              <p className="text-sm text-ink-800 font-bold">
                Try Straight Lines, Kinematics, or The Adventure
              </p>
              <p className="text-xs text-ink-500">
                Full 20 unique chapter-isolated questions ready offline or via live AI
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() =>
                onLaunchChapter('CBSE (NCERT)', 'Grade 11', 'Mathematics', 'Straight Lines')
              }
              className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-peach-600 hover:bg-peach-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Sigma className="w-3.5 h-3.5" />
              <span>Straight Lines</span>
            </button>
            <button
              type="button"
              onClick={() =>
                onLaunchChapter(
                  'CBSE (NCERT)',
                  'Grade 11',
                  'Physics',
                  'Motion in a Straight Line'
                )
              }
              className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Kinematics</span>
            </button>
            <button
              type="button"
              onClick={() =>
                onLaunchChapter('CBSE (NCERT)', 'Grade 11', 'English', 'The Adventure')
              }
              className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <BookOpenText className="w-3.5 h-3.5" />
              <span>The Adventure</span>
            </button>
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="input-board"
                className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2"
              >
                Board / Curriculum
              </label>
              <div className="relative">
                <select
                  id="input-board"
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full appearance-none bg-cream-50 border border-cream-200 rounded-2xl px-4 py-3 text-sm font-medium text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-600/30 focus:border-lavender-600"
                >
                  <option value="CBSE (NCERT)">CBSE (NCERT)</option>
                  <option value="ICSE / ISC">ICSE / ISC</option>
                  <option value="IB (DP / MYP)">IB (DP / MYP)</option>
                  <option value="State Board">State Board</option>
                </select>
                <ChevronDown className="w-4 h-4 text-ink-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label
                htmlFor="input-grade"
                className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2"
              >
                Grade / Class
              </label>
              <div className="relative">
                <select
                  id="input-grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full appearance-none bg-cream-50 border border-cream-200 rounded-2xl px-4 py-3 text-sm font-medium text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-600/30 focus:border-lavender-600"
                >
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                  <option value="Grade 10">Grade 10</option>
                </select>
                <ChevronDown className="w-4 h-4 text-ink-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="input-subject"
                className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2"
              >
                Subject
              </label>
              <div className="relative">
                <select
                  id="input-subject"
                  value={subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full appearance-none bg-cream-50 border border-cream-200 rounded-2xl pl-4 pr-10 py-3 text-sm font-medium text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-600/30 focus:border-lavender-600"
                >
                  <optgroup label="Science & Mathematics">
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                  </optgroup>
                  <optgroup label="Computer Science & Humanities">
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English (Hornbill &amp; Snapshots)</option>
                  </optgroup>
                </select>
                <ChevronDown className="w-4 h-4 text-ink-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label
                htmlFor="input-chapter"
                className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2"
              >
                Chapter Name
              </label>
              <div className="relative">
                <select
                  id="input-chapter"
                  value={chapterChoice}
                  onChange={(e) => setChapterChoice(e.target.value)}
                  className="w-full appearance-none bg-cream-50 border border-cream-200 rounded-2xl pl-4 pr-10 py-3 text-sm font-medium text-ink-800 truncate focus:outline-none focus:ring-2 focus:ring-lavender-600/30 focus:border-lavender-600"
                >
                  {subjectChapters.map((ch) => (
                    <option key={ch.title} value={ch.title}>
                      {ch.part} — {ch.title}
                    </option>
                  ))}
                  <option value="__custom__">+ Type Custom Chapter...</option>
                </select>
                <ChevronDown className="w-4 h-4 text-ink-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
              {chapterChoice === '__custom__' && (
                <input
                  type="text"
                  value={customChapter}
                  onChange={(e) => setCustomChapter(e.target.value)}
                  placeholder="Enter custom chapter name..."
                  className="mt-2 w-full bg-cream-50 border border-lavender-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-lavender-600/30"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Map &amp; 20-Question Hard Assessment</span>
          </button>
        </form>

        {/* 61-Chapter Explorer */}
        <div className="mt-8 pt-6 border-t border-cream-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sage-100 text-sage-700">
                  61 Chapters Catalog
                </span>
                <h2 className="font-display font-bold text-base text-ink-800">
                  Class 11 NCERT Interactive Explorer
                </h2>
              </div>
              <p className="text-xs text-ink-500 mt-0.5">
                Click any chapter to launch its full subtopics &amp; 20 unique isolated questions.
              </p>
            </div>
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search 61 chapters..."
                className="w-full bg-cream-50 border border-cream-200 rounded-xl pl-8 pr-3 py-2 text-xs font-medium text-ink-800 focus:outline-none focus:border-lavender-600"
              />
              <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {subjects.map((subj) => {
              const isActive = subj === activeTab;
              const count = CLASS_11_NCERT_SYLLABUS[subj]?.chapters?.length || 0;
              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => handleTabSelect(subj)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-lavender-600 text-white shadow-sm'
                      : 'bg-cream-100 hover:bg-cream-200 text-ink-700 border border-cream-200'
                  }`}
                >
                  <span>{subj}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-ink-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto pr-1">
            {filteredChapters.length === 0 ? (
              <div className="col-span-full p-5 rounded-2xl bg-cream-50 border border-cream-200 text-center text-xs text-ink-500">
                No chapters matched "{searchTerm}" in {activeTab}.
              </div>
            ) : (
              filteredChapters.map((ch) => (
                <button
                  key={ch.title}
                  type="button"
                  onClick={() => onLaunchChapter('CBSE (NCERT)', 'Grade 11', activeTab, ch.title)}
                  className="text-left p-3.5 rounded-2xl bg-cream-50/70 hover:bg-lavender-50/60 border border-cream-200 hover:border-lavender-200 transition-all flex flex-col justify-between gap-2 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-lavender-700">
                        {ch.part}
                      </span>
                      <span className="text-[10px] font-semibold text-sage-700">
                        {(ch.topics || []).length} subtopics
                      </span>
                    </div>
                    <p className="font-display font-bold text-xs sm:text-sm text-ink-800 group-hover:text-lavender-700 transition-colors">
                      {ch.title}
                    </p>
                    <p className="text-[11px] text-ink-500 truncate">
                      {(ch.topics || []).slice(0, 2).join(' • ')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-ink-500 group-hover:text-lavender-700">
                    <span>Launch Chapter &amp; 20-Q Quiz</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
