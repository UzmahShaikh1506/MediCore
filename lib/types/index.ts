export type Language = 'en' | 'hi' | 'mr' | 'ur'

export interface TranslateRequest {
  text: string
  targetLanguage: Language
}

export interface TranslateResponse {
  originalText: string
  simplifiedText: string
  language: Language
}

export interface ChatbotMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatbotRequest {
  message: string
  language: Language
  conversationHistory?: ChatbotMessage[]
}

export interface ChatbotResponse {
  response: string
  language: Language
}

export interface ReportAnalysisRequest {
  file: File | Buffer
  language: Language
  fileType: 'image' | 'pdf'
}

export interface ParameterBreakdown {
  parameterName: string
  patientValue: string
  unit: string
  normalRange: string
  status: 'normal' | 'high' | 'low'
  explanation: string
}

export interface ReportAnalysisResponse {
  extractedText: string
  simplifiedSummary: string
  detailedExplanation: string
  keyFindings: string[]
  treatmentRecommendations: string[]
  medicineSuggestions: string[]
  lifestyleAdvice: string[]
  whenToConsultDoctor: string[]
  parameterBreakdown: ParameterBreakdown[]
  language: Language
}

export interface OCRResult {
  text: string
  confidence: number
}

