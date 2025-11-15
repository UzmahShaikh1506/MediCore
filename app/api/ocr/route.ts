import { NextRequest, NextResponse } from 'next/server'
import { processMedicalReport } from '@/lib/services/ocr-service'
import type { OCRResult } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileType = formData.get('fileType') as 'image' | 'pdf'

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const extractedText = await processMedicalReport(buffer, fileType || 'image')

    const result: OCRResult = {
      text: extractedText,
      confidence: 0.85, // Default confidence for OCR
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('OCR error:', error)
    return NextResponse.json(
      { error: 'Failed to extract text from file' },
      { status: 500 }
    )
  }
}

