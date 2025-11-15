import { exec } from 'child_process'
import { promisify } from 'util'
import { join } from 'path'
import { promises as fs } from 'fs'
import { tmpdir } from 'os'
import pdfParse from 'pdf-parse'
import type { OCRResult } from '@/lib/types'

const execAsync = promisify(exec)

/**
 * Extracts text from image using Python OCR (EasyOCR or pytesseract)
 * This works without system dependencies - Python handles everything
 */
export async function extractTextFromImage(imageBuffer: Buffer): Promise<OCRResult> {
  let tempFilePath: string | null = null
  
  try {
    // Path to Python OCR script
    const pythonScriptPath = join(process.cwd(), 'ocr_service.py')
    
    // Check if Python is available
    let pythonCommand = 'python'
    try {
      await execAsync('python --version')
    } catch {
      try {
        await execAsync('python3 --version')
        pythonCommand = 'python3'
      } catch {
        throw new Error('Python is not installed. Please install Python 3.8+ to use OCR features.')
      }
    }

    // Create temporary file for image (more reliable than stdin, especially on Windows)
    const tempFileName = `ocr_${Date.now()}_${Math.random().toString(36).substring(7)}.png`
    tempFilePath = join(tmpdir(), tempFileName)
    await fs.writeFile(tempFilePath, imageBuffer)

    // Call Python OCR script with file path
    // Note: First run may take 2-5 minutes as EasyOCR downloads models (~100MB)
    const { stdout, stderr } = await execAsync(
      `${pythonCommand} "${pythonScriptPath}" "${tempFilePath}"`,
      {
        maxBuffer: 50 * 1024 * 1024, // 50MB buffer
        timeout: 600000, // 10 minutes timeout (first run needs to download models)
      }
    )

    // Clean up temp file after command completes
    try {
      await fs.unlink(tempFilePath)
      tempFilePath = null
    } catch (e) {
      // Ignore cleanup errors
    }

    if (stderr && !stderr.includes('Warning') && !stderr.includes('Downloading')) {
      console.error('Python OCR stderr:', stderr)
    }

    // Parse JSON response from Python
    const result = JSON.parse(stdout.trim())

    if (result.error) {
      throw new Error(result.error)
    }

    const extractedText = result.text?.trim() || ''
    
    // Validate that we got meaningful text
    if (!extractedText || extractedText.length < 10) {
      throw new Error('OCR extracted very little or no text. The image may be unclear or contain no readable text.')
    }

    return {
      text: extractedText,
      confidence: result.confidence || 0.85,
    }
  } catch (error) {
    // Clean up temp file on error
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath)
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    
    console.error('OCR Error Details:', error)
    
    // Provide helpful error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Check for timeout
    if (errorMessage.includes('killed') || errorMessage.includes('SIGTERM') || errorMessage.includes('timeout')) {
      throw new Error('OCR processing timed out. First run may take 5-10 minutes to download models. Please try again, or use PDF format for instant results.')
    }
    
    // Check if it's a Python/library issue
    if (errorMessage.includes('Python') || errorMessage.includes('pip install')) {
      throw new Error(`OCR setup required: ${errorMessage}. Please install Python dependencies: pip install easyocr pillow`)
    }
    
    throw new Error(`OCR processing failed: ${errorMessage}. Please ensure the image is clear, well-lit, and contains readable text.`)
  }
}

/**
 * Extracts text from PDF
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(pdfBuffer)
    const text = data.text.trim()
    
    if (!text || text.length < 10) {
      throw new Error('PDF appears to be empty or contains no extractable text')
    }
    
    return text
  } catch (error) {
    console.error('PDF Parse Error:', error)
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Processes uploaded file and extracts text
 * Handles File → ArrayBuffer → Buffer conversion properly
 */
export async function processMedicalReport(
  fileBuffer: Buffer,
  fileType: 'image' | 'pdf'
): Promise<string> {
  if (fileType === 'pdf') {
    return await extractTextFromPDF(fileBuffer)
  } else {
    const result = await extractTextFromImage(fileBuffer)
    return result.text
  }
}
