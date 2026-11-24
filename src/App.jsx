import React, { useCallback, useState } from 'react';
import { Compass } from 'lucide-react';
import { CLASS_11_NCERT_SYLLABUS } from './data/syllabus';
import { getConceptData } from './data/conceptKnowledge';
import { generateOfflineChapter20Questions } from './data/offlineQuizzes';
import {
  clearAiApiKey,
  fetchAiChapterMap,
  fetchAiQuizQuestions,
  getAiConfig,
  saveAiConfig,
} from './services/aiService';
import Header from './components/Header';
import SetupView from './components/SetupView';
import MapView from './components/MapView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import ConceptModal from './components/ConceptModal';
import ApiKeyModal from './components/ApiKeyModal';
import ConfirmSubmitModal from './components/ConfirmSubmitModal';
import ToastContainer from './components/ToastContainer';

export default function App() {
  const [currentView, setCurrentView] = useState('setup');
  const [aiConfig, setAiConfig] = useState(() => getAiConfig());
  const [chapterData, setChapterData] = useState(null);
  const [loadingState, setLoadingState] = useState({
    title: 'Building Chapter Map...',
    subtitle: 'Preparing prerequisites, subtopics, and 20 unique chapter questions.',
    progress: 30,
  });

  const [understoodPrereqs, setUnderstoodPrereqs] = useState(() => new Set());
  const [understoodTopics, setUnderstoodTopics] = useState(() => new Set());
  const [modalConcept, setModalConcept] = useState(null);
  const [modalIsSubtopic, setModalIsSubtopic] = useState(false);

  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [questionSetIndex, setQuestionSetIndex] = useState(1);
  const [previousStems, setPreviousStems] = useState([]);
  const [usingLiveAiMap, setUsingLiveAiMap] = useState(false);
  const [usingLiveAiQuiz, setUsingLiveAiQuiz] = useState(false);
  const [activeAiModelLabel, setActiveAiModelLabel] = useState('');
  const [lastAiError, setLastAiError] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const navigateTo = useCallback(
    (viewId) => {
      if ((viewId === 'map' || viewId === 'quiz') && !chapterData) {
        showToast('Please select a chapter first.', 'info');
        return;
      }
      if (viewId === 'results' && (!chapterData || !quizSubmitted)) {
        showToast('Submit the 20-question assessment to view Gap Remediation.', 'info');
        return;
      }
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [chapterData, quizSubmitted, showToast]
  );

  const handleLaunchChapter = async (board, grade, subject, chapterTitle) => {
    const cfg = getAiConfig();
    const hasKey = Boolean(cfg.apiKey);

    setCurrentView('loading');
    setLoadingState({
      title: `Building "${chapterTitle}"...`,
      subtitle: 'Preparing Stage 1 prerequisites, Stage 2 subtopics, and 20 unique chapter questions.',
      progress: 25,
    });

    setUsingLiveAiMap(false);
    setUsingLiveAiQuiz(false);
    setActiveAiModelLabel('');
    setLastAiError('');
    setQuestionSetIndex(1);
    setPreviousStems([]);

    const catalogSubj = CLASS_11_NCERT_SYLLABUS[subject];
    const matchChapter =
      catalogSubj?.chapters?.find((c) => c.title.toLowerCase() === chapterTitle.toLowerCase()) ||
      null;
    const resolvedTitle = matchChapter ? matchChapter.title : chapterTitle;

    let aiMap = null;
    let mapLive = false;
    let modelLabel = '';
    let aiErr = '';

    if (hasKey) {
      try {
        setLoadingState({
          title: `Connecting to ${cfg.provider === 'gemini' ? cfg.geminiModel : cfg.openaiModel}...`,
          subtitle: `Generating authentic chapter map for "${resolvedTitle}"...`,
          progress: 45,
        });
        const mapRes = await fetchAiChapterMap(board, grade, subject, resolvedTitle);
        aiMap = mapRes.parsed;
        mapLive = true;
        modelLabel = mapRes.modelLabel;
      } catch (err) {
        aiErr = err.message;
      }
    }

    const defaultPrereqs = matchChapter?.prereqs || [
      `Core ${subject} Fundamentals`,
      `Foundational Terminology & Notation`,
      `Analytical & Quantitative Basics`,
      `Prior-Grade Problem Solving`,
    ];
    const defaultTopics = matchChapter?.topics || [
      `Core Concepts of ${resolvedTitle}`,
      `Governing Principles in ${resolvedTitle}`,
      `Methods & Derivations in ${resolvedTitle}`,
      `Applications & Exam Problems in ${resolvedTitle}`,
    ];

    const rawPrereqs =
      Array.isArray(aiMap?.prerequisites) && aiMap.prerequisites.length >= 2
        ? aiMap.prerequisites.map((p, idx) => ({
            id: p.id || `prereq_${idx + 1}`,
            title: p.title || defaultPrereqs[idx] || `Prerequisite ${idx + 1}`,
            grade: p.grade || 'Grade 8-10 Foundation',
            overview: p.overview || '',
            formula: p.formula || '',
            connection: p.connection || '',
            example: p.example || '',
          }))
        : defaultPrereqs.map((pStr, idx) => {
            const info = getConceptData(pStr, subject, resolvedTitle, false);
            return { id: `prereq_${idx + 1}`, title: pStr, ...info };
          });

    const rawTopics =
      Array.isArray(aiMap?.chapterSubtopics) && aiMap.chapterSubtopics.length >= 2
        ? aiMap.chapterSubtopics.map((t, idx) => ({
            id: t.id || `topic_${idx + 1}`,
            title: t.title || defaultTopics[idx] || `Subtopic ${idx + 1}`,
            grade: t.grade || `${grade} Core Subtopic`,
            overview: t.overview || '',
            formula: t.formula || '',
            connection: t.connection || '',
            example: t.example || '',
          }))
        : defaultTopics.map((tStr, idx) => {
            const info = getConceptData(tStr, subject, resolvedTitle, true);
            return { id: `topic_${idx + 1}`, title: tStr, ...info };
          });

    let quizQuestions = null;
    let quizLive = false;

    if (hasKey) {
      try {
        setLoadingState({
          title: `Generating 20-Q Assessment...`,
          subtitle: `Generating 20 unique AI questions (10 MCQs + 10 Fill-in) for "${resolvedTitle}"...`,
          progress: 75,
        });
        const quizRes = await fetchAiQuizQuestions(
          board,
          grade,
          subject,
          resolvedTitle,
          rawTopics,
          rawPrereqs,
          1,
          []
        );
        quizQuestions = quizRes.questions;
        quizLive = true;
        modelLabel = quizRes.modelLabel;
        showToast(`Generated 20 unique AI questions via ${quizRes.modelLabel}!`, 'success');
      } catch (err) {
        aiErr = err.message;
        showToast(`AI Quiz API error (${err.message}). Using offline chapter bank.`, 'warning');
      }
    }

    if (!quizQuestions) {
      quizQuestions = generateOfflineChapter20Questions(
        subject,
        resolvedTitle,
        rawPrereqs,
        rawTopics,
        1
      );
    }

    setChapterData({
      board,
      grade,
      subject,
      chapterTitle: resolvedTitle,
      overview:
        aiMap?.overview ||
        `${grade} ${subject} (${board}) — ${resolvedTitle}. Master the earlier-grade prerequisites, explore core chapter subtopics, and test yourself with 20 unique chapter-isolated questions.`,
      prerequisites: rawPrereqs,
      chapterSubtopics: rawTopics,
      quiz: quizQuestions,
    });
    setUsingLiveAiMap(mapLive);
    setUsingLiveAiQuiz(quizLive);
    setActiveAiModelLabel(modelLabel);
    setLastAiError(aiErr);
    setPreviousStems(quizQuestions.map((q) => q.question));
    setUnderstoodPrereqs(new Set());
    setUnderstoodTopics(new Set());
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setCurrentView('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleUnderstood = (id, isSubtopic) => {
    const updater = (prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Marked as needs review', 'info');
      } else {
        next.add(id);
        showToast('Marked as understood!', 'success');
      }
      return next;
    };
    if (isSubtopic) setUnderstoodTopics(updater);
    else setUnderstoodPrereqs(updater);
  };

  const handleRegenerateQuiz = async () => {
    if (!chapterData || isRegenerating) return;
    setIsRegenerating(true);
    if (currentView !== 'quiz') setCurrentView('quiz');

    const nextSet = questionSetIndex + 1;
    const cfg = getAiConfig();

    try {
      if (cfg.apiKey) {
        const res = await fetchAiQuizQuestions(
          chapterData.board,
          chapterData.grade,
          chapterData.subject,
          chapterData.chapterTitle,
          chapterData.chapterSubtopics,
          chapterData.prerequisites,
          nextSet,
          previousStems
        );
        setChapterData((prev) => ({ ...prev, quiz: res.questions }));
        setQuestionSetIndex(nextSet);
        setUsingLiveAiQuiz(true);
        setActiveAiModelLabel(res.modelLabel);
        setLastAiError('');
        setPreviousStems((prev) => [...prev, ...res.questions.map((q) => q.question)].slice(-40));
        showToast(`Set #${nextSet} generated via ${res.modelLabel}!`, 'success');
      } else {
        const offline = generateOfflineChapter20Questions(
          chapterData.subject,
          chapterData.chapterTitle,
          chapterData.prerequisites,
          chapterData.chapterSubtopics,
          nextSet
        );
        setChapterData((prev) => ({ ...prev, quiz: offline }));
        setQuestionSetIndex(nextSet);
        setUsingLiveAiQuiz(false);
        showToast(`Loaded Offline Set #${nextSet}. Add an AI API key for unlimited fresh AI sets!`, 'info');
      }
      setQuizAnswers({});
      setCurrentQuestionIndex(0);
      setQuizSubmitted(false);
    } catch (err) {
      setLastAiError(err.message);
      showToast(`AI regeneration failed: ${err.message}`, 'warning');
    } finally {
      setIsRegenerating(false);
    }
  };

  const answeredCount = Object.keys(quizAnswers).filter(
    (k) => String(quizAnswers[k]).trim() !== ''
  ).length;
  const totalQuestions = chapterData?.quiz?.length || 20;

  const handleRequestSubmit = () => {
    if (answeredCount < totalQuestions) {
      setConfirmSubmitOpen(true);
    } else {
      setQuizSubmitted(true);
      setCurrentView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveApiConfig = (newCfg) => {
    saveAiConfig(newCfg);
    const updated = getAiConfig();
    setAiConfig(updated);
    setApiModalOpen(false);
    if (updated.apiKey) {
      showToast(
        `AI API settings saved (${
          updated.provider === 'gemini' ? updated.geminiModel : updated.openaiModel
        }). Live AI quizzes enabled!`,
        'success'
      );
    } else {
      showToast('API key removed. Using built-in offline question engine.', 'info');
    }
  };

  const handleClearApiKey = () => {
    clearAiApiKey();
    setAiConfig(getAiConfig());
    showToast('API Key cleared.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        chapterData={chapterData}
        quizSubmitted={quizSubmitted}
        aiConfig={aiConfig}
        onOpenApiModal={() => setApiModalOpen(true)}
      />

      <ToastContainer toasts={toasts} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentView === 'setup' && (
          <SetupView
            aiConfig={aiConfig}
            onOpenApiModal={() => setApiModalOpen(true)}
            onLaunchChapter={handleLaunchChapter}
          />
        )}

        {currentView === 'loading' && (
          <section className="max-w-xl mx-auto py-16">
            <div className="bg-white rounded-3xl border border-cream-200 soft-shadow p-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-lavender-100 border border-lavender-200 text-lavender-700 flex items-center justify-center mx-auto animate-pulse-gentle">
                <Compass className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-xl font-extrabold text-ink-800">
                  {loadingState.title}
                </h2>
                <p className="text-sm text-ink-600">{loadingState.subtitle}</p>
              </div>
              <div className="w-full bg-cream-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-lavender-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${loadingState.progress}%` }}
                />
              </div>
            </div>
          </section>
        )}

        {currentView === 'map' && (
          <MapView
            data={chapterData}
            usingLiveAi={usingLiveAiMap || usingLiveAiQuiz}
            activeAiModelLabel={activeAiModelLabel}
            understoodPrereqs={understoodPrereqs}
            understoodTopics={understoodTopics}
            onToggleUnderstood={handleToggleUnderstood}
            onOpenModal={(item, isSub) => {
              setModalConcept(item);
              setModalIsSubtopic(isSub);
            }}
            onStartQuiz={() => navigateTo('quiz')}
            onSwitchChapter={() => navigateTo('setup')}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            data={chapterData}
            questionSetIndex={questionSetIndex}
            usingLiveAiQuiz={usingLiveAiQuiz}
            activeAiModelLabel={activeAiModelLabel}
            lastAiError={lastAiError}
            isRegenerating={isRegenerating}
            currentIndex={currentQuestionIndex}
            quizAnswers={quizAnswers}
            onSelectIndex={setCurrentQuestionIndex}
            onSelectMcq={(idx, optIdx) =>
              setQuizAnswers((prev) => ({ ...prev, [idx]: optIdx }))
            }
            onChangeFill={(idx, val) => setQuizAnswers((prev) => ({ ...prev, [idx]: val }))}
            onRegenerate={handleRegenerateQuiz}
            onRequestSubmit={handleRequestSubmit}
            onExit={() => navigateTo('map')}
            onOpenApiModal={() => setApiModalOpen(true)}
          />
        )}

        {currentView === 'results' && (
          <ResultsView
            data={chapterData}
            quizAnswers={quizAnswers}
            questionSetIndex={questionSetIndex}
            usingLiveAiQuiz={usingLiveAiQuiz}
            activeAiModelLabel={activeAiModelLabel}
            onRegenerate={handleRegenerateQuiz}
            onRetake={() => {
              setQuizAnswers({});
              setCurrentQuestionIndex(0);
              setQuizSubmitted(false);
              setCurrentView('quiz');
            }}
            onBackToMap={() => navigateTo('map')}
          />
        )}
      </main>

      <ConceptModal
        item={modalConcept}
        isSubtopic={modalIsSubtopic}
        isUnderstood={
          modalConcept
            ? (modalIsSubtopic ? understoodTopics : understoodPrereqs).has(modalConcept.id)
            : false
        }
        onClose={() => setModalConcept(null)}
        onToggleUnderstood={handleToggleUnderstood}
      />

      <ApiKeyModal
        open={apiModalOpen}
        initialConfig={aiConfig}
        onClose={() => setApiModalOpen(false)}
        onSave={handleSaveApiConfig}
        onClear={handleClearApiKey}
      />

      <ConfirmSubmitModal
        open={confirmSubmitOpen}
        answeredCount={answeredCount}
        total={totalQuestions}
        onCancel={() => setConfirmSubmitOpen(false)}
        onConfirm={() => {
          setConfirmSubmitOpen(false);
          setQuizSubmitted(true);
          setCurrentView('results');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
