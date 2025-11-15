#!/usr/bin/env python3
"""
Python OCR Service using EasyOCR (free, no system dependencies needed)
Falls back to pytesseract if EasyOCR not available
"""

import sys
import json
import base64
from io import BytesIO

try:
    from PIL import Image
    import easyocr
    USE_EASYOCR = True
except ImportError:
    try:
        from PIL import Image
        import pytesseract
        USE_EASYOCR = False
    except ImportError:
        print(json.dumps({"error": "No OCR library available. Install: pip install easyocr pillow"}))
        sys.exit(1)

def extract_text_from_image(image_data_base64):
    """Extract text from base64 encoded image"""
    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data_base64)
        image = Image.open(BytesIO(image_bytes))
        
        if USE_EASYOCR:
            # Use EasyOCR (better accuracy, no system dependencies)
            # Note: First run will download models (~100MB) - this is normal
            reader = easyocr.Reader(['en'], gpu=False, verbose=False)
            try:
                results = reader.readtext(image_bytes)
            except Exception:
                # If reading from bytes fails, try with image object instead
                results = reader.readtext(image)
            # Combine all detected text
            text = ' '.join([result[1] for result in results])
            confidence = sum([result[2] for result in results]) / len(results) if results else 0
        else:
            # Fallback to pytesseract
            text = pytesseract.image_to_string(image, lang='eng')
            # Get confidence data
            data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
            confidences = [int(conf) for conf in data['conf'] if int(conf) > 0]
            confidence = sum(confidences) / len(confidences) / 100 if confidences else 0
        
        if not text or len(text.strip()) < 3:
            return {
                "error": "No text detected in image. Please ensure the image is clear and contains readable text."
            }
        
        return {
            "text": text.strip(),
            "confidence": float(confidence)
        }
    except Exception as e:
        error_msg = str(e)
        # Provide helpful error messages
        if "CUDA" in error_msg or "GPU" in error_msg:
            return {"error": "GPU error. Please ensure CUDA is properly configured or use CPU mode."}
        elif "model" in error_msg.lower() or "download" in error_msg.lower():
            return {"error": "EasyOCR model download failed. Please check your internet connection and try again."}
        else:
            return {"error": f"OCR processing error: {error_msg}"}

if __name__ == "__main__":
    # Read image file path from command line argument or stdin
    if len(sys.argv) > 1:
        # File path provided as argument
        image_path = sys.argv[1]
        try:
            if USE_EASYOCR:
                # EasyOCR accepts file path directly (best option)
                reader = easyocr.Reader(['en'], gpu=False, verbose=False)
                results = reader.readtext(image_path)
                
                text = ' '.join([result[1] for result in results])
                confidence = sum([result[2] for result in results]) / len(results) if results else 0
                
                if not text or len(text.strip()) < 3:
                    print(json.dumps({"error": "No text detected in image."}))
                else:
                    print(json.dumps({"text": text.strip(), "confidence": float(confidence)}))
            else:
                # Fallback to pytesseract
                image = Image.open(image_path)
                text = pytesseract.image_to_string(image, lang='eng')
                data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
                confidences = [int(conf) for conf in data['conf'] if int(conf) > 0]
                confidence = sum(confidences) / len(confidences) / 100 if confidences else 0
                result = {"text": text.strip(), "confidence": confidence}
                print(json.dumps(result))
        except Exception as e:
            error_msg = str(e)
            # Provide helpful error messages
            if "CUDA" in error_msg or "GPU" in error_msg:
                print(json.dumps({"error": "GPU error. Please ensure CUDA is properly configured or use CPU mode."}))
            elif "model" in error_msg.lower() or "download" in error_msg.lower():
                print(json.dumps({"error": "EasyOCR model download failed. Please check your internet connection and try again."}))
            else:
                print(json.dumps({"error": f"OCR processing error: {error_msg}"}))
            sys.exit(1)
    else:
        # Fallback to stdin (base64)
        try:
            image_data = sys.stdin.read()
            result = extract_text_from_image(image_data)
            print(json.dumps(result))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
            sys.exit(1)

