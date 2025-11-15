import type { Language } from '@/lib/types'

const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  ur: 'Urdu',
}

// Medical terminology dictionary for fallback
const medicalDictionary: Record<string, string> = {
  'myocardial infarction': 'heart attack',
  'hypertension': 'high blood pressure',
  'diabetes mellitus': 'diabetes',
  'hyperglycemia': 'high blood sugar',
  'hypoglycemia': 'low blood sugar',
  'tachycardia': 'fast heart rate',
  'bradycardia': 'slow heart rate',
  'dyspnea': 'shortness of breath',
  'edema': 'swelling',
  'anemia': 'low red blood cell count',
  'leukemia': 'blood cancer',
  'pneumonia': 'lung infection',
  'bronchitis': 'inflammation of airways',
  'asthma': 'breathing condition',
  'arthritis': 'joint inflammation',
  'osteoporosis': 'weak bones',
  'migraine': 'severe headache',
  'epilepsy': 'seizure disorder',
  'stroke': 'brain attack',
  'cerebrovascular accident': 'stroke',
  'cva': 'stroke',
  'mi': 'heart attack',
  'copd': 'chronic lung disease',
  'uti': 'urinary tract infection',
  'gastroenteritis': 'stomach flu',
  'appendicitis': 'inflamed appendix',
  'cholecystitis': 'inflamed gallbladder',
  'nephritis': 'kidney inflammation',
  'hepatitis': 'liver inflammation',
  'meningitis': 'brain/spine membrane inflammation',
  'sepsis': 'severe infection',
  'fracture': 'broken bone',
  'laceration': 'deep cut',
  'contusion': 'bruise',
  'hematoma': 'blood clot under skin',
  'benign': 'non-cancerous',
  'malignant': 'cancerous',
  'tumor': 'abnormal growth',
  'carcinoma': 'cancer',
  'metastasis': 'cancer spread',
  'biopsy': 'tissue sample test',
  'mri': 'magnetic resonance imaging',
  'ct scan': 'computed tomography scan',
  'x-ray': 'bone/image scan',
  'ultrasound': 'sound wave imaging',
  'ecg': 'heart rhythm test',
  'ekg': 'heart rhythm test',
  'eeg': 'brain wave test',
  'blood pressure': 'bp',
  'systolic': 'top number in blood pressure',
  'diastolic': 'bottom number in blood pressure',
  'cholesterol': 'fat in blood',
  'triglycerides': 'blood fats',
  'hdl': 'good cholesterol',
  'ldl': 'bad cholesterol',
  'glucose': 'blood sugar',
  'hba1c': 'average blood sugar over 3 months',
  'creatinine': 'kidney function marker',
  'hemoglobin': 'oxygen-carrying protein',
  'platelets': 'blood clotting cells',
  'white blood cells': 'infection fighters',
  'red blood cells': 'oxygen carriers',
}

/**
 * Simple rule-based medical term replacement
 */
function simpleMedicalSimplifier(text: string): string {
  let simplified = text.toLowerCase()
  
  // Replace known medical terms
  Object.entries(medicalDictionary).forEach(([term, replacement]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi')
    simplified = simplified.replace(regex, replacement)
  })
  
  // Capitalize first letter
  return simplified.charAt(0).toUpperCase() + simplified.slice(1)
}

/**
 * Try Ollama (local LLM) - completely free, runs locally
 * This is the recommended AI provider - no API keys needed!
 */
async function tryOllama(
  prompt: string,
  systemPrompt: string
): Promise<string | null> {
  try {
    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434'
    const model = process.env.OLLAMA_MODEL || 'llama3.2' // Recommended: llama3.2, mistral, phi3
    
    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout
    
    try {
      // Use chat API for better results (supports system prompts)
      const response = await fetch(`${ollamaUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 3000, // Allow longer detailed summaries
          },
        }),
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        // If chat API fails, try generate API (older format)
        const generateController = new AbortController()
        const generateTimeoutId = setTimeout(() => generateController.abort(), 60000)
        
        try {
          const generateResponse = await fetch(`${ollamaUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model,
              prompt: `${systemPrompt}\n\n${prompt}`,
              stream: false,
              options: {
                temperature: 0.7,
                num_predict: 2000,
              },
            }),
            signal: generateController.signal,
          })
          
          clearTimeout(generateTimeoutId)

          if (!generateResponse.ok) {
            return null
          }

          const generateData = await generateResponse.json()
          return generateData.response || null
        } catch (e) {
          clearTimeout(generateTimeoutId)
          return null
        }
      }

      const data = await response.json()
      return data.message?.content || data.response || null
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Ollama request timed out')
        return null
      }
      // Ollama not available, return null to try next option
      console.log('Ollama not available, trying next provider...')
      return null
    }
  } catch (error) {
    // Ollama not available, return null to try next option
    console.log('Ollama not available, trying next provider...')
    return null
  }
}

/**
 * Try Hugging Face Inference API - free tier available
 */
async function tryHuggingFace(
  prompt: string,
  systemPrompt: string
): Promise<string | null> {
  try {
    const apiKey = process.env.HUGGING_FACE_API_KEY
    if (!apiKey) {
      return null
    }

    // Using a free model like meta-llama/Llama-2-7b-chat-hf or mistralai/Mistral-7B-Instruct-v0.2
    const model = process.env.HUGGING_FACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2'
    
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `${systemPrompt}\n\nUser: ${prompt}\n\nAssistant:`,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
          },
        }),
      }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.split('Assistant:')[1]?.trim() || null
    }
    return null
  } catch (error) {
    return null
  }
}

/**
 * Try OpenAI (if API key is available)
 * This is optional - only used if OpenAI package is installed and API key is set
 * Since we're using Ollama, this function is rarely called
 */
async function tryOpenAI(
  prompt: string,
  systemPrompt: string
): Promise<string | null> {
  // Skip if no API key - we're using Ollama
  if (!process.env.OPENAI_API_KEY) {
    return null
  }

  // OpenAI package is optional - if not installed, just return null
  // This allows the app to work with just Ollama
  return null
}

/**
 * Main AI function that tries multiple providers in order
 */
async function callAI(
  prompt: string,
  systemPrompt: string,
  fallbackText: string
): Promise<string> {
  // Try providers in order of preference
  // 1. Ollama (local, free)
  const ollamaResult = await tryOllama(prompt, systemPrompt)
  if (ollamaResult) return ollamaResult

  // 2. Hugging Face (free tier)
  const hfResult = await tryHuggingFace(prompt, systemPrompt)
  if (hfResult) return hfResult

  // 3. OpenAI (if key available)
  const openaiResult = await tryOpenAI(prompt, systemPrompt)
  if (openaiResult) return openaiResult

  // 4. Fallback to simple dictionary-based replacement
  return simpleMedicalSimplifier(fallbackText)
}

/**
 * Simplifies medical text using AI
 */
export async function simplifyMedicalText(
  text: string,
  targetLanguage: Language = 'en'
): Promise<string> {
  const systemPrompt = `You are a medical jargon simplifier. Translate medical text into simple, easy-to-understand ${languageNames[targetLanguage]} language. Keep it accurate but make it accessible to non-medical professionals.`
  
  const prompt = `Translate the following medical text into simple ${languageNames[targetLanguage]} language:\n\n"${text}"\n\nProvide only the simplified version:`

  return await callAI(prompt, systemPrompt, text)
}

/**
 * Generates chatbot response for medical questions
 */
export async function generateChatbotResponse(
  question: string,
  language: Language = 'en',
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const systemPrompt = `You are a helpful medical assistant that explains medical terms and concepts in simple ${languageNames[language]} language. Always provide clear, accurate, and easy-to-understand explanations.`
  
  let prompt = question
  if (conversationHistory.length > 0) {
    const history = conversationHistory
      .slice(-4) // Last 4 messages for context
      .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n')
    prompt = `${history}\n\nUser: ${question}\n\nAssistant:`
  } else {
    prompt = `User: ${question}\n\nAssistant:`
  }

  return await callAI(prompt, systemPrompt, `I can help explain medical terms. "${question}" is a medical question that requires a detailed explanation.`)
}

/**
 * Normalize array items - convert objects to strings, keep strings as-is
 */
function normalizeArrayItems(items: any[]): string[] {
  return items.map((item) => {
    if (typeof item === 'string') {
      return item
    }
    if (typeof item === 'object' && item !== null) {
      // Handle object format like {name, brandName, disclaimer}
      if (item.name || item.brandName) {
        let result = ''
        if (item.name) result += item.name
        if (item.brandName) result += (result ? ' (' + item.brandName + ')' : item.brandName)
        if (item.disclaimer) result += ' - ' + item.disclaimer
        return result || JSON.stringify(item)
      }
      return JSON.stringify(item)
    }
    return String(item)
  })
}

/**
 * Summarizes medical report text with comprehensive analysis
 */
export async function summarizeMedicalReport(
  text: string,
  language: Language = 'en'
): Promise<{
  summary: string
  detailedExplanation: string
  keyFindings: string[]
  treatmentRecommendations: string[]
  medicineSuggestions: string[]
  lifestyleAdvice: string[]
  whenToConsultDoctor: string[]
  parameterBreakdown: Array<{
    parameterName: string
    patientValue: string
    unit: string
    normalRange: string
    status: 'normal' | 'high' | 'low'
    explanation: string
  }>
}> {
  const systemPrompt = `You are an experienced medical report analyzer and healthcare advisor. Provide comprehensive, detailed, and easy-to-understand analysis in ${languageNames[language]}. Always include practical recommendations, treatment options, and when to consult a doctor.`
  
  const prompt = `Analyze the following medical report comprehensively and provide a DETAILED analysis in ${languageNames[language]}. 

CRITICAL: The "summary" field must be EXTENSIVE and DETAILED - analyze ALL parameters, values, and what they mean for the patient. Do NOT give a short summary. Explain what actually happened to this patient based on ALL test results.

Medical Report:
${text.substring(0, 6000)}${text.length > 6000 ? '...' : ''}

Provide a comprehensive JSON response with:
1. "summary": A DETAILED, EXTENSIVE summary (8-12 sentences minimum) that:
   - Analyzes ALL parameters from the report
   - Explains what each abnormal value means
   - Describes what is happening to the patient
   - Mentions specific test values and their significance
   - Example: "The patient's complete blood count reveals several concerning findings. The hemoglobin level is 9.10 g/dL, which is significantly below the normal range of 13.0-17.0 g/dL, indicating moderate to severe anemia. The red blood cell count is 3.19 million cells/mcL, below the normal range of 4.5-5.0, confirming the anemia diagnosis. The hematocrit is 27.20%, well below the normal 40-50% range, indicating reduced oxygen-carrying capacity. The white blood cell count is elevated at 10,560 cells/mcL (normal: 4,000-10,000), suggesting a possible infection or inflammatory process. The neutrophil percentage is high at 87.7% (normal: 40-70%), indicating an active bacterial infection. The platelet count is 370,000/mcL, which is within normal range (150,000-450,000). Overall, the patient appears to have iron-deficiency anemia with a concurrent infection."

2. "detailedExplanation": A detailed paragraph (6-8 sentences) explaining what the report means, what the values indicate, what conditions might be present, and potential causes

3. "keyFindings": Array of 7-10 key findings with specific values and explanations (e.g., "Low hemoglobin (9.10 g/dL, normal: 13.0-17.0) - indicates moderate to severe anemia, may cause fatigue, weakness, and shortness of breath")

4. "treatmentRecommendations": Array of 4-6 treatment recommendations (e.g., "Iron supplements may be recommended to address the anemia", "Antibiotics may be needed if infection is confirmed", "Dietary changes to increase iron intake")

5. "medicineSuggestions": Array of 3-5 common medicines/treatments that might be prescribed (e.g., "Iron supplements - Ferrous sulfate (Ferosul) or Ferrous fumarate", "Folic acid supplements", "Antibiotics if infection confirmed"). Include generic names and common brand names. Always add disclaimer that these are suggestions and doctor consultation is required.

6. "lifestyleAdvice": Array of 4-6 lifestyle recommendations (e.g., "Eat iron-rich foods like spinach, lentils, red meat, and fortified cereals", "Get adequate rest to help body recover", "Stay hydrated", "Avoid tea/coffee with meals as they reduce iron absorption")

7. "whenToConsultDoctor": Array of 3-4 specific situations when immediate doctor consultation is needed

IMPORTANT:
- The summary MUST be detailed and analyze ALL parameters - this is critical!
- Explain medical terms in simple language
- Include specific test values and normal ranges
- Provide practical, actionable advice
- Include medicine names (generic and common brands) but always emphasize doctor consultation is essential
- Make it helpful like a caring healthcare professional would

Format your response as valid JSON only (no markdown, no code blocks):
{
  "summary": "detailed extensive summary analyzing all parameters",
  "detailedExplanation": "detailed explanation paragraph",
  "keyFindings": ["finding1", "finding2"],
  "treatmentRecommendations": ["treatment1", "treatment2"],
  "medicineSuggestions": ["medicine1", "medicine2"],
  "lifestyleAdvice": ["advice1", "advice2"],
  "whenToConsultDoctor": ["situation1", "situation2"]
}`

  // Generate a more detailed fallback summary from extracted text
  const generateFallbackSummary = (text: string): string => {
    const lines = text.split('\n').filter(line => line.trim().length > 0)
    const hasNumbers = /\d+/.test(text)
    const hasAbnormal = /\[H\]|\[L\]|high|low|elevated|decreased|abnormal/i.test(text)
    
    let summary = `This medical report contains ${lines.length} lines of test results and findings. `
    
    if (hasNumbers && hasAbnormal) {
      summary += `The report shows several test values, with some marked as high [H] or low [L], indicating values outside the normal range. `
      summary += `These abnormal values suggest potential health conditions that require medical attention. `
      summary += `It's important to review each parameter carefully and understand what these values mean for your health. `
      summary += `Please consult with a healthcare professional to interpret these results in the context of your overall health and medical history.`
    } else if (hasNumbers) {
      summary += `The report contains various test values and measurements. `
      summary += `While the values appear to be within normal ranges, it's important to have a healthcare professional review the complete report. `
      summary += `Each test parameter provides important information about your health status. `
      summary += `Please discuss these results with your doctor for proper interpretation and any necessary follow-up.`
    } else {
      summary += `The report contains important medical information that should be reviewed by a healthcare professional. `
      summary += `Please consult with your doctor to understand what these results mean for your health.`
    }
    
    return summary
  }
  
  const fallbackResponse = {
    summary: generateFallbackSummary(text),
    detailedExplanation: `The report shows various medical test results. Some values may be outside the normal range, which could indicate underlying health conditions. It's important to discuss these results with a healthcare professional for proper interpretation and treatment. Each test parameter provides valuable information about your health status, and a qualified medical professional can help you understand what these results mean in the context of your overall health.`,
    keyFindings: extractKeyFindings(text),
    treatmentRecommendations: ['Consult with a healthcare professional for proper diagnosis and treatment plan', 'Follow up with recommended tests if suggested', 'Discuss any abnormal values with your doctor'],
    medicineSuggestions: ['Please consult a doctor for appropriate medication. Do not self-medicate.'],
    lifestyleAdvice: ['Maintain a balanced diet', 'Get regular exercise', 'Stay hydrated', 'Get adequate sleep'],
    whenToConsultDoctor: ['If you experience severe symptoms', 'If values are significantly outside normal range', 'For proper diagnosis and treatment plan'],
    parameterBreakdown: extractParameterBreakdown(text),
  }

  try {
    const result = await callAI(
      prompt,
      systemPrompt,
      JSON.stringify(fallbackResponse)
    )

    // Try to parse JSON from result
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          summary: parsed.summary || fallbackResponse.summary,
          detailedExplanation: parsed.detailedExplanation || fallbackResponse.detailedExplanation,
          keyFindings: Array.isArray(parsed.keyFindings) && parsed.keyFindings.length > 0 
            ? normalizeArrayItems(parsed.keyFindings)
            : fallbackResponse.keyFindings,
          treatmentRecommendations: Array.isArray(parsed.treatmentRecommendations) && parsed.treatmentRecommendations.length > 0
            ? normalizeArrayItems(parsed.treatmentRecommendations)
            : fallbackResponse.treatmentRecommendations,
          medicineSuggestions: Array.isArray(parsed.medicineSuggestions) && parsed.medicineSuggestions.length > 0
            ? normalizeArrayItems(parsed.medicineSuggestions)
            : fallbackResponse.medicineSuggestions,
          lifestyleAdvice: Array.isArray(parsed.lifestyleAdvice) && parsed.lifestyleAdvice.length > 0
            ? normalizeArrayItems(parsed.lifestyleAdvice)
            : fallbackResponse.lifestyleAdvice,
          whenToConsultDoctor: Array.isArray(parsed.whenToConsultDoctor) && parsed.whenToConsultDoctor.length > 0
            ? normalizeArrayItems(parsed.whenToConsultDoctor)
            : fallbackResponse.whenToConsultDoctor,
          parameterBreakdown: Array.isArray(parsed.parameterBreakdown) && parsed.parameterBreakdown.length > 0
            ? parsed.parameterBreakdown
            : fallbackResponse.parameterBreakdown,
        }
      }
    } catch (e) {
      console.error('JSON parse error:', e)
      // If JSON parsing fails, try to extract information from text
    }

    // Fallback if JSON parsing fails
    return fallbackResponse
  } catch (error) {
    console.error('Error summarizing report:', error)
    return fallbackResponse
  }
}

/**
 * Extract parameter breakdown from medical report text
 */
function extractParameterBreakdown(text: string): Array<{
  parameterName: string
  patientValue: string
  unit: string
  normalRange: string
  status: 'normal' | 'high' | 'low'
  explanation: string
}> {
  const parameters: Array<{
    parameterName: string
    patientValue: string
    unit: string
    normalRange: string
    status: 'normal' | 'high' | 'low'
    explanation: string
  }> = []

  // Medical parameter explanations dictionary
  const parameterExplanations: Record<string, string> = {
    'haemoglobin': 'Hemoglobin carries oxygen in your blood. Low levels can cause fatigue and weakness.',
    'hemoglobin': 'Hemoglobin carries oxygen in your blood. Low levels can cause fatigue and weakness.',
    'hgb': 'Hemoglobin carries oxygen in your blood. Low levels can cause fatigue and weakness.',
    'rbc': 'Red blood cells carry oxygen throughout your body. Low count indicates anemia.',
    'red blood cell': 'Red blood cells carry oxygen throughout your body. Low count indicates anemia.',
    'haematocrit': 'Hematocrit shows the percentage of red blood cells in your blood. Low values indicate anemia.',
    'hematocrit': 'Hematocrit shows the percentage of red blood cells in your blood. Low values indicate anemia.',
    'hct': 'Hematocrit shows the percentage of red blood cells in your blood. Low values indicate anemia.',
    'pcv': 'Packed cell volume (hematocrit) shows red blood cell percentage. Low values indicate anemia.',
    'mcv': 'Mean corpuscular volume measures average red blood cell size. Normal values indicate healthy cells.',
    'mch': 'Mean corpuscular hemoglobin measures average hemoglobin per red blood cell.',
    'mchc': 'Mean corpuscular hemoglobin concentration measures hemoglobin density in red blood cells.',
    'rdw': 'Red cell distribution width measures variation in red blood cell size. High values indicate size variation.',
    'wbc': 'White blood cells fight infections. High count may indicate infection or inflammation.',
    'white blood cell': 'White blood cells fight infections. High count may indicate infection or inflammation.',
    'neutrophil': 'Neutrophils fight bacterial infections. High levels suggest active bacterial infection.',
    'lymphocyte': 'Lymphocytes fight viral infections and produce antibodies. Low levels may indicate immune issues.',
    'eosinophil': 'Eosinophils fight parasites and allergic reactions. Low levels are usually normal.',
    'monocyte': 'Monocytes help fight infections and remove dead cells. Normal levels indicate healthy immune function.',
    'basophil': 'Basophils are involved in allergic reactions. Normal levels are very low.',
    'platelet': 'Platelets help blood clotting. Normal levels prevent excessive bleeding.',
    'mpv': 'Mean platelet volume measures average platelet size. Normal values indicate healthy platelets.',
  }

  // Pattern to match: Parameter Name, Value [H/L], Unit, Normal Range
  // Examples:
  // "Haemoglobin 9.10 [L] 13.0-17.0 gm/dl"
  // "Total R.B.C. Count 3.19 [L] 4.5-5.5 mill/cmm"
  // "Neutrophils 87.7 [H] 40-70%"
  
  const lines = text.split('\n')
  
  for (const line of lines) {
    // Match pattern: parameter name, value, [H] or [L] marker, normal range, unit
    // More flexible pattern to catch various formats
    const patterns = [
      // Format: "Parameter Name Value [H/L] NormalRange Unit"
      /([A-Za-z\s\.\(\)\/\-]+?)\s+([\d.]+)\s*\[([HL])\]\s*([\d.]+[\s\-–]+[\d.]+)\s*([A-Za-z\/%]+)/i,
      // Format: "Parameter Name Value [H/L] Unit NormalRange"
      /([A-Za-z\s\.\(\)\/\-]+?)\s+([\d.]+)\s*\[([HL])\]\s*([A-Za-z\/%]+)\s+([\d.]+[\s\-–]+[\d.]+)/i,
      // Format: "Parameter Name Value NormalRange Unit [H/L]"
      /([A-Za-z\s\.\(\)\/\-]+?)\s+([\d.]+)\s+([\d.]+[\s\-–]+[\d.]+)\s+([A-Za-z\/%]+)\s*\[([HL])\]/i,
      // Format without [H/L] marker but with range
      /([A-Za-z\s\.\(\)\/\-]+?)\s+([\d.]+)\s+([\d.]+[\s\-–]+[\d.]+)\s+([A-Za-z\/%]+)/i,
    ]

    for (const pattern of patterns) {
      const match = line.match(pattern)
      if (match) {
        const parameterName = match[1].trim()
        const patientValue = match[2].trim()
        let status: 'normal' | 'high' | 'low' = 'normal'
        let normalRange = ''
        let unit = ''

        // Determine which match group is which based on pattern
        if (pattern.source.includes('\\[([HL])\\]')) {
          // Pattern with [H/L] marker
          if (match[3] === 'H' || match[3] === 'h') {
            status = 'high'
          } else if (match[3] === 'L' || match[3] === 'l') {
            status = 'low'
          }
          normalRange = match[4]?.trim() || match[5]?.trim() || ''
          unit = match[5]?.trim() || match[4]?.trim() || ''
        } else {
          // Pattern without [H/L] marker - try to infer from value vs range
          normalRange = match[3]?.trim() || ''
          unit = match[4]?.trim() || ''
          // Try to determine if value is high/low by comparing to range
          const rangeMatch = normalRange.match(/([\d.]+)[\s\-–]+([\d.]+)/)
          if (rangeMatch) {
            const min = parseFloat(rangeMatch[1])
            const max = parseFloat(rangeMatch[2])
            const value = parseFloat(patientValue)
            if (!isNaN(value) && !isNaN(min) && !isNaN(max)) {
              if (value < min) status = 'low'
              else if (value > max) status = 'high'
              else status = 'normal'
            }
          }
        }

        // Clean up parameter name
        const cleanName = parameterName
          .replace(/\s+/g, ' ')
          .replace(/\([^)]*\)/g, '')
          .trim()

        // Get explanation
        const lowerName = cleanName.toLowerCase()
        let explanation = 'This parameter measures important health indicators.'
        
        for (const [key, value] of Object.entries(parameterExplanations)) {
          if (lowerName.includes(key)) {
            explanation = value
            break
          }
        }

        // Add status-specific explanation
        if (status === 'high') {
          explanation += ` Your value is HIGHER than normal, which may require attention.`
        } else if (status === 'low') {
          explanation += ` Your value is LOWER than normal, which may require attention.`
        } else {
          explanation += ` Your value is within the normal range.`
        }

        parameters.push({
          parameterName: cleanName,
          patientValue,
          unit: unit || 'N/A',
          normalRange: normalRange || 'N/A',
          status,
          explanation,
        })

        break // Found a match, move to next line
      }
    }
  }

  return parameters
}

/**
 * Extract key findings from medical text using pattern matching
 */
function extractKeyFindings(text: string): string[] {
  const findings: string[] = []
  const lowerText = text.toLowerCase()

  // Look for common medical values
  const patterns = [
    { regex: /(?:blood pressure|bp)[\s:]+(\d+\/\d+)/i, label: 'Blood Pressure' },
    { regex: /(?:glucose|blood sugar)[\s:]+(\d+)/i, label: 'Blood Sugar' },
    { regex: /(?:hba1c|a1c)[\s:]+([\d.]+%)/i, label: 'HbA1c' },
    { regex: /(?:cholesterol|ldl|hdl)[\s:]+(\d+)/i, label: 'Cholesterol' },
    { regex: /(?:heart rate|pulse)[\s:]+(\d+)/i, label: 'Heart Rate' },
  ]

  patterns.forEach(({ regex, label }) => {
    const match = lowerText.match(regex)
    if (match) {
      findings.push(`${label}: ${match[1]}`)
    }
  })

  // Look for abnormal values
  if (lowerText.includes('abnormal') || lowerText.includes('elevated') || lowerText.includes('high')) {
    findings.push('Some values may be outside normal range')
  }

  if (findings.length === 0) {
    findings.push('Review the extracted text for detailed information')
  }

  return findings.slice(0, 5) // Max 5 findings
}
