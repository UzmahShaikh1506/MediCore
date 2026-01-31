import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Scan,
  Brain,
  TrendingUp,
  Bell,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  FileText,
  BarChart3,
  AlertTriangle,
} from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Brain className="w-3 h-3 mr-1" />
              Simple 4-Step Process
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              How MediCore <span className="text-primary">Works</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Transform your medical reports into actionable health insights in just four simple steps. No technical
              knowledge required.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Step 1: Upload */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <Badge variant="secondary">Upload & Scan</Badge>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-balance">Upload Your Medical Report</h2>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Simply upload or scan your medical report using your phone camera or by selecting a file. Our system
                    supports both printed and handwritten reports in multiple formats.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Take a photo with your phone</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Upload PDF or image files</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Works with handwritten reports</span>
                    </div>
                  </div>
                </div>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Upload Report</h3>
                        <Upload className="h-5 w-5 text-primary" />
                      </div>
                      <div className="p-8 border-2 border-dashed border-primary/30 rounded-lg text-center bg-primary/5">
                        <Scan className="h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">Drop your report here or</p>
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        Supports: PDF, JPG, PNG, HEIC • Max size: 10MB
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-center mt-8">
                <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
              </div>
            </div>

            {/* Step 2: AI Processing */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Card className="border-0 shadow-lg lg:order-1">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">AI Processing</h3>
                        <Brain className="h-5 w-5 text-primary animate-pulse" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-sm">Scanning document...</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-sm">Extracting medical values...</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-sm">Organizing data...</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        Processing typically takes 10-30 seconds
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-6 lg:order-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <Badge variant="secondary">AI Processing</Badge>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-balance">AI Extracts & Organizes Values</h2>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Our advanced AI reads your report, identifies key medical parameters, and organizes them into a
                    structured format. The system handles various report formats and medical terminologies.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>OCR technology reads text</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>AI identifies medical parameters</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Data validation and correction</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
              </div>
            </div>

            {/* Step 3: Analysis */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <Badge variant="secondary">Analysis & Insights</Badge>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-balance">View Health Graphs & Predictions</h2>
                  <p className="text-lg text-muted-foreground text-pretty">
                    See your health data visualized in beautiful graphs and charts. Track trends over time and get
                    AI-powered predictions about your health risks and progress.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Interactive trend visualization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Health score calculation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Risk assessment and predictions</span>
                    </div>
                  </div>
                </div>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Health Dashboard</h3>
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <div className="text-xs text-muted-foreground">HbA1c Trend</div>
                          <div className="text-lg font-semibold text-primary">↗ Improving</div>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <div className="text-xs text-muted-foreground">Health Score</div>
                          <div className="text-lg font-semibold text-primary">85/100</div>
                        </div>
                      </div>
                      <div className="h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-xs text-muted-foreground text-center">6-month health trend analysis</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-center mt-8">
                <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
              </div>
            </div>

            {/* Step 4: Alerts & Guidance */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Card className="border-0 shadow-lg lg:order-1">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Smart Alerts</h3>
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium">Health Alert</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your BP readings suggest monitoring. Consider lifestyle changes.
                          </p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Recommendation</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Schedule follow-up in 3 months. Continue current medication.
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        Alerts sent via app, SMS, and email
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-6 lg:order-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <Badge variant="secondary">Alerts & Guidance</Badge>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-balance">Receive Alerts & Guidance</h2>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Get personalized health alerts, recommendations, and reminders based on your medical data. Our AI
                    provides actionable guidance tailored to Indian healthcare practices.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Personalized health recommendations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Medication and appointment reminders</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Emergency alerts for critical values</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Why This Process Works</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Our streamlined approach makes health management accessible to everyone, regardless of technical
              expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Simple & Fast</CardTitle>
                <CardDescription>
                  No complex setup or training required. Upload your report and get insights in under a minute.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>AI-Powered Accuracy</CardTitle>
                <CardDescription>
                  Advanced machine learning ensures high accuracy in reading and interpreting medical reports.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Actionable Insights</CardTitle>
                <CardDescription>
                  Get meaningful recommendations and predictions that help you make informed health decisions.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Get Started?</h2>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Experience the simple 4-step process yourself. Upload your first medical report and see the magic happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Try Demo Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Watch Video Tutorial
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
