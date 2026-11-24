export const STORAGE_KEYS = {
  apiKey: 'bridgelearn_ai_api_key',
  legacyGeminiKey: 'bridgelearn_gemini_api_key',
  provider: 'bridgelearn_ai_provider',
  geminiModel: 'bridgelearn_gemini_model',
  openaiBase: 'bridgelearn_openai_base',
  openaiModel: 'bridgelearn_openai_model',
};

export function safeGetStorage(key, fallback = '') {
  try {
    return (localStorage.getItem(key) || fallback).trim();
  } catch {
    return fallback;
  }
}

export function safeSetStorage(key, val) {
  try {
    if (val) localStorage.setItem(key, val);
    else localStorage.removeItem(key);
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

export function getAiConfig() {
  const provider = safeGetStorage(STORAGE_KEYS.provider, 'gemini') || 'gemini';
  const apiKey =
    safeGetStorage(STORAGE_KEYS.apiKey) || safeGetStorage(STORAGE_KEYS.legacyGeminiKey);
  const geminiModel =
    safeGetStorage(STORAGE_KEYS.geminiModel, 'gemini-2.5-flash') || 'gemini-2.5-flash';
  const openaiBase = (
    safeGetStorage(STORAGE_KEYS.openaiBase, 'https://api.openai.com/v1') ||
    'https://api.openai.com/v1'
  ).replace(/\/+$/, '');
  const openaiModel = safeGetStorage(STORAGE_KEYS.openaiModel, 'gpt-4o-mini') || 'gpt-4o-mini';
  return { provider, apiKey, geminiModel, openaiBase, openaiModel };
}

export function saveAiConfig({ provider, apiKey, geminiModel, openaiBase, openaiModel }) {
  safeSetStorage(STORAGE_KEYS.provider, provider === 'openai' ? 'openai' : 'gemini');
  safeSetStorage(STORAGE_KEYS.geminiModel, geminiModel || 'gemini-2.5-flash');
  safeSetStorage(
    STORAGE_KEYS.openaiBase,
    (openaiBase || 'https://api.openai.com/v1').trim().replace(/\/+$/, '')
  );
  safeSetStorage(STORAGE_KEYS.openaiModel, (openaiModel || 'gpt-4o-mini').trim());
  safeSetStorage(STORAGE_KEYS.apiKey, (apiKey || '').trim());
  safeSetStorage(STORAGE_KEYS.legacyGeminiKey, '');
}

export function clearAiApiKey() {
  safeSetStorage(STORAGE_KEYS.apiKey, '');
  safeSetStorage(STORAGE_KEYS.legacyGeminiKey, '');
}

export function extractJsonFromText(raw) {
  if (!raw || typeof raw !== 'string') throw new Error('Empty AI response.');
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const startObj = cleaned.indexOf('{');
    const endObj = cleaned.lastIndexOf('}');
    if (startObj !== -1 && endObj > startObj) {
      return JSON.parse(cleaned.slice(startObj, endObj + 1));
    }
    throw new Error('AI returned malformed JSON.');
  }
}

export function shuffleMcqOptions(mcq) {
  const opts = Array.isArray(mcq.options)
    ? mcq.options.slice(0, 4).map((o) => String(o).trim())
    : [];
  if (opts.length !== 4) return null;
  const origCorrect =
    Number.isInteger(mcq.correctIndex) && mcq.correctIndex >= 0 && mcq.correctIndex < 4
      ? mcq.correctIndex
      : 0;
  const tagged = opts.map((text, idx) => ({ text, isCorrect: idx === origCorrect }));
  for (let i = tagged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tagged[i], tagged[j]] = [tagged[j], tagged[i]];
  }
  const newCorrectIndex = tagged.findIndex((item) => item.isCorrect);
  return {
    ...mcq,
    options: tagged.map((item) => item.text),
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

export function normalizeAndShuffleQuiz(parsed) {
  const seenStems = new Set();
  const mcqs = [];
  const fills = [];

  const rawMcqs = Array.isArray(parsed?.mcqs) ? parsed.mcqs : [];
  for (const item of rawMcqs) {
    const qText = String(item?.question || '').trim();
    const normKey = qText.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (!qText || seenStems.has(normKey)) continue;
    const shuffled = shuffleMcqOptions({
      type: 'mcq',
      section: 'Section A • MCQ',
      conceptName: String(item.conceptName || 'Core Concept').trim(),
      difficulty: String(item.difficulty || 'Hard / Exam Level').trim(),
      question: qText,
      options: item.options,
      correctIndex: Number(item.correctIndex),
      explanation: String(item.explanation || 'Review the chapter theory for this concept.').trim(),
    });
    if (!shuffled) continue;
    seenStems.add(normKey);
    mcqs.push(shuffled);
    if (mcqs.length === 10) break;
  }

  const rawFills = Array.isArray(parsed?.fillIns) ? parsed.fillIns : [];
  for (const item of rawFills) {
    const qText = String(item?.question || '').trim();
    const normKey = qText.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const ans = String(item?.correctAnswer || '').trim();
    if (!qText || !ans || seenStems.has(normKey)) continue;
    seenStems.add(normKey);
    const aliases =
      Array.isArray(item.acceptableAnswers) && item.acceptableAnswers.length
        ? item.acceptableAnswers.map((a) => String(a).trim()).filter(Boolean)
        : [ans];
    if (!aliases.includes(ans)) aliases.unshift(ans);
    fills.push({
      type: 'fill',
      section: 'Section B • Fill-in',
      conceptName: String(item.conceptName || 'Core Application').trim(),
      difficulty: String(item.difficulty || 'Hard / Short Answer').trim(),
      question: qText,
      correctAnswer: ans,
      acceptableAnswers: aliases,
      unitHint: String(item.unitHint || 'short answer').trim(),
      explanation: String(item.explanation || `Expected answer: ${ans}`).trim(),
    });
    if (fills.length === 10) break;
  }

  return [...mcqs, ...fills];
}

export const CHAPTER_MAP_SCHEMA = {
  type: 'OBJECT',
  properties: {
    chapterTitle: { type: 'STRING' },
    overview: { type: 'STRING' },
    prerequisites: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          title: { type: 'STRING' },
          grade: { type: 'STRING' },
          overview: { type: 'STRING' },
          formula: { type: 'STRING' },
          connection: { type: 'STRING' },
          example: { type: 'STRING' },
        },
        required: ['id', 'title', 'grade', 'overview', 'formula', 'connection', 'example'],
      },
    },
    chapterSubtopics: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          title: { type: 'STRING' },
          grade: { type: 'STRING' },
          overview: { type: 'STRING' },
          formula: { type: 'STRING' },
          connection: { type: 'STRING' },
          example: { type: 'STRING' },
        },
        required: ['id', 'title', 'grade', 'overview', 'formula', 'connection', 'example'],
      },
    },
  },
  required: ['chapterTitle', 'overview', 'prerequisites', 'chapterSubtopics'],
};

export const QUIZ_20_SCHEMA = {
  type: 'OBJECT',
  properties: {
    mcqs: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          conceptName: { type: 'STRING' },
          difficulty: { type: 'STRING' },
          question: { type: 'STRING' },
          options: { type: 'ARRAY', items: { type: 'STRING' } },
          correctIndex: { type: 'INTEGER' },
          explanation: { type: 'STRING' },
        },
        required: ['conceptName', 'difficulty', 'question', 'options', 'correctIndex', 'explanation'],
      },
    },
    fillIns: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          conceptName: { type: 'STRING' },
          difficulty: { type: 'STRING' },
          question: { type: 'STRING' },
          correctAnswer: { type: 'STRING' },
          acceptableAnswers: { type: 'ARRAY', items: { type: 'STRING' } },
          unitHint: { type: 'STRING' },
          explanation: { type: 'STRING' },
        },
        required: [
          'conceptName',
          'difficulty',
          'question',
          'correctAnswer',
          'acceptableAnswers',
          'unitHint',
          'explanation',
        ],
      },
    },
  },
  required: ['mcqs', 'fillIns'],
};

async function callAiJson(prompt, responseSchema = null, temperature = 0.7, maxTokens = 8192) {
  const cfg = getAiConfig();
  if (!cfg.apiKey) throw new Error('No AI API key configured.');

  if (cfg.provider === 'gemini') {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      cfg.geminiModel
    )}:generateContent?key=${encodeURIComponent(cfg.apiKey)}`;
    const generationConfig = {
      responseMimeType: 'application/json',
      temperature,
      maxOutputTokens: maxTokens,
    };
    if (responseSchema) generationConfig.responseSchema = responseSchema;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig,
      }),
    });
    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || `Gemini API HTTP ${response.status}`);
    }
    const resData = await response.json();
    const textResponse = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
    return { parsed: extractJsonFromText(textResponse), modelLabel: cfg.geminiModel };
  }

  const response = await fetch(`${cfg.openaiBase}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.openaiModel,
      temperature,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are an expert NCERT Class 11 educator and exam author. Return strictly valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });
  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson?.error?.message || `API HTTP ${response.status}`);
  }
  const resData = await response.json();
  const textResponse = resData?.choices?.[0]?.message?.content;
  return { parsed: extractJsonFromText(textResponse), modelLabel: cfg.openaiModel };
}

export async function testAiConnection({ provider, apiKey, geminiModel, openaiBase, openaiModel }) {
  const key = (apiKey || '').trim();
  if (!key) throw new Error('Please paste an API key first.');

  if (provider === 'gemini') {
    const model = geminiModel || 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent?key=${encodeURIComponent(key)}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Reply with OK.' }] }],
        generationConfig: { maxOutputTokens: 16 },
      }),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || `HTTP ${res.status}`);
    }
    return `Connected to Google Gemini (${model}).`;
  }

  const base = (openaiBase || 'https://api.openai.com/v1').trim().replace(/\/+$/, '');
  const model = (openaiModel || 'gpt-4o-mini').trim();
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: 'Reply with OK.' }],
      max_tokens: 16,
    }),
  });
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson?.error?.message || `HTTP ${res.status}`);
  }
  return `Connected to ${model}.`;
}

export async function fetchAiChapterMap(board, grade, subject, chapterTitle, defaultPrereqs = [], defaultTopics = []) {
  const prereqHint = defaultPrereqs.length ? `Prerequisites to cover:\n- ${defaultPrereqs.join('\n- ')}` : '';
  const topicHint = defaultTopics.length ? `Core chapter subtopics to cover:\n- ${defaultTopics.join('\n- ')}` : '';

  const prompt = `Generate a comprehensive, authentic NCERT study map JSON for:
Board: ${board} | Grade: ${grade} | Subject: ${subject} | Chapter: "${chapterTitle}".
${prereqHint}
${topicHint}

CRITICAL RULES:
- Return exactly 4 earlier-grade prerequisites (id: "prereq_1".."prereq_4") and 4 core chapter subtopics (id: "topic_1".."topic_4").
- Base the titles directly on the prerequisites and subtopics listed above.
- For EVERY prerequisite and subtopic, write distinct, subject-specific, and mathematically/scientifically authentic details:
  * overview: 2-3 sentences explaining the core theory and rules (NO generic boilerplate like "Apply standard NCERT definitions").
  * formula: Real mathematical formulas, identities, or governing laws (e.g., "A ∪ B = {x : x ∈ A or x ∈ B}", "v = u + at", "PV = nRT").
  * connection: Explicitly how this concept connects to and prepares for "${chapterTitle}".
  * example: A complete worked Question and step-by-step Solution with concrete numbers and answers.
- Return valid JSON with keys: chapterTitle, overview, prerequisites, chapterSubtopics.`;

  return callAiJson(prompt, CHAPTER_MAP_SCHEMA, 0.4, 4096);
}

export async function fetchAiQuizQuestions(
  board,
  grade,
  subject,
  chapterTitle,
  subtopics,
  prereqs,
  setIndex = 1,
  avoidStems = []
) {
  const subtopicNames = (subtopics || []).map((t) => (typeof t === 'string' ? t : t.title)).join('; ');
  const prereqNames = (prereqs || []).map((p) => (typeof p === 'string' ? p : p.title)).join('; ');
  const avoidBlock =
    avoidStems.length > 0
      ? `\nDO NOT repeat or closely paraphrase any of these previously asked questions:\n- ${avoidStems
          .slice(-20)
          .join('\n- ')}`
      : '';

  const prompt = `You are a senior ${board} ${grade} ${subject} examiner creating Assessment Set #${setIndex} exclusively for Chapter "${chapterTitle}".

Chapter Subtopics to distribute across questions: ${subtopicNames || chapterTitle}
Base Prerequisites to weave in: ${prereqNames || 'Foundational concepts'}

STRICT RULES:
1. Generate EXACTLY 10 unique Multiple Choice Questions in "mcqs" (Q1–Q10) and EXACTLY 10 unique Fill-in-the-Answer questions in "fillIns" (Q11–Q20).
2. EVERY SINGLE ONE of the 20 questions MUST be completely distinct — different scenario, different concept angle, different numbers/facts, and different wording. NEVER repeat the same question stem or generic options.
3. Every question MUST strictly belong to "${chapterTitle}" (${subject}) — do NOT pull topics from other chapters.
4. For each MCQ:
   - Provide 4 specific, plausible, chapter-accurate options (no "Option A:" prefixes, no generic filler).
   - Vary correctIndex across 0, 1, 2, 3.
   - Include a clear, step-by-step "explanation".
5. For each Fill-in question:
   - Ask for a concise, unambiguous answer (a single number, formula token, keyword, character name, or short 1–3 word term).
   - Provide "correctAnswer", an array of "acceptableAnswers" (aliases/rounding variants), and a helpful "unitHint" (e.g. "m/s", "degrees", "character name", "1-2 words").
   - Include a clear "explanation".${avoidBlock}

Return ONLY valid JSON matching { "mcqs": [...10 items], "fillIns": [...10 items] }.`;

  const { parsed, modelLabel } = await callAiJson(prompt, QUIZ_20_SCHEMA, 0.85, 8192);
  const normalized = normalizeAndShuffleQuiz(parsed);
  if (normalized.length < 20) {
    throw new Error(`AI returned only ${normalized.length} valid unique questions (expected 20).`);
  }
  return { questions: normalized.slice(0, 20), modelLabel };
}
