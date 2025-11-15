'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Languages, ArrowRight, Copy, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import type { Language } from '@/lib/types'

export default function TranslatorPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [language, setLanguage] = useState<Language>('en')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some medical text to translate')
      return
    }

    setLoading(true)
    setOutputText('')

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          targetLanguage: language,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to translate text')
      }

      const data = await response.json()
      setOutputText(data.simplifiedText)
      toast.success('Text translated successfully!')
    } catch (error) {
      console.error('Translation error:', error)
      toast.error('Failed to translate text. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-card">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Medical Text Translator</h1>
              <p className="text-muted-foreground mt-2">
                Translate complex medical text into simple, easy-to-understand language
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                  <SelectItem value="ur">اردو</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 container px-4 py-8 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Text</CardTitle>
                <CardDescription>
                  Enter complex medical terminology or text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    id="input-text"
                    placeholder="Enter medical text here... (e.g., 'The patient presents with acute myocardial infarction...')"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleTranslate} disabled={!inputText.trim() || loading} className="flex-1">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        Translate
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  {inputText && (
                    <Button variant="outline" onClick={handleClear} disabled={loading}>
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Simplified Text</CardTitle>
                    <CardDescription>
                      Easy-to-understand translation
                    </CardDescription>
                  </div>
                  {outputText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8 w-8 p-0"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] p-4 bg-muted/50 rounded-lg">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                        <p className="text-sm text-muted-foreground">Translating...</p>
                      </div>
                    </div>
                  ) : outputText ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{outputText}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center">
                      Translated text will appear here...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

