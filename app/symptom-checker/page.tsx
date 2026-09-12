"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Stethoscope,
  User,
  ClipboardList,
  Activity,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Home,
  Pill,
  Hospital,
  RotateCcw,
  Download,
  Heart,
  Brain,
  Thermometer,
  Eye,
  Bone,
  Wind,
  Loader2,
} from "lucide-react"
import type { SymptomCheckerResponse, Language } from "@/lib/types"

const steps = [
  { id: 1, title: "Patient Info", icon: User },
  { id: 2, title: "Symptoms", icon: ClipboardList },
  { id: 3, title: "Details", icon: Activity },
  { id: 4, title: "Result", icon: Stethoscope },
]

const symptomCategories = [
  { id: "head", label: "Head & Neuro", icon: Brain },
  { id: "chest", label: "Chest & Heart", icon: Heart },
  { id: "stomach", label: "Stomach & GI", icon: Activity },
  { id: "respiratory", label: "Respiratory", icon: Wind },
  { id: "musculoskeletal", label: "Bones & Joints", icon: Bone },
  { id: "eyes", label: "Eyes & ENT", icon: Eye },
  { id: "skin", label: "Skin", icon: Thermometer },
  { id: "general", label: "General / Fever", icon: Thermometer },
]

const commonAssociatedSymptoms = [
  "Fever",
  "Headache",
  "Fatigue",
  "Nausea",
  "Vomiting",
  "Dizziness",
  "Cough",
  "Sore throat",
  "Body aches",
  "Loss of appetite",
  "Chills",
  "Sweating",
  "Diarrhea",
  "Constipation",
  "Shortness of breath",
  "Chest tightness",
]

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart disease",
  "Thyroid disorder",
  "Kidney disease",
  "Liver disease",
  "Arthritis",
]

const severityLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Barely noticeable", color: "text-green-500" },
  2: { label: "Mild", color: "text-green-500" },
  3: { label: "Mild-Moderate", color: "text-green-600" },
  4: { label: "Moderate", color: "text-yellow-500" },
  5: { label: "Moderate", color: "text-yellow-500" },
  6: { label: "Moderate-Severe", color: "text-orange-500" },
  7: { label: "Severe", color: "text-orange-500" },
  8: { label: "Very Severe", color: "text-red-500" },
  9: { label: "Extreme", color: "text-red-600" },
  10: { label: "Worst Possible", color: "text-red-700" },
}

const triageConfig = {
  SELF_CARE: {
    icon: Home,
    label: "Self-Care at Home",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    badgeVariant: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-500",
  },
  PHARMACY: {
    icon: Pill,
    label: "Pharmacy Visit",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    badgeVariant: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
  },
  DOCTOR: {
    icon: Hospital,
    label: "Doctor / Clinic Visit",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    badgeVariant: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-500",
  },
}

export default function SymptomCheckerPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SymptomCheckerResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Step 1: Patient Info
  const [age, setAge] = useState<string>("")
  const [sex, setSex] = useState<string>("male")
  const [language, setLanguage] = useState<Language>("en")

  // Step 2: Symptoms
  const [primarySymptom, setPrimarySymptom] = useState("")
  const [symptomCategory, setSymptomCategory] = useState<string>("")

  // Step 3: Details
  const [duration, setDuration] = useState("")
  const [severity, setSeverity] = useState([5])
  const [associatedSymptoms, setAssociatedSymptoms] = useState<string[]>([])
  const [preExistingConditions, setPreExistingConditions] = useState<string[]>([])
  const [currentMedications, setCurrentMedications] = useState("")

  const canProceedStep1 = age && parseInt(age) > 0 && parseInt(age) <= 150 && sex
  const canProceedStep2 = primarySymptom.trim().length >= 3
  const canProceedStep3 = duration.length > 0

  const handleToggleArrayItem = (
    item: string,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item))
    } else {
      setArray([...array, item])
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/symptom-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(age),
          sex,
          language,
          primarySymptom,
          symptomCategory: symptomCategory || undefined,
          duration,
          severity: severity[0],
          associatedSymptoms,
          preExistingConditions,
          currentMedications: currentMedications || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to analyze symptoms")
      }

      const data: SymptomCheckerResponse = await response.json()
      setResult(data)
      setCurrentStep(4)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setAge("")
    setSex("male")
    setLanguage("en")
    setPrimarySymptom("")
    setSymptomCategory("")
    setDuration("")
    setSeverity([5])
    setAssociatedSymptoms([])
    setPreExistingConditions([])
    setCurrentMedications("")
    setResult(null)
    setError(null)
  }

  const handleNext = () => {
    if (currentStep === 3) {
      handleSubmit()
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
              <Stethoscope className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Symptom Checker</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Answer a few questions about your symptoms and get an AI-powered triage recommendation — self-care, pharmacy visit, or clinic visit.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> This tool provides general health guidance only and is NOT a substitute for professional medical advice.
              In case of a medical emergency, call your local emergency number immediately.
            </p>
          </div>
        </div>

        {/* Progress Stepper */}
        {currentStep < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "border-primary bg-primary text-primary-foreground scale-110"
                            : isCompleted
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-muted-foreground/30 text-muted-foreground/50"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-1 font-medium ${
                          isActive ? "text-primary" : isCompleted ? "text-primary/70" : "text-muted-foreground/50"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-12 sm:w-20 h-0.5 mx-1 sm:mx-2 mb-5 transition-colors duration-300 ${
                          currentStep > step.id ? "bg-primary" : "bg-muted-foreground/20"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="transition-all duration-300">
          {/* STEP 1: Patient Info */}
          {currentStep === 1 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Patient Information
                </CardTitle>
                <CardDescription>Tell us a bit about yourself so we can provide better recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-base font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    min={1}
                    max={150}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                {/* Sex */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Sex</Label>
                  <RadioGroup value={sex} onValueChange={setSex} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Preferred Language</Label>
                  <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      <SelectItem value="ur">اردو (Urdu)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 2: Primary Symptom */}
          {currentStep === 2 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  What&apos;s Bothering You?
                </CardTitle>
                <CardDescription>Describe your main symptom in your own words.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Symptom Input */}
                <div className="space-y-2">
                  <Label htmlFor="symptom" className="text-base font-medium">
                    Primary Symptom
                  </Label>
                  <Input
                    id="symptom"
                    placeholder="e.g., headache, stomach pain, sore throat..."
                    value={primarySymptom}
                    onChange={(e) => setPrimarySymptom(e.target.value)}
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Describe the symptom you are most concerned about.
                  </p>
                </div>

                {/* Symptom Category Quick Pick */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Affected Area (optional)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {symptomCategories.map((cat) => {
                      const CatIcon = cat.icon
                      const isSelected = symptomCategory === cat.id
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSymptomCategory(isSelected ? "" : cat.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-muted hover:border-primary/50 text-muted-foreground"
                          }`}
                        >
                          <CatIcon className="h-5 w-5" />
                          <span className="text-xs font-medium text-center">{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 3: Details */}
          {currentStep === 3 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Tell Us More
                </CardTitle>
                <CardDescription>These details help us provide a more accurate recommendation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Duration */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">How long have you had this symptom?</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A few hours">A few hours</SelectItem>
                      <SelectItem value="1 day">1 day</SelectItem>
                      <SelectItem value="2 days">2 days</SelectItem>
                      <SelectItem value="3 days">3 days</SelectItem>
                      <SelectItem value="4-5 days">4-5 days</SelectItem>
                      <SelectItem value="1 week">1 week</SelectItem>
                      <SelectItem value="2 weeks">2 weeks</SelectItem>
                      <SelectItem value="More than 2 weeks">More than 2 weeks</SelectItem>
                      <SelectItem value="More than 1 month">More than 1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Severity Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Severity</Label>
                    <span className={`text-sm font-semibold ${severityLabels[severity[0]]?.color || "text-muted-foreground"}`}>
                      {severity[0]}/10 — {severityLabels[severity[0]]?.label || ""}
                    </span>
                  </div>
                  <Slider
                    value={severity}
                    onValueChange={setSeverity}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>

                <Separator />

                {/* Associated Symptoms */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Do you also have any of these? (optional)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {commonAssociatedSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={`symptom-${symptom}`}
                          checked={associatedSymptoms.includes(symptom)}
                          onCheckedChange={() =>
                            handleToggleArrayItem(symptom, associatedSymptoms, setAssociatedSymptoms)
                          }
                        />
                        <Label htmlFor={`symptom-${symptom}`} className="text-sm cursor-pointer">
                          {symptom}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Pre-existing Conditions */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Any pre-existing conditions? (optional)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {commonConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={`condition-${condition}`}
                          checked={preExistingConditions.includes(condition)}
                          onCheckedChange={() =>
                            handleToggleArrayItem(condition, preExistingConditions, setPreExistingConditions)
                          }
                        />
                        <Label htmlFor={`condition-${condition}`} className="text-sm cursor-pointer">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Medications */}
                <div className="space-y-2">
                  <Label htmlFor="medications" className="text-base font-medium">
                    Current Medications (optional)
                  </Label>
                  <Input
                    id="medications"
                    placeholder="e.g., Metformin, Amlodipine..."
                    value={currentMedications}
                    onChange={(e) => setCurrentMedications(e.target.value)}
                    className="max-w-md"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 4: Result */}
          {currentStep === 4 && result && (
            <div className="space-y-6">
              {/* Triage Result Card */}
              {(() => {
                const config = triageConfig[result.triageLevel]
                const TriageIcon = config.icon
                return (
                  <Card className={`border-2 ${config.borderColor} ${config.bgColor} overflow-hidden`}>
                    {/* Gradient Banner */}
                    <div className={`h-2 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`} />

                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} text-white`}>
                            <TriageIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className={`text-xl ${config.color}`}>
                              {config.label}
                            </CardTitle>
                            <CardDescription>
                              Confidence: <span className="font-medium capitalize">{result.confidence}</span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={config.badgeVariant}>
                          {result.triageLevel.replace("_", " ")}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Explanation */}
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <ClipboardList className="h-4 w-4" />
                          Why This Recommendation
                        </h3>
                        <p className="text-sm leading-relaxed">{result.explanation}</p>
                      </div>

                      <Separator />

                      {/* Action Items */}
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          What You Should Do
                        </h3>
                        <ul className="space-y-2">
                          {result.actionItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="font-semibold text-primary mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      {/* Warning Signs */}
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2 text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                          Warning Signs to Watch For
                        </h3>
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                          <ul className="space-y-2">
                            {result.warningSignsToWatch.map((sign, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                                <span>{sign}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
                            If any of these appear, escalate to a doctor visit immediately.
                          </p>
                        </div>
                      </div>

                      {/* Recommended Specialist */}
                      {result.recommendedSpecialist && (
                        <>
                          <Separator />
                          <div className="flex items-center gap-2 text-sm">
                            <Hospital className="h-4 w-4 text-primary" />
                            <span className="font-medium">Recommended Specialist:</span>
                            <Badge variant="outline">{result.recommendedSpecialist}</Badge>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                )
              })()}

              {/* Disclaimer */}
              <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {result.disclaimer}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleReset} variant="outline" size="lg" className="bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Check Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !canProceedStep1) ||
                (currentStep === 2 && !canProceedStep2) ||
                (currentStep === 3 && !canProceedStep3) ||
                isLoading
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : currentStep === 3 ? (
                <>
                  Get Recommendation
                  <Stethoscope className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
