# Hugging Face API Setup & GitHub Push Guide

---

## Part 1: Hugging Face API Setup

### Step 1: Create a Hugging Face Account

1. Go to **https://huggingface.co/join**
2. Sign up (free) with email or Google/GitHub

### Step 2: Create an API Token

1. Log in to Hugging Face
2. Click your **profile picture** (top right) → **Settings**
3. Go to **Access Tokens** (or visit https://huggingface.co/settings/tokens)
4. Click **Create new token**
5. Give it a name (e.g. "MediCore")
6. Select **Read** access (enough for inference)
7. Click **Generate**
8. **Copy the token** — you won't see it again!

### Step 3: Add Token Locally (for development)

1. In your MediCore folder, create a file named `.env.local`
2. Add this line (replace with your actual token):

   ```
   HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Save the file — it's already in `.gitignore`, so it won't be pushed to GitHub

### Step 4: Add Token on Vercel (for deployment)

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name:** `HUGGING_FACE_API_KEY`
   - **Value:** your token (e.g. `hf_xxxxxxxx...`)
   - **Environment:** Production (and Preview if you want)
3. Click **Save**
4. Redeploy your project for the change to take effect

### Step 5: Test It

- **Locally:** Run `pnpm dev`, upload a report — if Ollama isn't running, it will use Hugging Face
- **On Vercel:** Deploy and test — it will use Hugging Face since Ollama isn't available

### Optional: Use a Different Model

Add to `.env.local` or Vercel env vars:

```
HUGGING_FACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2
```

Other free models: `meta-llama/Llama-2-7b-chat-hf`, `google/flan-t5-large`

---

## Part 2: Push Only Required Files to GitHub

### What Gets Pushed vs Ignored

Your `.gitignore` already excludes:

| Ignored | Why |
|---------|-----|
| `node_modules/` | Dependencies — reinstall with `pnpm install` |
| `.next/` | Build output — regenerated on build |
| `.env*` | API keys & secrets — never push! |
| `.vercel/` | Vercel config |
| `*.tsbuildinfo` | TypeScript cache |

### Before Your First Push — Checklist

1. **Never commit `.env` or `.env.local`**
   - These contain your API key
   - `.env*` is in `.gitignore` — verify it's not staged:
     ```bash
     git status
     ```
   - If you see `.env.local` listed, **do not add it**

2. **Create `.env.example` (optional but recommended)**
   - A template showing which variables are needed (without real values):
     ```
     # Copy to .env.local and fill in your values
     HUGGING_FACE_API_KEY=your_token_here
     OLLAMA_URL=http://localhost:11434
     OLLAMA_MODEL=llama3.2
     ```
   - This file CAN be pushed — it has no secrets

### Step-by-Step: Push to GitHub

#### 1. Initialize Git (if not already done)

```bash
cd MediCore
git init
```

#### 2. Check what will be committed

```bash
git status
```

Review the list. You should **NOT** see:
- `node_modules`
- `.env` or `.env.local`
- `.next`
- `.ocr-venv` (Python virtual env)

#### 3. Add files

```bash
# Add all tracked files (respects .gitignore)
git add .
```

Or add selectively:
```bash
git add app/ components/ lib/ public/ package.json package-lock.json pnpm-lock.yaml next.config.mjs postcss.config.mjs
```

#### 4. Commit

```bash
git commit -m "Initial MediCore project with Hugging Face support"
```

#### 5. Create GitHub repo and push

1. On GitHub.com → **New repository** → name it (e.g. `MediCore`)
2. Don't add README, .gitignore (you already have them)
3. Copy the repo URL, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/MediCore.git
git branch -M main
git push -u origin main
```

### Files You Should Push

- `app/` — pages and API routes
- `components/` — UI components
- `lib/` — services (ai-service, ocr-service)
- `public/` — images, assets
- `messages/` — translations
- `package.json`, `pnpm-lock.yaml` (or `package-lock.json`)
- `next.config.mjs`, `postcss.config.mjs`
- `README.md`, `DEPLOYMENT_GUIDE.md`
- `ocr_service.py`, `requirements.txt` — for OCR (even if OCR won't work on Vercel)

### Files That Must NOT Be Pushed

- `.env` or `.env.local` — contains your Hugging Face API key
- `node_modules/` — huge, reinstallable
- `.next/` — build output
- `.ocr-venv/` — Python virtual environment (25,000+ files!)

---

## Quick Reference

| Task | Command |
|------|---------|
| Check what's staged | `git status` |
| See ignored files | `git status --ignored` |
| Add all (respecting .gitignore) | `git add .` |
| Commit | `git commit -m "your message"` |
| Push | `git push origin main` |

---

## If You Accidentally Pushed Secrets

1. **Immediately** create a new Hugging Face token (old one is compromised)
2. Update your `.env.local` and Vercel with the new token
3. Remove the secret from Git history (use `git filter-branch` or BFG Repo-Cleaner)
4. Force push (coordinate with anyone else using the repo)

**Prevention:** Always run `git status` before committing to ensure no `.env` files are staged.
