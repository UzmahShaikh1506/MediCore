# Python OCR Setup Guide

The report analyzer uses Python-based OCR (EasyOCR) which is free and doesn't require system binaries.

## Quick Setup (5 minutes)

### Step 1: Install Python

**Windows:**
- Download from: https://www.python.org/downloads/
- During installation, check "Add Python to PATH"
- Verify: `python --version` (should show Python 3.8+)

### Step 2: Install Python Dependencies

```bash
# Install EasyOCR and dependencies
pip install easyocr pillow

# Or if you prefer pytesseract (requires Tesseract binary):
# pip install pytesseract pillow
```

### Step 3: Verify Setup

```bash
python ocr_service.py
```

If you see a JSON response (even with an error), Python OCR is set up!

## Alternative: Use PDF Only

If you don't want to install Python, you can:
- **Use PDF format only** - PDF parsing works without any setup!
- The app will still work, just upload PDFs instead of images

## Troubleshooting

**Python not found?**
- Make sure Python is in PATH
- Try `python3` instead of `python`
- Restart terminal after installing Python

**EasyOCR installation fails?**
- Install PyTorch first: `pip install torch torchvision`
- Then: `pip install easyocr pillow`

**Still having issues?**
- Use PDF format - it works without any setup!
- PDF parsing is more reliable than OCR anyway

## Why Python OCR?

- ✅ **Free** - No API keys needed
- ✅ **Better accuracy** - EasyOCR is very accurate
- ✅ **No system binaries** - Everything in Python
- ✅ **Works server-side** - Perfect for Next.js

---

**Note:** PDF parsing works immediately without any setup. For images, Python OCR provides the best free solution.

