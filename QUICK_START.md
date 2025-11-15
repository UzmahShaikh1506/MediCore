# 🚀 Quick Start with Ollama

Get up and running in 5 minutes!

## Step 1: Install Ollama (2 minutes)

**Download and install:**
- **Windows/Mac:** https://ollama.ai/download
- **Linux:** `curl -fsSL https://ollama.ai/install.sh | sh`

Ollama will start automatically after installation.

## Step 2: Download Model (2 minutes)

Open terminal/command prompt and run:

```bash
ollama pull llama3.2
```

This downloads the recommended model (~2GB). First time takes a few minutes.

## Step 3: Verify Setup (30 seconds)

```bash
# In your project directory:
pnpm check-ollama
```

You should see:
```
✅ Ollama is running!
✅ Model "llama3.2" is ready to use!
✨ Ollama is ready to use with MediCore!
```

## Step 4: Start the App (30 seconds)

```bash
pnpm dev
```

Open http://localhost:3000 and you're ready! 🎉

## Test It Out

1. Go to **Translator** page
2. Enter: `"The patient has myocardial infarction"`
3. Click **Translate**
4. You should see: `"The patient has a heart attack"` (or similar)

If you see simplified text, Ollama is working perfectly! ✅

---

## Troubleshooting

**Ollama not detected?**
```bash
# Check if running:
ollama list

# If not, start it:
ollama serve
```

**Model not found?**
```bash
# List models:
ollama list

# Download if missing:
ollama pull llama3.2
```

**Need help?** See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for detailed guide.

---

That's it! No API keys, no internet required (after download), completely free! 🎉

