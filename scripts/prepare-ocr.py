#!/usr/bin/env python3
"""
Pre-download EasyOCR models to avoid long delays on first OCR run
Run this once: python scripts/prepare-ocr.py
"""

import sys

try:
    import easyocr
    print("✅ EasyOCR is installed")
    print("📥 Downloading EasyOCR models (this may take 2-5 minutes)...")
    print("   This is a one-time setup. Models will be cached for future use.")
    
    # Initialize reader - this will download models on first run
    reader = easyocr.Reader(['en'], gpu=False, verbose=True)
    
    print("✅ EasyOCR models downloaded successfully!")
    print("✅ OCR is ready to use. First image processing will now be much faster.")
    
except ImportError:
    print("❌ EasyOCR is not installed")
    print("📦 Install it with: pip install easyocr pillow")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

