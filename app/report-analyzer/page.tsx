'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import jsPDF from 'jspdf'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, Languages, Info, Pill, Heart, Stethoscope, AlertTriangle, TrendingUp, TrendingDown, Minus, Download } from 'lucide-react'
import { toast } from 'sonner'
import type { ReportAnalysisResponse } from '@/lib/types'
import type { Language } from '@/lib/types'

export default function ReportAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [language, setLanguage] = useState<Language>('en')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<ReportAnalysisResponse | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
        setAnalysis(null)
      }
    },
  })

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload a file first')
      return
    }

    setLoading(true)
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileType', file.type === 'application/pdf' ? 'pdf' : 'image')
      formData.append('language', language)

      const response = await fetch('/api/report', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze report')
      }

      const data: ReportAnalysisResponse = await response.json()
      setAnalysis(data)
      toast.success('Report analyzed successfully!')
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Failed to analyze report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setFile(null)
    setAnalysis(null)
  }

  const handleDownloadPDF = () => {
    if (!analysis) {
      toast.error('No analysis available to download')
      return
    }

    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 15
      let yPosition = margin
      const lineHeight = 7
      const sectionSpacing = 10

      // Helper function to add new page if needed
      const checkNewPage = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }
      }

      // Helper function to add text with word wrap
      const addWrappedText = (text: string, fontSize: number, isBold: boolean = false) => {
        doc.setFontSize(fontSize)
        doc.setFont(undefined, isBold ? 'bold' : 'normal')
        const maxWidth = pageWidth - 2 * margin
        const lines = doc.splitTextToSize(text, maxWidth)
        
        checkNewPage(lines.length * lineHeight)
        
        lines.forEach((line: string) => {
          doc.text(line, margin, yPosition)
          yPosition += lineHeight
        })
      }

      // Helper function to add section header
      const addSectionHeader = (title: string) => {
        yPosition += sectionSpacing
        checkNewPage(lineHeight * 2)
        addWrappedText(title, 14, true)
        yPosition += 3
      }

      // Title
      doc.setFontSize(18)
      doc.setFont(undefined, 'bold')
      doc.text('Medical Report Analysis Summary', margin, yPosition)
      yPosition += lineHeight * 2

      // Date
      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition)
      yPosition += lineHeight * 2

      // Summary
      if (analysis.simplifiedSummary) {
        addSectionHeader('Summary')
        addWrappedText(analysis.simplifiedSummary, 11)
      }

      // Detailed Explanation
      if (analysis.detailedExplanation) {
        addSectionHeader('Detailed Explanation')
        addWrappedText(analysis.detailedExplanation, 11)
      }

      // Key Findings
      if (analysis.keyFindings && analysis.keyFindings.length > 0) {
        addSectionHeader('Key Findings')
        analysis.keyFindings.forEach((finding) => {
          const findingText = typeof finding === 'string' ? finding : String(finding)
          addWrappedText(`• ${findingText}`, 10)
        })
      }

      // Treatment Recommendations
      if (analysis.treatmentRecommendations && analysis.treatmentRecommendations.length > 0) {
        addSectionHeader('Treatment Recommendations')
        analysis.treatmentRecommendations.forEach((treatment) => {
          const treatmentText = typeof treatment === 'string' ? treatment : String(treatment)
          addWrappedText(`• ${treatmentText}`, 10)
        })
      }

      // Medicine Suggestions
      if (analysis.medicineSuggestions && analysis.medicineSuggestions.length > 0) {
        addSectionHeader('Medicine Suggestions')
        addWrappedText('⚠️ Important: These are suggestions only. Always consult a doctor before taking any medication.', 9)
        yPosition += 3
        analysis.medicineSuggestions.forEach((medicine) => {
          const medicineText = typeof medicine === 'string' ? medicine : String(medicine)
          addWrappedText(`• ${medicineText}`, 10)
        })
      }

      // Lifestyle Advice
      if (analysis.lifestyleAdvice && analysis.lifestyleAdvice.length > 0) {
        addSectionHeader('Lifestyle Advice')
        analysis.lifestyleAdvice.forEach((advice) => {
          const adviceText = typeof advice === 'string' ? advice : String(advice)
          addWrappedText(`• ${adviceText}`, 10)
        })
      }

      // When to Consult Doctor
      if (analysis.whenToConsultDoctor && analysis.whenToConsultDoctor.length > 0) {
        addSectionHeader('When to Consult a Doctor')
        analysis.whenToConsultDoctor.forEach((situation) => {
          const situationText = typeof situation === 'string' ? situation : String(situation)
          addWrappedText(`• ${situationText}`, 10)
        })
      }

      // Parameter Breakdown
      if (analysis.parameterBreakdown && analysis.parameterBreakdown.length > 0) {
        addSectionHeader('Parameter-by-Parameter Breakdown')
        analysis.parameterBreakdown.forEach((param, index) => {
          checkNewPage(lineHeight * 6)
          
          // Parameter name with status
          const statusText = param.status === 'high' ? 'HIGH' : param.status === 'low' ? 'LOW' : 'NORMAL'
          addWrappedText(`${param.parameterName} [${statusText}]`, 11, true)
          yPosition += 2
          
          // Patient value and normal range
          addWrappedText(`Your Value: ${param.patientValue} ${param.unit}`, 10)
          addWrappedText(`Normal Range: ${param.normalRange}`, 10)
          yPosition += 2
          
          // Explanation
          addWrappedText(param.explanation, 9)
          yPosition += sectionSpacing
        })
      }

      // Footer on last page
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.text(
          `Page ${i} of ${pageCount} - Generated by MediCore Medical Report Analyzer`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        )
      }

      // Save PDF
      const fileName = `Medical_Report_Analysis_${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(fileName)
      toast.success('PDF report downloaded successfully!')
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error('Failed to generate PDF. Please try again.')
    }
  }

  const getFileType = (file: File): 'image' | 'pdf' => {
    return file.type === 'application/pdf' ? 'pdf' : 'image'
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-card">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Medical Report Analyzer</h1>
              <p className="text-muted-foreground mt-2">
                Upload your medical reports and get simplified summaries
              </p>
            </div>
            <div className="flex items-center gap-4">
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
        </div>
      </section>

      {/* Main Content - Left Upload, Right Summary */}
      <section className="flex-1 container px-4 py-8 mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Side - Upload */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Report
                </CardTitle>
                <CardDescription>
                  Supported formats: PDF, JPG, PNG, JPEG
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 h-full">
                <div
                  {...getRootProps()}
                  className={`flex-1 border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    {file ? (
                      <>
                        <CheckCircle2 className="h-12 w-12 text-primary" />
                        <div>
                          <p className="font-semibold">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {getFileType(file).toUpperCase()}
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">
                            {isDragActive ? 'Drop file here' : 'Drag & drop or click to upload'}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            PDF, JPG, PNG, JPEG files are supported
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!file || loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Analyze Report
                      </>
                    )}
                  </Button>
                  {file && (
                    <Button variant="outline" onClick={handleClear} disabled={loading}>
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Summary */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      Simplified summary and key findings from your report
                    </CardDescription>
                  </div>
                  {analysis && (
                    <Button
                      onClick={handleDownloadPDF}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                      <p className="text-muted-foreground">Analyzing your report...</p>
                      <p className="text-sm text-muted-foreground">
                        This may take a few moments
                      </p>
                    </div>
                  </div>
                ) : analysis ? (
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-6">
                      {/* Summary */}
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Summary
                        </h3>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm leading-relaxed">{analysis.simplifiedSummary}</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Detailed Explanation */}
                      {analysis.detailedExplanation && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              Detailed Explanation
                            </h3>
                            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                              <p className="text-sm leading-relaxed">{analysis.detailedExplanation}</p>
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* Key Findings */}
                      {analysis.keyFindings.length > 0 && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              Key Findings
                            </h3>
                            <ul className="space-y-2">
                              {analysis.keyFindings.map((finding, index) => {
                                const findingText = typeof finding === 'string' ? finding : String(finding)
                                return (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{findingText}</span>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* Treatment Recommendations */}
                      {analysis.treatmentRecommendations.length > 0 && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              <Stethoscope className="h-4 w-4" />
                              Treatment Recommendations
                            </h3>
                            <ul className="space-y-2">
                              {analysis.treatmentRecommendations.map((treatment, index) => {
                                const treatmentText = typeof treatment === 'string' ? treatment : String(treatment)
                                return (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{treatmentText}</span>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* Medicine Suggestions */}
                      {analysis.medicineSuggestions.length > 0 && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              <Pill className="h-4 w-4" />
                              Medicine Suggestions
                            </h3>
                            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-900">
                              <p className="text-xs text-amber-800 dark:text-amber-200 mb-3 font-semibold">
                                ⚠️ Important: These are suggestions only. Always consult a doctor before taking any medication.
                              </p>
                              <ul className="space-y-2">
                                {analysis.medicineSuggestions.map((medicine, index) => {
                                  // Ensure medicine is always a string
                                  const medicineText = typeof medicine === 'string' 
                                    ? medicine 
                                    : typeof medicine === 'object' && medicine !== null
                                    ? (medicine.name || medicine.brandName || JSON.stringify(medicine))
                                    : String(medicine)
                                  return (
                                    <li key={index} className="flex items-start gap-2">
                                      <Pill className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm">{medicineText}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* Lifestyle Advice */}
                      {analysis.lifestyleAdvice.length > 0 && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              <Heart className="h-4 w-4" />
                              Lifestyle Advice
                            </h3>
                            <ul className="space-y-2">
                              {analysis.lifestyleAdvice.map((advice, index) => {
                                const adviceText = typeof advice === 'string' ? advice : String(advice)
                                return (
                                  <li key={index} className="flex items-start gap-2">
                                    <Heart className="h-4 w-4 text-pink-600 dark:text-pink-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{adviceText}</span>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* When to Consult Doctor */}
                      {analysis.whenToConsultDoctor.length > 0 && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              When to Consult a Doctor
                            </h3>
                            <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-900">
                              <ul className="space-y-2">
                                {analysis.whenToConsultDoctor.map((situation, index) => {
                                  const situationText = typeof situation === 'string' ? situation : String(situation)
                                  return (
                                    <li key={index} className="flex items-start gap-2">
                                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm">{situationText}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* Parameter Breakdown */}
                      {analysis.parameterBreakdown && analysis.parameterBreakdown.length > 0 && (
                        <>
                          <div>
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              Parameter-by-Parameter Breakdown
                            </h3>
                            <div className="space-y-4">
                              {analysis.parameterBreakdown.map((param, index) => {
                                const statusColor = 
                                  param.status === 'high' 
                                    ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                                    : param.status === 'low'
                                    ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
                                    : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                                
                                const StatusIcon = 
                                  param.status === 'high' 
                                    ? TrendingUp 
                                    : param.status === 'low'
                                    ? TrendingDown
                                    : CheckCircle2

                                return (
                                  <div
                                    key={index}
                                    className={`rounded-lg p-4 border ${statusColor}`}
                                  >
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h4 className="font-semibold text-sm">{param.parameterName}</h4>
                                          <Badge
                                            variant={
                                              param.status === 'high'
                                                ? 'destructive'
                                                : param.status === 'low'
                                                ? 'secondary'
                                                : 'default'
                                            }
                                            className="text-xs"
                                          >
                                            <StatusIcon className="h-3 w-3 mr-1" />
                                            {param.status === 'high' ? 'HIGH' : param.status === 'low' ? 'LOW' : 'NORMAL'}
                                          </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                                          <div>
                                            <span className="text-muted-foreground">Your Value: </span>
                                            <span className="font-semibold">{param.patientValue} {param.unit}</span>
                                          </div>
                                          <div>
                                            <span className="text-muted-foreground">Normal Range: </span>
                                            <span className="font-semibold">{param.normalRange}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-current/20">
                                      <p className="text-xs leading-relaxed">{param.explanation}</p>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* Extracted Text (Collapsible) */}
                      <details className="group">
                        <summary className="cursor-pointer font-semibold mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Extracted Text
                        </summary>
                        <div className="mt-2 bg-muted/30 rounded-lg p-4">
                          <ScrollArea className="h-48">
                            <p className="text-xs font-mono whitespace-pre-wrap">
                              {analysis.extractedText}
                            </p>
                          </ScrollArea>
                        </div>
                      </details>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="space-y-2">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">
                        Upload a report to see analysis results
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

