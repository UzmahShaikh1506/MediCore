import { NextRequest, NextResponse } from 'next/server'
import { simplifyMedicalText } from '@/lib/services/ai-service'
import type { TranslateRequest, TranslateResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: TranslateRequest = await request.json()

    if (!body.text || !body.text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const simplifiedText = await simplifyMedicalText(
      body.text,
      body.targetLanguage || 'en'
    )

    const response: TranslateResponse = {
      originalText: body.text,
      simplifiedText,
      language: body.targetLanguage || 'en',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    )
  }
}

