import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Database,
  Shield,
  Zap,
  Code,
  Server,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  Cpu,
  Cloud,
  Lock,
  Globe,
} from "lucide-react"

export default function TechnologyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Cpu className="w-3 h-3 mr-1" />
              Advanced AI Architecture
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              Technology Behind <span className="text-primary">MediCore</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Discover the cutting-edge technologies and robust architecture that power our AI-driven medical report
              analysis and health tracking system.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">System Architecture</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              A modular, scalable architecture designed for reliability, security, and performance.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              {/* Input Layer */}
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Input Layer</CardTitle>
                  <CardDescription className="text-sm">Document Upload & Preprocessing</CardDescription>
                </CardHeader>
              </Card>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-primary hidden md:block" />
                <ArrowDown className="h-6 w-6 text-primary md:hidden" />
              </div>

              {/* OCR Processing */}
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">OCR Engine</CardTitle>
                  <CardDescription className="text-sm">Python EasyOCR & pdf-parse</CardDescription>
                </CardHeader>
              </Card>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-primary hidden md:block" />
                <ArrowDown className="h-6 w-6 text-primary md:hidden" />
              </div>

              {/* AI Analysis */}
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">AI Analysis</CardTitle>
                  <CardDescription className="text-sm">Ollama (Llama 3.2) & Hugging Face</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="flex justify-center my-8">
              <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* API Layer */}
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">API Layer</CardTitle>
                  <CardDescription className="text-sm">Next.js API Routes & Node.js</CardDescription>
                </CardHeader>
              </Card>

              {/* Frontend */}
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Cloud className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Frontend</CardTitle>
                  <CardDescription className="text-sm">React & Next.js Interface</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Technology Stack</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Built with modern, proven technologies for scalability, performance, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Frontend</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">React.js</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Next.js 14 (App Router)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">TypeScript</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Tailwind CSS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">shadcn/ui</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Backend */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Backend</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Next.js API Routes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Node.js</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Python (OCR Service)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">TypeScript</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>

            {/* AI/ML */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>AI/ML</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Ollama (Llama 3.2)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Hugging Face API</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">EasyOCR (Python)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">pdf-parse</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Internationalization */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Internationalization</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">next-intl</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">4 Languages Supported</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">English, Hindi, Marathi, Urdu</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Modules */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">AI Processing Modules</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Specialized AI modules work together to provide accurate medical report analysis and health insights.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Preprocessing Module */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="secondary">Module 1</Badge>
                <h3 className="text-2xl font-bold">Document Preprocessing</h3>
                <p className="text-muted-foreground">
                  Advanced image processing techniques to enhance document quality, correct orientation, and optimize
                  for OCR accuracy.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Image enhancement and denoising</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Automatic rotation correction</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Perspective correction</span>
                  </div>
                </div>
              </div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Code className="h-12 w-12 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">OpenCV • PIL • NumPy</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* OCR Module */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Card className="border-0 shadow-lg lg:order-1">
                <CardContent className="p-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Brain className="h-12 w-12 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Python EasyOCR • pdf-parse</div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4 lg:order-2">
                <Badge variant="secondary">Module 2</Badge>
                <h3 className="text-2xl font-bold">OCR & Text Extraction</h3>
                <p className="text-muted-foreground">
                  Python EasyOCR for image text extraction and pdf-parse for PDF documents. Supports both printed and handwritten text with high accuracy.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Multi-language text recognition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Handwriting recognition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Table and structure detection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parsing Module */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="secondary">Module 3</Badge>
                <h3 className="text-2xl font-bold">Medical Data Parsing</h3>
                <p className="text-muted-foreground">
                  Regex-based parameter extraction that identifies medical parameters, values, and normal ranges from extracted text with status detection (HIGH/LOW/NORMAL).
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Named entity recognition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Medical terminology mapping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Unit standardization</span>
                  </div>
                </div>
              </div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Zap className="h-12 w-12 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Regex Patterns • Value Extraction</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prediction Module */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Card className="border-0 shadow-lg lg:order-1">
                <CardContent className="p-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Cpu className="h-12 w-12 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Ollama • Hugging Face • Dictionary Fallback</div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4 lg:order-2">
                <Badge variant="secondary">Module 4</Badge>
                <h3 className="text-2xl font-bold">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">
                  AI-powered analysis using Ollama (local LLM) or Hugging Face API to generate comprehensive summaries, explanations, treatment recommendations, and lifestyle advice.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Risk score calculation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Trend analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Personalized recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Security & Privacy</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Enterprise-grade security measures to protect your sensitive medical data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>End-to-End Encryption</CardTitle>
                <CardDescription>
                  All data is encrypted in transit and at rest using AES-256 encryption standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>HIPAA Compliance</CardTitle>
                <CardDescription>
                  Fully compliant with healthcare data protection regulations and privacy standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Secure Infrastructure</CardTitle>
                <CardDescription>
                  Hosted on secure cloud infrastructure with regular security audits and monitoring.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Built for Scale & Reliability</h2>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Experience the power of cutting-edge AI technology designed specifically for healthcare applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Try the Technology
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Technical Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
