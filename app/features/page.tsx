import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  FileText,
  TrendingUp,
  Brain,
  AlertTriangle,
  Shield,
  Globe,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Scan,
  BarChart3,
  Languages,
  Wifi,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered Healthcare
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              Comprehensive Health <span className="text-primary">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Discover how MediScope AI transforms medical report management with cutting-edge technology designed for
              Indian healthcare needs.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="space-y-20">
            {/* Upload & OCR */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Core Feature</Badge>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">Upload & OCR Technology</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Advanced OCR technology that can read both printed and handwritten medical reports with high accuracy.
                  Supports multiple formats including PDFs, images, and scanned documents.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Handwritten report recognition</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Multiple file format support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>99%+ accuracy for printed text</span>
                  </div>
                </div>
              </div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Document Processing</h3>
                      <Scan className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Drop your medical report here</p>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">Supports: PDF, JPG, PNG, HEIC</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smart Parsing */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="border-0 shadow-lg lg:order-1">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Extracted Values</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="text-xs text-muted-foreground">HbA1c</div>
                        <div className="text-lg font-semibold">6.2%</div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="text-xs text-muted-foreground">Glucose</div>
                        <div className="text-lg font-semibold">110 mg/dL</div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="text-xs text-muted-foreground">BP</div>
                        <div className="text-lg font-semibold">120/80</div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="text-xs text-muted-foreground">LDL</div>
                        <div className="text-lg font-semibold">95 mg/dL</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-6 lg:order-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">AI Processing</Badge>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">Smart Parsing & Organization</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Our AI intelligently identifies and extracts key medical parameters from unstructured reports,
                  organizing them into standardized formats for easy tracking.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Automatic parameter identification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Unit standardization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Error detection and correction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trends & Insights */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Analytics</Badge>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">Health Trends & Insights</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Visualize your health journey with beautiful graphs and charts. Track key parameters over time and
                  understand your health patterns with AI-generated insights.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Interactive trend graphs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Multi-parameter correlation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Progress scoring system</span>
                  </div>
                </div>
              </div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Health Trends</h3>
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-end justify-center p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">↗</div>
                        <div className="text-xs text-muted-foreground">Improving Trend</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      HbA1c levels showing consistent improvement over 6 months
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Prediction */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="border-0 shadow-lg lg:order-1">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Risk Assessment</h3>
                      <AlertTriangle className="h-5 w-5 text-accent" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <span className="text-sm">Cardiovascular Risk</span>
                        <Badge className="bg-green-100 text-green-800">Low</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <span className="text-sm">Diabetes Progression</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                      </div>
                      <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="text-sm font-medium text-accent">Next Check-up</div>
                        <div className="text-xs text-muted-foreground">Recommended in 3 months</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-6 lg:order-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Predictive AI</Badge>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">Risk Prediction & Alerts</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Advanced machine learning models analyze your health data to predict potential risks and recommend
                  preventive measures before issues become serious.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Early risk detection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Personalized risk scores</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Preventive recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Built for Indian Healthcare</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Designed specifically for the unique needs of Indian patients and healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Actionable Guidance</CardTitle>
                <CardDescription>
                  Receive personalized recommendations based on Indian medical guidelines and best practices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Languages className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi-Language Support</CardTitle>
                <CardDescription>
                  Available in Hindi, English, Tamil, Telugu, Bengali, and other regional languages.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Offline Access</CardTitle>
                <CardDescription>
                  Core features work offline, ensuring accessibility in areas with limited internet connectivity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>SMS Alerts</CardTitle>
                <CardDescription>
                  Important health alerts and reminders sent via SMS for users without smartphones.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  End-to-end encryption and HIPAA-compliant data handling ensure your medical data stays private.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Indian Context</CardTitle>
                <CardDescription>
                  Tailored for Indian healthcare systems, medical practices, and cultural considerations.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Experience All Features Today</h2>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Start managing your health reports smarter with MediScope AI's comprehensive feature set.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Try All Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
