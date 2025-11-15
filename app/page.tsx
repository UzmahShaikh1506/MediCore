import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Languages,
  MessageSquare,
  FileText,
  Shield,
  CheckCircle,
  ArrowRight,
  Brain,
  Globe,
  Zap,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Shield className="w-3 h-3 mr-1" />
                  Privacy First • AI-Powered
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Medical Jargon Made <span className="text-primary">Simple</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                  Comprehensive medical jargon simplifier app. Translate complex medical text, chat with our AI assistant, and analyze medical reports with OCR technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/report-analyzer">
                    Analyze Report
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/translator">Try Translator</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Multi-language Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>OCR Technology</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>AI-Powered</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-card border rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Medical Report Analysis</h3>
                    <Badge variant="secondary">AI Powered</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm">Upload medical report...</span>
                    </div>

                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Simplified Summary</div>
                      <p className="text-sm">
                        Your report shows normal blood sugar levels. Continue with current medication.
                      </p>
                    </div>

                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium">Key Findings</span>
                      </div>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        <li>• Blood pressure: Normal</li>
                        <li>• Cholesterol: Within range</li>
                        <li>• Follow-up in 3 months</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Three Powerful Features</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Everything you need to understand medical terminology and reports
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Languages className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Medical Text Translator</CardTitle>
                <CardDescription>
                  Translate complex medical text into simple, easy-to-understand language in multiple languages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/translator">
                    Try Translator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Medical Terminology Chatbot</CardTitle>
                <CardDescription>
                  Ask questions about medical terms and get simple explanations from our AI assistant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/chatbot">
                    Start Chatting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Medical Report Analyzer</CardTitle>
                <CardDescription>
                  Upload medical reports (PDF or images) and get simplified summaries with OCR technology.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/report-analyzer">
                    Analyze Report
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">How It Works</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Simple steps to understand your medical information
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-lg">Upload or Enter</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your medical report or enter medical text you want to understand
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-lg">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI extracts text (OCR), analyzes content, and simplifies medical jargon
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-lg">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  Receive simplified summaries and explanations in your preferred language
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Multi-Language</CardTitle>
                <CardDescription>
                  Available in English, Hindi, Marathi, and Urdu
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">OCR Technology</CardTitle>
                <CardDescription>
                  Extract text from images and PDF documents
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">AI-Powered</CardTitle>
                <CardDescription>
                  Advanced AI for accurate text simplification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Privacy First</CardTitle>
                <CardDescription>
                  Your medical data is secure and private
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Ready to Understand Your Medical Reports?
            </h2>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Start using MediCore today to simplify medical jargon and make informed health decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/report-analyzer">Analyze Your Report</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/translator">Try Translator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
