# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Set Up Ollama (Recommended - 5 minutes)**
   
   **Quick Setup:**
   ```bash
   # 1. Install Ollama from https://ollama.ai/download
   # 2. Download model:
   ollama pull llama3.2
   # 3. Verify (optional):
   pnpm check-ollama
   ```
   
   That's it! The app automatically detects Ollama. No .env needed!
   
   **See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for detailed instructions.**
   
   > **Note:** App works without Ollama using dictionary fallback, but AI results are much better with Ollama!

3. **Set Up OCR for Image Processing (Optional)**
   
   **For PDF files:** No setup needed - works immediately!
   
   **For Image files:** Requires Python OCR setup:
   ```bash
   # 1. Install Python OCR libraries:
   pip install easyocr pillow
   
   # 2. Pre-download models (recommended - one-time, takes 2-5 minutes):
   npm run prepare-ocr
   # or
   python scripts/prepare-ocr.py
   ```
   
   > **Note:** First image upload will download models (~100MB) if you skip step 2. PDF format works without any setup!

4. **Run Development Server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open Browser**
   - Navigate to http://localhost:3000

## Features Overview

### 1. Medical Text Translator (`/translator`)
- Enter complex medical text
- Select target language (English, Hindi, Marathi, Urdu)
- Get simplified translation

### 2. Medical Chatbot (`/chatbot`)
- Ask questions about medical terms
- Get explanations in simple language
- Supports conversation history

### 3. Report Analyzer (`/report-analyzer`)
- Upload PDF or image files
- OCR extracts text automatically
- Get simplified summary and key findings
- Left side: Upload area
- Right side: Analysis results

## API Endpoints

All endpoints are located in `app/api/`:

- `POST /api/translate` - Translate medical text
- `POST /api/chatbot` - Chatbot responses
- `POST /api/ocr` - Extract text from images/PDFs
- `POST /api/report` - Full report analysis (OCR + AI summary)

## Troubleshooting

### OCR Not Working
- **For PDF files:** Should work immediately - no setup needed
- **For Image files:** 
  - Ensure Python 3.8+ is installed
  - Install OCR libraries: `pip install easyocr pillow`
  - First run may take 5-10 minutes to download models (one-time)
  - Pre-download models: `npm run prepare-ocr` (recommended)
- Check file format (supports: PDF, JPG, PNG, JPEG, WebP)
- Large files may take longer to process
- If timeout occurs, try PDF format instead

### AI Features Not Working
- **If using Ollama:** Check if Ollama is running (`ollama list`)
- **If using Hugging Face:** Verify API token and check free tier limits
- **If using OpenAI:** Verify API key is valid and has credits
- **Fallback:** App will use dictionary-based simplification automatically
- Review browser console for specific errors

### Build Errors
- Run `pnpm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild

## Dependencies

Key dependencies added:
- `pdf-parse` - PDF text extraction (works immediately)
- `react-dropzone` - File upload handling
- `next-intl` - Multi-language support
- Python OCR (EasyOCR) - For image processing (optional setup)

## Notes

- **PDF processing:** Works immediately - no setup required!
- **Image processing:** Requires Python + EasyOCR setup (see step 3)
- **AI features:** Works with Ollama (free), Hugging Face (free tier), or dictionary fallback
- All processing happens server-side for security
- First image OCR run may take 5-10 minutes to download models (one-time)

