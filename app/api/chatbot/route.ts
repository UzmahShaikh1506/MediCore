import { NextRequest, NextResponse } from 'next/server'
import { generateChatbotResponse } from '@/lib/services/ai-service'
import type { ChatbotRequest, ChatbotResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: ChatbotRequest = await request.json()

    if (!body.message || !body.message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const response = await generateChatbotResponse(
      body.message,
      body.language || 'en',
      body.conversationHistory || []
    )

    const chatbotResponse: ChatbotResponse = {
      response,
      language: body.language || 'en',
    }

    return NextResponse.json(chatbotResponse)
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

