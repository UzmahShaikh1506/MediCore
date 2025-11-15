import { NextRequest, NextResponse } from 'next/server'
import { processMedicalReport } from '@/lib/services/ocr-service'
import { summarizeMedicalReport } from '@/lib/services/ai-service'
import type { ReportAnalysisResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const fileType = (formData.get('fileType') as 'image' | 'pdf') || 'image'
    const language = (formData.get('language') as string) || 'en'

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { 
          error: 'File is required. Please upload a medical report image or PDF.',
          extractedText: '',
          simplifiedSummary: '',
          detailedExplanation: '',
          keyFindings: [],
          treatmentRecommendations: [],
          medicineSuggestions: [],
          lifestyleAdvice: [],
          whenToConsultDoctor: [],
          parameterBreakdown: [],
        },
        { status: 400 }
      )
    }

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const validPdfType = 'application/pdf'
    const fileMimeType = file.type

    if (fileType === 'pdf' && fileMimeType !== validPdfType) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Expected PDF file.',
          extractedText: '',
          simplifiedSummary: '',
          detailedExplanation: '',
          keyFindings: [],
          treatmentRecommendations: [],
          medicineSuggestions: [],
          lifestyleAdvice: [],
          whenToConsultDoctor: [],
          parameterBreakdown: [],
        },
        { status: 400 }
      )
    }

    if (fileType === 'image' && !validImageTypes.includes(fileMimeType)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Expected image file (JPG, PNG, GIF, or WebP).',
          extractedText: '',
          simplifiedSummary: '',
          detailedExplanation: '',
          keyFindings: [],
          treatmentRecommendations: [],
          medicineSuggestions: [],
          lifestyleAdvice: [],
          whenToConsultDoctor: [],
          parameterBreakdown: [],
        },
        { status: 400 }
      )
    }

    // Convert File → ArrayBuffer → Buffer
    // This is the correct way to handle file uploads in Next.js App Router
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Step 1: Extract text from file using OCR (no workers!)
    let extractedText: string
    try {
      extractedText = await processMedicalReport(buffer, fileType)
      
      // Validate extracted text
      if (!extractedText || extractedText.trim().length < 20) {
        return NextResponse.json(
          { 
            error: 'Could not extract sufficient text from the document. Please ensure the image is clear, well-lit, and contains readable text. Try using a PDF format if available.',
            extractedText: extractedText || '',
            simplifiedSummary: '',
            detailedExplanation: '',
            keyFindings: [],
            treatmentRecommendations: [],
            medicineSuggestions: [],
            lifestyleAdvice: [],
            whenToConsultDoctor: [],
          },
          { status: 400 }
        )
      }
    } catch (ocrError) {
      console.error('OCR processing error:', ocrError)
      const errorMessage = ocrError instanceof Error ? ocrError.message : 'Failed to extract text from file'
      
      // Provide helpful error message
      let userMessage = errorMessage
      if (errorMessage.includes('Python') || errorMessage.includes('pip install')) {
        userMessage = 'Python OCR setup required. Please install Python and run: pip install easyocr pillow. Alternatively, use PDF format which works without setup.'
      } else if (errorMessage.includes('timeout') || errorMessage.includes('download')) {
        userMessage = 'OCR is processing (first run may take 1-2 minutes to download models). Please wait and try again, or use PDF format for instant results.'
      } else if (fileType === 'image') {
        userMessage = 'Image OCR failed. Please try uploading a PDF file instead, or ensure Python OCR is set up. PDF format works without any setup!'
      }
      
      return NextResponse.json(
        { 
          error: userMessage,
          extractedText: '',
          simplifiedSummary: '',
          detailedExplanation: '',
          keyFindings: [],
          treatmentRecommendations: [],
          medicineSuggestions: [],
          lifestyleAdvice: [],
          whenToConsultDoctor: [],
          parameterBreakdown: [],
        },
        { status: 400 }
      )
    }

    // Step 2: Summarize and simplify using Ollama
    let analysisResult
    
    try {
      analysisResult = await summarizeMedicalReport(extractedText, language as any)
    } catch (aiError) {
      console.error('AI summarization error:', aiError)
      // If AI fails, provide basic fallback
      const lines = extractedText.split('\n').filter(line => line.trim().length > 0)
      analysisResult = {
        summary: `This medical report contains ${lines.length} lines of text. Key information has been extracted. Please review the extracted text below for detailed information.`,
        detailedExplanation: `The report shows various medical test results. Some values may be outside the normal range. It's important to discuss these results with a healthcare professional for proper interpretation and treatment.`,
        keyFindings: ['Review the extracted text for detailed information', 'Report contains medical test results and findings'],
        treatmentRecommendations: ['Consult with a healthcare professional for proper diagnosis and treatment plan'],
        medicineSuggestions: ['Please consult a doctor for appropriate medication. Do not self-medicate.'],
        lifestyleAdvice: ['Maintain a balanced diet', 'Get regular exercise', 'Stay hydrated'],
        whenToConsultDoctor: ['For proper diagnosis and treatment plan', 'If you experience any symptoms'],
        parameterBreakdown: [],
      }
    }

    // Return clean JSON response
    const response: ReportAnalysisResponse = {
      extractedText,
      simplifiedSummary: analysisResult.summary,
      detailedExplanation: analysisResult.detailedExplanation,
      keyFindings: analysisResult.keyFindings,
      treatmentRecommendations: analysisResult.treatmentRecommendations,
      medicineSuggestions: analysisResult.medicineSuggestions,
      lifestyleAdvice: analysisResult.lifestyleAdvice,
      whenToConsultDoctor: analysisResult.whenToConsultDoctor,
      parameterBreakdown: analysisResult.parameterBreakdown || [],
      language: language as any,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Report analysis error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to analyze report. Please try again.',
        extractedText: '',
        simplifiedSummary: '',
        detailedExplanation: '',
        keyFindings: [],
        treatmentRecommendations: [],
        medicineSuggestions: [],
        lifestyleAdvice: [],
        whenToConsultDoctor: [],
      },
      { status: 500 }
    )
  }
}
