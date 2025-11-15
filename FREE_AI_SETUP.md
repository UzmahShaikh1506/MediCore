# Free AI Setup Guide

This app supports multiple free AI options! You don't need an OpenAI API key.

## Option 1: Ollama (Recommended - Completely Free & Local) ⭐

Ollama runs AI models locally on your computer - completely free, no API keys, no internet required after setup.

### Setup Steps:

1. **Install Ollama**
   - Download from: https://ollama.ai
   - Install for your operating system (Windows/Mac/Linux)

2. **Pull a Model**
   ```bash
   # Recommended models (choose one):
   ollama pull llama3.2        # Fast, good quality (2GB)
   ollama pull mistral         # Great for medical text (4GB)
   ollama pull phi3            # Very fast, smaller (2GB)
   ```

3. **Start Ollama**
   - Ollama runs automatically after installation
   - It should be available at `http://localhost:11434`

4. **Configure (Optional)**
   - Add to `.env`:
     ```
     OLLAMA_URL=http://localhost:11434
     OLLAMA_MODEL=llama3.2
     ```
   - If you don't set these, the app will use defaults

5. **That's it!** The app will automatically use Ollama.

### Model Recommendations:
- **llama3.2** - Best balance of speed and quality (recommended)
- **mistral** - Excellent for medical/technical text
- **phi3** - Fastest, good for simple tasks
- **llama3** - Larger, better quality but slower

---

## Option 2: Hugging Face (Free Tier)

Hugging Face offers a free tier with 1000 requests/month.

### Setup Steps:

1. **Create Account**
   - Go to: https://huggingface.co
   - Sign up for free account

2. **Get API Token**
   - Go to: https://huggingface.co/settings/tokens
   - Create a new token (read access is enough)

3. **Add to `.env`**
   ```
   HUGGING_FACE_API_KEY=your_token_here
   HUGGING_FACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2
   ```

4. **Free Tier Limits:**
   - 1000 requests/month
   - After that, you'll need to upgrade or use Ollama

---

## Option 3: OpenAI (Paid - Most Accurate)

If you have an OpenAI API key, the app will use it automatically.

1. Get API key from: https://platform.openai.com/api-keys
2. Add to `.env`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

---

## Option 4: Dictionary Fallback (No Setup Required)

If no AI providers are configured, the app uses a built-in medical terminology dictionary. This provides basic term replacements but isn't as smart as AI.

**No setup needed** - works out of the box!

---

## Priority Order

The app tries AI providers in this order:

1. **Ollama** (if running locally)
2. **Hugging Face** (if API key provided)
3. **OpenAI** (if API key provided)
4. **Dictionary Fallback** (always works)

---

## Testing Your Setup

1. Start the app: `pnpm dev`
2. Go to `/translator`
3. Enter: "The patient has myocardial infarction"
4. Click "Translate"

If you see a simplified version, your AI setup is working!

---

## Troubleshooting

### Ollama Not Working?
- Check if Ollama is running: `ollama list`
- Start Ollama service if needed
- Check `OLLAMA_URL` in `.env` matches your setup
- Try: `ollama serve` in terminal

### Hugging Face Errors?
- Verify API token is correct
- Check if you've exceeded free tier (1000 requests/month)
- Try a different model in `HUGGING_FACE_MODEL`

### No AI Working?
- The app will fall back to dictionary-based simplification
- Check browser console for errors
- Verify at least one provider is configured

---

## Recommended Setup for Best Experience

**For Local Development:**
- Use **Ollama** with `llama3.2` model
- Fast, free, no internet needed after setup

**For Production:**
- Use **Ollama** on server, OR
- Use **Hugging Face** free tier, OR
- Use **OpenAI** for best quality (paid)

---

## Performance Comparison

| Provider | Speed | Quality | Cost | Setup |
|----------|-------|---------|------|-------|
| Ollama | Fast | Good | Free | Easy |
| Hugging Face | Medium | Good | Free (limited) | Easy |
| OpenAI | Fast | Excellent | Paid | Easy |
| Dictionary | Instant | Basic | Free | None |

---

## Need Help?

- Ollama Docs: https://github.com/ollama/ollama
- Hugging Face Docs: https://huggingface.co/docs
- Check app logs in browser console

