import { NextResponse } from 'next/server'
import { analyzeSymptoms } from '@/lib/services/ai-service'
import type { SymptomCheckerRequest } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { age, sex, language, primarySymptom, duration, severity, associatedSymptoms, preExistingConditions } = body

    if (!age || !sex || !primarySymptom || !duration || severity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: age, sex, primarySymptom, duration, severity' },
        { status: 400 }
      )
    }

    if (typeof age !== 'number' || age < 0 || age > 150) {
      return NextResponse.json(
        { error: 'Invalid age. Must be a number between 0 and 150.' },
        { status: 400 }
      )
    }

    if (typeof severity !== 'number' || severity < 1 || severity > 10) {
      return NextResponse.json(
        { error: 'Invalid severity. Must be a number between 1 and 10.' },
        { status: 400 }
      )
    }

    const validSex = ['male', 'female', 'other']
    if (!validSex.includes(sex)) {
      return NextResponse.json(
        { error: 'Invalid sex. Must be male, female, or other.' },
        { status: 400 }
      )
    }

    const validLanguages = ['en', 'hi', 'mr', 'ur']
    const lang = validLanguages.includes(language) ? language : 'en'

    const symptomRequest: SymptomCheckerRequest = {
      age,
      sex,
      language: lang,
      primarySymptom: String(primarySymptom).trim(),
      symptomCategory: body.symptomCategory ? String(body.symptomCategory).trim() : undefined,
      duration: String(duration).trim(),
      severity,
      associatedSymptoms: Array.isArray(associatedSymptoms) ? associatedSymptoms.map(String) : [],
      preExistingConditions: Array.isArray(preExistingConditions) ? preExistingConditions.map(String) : [],
      currentMedications: body.currentMedications ? String(body.currentMedications).trim() : undefined,
    }

    const result = await analyzeSymptoms(symptomRequest)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Symptom checker API error:', error)
    return NextResponse.json(
      { error: 'An error occurred while analyzing symptoms. Please try again.' },
      { status: 500 }
    )
  }
}
