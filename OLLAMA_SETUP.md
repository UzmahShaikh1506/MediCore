# Ollama Setup Guide - Quick Start

Ollama is the **recommended** AI provider for this app - it's completely free, runs locally, and doesn't require any API keys!

## Quick Setup (5 minutes)

### Step 1: Install Ollama

**Windows:**
1. Download from: https://ollama.ai/download
2. Run the installer
3. Ollama will start automatically

**Mac:**
```bash
brew install ollama
# or download from https://ollama.ai/download
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 2: Download a Model

Open terminal/command prompt and run:

```bash
# Recommended for medical text (best quality):
ollama pull llama3.2

# Alternative options:
# ollama pull mistral      # Great for medical/technical text
# ollama pull phi3         # Faster, smaller model
# ollama pull llama3       # Larger, better quality but slower
```

**Note:** First download takes a few minutes (2-4GB depending on model)

### Step 3: Verify Installation

```bash
# Check if Ollama is running:
ollama list

# Test the model:
ollama run llama3.2 "What is diabetes?"
```

If you see a response, Ollama is working! ✅

### Step 4: Start the App

```bash
cd MediCore
pnpm dev
```

The app will **automatically detect** Ollama and use it! No configuration needed.

## Optional: Custom Configuration

If Ollama is running on a different port or you want to use a different model, create `.env`:

```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

## Model Recommendations

| Model | Size | Speed | Quality | Best For |
|-------|------|-------|---------|----------|
| **llama3.2** ⭐ | 2GB | Fast | Excellent | **Recommended** |
| mistral | 4GB | Medium | Excellent | Medical/technical text |
| phi3 | 2GB | Very Fast | Good | Quick responses |
| llama3 | 4GB | Medium | Excellent | Best quality |

**For this medical app, we recommend `llama3.2`** - best balance of speed and quality.

## Troubleshooting

### Ollama Not Detected?

1. **Check if Ollama is running:**
   ```bash
   ollama list
   ```
   If this fails, start Ollama:
   ```bash
   ollama serve
   ```

2. **Check the URL:**
   - Default: `http://localhost:11434`
   - Verify in browser: http://localhost:11434/api/tags
   - Should return JSON with your models

3. **Check model name:**
   ```bash
   ollama list
   ```
   Make sure the model you downloaded matches `OLLAMA_MODEL` in `.env` (or use default `llama3.2`)

### Slow Responses?

- Use a smaller model: `phi3` or `llama3.2` (instead of `llama3`)
- Close other applications to free up RAM
- First request is slower (model loading), subsequent requests are faster

### Model Not Found?

```bash
# List downloaded models:
ollama list

# If your model isn't there, download it:
ollama pull llama3.2
```

### Port Already in Use?

If port 11434 is busy:
```bash
# Change Ollama port (in Ollama settings or config)
# Then update .env:
OLLAMA_URL=http://localhost:YOUR_PORT
```

## Testing Your Setup

1. Start the app: `pnpm dev`
2. Go to: http://localhost:3000/translator
3. Enter: "The patient has myocardial infarction"
4. Click "Translate"
5. You should see: "The patient has a heart attack" (or similar simplified text)

If you see simplified text, Ollama is working! 🎉

## Advanced: Running Ollama on Server

If you want to run Ollama on a different machine:

1. Start Ollama on server with remote access:
   ```bash
   OLLAMA_HOST=0.0.0.0:11434 ollama serve
   ```

2. Update `.env` in your app:
   ```env
   OLLAMA_URL=http://your-server-ip:11434
   ```

## Performance Tips

- **First request:** Slower (model loads into memory)
- **Subsequent requests:** Much faster (model stays in memory)
- **RAM usage:** Models use 2-8GB RAM depending on size
- **CPU:** Works on CPU, but GPU is much faster (if available)

## Need Help?

- Ollama Docs: https://github.com/ollama/ollama
- Ollama Models: https://ollama.ai/library
- Check browser console for errors
- Check terminal for Ollama logs

---

**That's it!** Once Ollama is installed and a model is downloaded, the app will automatically use it. No API keys, no internet required (after initial download), completely free! 🚀

