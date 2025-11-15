import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Target, Award, ArrowRight, CheckCircle, Globe, Lightbulb, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Heart className="w-3 h-3 mr-1" />
              Our Mission
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">
              Making Healthcare Insights <span className="text-primary">Accessible</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              We believe that everyone deserves access to clear, actionable health insights. MediScope AI was born from
              the vision to democratize healthcare analytics for patients and doctors across India.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Vision</h2>
              <p className="text-2xl text-primary font-medium text-balance">
                "To make healthcare insights accessible, explainable, and actionable for everyone."
              </p>
              <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
                We envision a world where patients can easily understand their health data, track their progress, and
                make informed decisions about their wellbeing, regardless of their technical background or geographic
                location.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Accessible</CardTitle>
                  <CardDescription>
                    Healthcare insights available to everyone, everywhere, in their preferred language.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-md text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Explainable</CardTitle>
                  <CardDescription>
                    Clear, understandable explanations that help patients make sense of their health data.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-md text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Actionable</CardTitle>
                  <CardDescription>
                    Practical recommendations and insights that lead to better health outcomes.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              A passionate team of healthcare professionals, AI researchers, and engineers working together to transform
              medical data accessibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Sujal Dingankar</CardTitle>
                <CardDescription>Lead AI Engineer & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Specializes in machine learning and healthcare AI. Led the development of our core OCR and prediction
                  algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Harsha Surwase</CardTitle>
                <CardDescription>Healthcare Data Scientist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Expert in medical data analysis and Indian healthcare systems. Ensures our AI models are clinically
                  relevant and accurate.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Uzmah Shaikh</CardTitle>
                <CardDescription>Security Engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                Ensures the security of our platform through robust authentication, encryption, and threat monitoring.
Protects user data and maintains compliance with healthcare security standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Story</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                How we identified the need for better healthcare data management in India.
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">The Problem We Saw</h3>
                  <p className="text-muted-foreground">
                    During our research in Indian healthcare systems, we noticed that patients often struggled to
                    understand their medical reports and track their health progress over time. Many reports were
                    handwritten, difficult to read, and stored in physical files that could be easily lost.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Handwritten reports difficult to read</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>No easy way to track health trends</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Limited access to health insights</span>
                    </div>
                  </div>
                </div>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <Heart className="h-8 w-8 text-red-600" />
                      </div>
                      <h4 className="font-semibold">Healthcare Challenge</h4>
                      <p className="text-sm text-muted-foreground">
                        Millions of patients in India lack easy access to their health data insights and trends.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <Card className="border-0 shadow-lg lg:order-1">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Lightbulb className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold">AI-Powered Solution</h4>
                      <p className="text-sm text-muted-foreground">
                        We developed advanced AI to read, understand, and analyze medical reports automatically.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-6 lg:order-2">
                  <h3 className="text-2xl font-bold">Our Solution</h3>
                  <p className="text-muted-foreground">
                    We combined cutting-edge AI technology with deep understanding of Indian healthcare needs to create
                    MediScope AI. Our system can read both printed and handwritten reports, extract key health
                    parameters, and provide meaningful insights to patients and doctors.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Advanced OCR for all report types</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>AI-powered health trend analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Personalized health recommendations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Values</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              The principles that guide everything we do at MediScope AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your medical data is sacred. We use the highest security standards to protect your privacy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Patient-Centric</CardTitle>
                <CardDescription>
                  Every feature is designed with patients' needs and experiences at the center.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Excellence</CardTitle>
                <CardDescription>
                  We strive for the highest accuracy and quality in everything we build and deliver.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Inclusivity</CardTitle>
                <CardDescription>
                  Healthcare insights should be available to everyone, regardless of location or background.
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Join Our Mission</h2>
            <p className="text-xl text-primary-foreground/80 text-pretty">
              Help us make healthcare insights accessible to millions of people across India and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
