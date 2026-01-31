# MediCore Deployment & Performance Guide

This guide covers deploying MediCore to Vercel and making it faster.

---

## ⚠️ Critical: Ollama Cannot Run on Vercel

**Ollama runs locally on your machine** — it connects to `http://localhost:11434`. Vercel is a **serverless platform**:

- No persistent processes
- No `localhost` — each request runs in an isolated, ephemeral environment
- Functions spin up and down in seconds
- You cannot run Ollama inside Vercel

### Your Options for Deployment

| Option | Effort | Cost | Best For |
|--------|--------|------|----------|
| **1. Hugging Face API** | Easy | Free tier | Quick Vercel deploy |
| **2. OpenAI / Anthropic** | Easy | Pay-per-use | Production quality |
| **3. Groq** | Easy | Free tier | Very fast inference |
| **4. Host Ollama on VPS** | Medium | ~$5–20/mo | Keep using Ollama |

---

## Option 1: Deploy with Hugging Face (Easiest)

Your app **already supports Hugging Face** as a fallback. When Ollama isn’t available (e.g. on Vercel), it will use Hugging Face if configured.

### Steps

1. **Get a Hugging Face API key**
   - Sign up: https://huggingface.co/join
   - Create a token: https://huggingface.co/settings/tokens

2. **Add environment variable in Vercel**
   - Project → Settings → Environment Variables
   - Add: `HUGGING_FACE_API_KEY` = your token

3. **Deploy** — the app will use Hugging Face when Ollama is unavailable.

**Limitations:** Free tier has rate limits and cold starts. For heavier use, consider a paid plan or another provider.

---

## Option 2: Add OpenAI for Production (Recommended)

OpenAI (and similar APIs) work well on Vercel and are fast. You can add OpenAI support and use it in production while keeping Ollama for local development.

### Implementation

1. Install the OpenAI SDK:
   ```bash
   pnpm add openai
   ```

2. Update `lib/services/ai-service.ts` — implement `tryOpenAI()` to call the OpenAI API when `OPENAI_API_KEY` is set.

3. In Vercel, add: `OPENAI_API_KEY` = your key.

4. Provider order: Ollama (local) → Hugging Face → **OpenAI** → Dictionary fallback.

---

## Option 3: Use Groq (Very Fast, Free Tier)

Groq offers very fast inference and a free tier.

- Sign up: https://console.groq.com
- Use models like `llama-3.1-70b-versatile` or `mixtral-8x7b-32768`
- Add `GROQ_API_KEY` in Vercel
- Implement a `tryGroq()` function similar to `tryOllama()` and add it to the provider chain.

---

## Option 4: Host Ollama on a VPS

If you want to keep using Ollama:

1. **Rent a VPS** (e.g. Railway, DigitalOcean, Hetzner) with enough RAM (e.g. 8GB+ for Llama 3.2).

2. **Install and run Ollama** on the server:
   ```bash
   curl -fsSL https://ollama.ai/install.sh | sh
   ollama pull llama3.2
   OLLAMA_HOST=0.0.0.0 ollama serve
   ```

3. **Expose the API** (e.g. via reverse proxy, firewall, or ngrok for testing).

4. **Configure MediCore** with:
   ```
   OLLAMA_URL=https://your-server-ip:11434
   ```

5. **Deploy the Next.js app to Vercel** — it will call your hosted Ollama server.

---

## OCR Limitation on Vercel

**Image OCR uses Python** (`exec` of EasyOCR). Vercel serverless functions do not support running Python this way.

- **PDF uploads:** Work on Vercel (pure JS via `pdf-parse`).
- **Image uploads:** Will fail on Vercel unless you change the implementation.

### Options for Image OCR on Vercel

1. **Restrict to PDF only** — simplest; many medical reports are PDFs.
2. **Use Tesseract.js** — pure JavaScript OCR; works on Vercel but may be less accurate than EasyOCR.
3. **Use an external OCR API** — e.g. Google Vision, AWS Textract (paid).

---

## Making the App Faster

### 1. Use a Faster Model (Ollama)

If you stay on Ollama locally:

```bash
ollama pull phi3        # ~2GB, much faster than llama3.2
# or
ollama pull mistral     # Good balance of speed and quality
```

Set in `.env`:
```
OLLAMA_MODEL=phi3
```

### 2. Reduce Token Generation

In `ai-service.ts`, lower `num_predict`:

```typescript
num_predict: 1500,  // Instead of 3000 - faster responses
```

### 3. Use Streaming (Best UX)

Stream responses so users see output as it’s generated instead of waiting for the full reply. This requires:

- Updating API routes to return a stream
- Updating the frontend to consume the stream
- Ollama supports streaming via `stream: true`

### 4. Shorter Prompts

Shorter prompts and system instructions reduce processing time. The current prompts are quite long; trimming them can help.

### 5. Use Cloud APIs for Production

OpenAI, Anthropic, and Groq typically respond in a few seconds, vs 30–60+ seconds for local Ollama on modest hardware.

---

## Quick Vercel Deployment Checklist

- [ ] Choose AI provider: Hugging Face, OpenAI, or Groq
- [ ] Add the corresponding API key in Vercel env vars
- [ ] If using images: switch to PDF-only or implement Tesseract.js
- [ ] Deploy: `vercel` or connect your Git repo
- [ ] Test report analysis with a PDF file

---

## Recommended Setup

**For a fast, production-ready deployment:**

1. Add **OpenAI** or **Groq** support for AI in production.
2. Keep **Ollama** for local development (no API costs).
3. Restrict uploads to **PDF only** on Vercel, or add Tesseract.js for images.
4. Add **streaming** for better perceived performance.

This gives you a deployable app on Vercel with good speed and reliability.
