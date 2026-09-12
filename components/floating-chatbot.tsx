'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Loader2, Send, X, Minus, Sparkles, User } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { CuteDoctorIcon } from '@/components/cute-doctor-icon'
import type { Language } from '@/lib/types'
import type { ChatbotMessage } from '@/lib/types'

const GREETING_MESSAGE: ChatbotMessage = {
  role: 'assistant',
  content:
    "Hello there! 👋 I'm MediBot, your friendly medical assistant. How are you feeling today? If something's bothering you or you have any health questions, I'm here to help! 💚",
  timestamp: new Date(),
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatbotMessage[]>([GREETING_MESSAGE])
  const [input, setInput] = useState('')
  const [language] = useState<Language>('en')
  const [loading, setLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const timer = setTimeout(() => inputRef.current?.focus(), 350)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isMinimized])

  // Core send function that accepts the message text directly
  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || loading) return

    const userMessage: ChatbotMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          language,
          conversationHistory: messages
            .filter((m) => m !== GREETING_MESSAGE)
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      const assistantMessage: ChatbotMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (isMinimized) setHasNewMessage(true)
    } catch (error) {
      console.error('Chatbot error:', error)
      toast.error('Failed to get response. Please try again.')

      const errorMessage: ChatbotMessage = {
        role: 'assistant',
        content: "I'm sorry, I ran into a problem. Please try asking again! 🙏",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }, [loading, language, messages, isMinimized])

  // Wrapper that reads from state (for the send button / Enter key)
  const handleSend = useCallback(() => {
    sendMessage(input)
  }, [input, sendMessage])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true)
      setIsMinimized(false)
      setHasNewMessage(false)
    } else {
      setIsOpen(false)
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      if (prev) setHasNewMessage(false)
      return !prev
    })
  }

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-[9999] transition-all duration-300 ease-in-out origin-bottom-right ${
          isOpen
            ? isMinimized
              ? 'scale-y-0 opacity-0 pointer-events-none'
              : 'scale-100 opacity-100'
            : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-[360px] max-w-[calc(100vw-2rem)] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: '480px' }}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 p-1 shadow-inner">
                <CuteDoctorIcon className="w-full h-full" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">MediBot</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <p className="text-[11px] opacity-80">Online • Your Health Assistant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-lg"
                aria-label="Minimize chat"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-lg"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <ScrollArea className="flex-1 min-h-0 p-4">
            <div className="space-y-3 pr-2">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 shrink-0 mt-0.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center p-0.5">
                      <CuteDoctorIcon className="w-full h-full" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-[10px] opacity-50 mt-1" suppressHydrationWarning>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                      <AvatarFallback className="bg-secondary/30 text-secondary-foreground text-xs">
                        <User className="h-3.5 w-3.5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="h-8 w-8 shrink-0 mt-0.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center p-0.5">
                    <CuteDoctorIcon className="w-full h-full" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Suggestions (show only when no user messages yet) */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-[11px] text-muted-foreground mb-1.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Quick questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'What is diabetes?',
                  'Explain hypertension',
                  'What does MRI mean?',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      // Directly send the suggestion text — no stale-state issues
                      sendMessage(suggestion)
                    }}
                    disabled={loading}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-background hover:bg-muted transition-colors text-foreground disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="px-3 py-3 border-t border-border bg-background">
            <div className="flex gap-2 items-center">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your health question..."
                disabled={loading}
                className="flex-1 rounded-full text-sm h-9 px-4 border-border"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                size="icon"
                className="rounded-full h-9 w-9 shrink-0"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5 opacity-60">
              Not a substitute for professional medical advice
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button — Cube / Rounded-Square Shape with Cute Doctor Character */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-5 right-4 sm:right-6 z-[9999] group"
        aria-label={isOpen ? 'Close medical assistant' : 'Open medical assistant'}
      >
        <div
          className={`relative flex items-center justify-center w-20 h-20 shadow-xl transition-all duration-300 overflow-hidden ${
            isOpen
              ? 'bg-emerald-700/95 scale-95 shadow-md'
              : 'bg-gradient-to-tr from-emerald-600 via-green-600 to-teal-500 hover:scale-105 shadow-[0_10px_25px_-3px_rgba(16,185,129,0.45),0_4px_6px_-4px_rgba(16,185,129,0.2)] hover:shadow-[0_16px_32px_-2px_rgba(16,185,129,0.6)]'
          }`}
          style={{ borderRadius: isOpen ? '18px' : '22px' }}
        >
          {/* Animated ping ring when closed */}
          {!isOpen && (
            <span
              className="absolute inset-0 bg-emerald-400/40 animate-ping opacity-60"
              style={{ borderRadius: '22px' }}
            />
          )}

          {/* Icon — cute doctor character or close button */}
          <span className="relative flex items-center justify-center transition-transform duration-300">
            {isOpen ? (
              <X className="h-8 w-8 text-white" strokeWidth={2.5} />
            ) : (
              <CuteDoctorIcon className="w-16 h-16 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
            )}
          </span>

          {/* Notification dot for new messages while minimized */}
          {hasNewMessage && !isOpen && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white ring-2 ring-rose-500/30" />
          )}
        </div>

        {/* Tooltip label when closed */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            Need health help? 🩺
            <span className="absolute top-full right-6 w-2 h-2 bg-foreground rotate-45 -translate-y-1" />
          </div>
        )}
      </button>
    </>
  )
}
