import React, { useEffect, useState } from 'react';
import { KeyRound, X, Eye, EyeOff, Activity } from 'lucide-react';
import { testAiConnection } from '../services/aiService';

export default function ApiKeyModal({ open, initialConfig, onClose, onSave, onClear }) {
  const [provider, setProvider] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState('gemini-2.5-flash');
  const [openaiBase, setOpenaiBase] = useState('https://api.openai.com/v1');
  const [openaiModel, setOpenaiModel] = useState('gpt-4o-mini');
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (open && initialConfig) {
      setProvider(initialConfig.provider || 'gemini');
      setApiKey(initialConfig.apiKey || '');
      setGeminiModel(initialConfig.geminiModel || 'gemini-2.5-flash');
      setOpenaiBase(initialConfig.openaiBase || 'https://api.openai.com/v1');
      setOpenaiModel(initialConfig.openaiModel || 'gpt-4o-mini');
      setShowKey(false);
      setStatus(null);
    }
  }, [open, initialConfig]);

  if (!open) return null;

  const handleTest = async () => {
    setTesting(true);
    setStatus({
      type: 'info',
      text: `Testing connection to ${provider === 'gemini' ? geminiModel : openaiModel}...`,
    });
    try {
      const msg = await testAiConnection({
        provider,
        apiKey,
        geminiModel,
        openaiBase,
        openaiModel,
      });
      setStatus({ type: 'success', text: `Success! ${msg} Click Save Settings to enable live AI quizzes.` });
    } catch (err) {
      setStatus({ type: 'error', text: `Connection failed: ${err.message}` });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-ink-800/40 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl border border-cream-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-lavender-100 text-lavender-700 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-ink-800">
                AI API Configuration
              </h3>
              <p className="text-[11px] text-ink-500">
                Generates 20 unique chapter-specific questions &amp; live NCERT maps
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-ink-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-cream-100 p-1 rounded-2xl border border-cream-200">
          <button
            type="button"
            onClick={() => setProvider('gemini')}
            className={`py-2 px-3 rounded-xl text-xs transition-all ${
              provider === 'gemini'
                ? 'font-bold bg-white text-lavender-700 shadow-sm'
                : 'font-semibold text-ink-600 hover:text-ink-800'
            }`}
          >
            Google Gemini API
          </button>
          <button
            type="button"
            onClick={() => setProvider('openai')}
            className={`py-2 px-3 rounded-xl text-xs transition-all ${
              provider === 'openai'
                ? 'font-bold bg-white text-lavender-700 shadow-sm'
                : 'font-semibold text-ink-600 hover:text-ink-800'
            }`}
          >
            OpenAI / Groq / Compatible
          </button>
        </div>

        {provider === 'gemini' ? (
          <div className="space-y-3">
            <div className="bg-cream-50 border border-cream-200 rounded-2xl p-3 text-xs text-ink-600 leading-relaxed">
              Connects directly to Google's official{' '}
              <code className="font-mono text-lavender-700">
                generativelanguage.googleapis.com/v1beta
              </code>{' '}
              endpoint with strict JSON Schema output for 20 unique questions per chapter. Stored
              only in your browser's <code className="font-mono">localStorage</code>.
            </div>
            <div>
              <label
                htmlFor="input-gemini-model"
                className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5"
              >
                Gemini Model
              </label>
              <select
                id="input-gemini-model"
                value={geminiModel}
                onChange={(e) => setGeminiModel(e.target.value)}
                className="w-full bg-cream-50 border border-cream-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-600/30"
              >
                <option value="gemini-2.5-flash">
                  gemini-2.5-flash (Recommended • Fast &amp; Accurate)
                </option>
                <option value="gemini-2.5-pro">gemini-2.5-pro (Highest Reasoning Quality)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash (Fallback Fast Model)</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-cream-50 border border-cream-200 rounded-2xl p-3 text-xs text-ink-600 leading-relaxed">
              Works with OpenAI (<code className="font-mono">https://api.openai.com/v1</code>),
              Groq (<code className="font-mono">https://api.groq.com/openai/v1</code>), or
              OpenRouter (<code className="font-mono">https://openrouter.ai/api/v1</code>).
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="input-openai-base"
                  className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5"
                >
                  Base URL
                </label>
                <input
                  id="input-openai-base"
                  type="text"
                  value={openaiBase}
                  onChange={(e) => setOpenaiBase(e.target.value)}
                  placeholder="https://api.openai.com/v1"
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-3 py-2 text-xs font-mono text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-600/30"
                />
              </div>
              <div>
                <label
                  htmlFor="input-openai-model"
                  className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5"
                >
                  Model Name
                </label>
                <input
                  id="input-openai-model"
                  type="text"
                  value={openaiModel}
                  onChange={(e) => setOpenaiModel(e.target.value)}
                  placeholder="gpt-4o-mini"
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-3 py-2 text-xs font-mono text-ink-800 focus:outline-none focus:ring-2 focus:ring-lavender-600/30"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label
            htmlFor="input-local-api-key"
            className="block text-xs font-bold uppercase tracking-wider text-ink-600"
          >
            API Key
          </label>
          <div className="relative">
            <input
              id="input-local-api-key"
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... or sk-..."
              className="w-full bg-cream-50 border border-cream-200 rounded-2xl pl-4 pr-11 py-3 text-sm font-mono text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-lavender-600/30"
            />
            <button
              type="button"
              onClick={() => setShowKey((prev) => !prev)}
              className="absolute right-3 top-3 text-ink-400 hover:text-ink-700"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {status && (
          <div
            className={`p-3 rounded-2xl border text-xs font-medium leading-relaxed ${
              status.type === 'success'
                ? 'border-sage-200 bg-sage-50 text-sage-700 font-semibold'
                : status.type === 'error'
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-lavender-200 bg-lavender-50 text-lavender-700'
            }`}
          >
            {status.text}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setApiKey('');
                setStatus(null);
                onClear();
              }}
              className="px-3 py-2 rounded-xl bg-cream-100 hover:bg-red-50 text-ink-600 hover:text-red-700 text-xs font-semibold transition-colors"
            >
              Clear Key
            </button>
            <button
              type="button"
              disabled={testing}
              onClick={handleTest}
              className="px-3.5 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-sage-700 text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Test Connection</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-ink-700 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                onSave({ provider, apiKey, geminiModel, openaiBase, openaiModel })
              }
              className="px-5 py-2 rounded-xl bg-lavender-600 hover:bg-lavender-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
