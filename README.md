# BridgeLearn (React + Vite)

Class 11 NCERT Foundational Bridge & 20-Question AI Assessment Engine covering 61 chapters across Physics, Chemistry, Mathematics, Computer Science, and English.

## Run Locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push this folder's contents to a GitHub repository (default branch `main`).
2. In your repository, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Push any commit to `main` (or run the **Deploy BridgeLearn to GitHub Pages** workflow manually from the **Actions** tab).

`vite.config.js` uses `base: './'`, so assets load cleanly on both `username.github.io/repo-name/` and custom domains.

## Configuring Live AI Questions

Click **AI API Key** in the top navigation bar to connect either:
- **Google Gemini API** (`gemini-2.5-flash`, `gemini-2.5-pro`, or `gemini-2.0-flash`) with strict JSON Schema output, or
- **OpenAI / Groq / OpenRouter** (any OpenAI-compatible `/chat/completions` endpoint).

Keys are saved only in the browser's `localStorage`. Offline chapter banks work immediately without a key.
